import React, { useEffect, useState } from 'react';
import { confirmEmail } from '../../Config/LogInApi';
import backgroundImage from '../../assets/images/login-bg.png';
import { BiCheckCircle, BiXCircle } from 'react-icons/bi';
const Confirmation = () => {
    const [confirmState, setConfirmState] = useState(false);
    const sendConfirmrequest = async () => {
        const params = new URLSearchParams(window.location.search);
        const emailParam = params.get('email');
        const codeParam = encodeURIComponent(params.get('code'));
        const confirmData = { email: emailParam, code: codeParam };
        // Set the state with the extracted values
        try {
            const response = await confirmEmail(confirmData);
            response === 200 ? setConfirmState(true) : setConfirmState(false);
        } catch (error) {
            setConfirmState(false);
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
                {confirmState ? 
                <>
                <BiCheckCircle size={300} color='green' />
                <p>Your email has been confirmed. You can now close this tab.</p> 
                </>
                : <>
                <BiXCircle size={300} color='red' />
                <p>There was an error confirming your email. Please try again.</p>
                </>}
            </div>
        </div>
    );
};

export default Confirmation;
