import React, {useState} from 'react';
import Shang from './Images/shang.jpeg';
import './Preorder.css';
import axios from 'axios';



    const Preorder = () => {
        const [email, setEmail] = useState('');
        const [success, setSuccess] = useState(false);
    
        const handleSubmit = (e) => {
        e.preventDefault();
        async function sendEmail() {
        try {
            await axios.post('/send-email', { email });

            setSuccess(true);
        
        setSuccess(true);
         } catch (error) {
            console.error('Error al enviar el correo electrónico:', error)
         }
        }
    };
  
    return(
    <body>
        <main>
            <div className="container-fluid preorder-page">
                <div className="row ">
                    <div className="col-12">
                        
                        <div className="card bg-black">
                        
                            <div className="card-body">
                                <div className="row">
                                    <div className='col-md-4-sm-2 d-flex justify-content-center'>
                                        <img src={ Shang } className="img" alt="Shang Tsung Image"/>
                                    </div>

                                    <div className="col-md-8 ">
                                        <div className="card-header d-flex justify-content-center"> <p> Introduce your data </p> </div>
                                        <p className='d-flex justify-content-center'> Note: Your data is not stored, it's just a demostration, you can view the source code.</p>

                                        {success ? (
                                            <div>Éxito</div>
                                        ) : (
                                        <div className="form-container">
                                            <form onSubmit={handleSubmit}>
                                                <label for="email" className='d-flex justify-content-center'>
                                                    <p> Enter your email address </p>
                                                </label>

                                                <input className="w-100" type="email" id="email" name="email" value={email}  onChange={(e) => setEmail(e.target.value)} required/>
                                                
                                                <div className="button-container d-flex justify-content-center">
                                                    <button type="submit"> Submit </button>
                                                </div>

                                            </form>
                                        </div>
                                        )} 
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
    
        </main>

    </body>
    );
};

export default Preorder; 