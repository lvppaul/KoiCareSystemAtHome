import { Navbar, Nav, Container, Form, FormControl, NavDropdown, Image } from "react-bootstrap";
import { NavLink } from "react-router-dom";
import Logo from "../../assets/Fpt_TTKoi_logo.svg";
import "./Navigationbar.css";
import { BiUserCircle, BiCart } from "react-icons/bi";
import { useAuth } from "../../pages/Login/AuthProvider";
import { useState, useEffect, useCallback } from "react";
import { getAccountByUserId } from "../../Config/UserApi";
import { getDownloadURL, ref } from "firebase/storage";
import { storage } from "../../Config/firebase";
import LoginNeeded from "../LoginNeeded/LoginNeeded";
import { getKoiRemindByUserId } from "../../Config/KoiRemind";
import KoiReminderList from "../KoiReminder/KoiReminderList";

const Navigationbar = () => {
  const auth = useAuth();
  const [avatar, setAvatar] = useState(null);
  const { user, logout } = auth;
  const role = user ? user.role : null;
  const [showLoginNeeded, setShowLoginNeeded] = useState(false);
  const userId = auth.user ? auth.user.userId : null;


  useEffect(() => {
    const fetchAccountDetails = async () => {
      if (!user) return;

      const userId = user.userId;
      const accountDetails = await getAccountByUserId(userId);
      if (accountDetails) {
        if (accountDetails.avatar) {
          try {
            const storageRef = ref(storage, accountDetails.avatar);
            const previewAvatar = await getDownloadURL(storageRef);
            setAvatar(previewAvatar);
          } catch (error) {
            console.error("The file does not exist in firebase anymore!", error);
            setAvatar(null);
          }
        }
      }
    };
    fetchAccountDetails();
  }, [user]);

  if (!auth) {
    console.error("auth not available");
    return null;
  }
  const handleLogOut = () => {
    logout();
  };

  return (
    <>
      <header className="user-header d-flex justify-content-end w-100">
        <NavLink to="/contact" className="mx-2 text-white text-decoration-none">
          Contact Us
        </NavLink>
        <NavLink to="/about" className="mx-2 text-white text-decoration-none">
          About Us
        </NavLink>
        {/* {user && (
          <NavDropdown title={<BiUserCircle size={24} />} id="basic-nav-dropdown">
            <NavDropdown.Item onClick={handleLogOut}>Logout</NavDropdown.Item>
            <NavDropdown.Item>Role: {user.role}</NavDropdown.Item>
          </NavDropdown>
        )} */}
      </header>
      <Navbar expand="lg" bg="light">
        <Container fluid>
          <Nav className="flex-grow-4">
            <NavLink to="/" className="navbar-brand d-flex align-items-center">
              <img src={Logo} alt="Logo" className="navbar-logo" />
            </NavLink>
          </Nav>
          <Nav className="flex-grow-4 mx-auto">
            <NavLink className="nav-title" to="/">
              Home
            </NavLink>
            <NavLink className="nav-title" to="/shop">
              Shop
            </NavLink>
            <NavLink className="nav-title" to="/news">
              News
            </NavLink>
            <NavLink className="nav-title" to="/blogs">
              Blogs
            </NavLink>
            {user && user.role === "shop" ? (
              <NavLink className="nav-title" to="/manageshop">
                Your Shop
              </NavLink>
            ) : (
              <>
                <NavDropdown
                  title="Koi Pond"
                  id="basic-nav-dropdown"
                  className="custom-dropdown"
                  onClick={(e) => {
                    if (!user) {
                      e.preventDefault();
                      setShowLoginNeeded(true);
                    }
                  }}
                >
                  {user ? (
                    <>
                      <NavDropdown.Item as={NavLink} to="/koilist">
                        Koi Fish List
                      </NavDropdown.Item>
                      <NavDropdown.Item as={NavLink} to="/pond">
                        Pond
                      </NavDropdown.Item>
                      <NavDropdown.Item as={NavLink} to="/foodcalculator">
                        Food Calculator
                      </NavDropdown.Item>
                      <NavDropdown.Item as={NavLink} to="/saltcalculator">
                        Salt Calculator
                      </NavDropdown.Item>
                    </>
                  ) : null}
                </NavDropdown>
                <LoginNeeded show={showLoginNeeded} handleClose={() => setShowLoginNeeded(false)} />
              </>
            )}
            {user ?  (
            <>
              <NavLink to={"koiremind"} className="nav-title">
                Koi Reminder
              </NavLink>
            </>
            ) : null}
          </Nav>
          <Nav className="flex-grow-4 ms-auto nav-right">
            {/* <Form className="d-flex">
              <FormControl type="search" placeholder="Search..." className="me-2 rounded-pill" />
            </Form> */}
            <NavDropdown
              drop="down"
              className="dropdown-centered"
              style={{ position: "relative" }}
              title={
                user && avatar ? (
                  <Image
                    src={avatar}
                    roundedCircle
                    style={{
                      width: "50px",
                      height: "50px",
                      objectFit: "cover",
                    }}
                  />
                ) : (
                  <BiUserCircle size={50} />
                )
              }
              id="basic-nav-dropdown"
            >
              {user ? (
                <>
                  {role === "admin" ? (
                    <NavDropdown.Item as={NavLink} to="/admin">
                      Go to Admin Page
                    </NavDropdown.Item>
                  ) : null}
                  <NavDropdown.Item as={NavLink} to="/profile">
                    Profile
                  </NavDropdown.Item>
                  <NavDropdown.Item as={NavLink} to="orderhistory">
                    Order History
                  </NavDropdown.Item>
                  <NavDropdown.Item onClick={handleLogOut}>Log out</NavDropdown.Item>
                  <hr />
                  <NavDropdown.Item style={{ fontWeight: "bold", color: "black" }} disabled>
                    Membership Level: {user.role} <br />
                    Email: {user.email}
                  </NavDropdown.Item>
                </>
              ) : (
                <NavDropdown.Item as={NavLink} to="/login">
                  Log in
                </NavDropdown.Item>
              )}
            </NavDropdown>
            {user ? (
              <NavLink to={"/cart"}>
                <BiCart size={50} color="Black" style={{ marginTop: "5px" }} />
              </NavLink>
            ) : (
              <BiCart size={50} color="Black" style={{ marginTop: "5px" }} onClick={() => setShowLoginNeeded(true)} />
            )}
          </Nav>
          <LoginNeeded show={showLoginNeeded} handleClose={() => setShowLoginNeeded(false)} />
        </Container>
      </Navbar>
    </>
  );
};

export default Navigationbar;
