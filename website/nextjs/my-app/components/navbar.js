import { Nav, Navbar } from "react-bootstrap";

export default function navbar() {
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
					<Nav.Link href="/rooms">Rooms</Nav.Link>
					<Nav.Link href="/export">Export</Nav.Link>
				</Nav>
			</Navbar.Collapse>
		</Navbar>
	);
}
