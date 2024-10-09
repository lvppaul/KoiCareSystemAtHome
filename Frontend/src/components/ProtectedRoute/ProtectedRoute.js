import { Navigate } from 'react-router-dom';
import { useAuth } from './path/to/AuthProvider'; // Adjust the import based on your structure

const ProtectedRoute = ({ children }) => {
  const { user } = useAuth(); // Assuming useAuth is a custom hook to access Auth context

  return user ? children : <Navigate to="/login" />;
};

export default ProtectedRoute;
