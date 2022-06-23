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
		let tipsa = [];
		
		if (deets !== undefined && rooms !== undefined) {
				for (let i = 0; i < deets.length; i++) {
					let tip_kam = ''
					let color = ''
					if (deets[i].CO2 > 1000) {
						tip_kam = "Doe een raam open, het C02-gehalte is te hoog. ";
						if (color != 'red') {
							color = 'orange';
						}
						
					}
						if (deets[i].CO2 > 2000) {
							tip_kam += "Het C02-gehalte is gevaarlijk hoog. ";
							color = 'red';
							
						}
							if (deets[i].light > 0 && deets[i].motion == 0) {
								tip_kam += 'De lampen zijn aan, maar er is niemand in de kamer. ';
								color = 'red';

							}
								if (deets[i].light > 400) {
									tip_kam += 'Doe de lampen wat zachter, het is te vel in de kamer ';
									if (color != 'orange' && color != 'red') {
										color = 'yellow';
									}
								}

									if (deets[i].temperature > 23) {
										tip_kam += 'Zet de airconditioning aan, de temperatuur is te hoog. ';
										if (color != 'orange' && color != 'red') {
											color = 'yellow';
										}

									}
									
										if (deets[i].temperature < 18) {
											tip_kam += 'Zet de verwarming aan, de temperatuur is te laag. ';
											if (color != 'orange' && color != 'red') {
												color = 'yellow';
											}

										}
											if (deets[i].humidity > 80) {
												tip_kam += 'Doe een raam open of zet de airco aan, de lucht is te zuur. ';
												if (color != 'red') {
													color = 'orange';
												}

											}
												if (deets[i].humidity < 30) {
													tip_kam += 'Gebruik een humidifier, de lucht is niet vochtig genoeg. ';
													if (color != 'red') {
														color = 'orange';
													}
												}
				
					try {
						if (tip_kam !== '') {
						tipsa.push([rooms[i][1], tip_kam, color]);
						}	
					}
					catch (e) {
						console.log(e);
					}
				}
			
			setTips(
				tipsa.map((x) => (
					<Card style={{ border: '5px solid white' }} className="mb-3">
						<Card.Body style={{ backgroundColor:x[2], opacity: '0.9' }}>
							<Card.Title>{x[0]}</Card.Title>
							<Card.Text>{x[1]}</Card.Text>
						</Card.Body>
					</Card>
				))
			);
		}
	}, [deets, rooms]);
	return (
		<>
				<Col style={{  }}>
					<b style={{ fontSize: '3rem' }}>Tips</b>
					<Col style={{ marginTop: '1rem' }}>{tips}</Col>
				</Col>
		</>

	);
}
