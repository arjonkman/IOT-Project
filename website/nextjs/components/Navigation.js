import { Nav, Navbar, OverlayTrigger, Tooltip, Button } from 'react-bootstrap';
import { useCookies } from 'react-cookie';
import { useState, useEffect } from 'react';

export default function Navigation() {
	const [cookies, setCookie] = useCookies(['session_id']);
	const [button, setButton] = useState(<></>);
	const [lights, setLights] = useState([]);
	const [wbutton, setWbutton] = useState(<></>);

	useEffect(() => {
		if (cookies.session_id != undefined) {
			setButton(<Nav.Link href="/logout">logout</Nav.Link>);
		} else {
			setButton(<Nav.Link href="/login">Login</Nav.Link>);
		}
	}, [cookies]);

	const warning = (
		<OverlayTrigger
			placement="right"
			delay={{ show: 250, hide: 400 }}
			overlay={
				<Tooltip>
					Sommige lampen hebben nog geen ruimte toegekend.
				</Tooltip>
			}
		>
			<Button variant="warning" href="/assign-lights">
				<img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABkAAAAZCAYAAADE6YVjAAAABmJLR0QA/wD/AP+gvaeTAAABLUlEQVRIia3Vu0oDURAA0EOwEXysAcE/sBSxFmx9/I2FhY1FfMboF1jYCmKjjSJYCT4Rf8BvEOy12KRwyc3ObjJlZoZzL3d2QjxmcY0fXCGLNjYqAPf4wBy+cFcFKosZvOKg8Psu3tEcFXCYyA8NZV3gqKSuNpThJQDUhnpAu+LBwlATb9hL5Ffxi+VEvt09YHLqMjzjeMAhNrrIyoCa5I0iQBTpC03jCZ2SxirIP2gM53jEZqCxSmxjHGfku2gy2FjlJjCF7wYesFXtkOFo4ZZ8+X1iJ9C0gAvMB2pPFca5BxWXYN3YlxjjyI2W5Ct+cUDNiZIPsgxakz/8eiLfKQMiUEO+/vv92YWBIhR9o+QbjAraqwtEoaGBMmhkQBFqYUJgTIeBbuS77rIK8Ac5JlC3Cx3X/gAAAABJRU5ErkJggg==" />
			</Button>
		</OverlayTrigger>
	);

	useEffect(() => {
		fetch(
			`http://localhost:2053/api?function=GET_LIGHTS&session_id=${cookies['session_id']}&type=unassigned`
		)
			.then((res) => res.json())
			.then((data) => {
				setLights(data);
			});
	}, []);

	useEffect(() => {
		if (lights.length > 0) {
			setWbutton(warning);
		}
	}, [lights]);

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
				<Nav className="mx-auto">
					<Nav.Link href="/">Home</Nav.Link>
					<Nav.Link href="/energy">Energy</Nav.Link>
					{wbutton}
				</Nav>
				
				<Nav>
					{/* Check if you are logged in or not, if not then show the login button */}
					{button}
				</Nav>
				
			</Navbar.Collapse>
		</Navbar>
	);
}
