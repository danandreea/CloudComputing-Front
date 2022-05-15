import React from 'react';
import Navbar from 'react-bootstrap/Navbar'
import Container from 'react-bootstrap/Container'

function Header() {
    return ( 
        <Navbar className="color-nav" variant="light">
        <Container>
          <Navbar.Toggle />
          <Navbar.Collapse className="justify-content-center">
            <Navbar.Text style={{color:'white'}}>
             Inchiriere terenuri de tenis - Bucuresti
            </Navbar.Text>
          </Navbar.Collapse>
        </Container>
      </Navbar>
        
     );
}

export default Header;