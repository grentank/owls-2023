import axios from 'axios';
import React from 'react';
import { Container, Nav, Navbar } from 'react-bootstrap';

export default function NavBar({ user }) {
  const logoutHandler = async (e) => {
    e.preventDefault();
    const response = await axios.post('/api/auth/logout');
    if (response.status === 200) {
      window.location.href = '/auth/login';
    }
  };
  return (
    <Navbar bg="dark" data-bs-theme="dark">
      <Container>
        <Navbar.Brand href="#home">{user ? `Hello, ${user?.name}` : 'Guest'}</Navbar.Brand>
        <Nav className="me-auto">
          <Nav.Link href="/">Main</Nav.Link>
          <Nav.Link href="/posts">Posts</Nav.Link>
          {user ? (
            <>
              <Nav.Link href="/account">Account</Nav.Link>
              <Nav.Link href="/logout" onClick={logoutHandler}>
                Logout
              </Nav.Link>
            </>
          ) : (
            <>
              <Nav.Link href="/auth/login">Login</Nav.Link>
              <Nav.Link href="/auth/signup">Signup</Nav.Link>
            </>
          )}
        </Nav>
      </Container>
    </Navbar>
  );
}
