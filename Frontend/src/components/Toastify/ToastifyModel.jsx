import { useState, useEffect } from 'react';
import { Toast, ToastContainer } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

export function ToastifyMessage({ messages, onClose }) {
  const [showMessages, setShowMessages] = useState(messages.map(() => true));

  useEffect(() => {
    setShowMessages(messages.map(() => true));
  }, [messages]);

  const handleClose = (index) => {
    setShowMessages((prev) => {
      const newShowMessages = [...prev];
      newShowMessages[index] = false;
      return newShowMessages;
    });
    if (onClose) {
      onClose(index);
    }
  };

  return (
    <ToastContainer position="bottom-end" className="p-6">
      {messages.map((message, index) => {
        let variant = 'info';
        if (message.toLowerCase().includes('successful')) {
          variant = 'success';
        } else if (message.toLowerCase().includes('failed')) {
          variant = 'danger';
        }

        return (
          <Toast
            key={index}
            show={showMessages[index]}
            onClose={() => handleClose(index)}
            delay={3000}
            autohide
            bg={variant}
            style={{ marginBottom: '10px' }}
          >
            <Toast.Body
            style={{fontSize:'16px', textAlign:'center', fontWeight:'bold'}}>{message}</Toast.Body>
          </Toast>
        );
      })}
    </ToastContainer>
  );
}