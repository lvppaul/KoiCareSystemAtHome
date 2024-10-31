import api from "./AxiosConfig";
import { jwtDecode } from "jwt-decode";

// Function to sign up
const signUp = async (userData) => {
  try {
    const response = await api.post("Account/CreateMemberAccount", userData, {
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    });
    console.log("sign up resp", response.data.message);
    return response.data.message;
  } catch (error) {
    console.error("Error during sign-up:", error);
    if (error.response) {
      console.error("Error response data:", error.response.data.message);
      return error.response.data.message;
    } else {
      return { error: "Unknown error occurred" };
    }
  }
};

// sign up vip

const signUpVip = async (userData) => {
  try {
    const response = await api.post("Account/CreateVipAccount", userData, {
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    });
    console.log("sign up Vip resp", response.data.message);
    return response.data.message;
  } catch (error) {
    console.error("Error during sign-up:", error);
    if (error.response) {
      console.error("Error response data:", error.response.data.message);
      return error.response.data.message;
    } else {
      return { error: "Unknown error occurred" };
    }
  }
};

// Function to sign up shop
const signUpShop = async (userData) => {
  try {
    const response = await api.post("Account/CreateShopAccount", userData, {
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    });
    console.log("signupshop resp", response.data.message);
    return response.data.message;
  } catch (error) {
    console.error("Error during sign-up:", error);
    if (error.response) {
      console.error("Error response data:", error.response.data.message);
      return error.response.data.message;
    } else {
      return { error: "Unknown error occurred" };
    }
  }
};

// Function to sign in
const signIn = async (credentials) => {
  try {
    const response = await api.post("Account/SignIn", credentials, {
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    });

    const decoded = jwtDecode(response.data.accessToken);
    const email =
      decoded[
        "http://schemas.xmlsoap.org/ws/2005/05/identity/claims/emailaddress"
      ];
    const userId =
      decoded[
        "http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier"
      ];
    const userRole =
      decoded["http://schemas.microsoft.com/ws/2008/06/identity/claims/role"];

    localStorage.setItem("user", JSON.stringify({ userId, userRole }));
    const message = response.data.message;
    console.log(message);
    return { userId, email, userRole, message };
  } catch (error) {
    if (error.response) {
      console.error("Error response data:", error.response.data);
      return error.response.data.message;
    } else {
      return { error: "Unknown error occurred" };
    }
  }
};

// Function to confirm email
const confirmEmail = async (confirmData) => {
  try {
    const response = await api.post(`Account/ConfirmEmail`, confirmData, {
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    });
    console.log("response", response.status);
    return response.status;
  } catch (error) {
    console.error("Error during email confirmation:", error.response.data);
    console.log("error", error.response.status);
    return error.response.data.status;
  }
};

// Function to log in with Google
const googleLogIn = async (token) => {
  try {
    const response = await api.post(
      "Account/gmail-signin",
      { token },
      {
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
      }
    );

    const decoded = jwtDecode(response.data.accessToken);
    const email =
      decoded[
        "http://schemas.xmlsoap.org/ws/2005/05/identity/claims/emailaddress"
      ];
    const userId =
      decoded[
        "http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier"
      ];
    const userRole =
      decoded["http://schemas.microsoft.com/ws/2008/06/identity/claims/role"];
    const avatar = decoded["Avatar"];

    localStorage.setItem("user", JSON.stringify({ userId, userRole }));
    const message = response.data.message;
    console.log(message);

    return { email, userId, userRole, message, avatar };
  } catch (error) {
    console.error("Error during Google login:", error);
    if (error.response) {
      console.error("Error response data:", error.response.data);
      return error.response.data;
    } else {
      return { error: "Unknown error occurred" };
    }
  }
};

export { signUp, signUpVip, signUpShop, signIn, confirmEmail, googleLogIn };
