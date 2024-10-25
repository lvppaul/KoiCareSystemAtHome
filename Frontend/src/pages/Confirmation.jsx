import React, { useEffect, useState } from 'react';
import { confirmEmail } from '../Config/LogInApi';

const Confirmation = () => {
    const [message, setMessage] = useState('');
    const sendConfirmrequest = async () => {
        const params = new URLSearchParams(window.location.search);
        const emailParam = decodeURIComponent(params.get('email'));
        const codeParam = decodeURIComponent(params.get('code'));
        console.log('test param', emailParam, codeParam);
        // Set the state with the extracted values
        try {
            const response = await confirmEmail(emailParam, codeParam);
            if (response === 200) {
                setMessage('email confirm success go back to login page');
            } else {
                setMessage('Failed mail confirmed');
            }
        } catch (error) {
            console.log('error', error);
        }

    }
    // On component mount
    useEffect( () => {
        // Extract the 'email' and 'code' parameters
        sendConfirmrequest();
    }, []);

    return (
        <div>
            <h1>Email Confirmation</h1>
            <p>{message}</p>
        </div>
    );
};

export default Confirmation;
