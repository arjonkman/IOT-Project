import {
	Row,
	Col,
	Card,
	Button,
	Offcanvas,
	OffcanvasBody,
	OffcanvasHeader,
	OffcanvasTitle,
	Container,
	Dropdown,
} from 'react-bootstrap';
import Head from 'next/head';
import { useEffect, useState } from 'react';
import { useCookies } from 'react-cookie';

export default function AssignLights() {
	const [lights, setLights] = useState([]);
	const [lightsHTML, setLightsHTML] = useState(<></>);
	const [cookies, setCookie] = useCookies(['session_id']);
	const [rooms, setRooms] = useState([]);
	const [roomsDropdown, setRoomsDropdown] = useState(<></>);
	const [activeLight, setActiveLight] = useState(-1);
	const [target, setTarget] = useState('');

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
		fetch(
			`http://localhost:2053/api?function=GET_ROOMS&session_id=${cookies['session_id']}&room=all`
		)
			.then((res) => res.json())
			.then(
				(data) => {
					setRooms(data);
				},
				(err) => {
					console.log(err);
				}
			);
	}, []);

	useEffect(() => {
		if (rooms !== []) {
			setRoomsDropdown(
				<Dropdown.Menu show className="justify-content-md-center">
					{rooms.map((room) => (
						<Dropdown.Item
							key={room[0]}
							as={Button}
							onClick={handleChange}
							id={room[0]}
						>
							{room[1]}
						</Dropdown.Item>
					))}
				</Dropdown.Menu>
			);
		}
	}, [rooms]);

	useEffect(() => {
		console.log(activeLight);
	}, [activeLight]);

	useEffect(() => {
		fetch(
			`http://localhost:2053/api?function=ASSIGN_LIGHT&session_id=${cookies['session_id']}&room=${target}&light=${activeLight}`
		)
			.then((res) => res.json())
			.then(
				(data) => {
					setLights(data);
				},
				(err) => {
					console.log(err);
				}
			);
	}, [target]);

	const handleChange = (e) => {
		setTarget(e.target.id);
	};

	function OffCanvasExample({ name, id, ...props }) {
		const [show, setShow] = useState(false);

		const handleClose = () => setShow(false);
		const handleShow = () => {
			console.log(id);
			setShow(true);
			setActiveLight(id);
		};

		return (
			<>
				<Button variant="lights" onClick={handleShow} className="me-2">
					{name}
				</Button>
				<Offcanvas show={show} onHide={handleClose} {...props}>
					<Container>
						<Row>
							<Offcanvas.Header className="justify-content-md-center">
								<Offcanvas.Title>Assign Light</Offcanvas.Title>
							</Offcanvas.Header>
						</Row>
						<Offcanvas.Body className="text-center">
							{roomsDropdown}
						</Offcanvas.Body>
					</Container>
				</Offcanvas>
			</>
		);
	}

	useEffect(() => {
		if (lights !== []) {
			console.log(lights);
			setLightsHTML(
				<Row
					xs={2}
					md={4}
					lg={6}
					mt={4}
					className="justify-content-md-center"
				>
					{lights.map((light) => {
						return (
							<Card key={light[0]}>
								<Card.Body>
									<Card.Title>{light[2]}</Card.Title>
									<Card.Text>{light[0]}</Card.Text>
									<Card.Footer>
										<OffCanvasExample
											key={light[0]}
											placement="top"
											name="Click to assign this light to a room."
											id={light[0]}
										/>
									</Card.Footer>
								</Card.Body>
							</Card>
						);
					})}
				</Row>
			);
		}
	}, [lights]);

	return (
		<main style={{ minHeight: '95vh' }}>
			<Head>
				<title>Ettudo - Assign Lights</title>
			</Head>
			<Row className="mx-0 p-4 justify-content-center text-center">
				<Col>
					<b style={{ fontSize: '3rem' }}>Unasigned Lights</b>
					<br />
					{lightsHTML}
				</Col>
			</Row>
		</main>
	);
}
