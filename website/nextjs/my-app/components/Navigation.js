import { Nav, Navbar } from 'react-bootstrap';
import { useCookies } from 'react-cookie';
import { useState, useEffect } from 'react';

export default function Navigation() {
	const [cookies, setCookie] = useCookies(['session_id']);
	const [button, setButton] = useState(<></>);

	useEffect(() => {
		if (cookies.session_id != undefined) {
			setButton(<Nav.Link href="/logout">logout</Nav.Link>);
		} else {
			setButton(<Nav.Link href="/login">Login</Nav.Link>);
		}
	}, [cookies]);

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
				</Nav>
				<Nav>
					{/* Check if you are logged in or not, if not then show the login button */}
					{button}
				</Nav>
			</Navbar.Collapse>
		</Navbar>
	);
}
