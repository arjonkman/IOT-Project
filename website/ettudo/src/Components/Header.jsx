import {Nav, Navbar} from 'react-bootstrap'

function Header() {
  return (
    <Navbar collapseOnSelect expand="md" bg="dark" variant="dark" fixed="top" className="px-4">
      <Navbar.Brand href="/">Ettudo</Navbar.Brand>
      <Navbar.Toggle aria-controls="responsive-navbar-nav"/>
      <Navbar.Collapse id="responsive-navbar-nav">
        <Nav className="me-auto">
          <Nav.Link href="/">Home</Nav.Link>
          <Nav.Link href="/analyse">Analyse</Nav.Link>
          <Nav.Link href="/export">Export</Nav.Link>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  )
}

export default Header