import { Toast, ToastContainer } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";

export function ToastifyMessage({ message, onClose }) {
  if (!message) return null;

  let variant = "info";
  if (message.toLowerCase().includes("successful")) {
    variant = "success";
  } else if (message.toLowerCase().includes("error") || message.toLowerCase().includes("failed")) {
    variant = "danger";
  }

  return (
    <ToastContainer position="bottom-end" className="p-6">
      <Toast
        show={true}
        onClose={onClose}
        delay={5000}
        autohide
        bg={variant}
        position="bottom-end"
        style={{
          position: "fixed",
          bottom: "20px",
          right: "20px",
          zIndex: 1,
          opacity: 0.9,
        }}
      >
        <Toast.Header>
          <strong className="me-auto">Notification</strong>
        </Toast.Header>
        <Toast.Body
          style={{
            fontSize: "16px",
            fontWeight: "bold",
            opacity: 0.9,
          }}
        >
          {message}
        </Toast.Body>
      </Toast>
    </ToastContainer>
  );
}
