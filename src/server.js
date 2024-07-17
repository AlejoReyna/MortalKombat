const express = require('express');
const sequelize = require('./config/database');
const cors = require('cors');
const User = require('./models/user');
const jwt = require('jsonwebtoken');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5001;
const SECRET_KEY = process.env.JWT_SECRET || 'sammy1234';

app.use(cors());
app.use(express.json());

// Sincroniza la base de datos
sequelize.sync()
    .then(() => console.log('Base de datos y tablas creadas'))
    .catch(err => console.log('Error sincronizando la base de datos:', err));

// Middleware para autenticar al administrador
function authenticateAdmin(req, res, next) {
    const token = req.headers['authorization'];
    if (!token) {
        return res.status(401).json({ message: 'No token provided' });
    }

    jwt.verify(token, SECRET_KEY, (err, decoded) => {
        if (err) {
            return res.status(401).json({ message: 'Failed to authenticate token' });
        }
        if (!decoded.isAdmin) {
            return res.status(403).json({ message: 'Access denied. Admin only.' });
        }
        req.userId = decoded.id;
        next();
    });
}

// Endpoint para registrar usuarios (pre-existente)
app.post('/register', async (req, res) => {
    try {
        const { email } = req.body;

        if (!email) {
            return res.status(400).json({ message: 'Todos los campos son obligatorios' });
        }

        const newUser = await User.create({ email });
        res.status(200).json({ message: 'Usuario registrado con éxito' });
    } catch (error) {
        if (error.name === 'SequelizeUniqueConstraintError') {
            res.status(400).json({ message: 'El correo ya está registrado' });
        } else {
            console.error(error);
            res.status(500).json({ message: 'Error del servidor' });
        }
    }
});

// Ruta para obtener todos los correos electrónicos
app.get('/emails', authenticateAdmin, async (req, res) => {
    try {
        const users = await User.findAll();
        res.json(users);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error del servidor' });
    }
});

// Ruta para actualizar un correo electrónico
app.put('/emails/:id', authenticateAdmin, async (req, res) => {
    try {
        const { id } = req.params;
        const { email } = req.body;
        const user = await User.findByPk(id);
        if (user) {
            user.email = email;
            await user.save();
            res.json({ message: 'Email updated successfully' });
        } else {
            res.status(404).json({ message: 'Email not found' });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error del servidor' });
    }
});

// Ruta para eliminar un correo electrónico
app.delete('/emails/:id', authenticateAdmin, async (req, res) => {
    try {
        const { id } = req.params;
        const user = await User.findByPk(id);
        if (user) {
            await user.destroy();
            res.json({ message: 'Email deleted successfully' });
        } else {
            res.status(404).json({ message: 'Email not found' });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error del servidor' });
    }
});

// Ruta para la autenticación del administrador
app.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ where: { email } });

        if (!user || !user.isAdmin) {
            return res.status(401).json({ success: false, message: 'Invalid credentials or not an admin' });
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);

        if (!isPasswordValid) {
            return res.status(401).json({ success: false, message: 'Invalid credentials' });
        }

        const token = jwt.sign({ id: user.id, isAdmin: user.isAdmin }, SECRET_KEY, { expiresIn: '1h' });
        res.json({ success: true, token });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: 'Server error' });
    }
});

app.listen(PORT, () => {
    console.log(`Servidor escuchando en el puerto ${PORT}`);
});