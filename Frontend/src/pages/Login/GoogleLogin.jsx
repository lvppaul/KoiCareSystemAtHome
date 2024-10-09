import { FcGoogle } from "react-icons/fc";
import { Button } from 'react-bootstrap';
import { GoogleAuthProvider,signInWithRedirect } from 'firebase/auth';
import { auth } from '../../API/firebase';
import {useNavigate} from 'react-router-dom';
import { authContext } from './AuthProvider';
import { useContext } from 'react';

const GoogleLogin = () => {
    //login with google
    const googleProvider = new GoogleAuthProvider();
    //navigate sucess login
    const navigate = useNavigate();

    const { signInWithGoogle } = useContext(authContext);

        return(
            <Button className="google-login" onClick={signInWithGoogle}>
                <FcGoogle size={24} />
                Login with Google
            </Button>
        )
}
export default GoogleLogin;