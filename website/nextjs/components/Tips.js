import { Row, Col, Card, Form } from 'react-bootstrap';
import { useState, useEffect } from 'react';
import { useCookies } from 'react-cookie';
import axios from 'axios';

export default function Tips() {
	const [cookies, setCookie, removeCookie] = useCookies(['session_id']);
	const [rooms, setRooms] = useState([]);
	const [deets, setDeets] = useState([]);
	const data = {};
	const tips = {};
	useEffect(() => {
		fetch(
			`http://localhost:2053/api?function=GET_ROOMS&session_id=${cookies['session_id']}&room=all`
		)
			.then((res) => res.json())
			.then((data) => setRooms(data));
	}, []);
	useEffect(() => {
		for (let i = 0; i < rooms.length; i++) {
			fetch(
				`http://localhost:2053/api?function=DATA&session_id=${cookies['session_id']}&id=${rooms[i][0]}`
			)
				.then((res) => res.json())
				.then((data) => {
					setDeets(data);
				});
		}
	}, [rooms, deets]);

	return (
		<Col>
			{/* <Card
                style={{
                    minHeight: '70vh',
                    borderRadius: '15px',
                }}
            >
                <Card.Body>
                    <Card.Title>
                        <b style={{ fontSize: '3rem' }}>Tips</b>
                    </Card.Title>
                    {tips.map((tip, index) => (
                        <div key={index}>
                            <br />
                            <Card>
                                <Card.Body>
                                    <Card.Title
                                        style={{ fontSize: '1rem' }}
                                    >
                                        {tip.title}
                                    </Card.Title>
                                    <Card.Text>
                                        {tip.description}
                                    </Card.Text>
                                </Card.Body>
                            </Card>
                        </div>
                    ))}
                </Card.Body>
            </Card> */}
		</Col>
	);
}
