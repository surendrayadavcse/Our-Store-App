

import React from 'react';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { Link, useNavigate } from 'react-router-dom';

function NavBar() {
  const navigate = useNavigate();

  // Logout function that clears the token and navigates to login page
  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("userId");
    navigate("/login");
  };

  return (
    <Navbar expand="lg" className="bg-body-tertiary">
      <Container className='containercss'>
        <Navbar.Brand as={Link} to="/"><img className='brand-image' src='https://ourstore.co.za/wp-content/uploads/2022/07/cropped-Our-store.png'/></Navbar.Brand> {/* Home */}
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse className='navbaritems' id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link as={Link} to="/products">Products</Nav.Link> {/* Products Page */}
            <Nav.Link as={Link} to="/cart"><img className='cartimage' src='data:image/png;base64,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'/></Nav.Link> {/* Cart Page */}
            
            <NavDropdown title="Account" id="basic-nav-dropdown">
              <NavDropdown.Item as={Link} to="/login">Login</NavDropdown.Item> {/* Login Page */}
              {/* <NavDropdown.Item as={Link} to="/register">Register</NavDropdown.Item> Register Page */}
              <NavDropdown.Divider />
              <NavDropdown.Item onClick={handleLogout}>Logout</NavDropdown.Item> {/* Logout Function */}
            </NavDropdown>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default NavBar;
