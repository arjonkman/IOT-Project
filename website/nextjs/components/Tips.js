import { Row, Col, Card, Form } from 'react-bootstrap';
import { useState, useEffect } from 'react';
import { useCookies } from 'react-cookie';

export default function Tips() {
	const [cookies, setCookie, removeCookie] = useCookies(['session_id']);
	const [rooms, setRooms] = useState([]);
	const [deets, setDeets] = useState(undefined);
	const [tips, setTips] = useState(<></>);
	useEffect(() => {
		fetch(
			`http://localhost:2053/api?function=GET_ROOMS&session_id=${cookies['session_id']}&room=all`
		)
			.then((res) => res.json())
			.then((data) => setRooms(data));
	}, []);

	useEffect(() => {
		fetch(
			`http://localhost:2053/api?function=LATEST_DATA&session_id=${cookies['session_id']}`
		)
			.then((response) => response.json())
			.then((data) => setDeets(data[0]));
	}, [rooms]);

	useEffect(() => {
		if (deets !== undefined) {
			setTips(
				deets.map((x) => (
					<Card className="mb-3">
						<Card.Body>
							<Card.Title>{x.roomId}</Card.Title>
							<Card.Text>{x.light}</Card.Text>
						</Card.Body>
					</Card>
				))
			);
		}
	}, [deets]);

	return tips;
}
