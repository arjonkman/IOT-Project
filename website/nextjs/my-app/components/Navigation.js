import { Nav, Navbar } from "react-bootstrap";

export default function Navigation() {
	return (
		<Navbar
			collapseOnSelect
			expand="md"
			bg="dark"
			variant="dark"
			sticky="top"
			className="px-4"
		>
			<Navbar.Brand href="/">Ettudo</Navbar.Brand>
			<Navbar.Toggle aria-controls="responsive-navbar-nav" />
			<Navbar.Collapse id="responsive-navbar-nav">
				<Nav className="me-auto">
					<Nav.Link href="/">Home</Nav.Link>
					<Nav.Link href="/rooms">Ruimtes</Nav.Link>
					<Nav.Link href="/export">Exporteer</Nav.Link>
				</Nav>
				<Nav>
					{/* Check if you are logged in or not, if not then show the login button */}
					<Nav.Link href="/login">Login</Nav.Link>
				</Nav>
			</Navbar.Collapse>
		</Navbar>
	);
}
