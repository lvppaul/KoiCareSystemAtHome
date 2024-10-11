import { FcGoogle } from "react-icons/fc";
import { Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { signInWithRedirect } from "firebase/auth";
import { signIn } from "../../Config/LogInApi";
import { auth, provider } from "../../API/firebase";
import { useAuth } from './AuthProvider';
import {jwtDecode} from 'jwt-decode'; // Correct import for jwt-decode

const LoginGoogle = () => {
    const navigate = useNavigate();
    const { setUser } = useAuth(); // Assuming you have a way to set the user in context

    const handleSignInGoogle = async () => {
        try {
            const result = await signInWithRedirect(auth, provider);
            const user = result.user;

            // Get the token from Firebase
            const token = await user.getIdToken();

            // Send the token to your API to get a custom JWT token
            const credentials = { token };
            const data = await signIn(credentials); // Call the signIn function from AxiosConfig

            console.log('Login Success:', data);
            console.log("custom JWT token:", data.token);
            localStorage.setItem('token', data.token); // Store the JWT token

            // Decode the JWT token to get user role
            const decodedToken = jwtDecode(data.token);
            console.log('Decoded token:', decodedToken);
            const userRole = decodedToken.role; // Extract the role from the decoded token

            // Set user in context
            setUser({ ...data.userData, role: userRole }); // Assuming userData contains other user info

            // Redirect to the home page or wherever you want
            navigate('/');
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