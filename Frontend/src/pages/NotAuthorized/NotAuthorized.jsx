import React from 'react';

function NotAuthorized() {
    return (
        <div style={{ textAlign: 'center', marginTop: '50px' }}>
            <h1>You are not authorized</h1>
            <p>The page you are looking for need to be authorized.</p>
        </div>
    );
}

export default NotAuthorized;