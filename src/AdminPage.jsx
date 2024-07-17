import React, { useState, useEffect } from 'react';
import axios from 'axios';

const AdminPage = () => {
    const [emails, setEmails] = useState([]);
    const [newEmail, setNewEmail] = useState('');

    useEffect(() => {
        fetchEmails();
    }, []);

    const fetchEmails = async () => {
        try {
            const response = await axios.get('http://localhost:5001/emails');
            setEmails(response.data);
        } catch (error) {
            console.error('Error fetching emails:', error);
        }
    };

    const addEmail = async () => {
        try {
            await axios.post('http://localhost:5001/emails', { email: newEmail });
            setNewEmail('');
            fetchEmails();
        } catch (error) {
            console.error('Error adding email:', error);
        }
    };

    const updateEmail = async (id, updatedEmail) => {
        try {
            await axios.put(`http://localhost:5001/emails/${id}`, { email: updatedEmail });
            fetchEmails();
        } catch (error) {
            console.error('Error updating email:', error);
        }
    };

    const deleteEmail = async (id) => {
        try {
            await axios.delete(`http://localhost:5001/emails/${id}`);
            fetchEmails();
        } catch (error) {
            console.error('Error deleting email:', error);
        }
    };

    return (
        <div>
            <h1>Admin Page</h1>
            <div>
                <input
                    type="email"
                    value={newEmail}
                    onChange={(e) => setNewEmail(e.target.value)}
                    placeholder="New email"
                />
                <button onClick={addEmail}>Add Email</button>
            </div>
            <ul>
                {emails.map((email) => (
                    <li key={email.id}>
                        {email.email}
                        <button onClick={() => updateEmail(email.id, prompt('Enter new email:'))}>
                            Update
                        </button>
                        <button onClick={() => deleteEmail(email.id)}>Delete</button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default AdminPage;