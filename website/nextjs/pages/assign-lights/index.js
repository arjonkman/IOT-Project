import { Row, Col, Card } from 'react-bootstrap';
import Head from 'next/head';
import { useEffect, useState } from 'react';
import { useCookies } from 'react-cookie';

export default function AssignLights() {
	const [lights, setLights] = useState([]);
	const [lightsHTML, setLightsHTML] = useState(<></>);
	const [cookies, setCookie] = useCookies(['session_id']);

	useEffect(() => {
		fetch(
			`http://localhost:2053/api?function=GET_LIGHTS&session_id=${cookies['session_id']}&type=unassigned`
		)
			.then((res) => res.json())
			.then((data) => {
				setLights(data);
			});
	}, []);

	return (
		<main style={{ minHeight: '95vh' }}>
			<Head>
				<title>Ettudo - Assign Lights</title>
			</Head>
			<Row
				className="mx-0 p-4 justify-content-center text-center"
				style={{}}
			>
				<Col>
					<b style={{ fontSize: '3rem' }}>Unasigned Lights</b>
				</Col>
				<Col>
					<lightsHTML />
				</Col>
			</Row>
		</main>
	);
}
