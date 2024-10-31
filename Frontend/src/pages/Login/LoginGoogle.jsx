import { FcGoogle } from "react-icons/fc";
import { Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { signInWithPopup } from "firebase/auth";
import { googleLogIn } from "../../Config/LogInApi";
import { auth, provider } from "../../Config/firebase";
import { useAuth } from "./AuthProvider";
import { getAccountByUserId, updateAccount } from "../../Config/UserApi";
import { ref, uploadBytes } from "firebase/storage";
import { storage } from "../../Config/firebase";
import { createCart, getCartByUserId } from "../../Config/CartApi";

const LoginGoogle = () => {
  const navigate = useNavigate();
  const { login, role } = useAuth();

  const handleSignInGoogle = async () => {
    try {
      const result = await signInWithPopup(auth, provider);
      const user = result.user;
      console.log("result", result);

      // Get the token from Firebase
      const token = await user.getIdToken();

      // Call the googleLogIn function with the token
      const response = await googleLogIn(token);
      const userDetail = await getAccountByUserId(response.userId);
      const existingAvatar = userDetail.avatar;

      const existingCart = await getCartByUserId(response.userId);

      if (!existingCart) {
        try {
          await createCart(response.userId);
        } catch (error) {
          console.error("Error creating cart:", error);
        }
      }

      if (!existingAvatar) {
        if (response.avatar) {
          try {
            const imageResponse = await fetch(response.avatar);
            const imageBlob = await imageResponse.blob();
            const file = new File([imageBlob], "avatar.png", {
              type: "image/png",
            });
            const storageRef = ref(
              storage,
              `users/${response.userId}/userAvatars/${Date.now()}_${file.name}`
            );
            await uploadBytes(storageRef, file);
            await updateAccount(response.userId, {
              avatar: storageRef.fullPath,
            });
          } catch (error) {
            console.error("Error uploading avatar:", error);
          }
        }
      }

      console.log("response:", response);

      if (response.userId) {
        login({
          email: response.email,
          role: response.userRole,
          userId: response.userId,
        });
        if (role === "admin") {
          navigate("/admin");
        } else {
          navigate("/");
        }
      }
    } catch (error) {
      console.error("Login Failed:", error);
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
