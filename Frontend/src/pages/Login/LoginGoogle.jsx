import { FcGoogle } from "react-icons/fc";
import { Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { signInWithPopup } from "firebase/auth";
import { googleLogIn } from "../../Config/LogInApi";
import { auth, provider } from "../../Config/firebase";
import { useAuth } from './AuthProvider';

const LoginGoogle = () => {
    const navigate = useNavigate();
    const { login, role } = useAuth();

    const handleSignInGoogle = async () => {
        try {
            const result = await signInWithPopup(auth, provider);
            const user = result.user;
            console.log('result', result);

            // Get the token from Firebase
            const token = await user.getIdToken();
            console.log('token:', token);
            // Call the googleLogIn function with the token
            const response = await googleLogIn(token);
            console.log('response:', response);

            if (response.userId) {
                login({email: response.email, role: response.userRole, userId: response.userId });
                if (role === 'admin') {
                    navigate('/admin');
                } else {
                    navigate('/');
                }
            }
        } catch (error) {
            console.error('Login Failed:', error);
        }
    };

    return (
        <Button className="google-login" onClick={handleSignInGoogle}>
            <FcGoogle size={24} />
            Login with Google
        </Button>
    );
};

export default LoginGoogle;