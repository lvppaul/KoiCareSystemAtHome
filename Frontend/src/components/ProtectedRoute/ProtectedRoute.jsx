import { Navigate } from 'react-router-dom';
import { useAuth } from '../../pages/Login/AuthProvider';

const ProtectedRoute = ({ children, requiredRole }) => {
    const { user, hasRole } = useAuth();

    if (!user) {
        // If user is not logged in, redirect to the login page
        return <Navigate to="/login" />;
    }
    if (requiredRole === 'vip' && user.role === 'member') {
        // If a member tries to access a vip page, redirect to the UpdateAccount page
        return <Navigate to="/updateaccount" />;
    }
    if (requiredRole && !hasRole(requiredRole)) {
        // If the user does not have the required role, redirect to a "not authorized" page
        return <Navigate to="/notauthorized" />;
    }

    // If the user is authenticated and has the required role, render the children components
    return children;
};

export default ProtectedRoute;