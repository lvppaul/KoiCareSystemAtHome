import { Navigate } from 'react-router-dom';
import { useAuth } from '../../pages/Login/AuthProvider';

const ProtectedRoute = ({ children, requiredRole }) => {
    const { user, hasRole } = useAuth();

    if (!user) {
        // If user is not logged in, redirect to the login page
        return <Navigate to="/login" />;
    }

    if (requiredRole && !hasRole(requiredRole)) {
        // If the user does not have the required role, redirect to a "not authorized" page or home page
        switch (requiredRole) {
            case 'member':
                return <Navigate to="/notauthorized" />;
            case 'shop':
                return <Navigate to="/notauthorized" />;
            case 'vip':
                return <Navigate to="/notauthorized" />;
            case 'admin':
                return <Navigate to="/login" />;
            default:
                return <Navigate to="/notauthorized" />;
        }
    }

    // If the user is authenticated and has the required role, render the children components
    return children;
};

export default ProtectedRoute;