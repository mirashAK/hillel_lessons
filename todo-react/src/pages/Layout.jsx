import React from 'react';
import { Routes, Route, Outlet, Link } from "react-router-dom";

import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';

function Layout() {
      
    return (
        <div className="mainLayout">
            <>
                <Navbar bg="dark" variant="dark">
                    <Container>
                    <Navbar.Brand>ToDoApp</Navbar.Brand>
                    <Nav className="me-auto">
                        <Link to="/" className="nav-link">ToDo list</Link>
                        <Link to="/about" className="nav-link">About Route</Link>
                        <Nav.Link href="/about">About Href</Nav.Link>
                    </Nav>
                    </Container>
                </Navbar>
            </>
            
            <Outlet />
        </div>
    );
}

export default Layout;
