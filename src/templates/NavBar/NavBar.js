import { NavLink, Outlet } from "react-router-dom";
import { useLocation } from "react-router-dom";

import classes from "./NavBar.module.css";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavBarButton from "./NavBarButton/NavBarButton";

const NavBar = () => {
  const location = useLocation();

  const path = location.pathname;

  return (
    <>
      <Navbar className={classes.navBarBody} bg="dark" data-bs-theme="dark">
        <Container className={classes.navBarContainer}>
          <NavLink
            className={() => (path === "/home" ? classes.active : classes.link)}
            to="/home"
          >
            Books
          </NavLink>

          <Nav className="me-auto">
            <NavLink
              className={(navData) =>
                navData.isActive ? classes.active : classes.link
              }
              to="/home/fantasy"
            >
              <li>Fantasy</li>
            </NavLink>

            <NavLink
              className={(navData) =>
                navData.isActive ? classes.active : classes.link
              }
              to="/home/adventure"
            >
              <li>Adventure</li>
            </NavLink>

            <NavLink
              className={(navData) =>
                navData.isActive ? classes.active : classes.link
              }
              to="/home/classics"
            >
              <li>Classics</li>
            </NavLink>

            <NavLink
              className={(navData) =>
                navData.isActive ? classes.active : classes.link
              }
              to="/home/science-fiction"
            >
              <li>Science Fiction</li>
            </NavLink>
          </Nav>

          <NavBarButton />
        </Container>
      </Navbar>
      <Outlet />
    </>
  );
};

export default NavBar;
