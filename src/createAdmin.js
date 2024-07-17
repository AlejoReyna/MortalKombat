require('dotenv').config();
const sequelize = require('./config/database');
const User = require('./models/user');

async function createAdmin() {
    try {
        await sequelize.sync();

        const adminEmail = 'admin@example.com';
        const adminPassword = 'tuContraseñaSegura';

        const existingAdmin = await User.findOne({ where: { email: adminEmail } });

        if (existingAdmin) {
            console.log('El administrador ya existe');
            return;
        }

        const newAdmin = await User.create({
            email: adminEmail,
            password: adminPassword,
            isAdmin: true
        });

        console.log('Administrador creado con éxito:', newAdmin.email);
    } catch (error) {
        console.error('Error al crear el administrador:', error);
    } finally {
        await sequelize.close();
    }
}

createAdmin();