import React, { useEffect, useState } from 'react';
import { confirmEmail } from '../../Config/LogInApi';
import backgroundImage from '../../assets/images/login-bg.png';
const Confirmation = () => {
    const [message, setMessage] = useState('');
    const [confirmState, setConfirmState] = useState(false);

    const sendConfirmrequest = async () => {
        const params = new URLSearchParams(window.location.search);
        const emailParam = params.get('email');
        const codeParam = encodeURIComponent(params.get('code'));
        const confirmData = { email: emailParam, code: codeParam };
        // Set the state with the extracted values
        try {
            const response = await confirmEmail(confirmData);
            if (response) {
                setConfirmState(true);
                setMessage('email confirm completed');
            } else {
                setMessage('email confirm completed');
            }
        } catch (error) {
            console.log('error', error);
        }

    }
    // On component mount
    useEffect( () => {
        sendConfirmrequest();
    }, []);

    return (
        <div style={{ 
            backgroundImage: `url(${backgroundImage})`, 
            backgroundSize: 'cover', 
            backgroundPosition: 'center', 
            height: '100vh', 
            width: '100vw', 
            display: 'flex', 
            justifyContent: 'center', 
            alignItems: 'center' 
        }}>
            <div style={{ 
                display: 'flex', 
                flexDirection: 'column', 
                alignItems: 'center', 
                backgroundColor: 'rgba(255, 255, 255, 0.8)', 
                padding: '20px', 
                borderRadius: '10px' 
            }}>
                <h1>Email Confirmation</h1>
                <hr />
                <h1>{message}</h1>
                {confirmState ? <a style={{ fontSize: '60px' }} href='/login'>Go to login page</a> : null}
            </div>
        </div>
    );
};

export default Confirmation;
