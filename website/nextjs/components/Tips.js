import { Row, Col, Card, Form } from 'react-bootstrap';
import { useState, useEffect } from 'react';
import { useCookies } from 'react-cookie';
import Link from 'next/link';

export default function Tips() {
	const [cookies, setCookie, removeCookie] = useCookies(['session_id']);
	const [rooms, setRooms] = useState([]);
	const [deets, setDeets] = useState(undefined);
	const [tips, setTips] = useState(<></>);
	const [roomID, setRoomID] = useState('');
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

	// function light_and_motion(id) {
	// 	let light = 0;
	// 	let motion = 0;

	// 	if (id != undefined) {
	// 		fetch(
	// 			`http://localhost:2053/api?function=DATA&session_id=${cookies['session_id']}&id=${id}&type=illuminance`
	// 		)
	// 			.then((response) => response.json())
	// 			.then(function(data) {
	// 				console.log(data)
	// 				const light = data[0];
	// 			}
	// 		);
	// 		fetch(
	// 			`http://localhost:2053/api?function=DATA&session_id=${cookies['session_id']}&id=${id}&type=motion`
	// 		)
	// 			.then((response) => response.json())
	// 			.then(function(data) {
	// 				console.log(data[0])
	// 				const motion = data[0];
	// 			}
	// 		);
	// }}

	useEffect(() => {
		let tipsa = [];
		
		if (deets !== undefined && rooms !== []) {
				for (let i = 0; i < deets.length; i++) {
					let tip_kam = '';
					let color = ''
					let duration = '';
					if (deets[i].CO2 > 1000) {

						tip_kam = "Doe een raam open, het C02-gehalte is te hoog. ";
						if (color != 'red') {
							color = 'orange';
						}
						
					}
							if (deets[i].light > 0 && deets[i].motion == 0) {
								// duration = light_and_motion(rooms[i][0]);
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
						tipsa.push([rooms[i][0] ,rooms[i][1], tip_kam, color]);
						}	
					}
				 catch (e) {
					console.log(e);
				}
			}

			setTips(
				tipsa.map((x) => {
					let id = x[0];
					let href = `/rooms/${id}`;
					return(
						<Link href={href}>
							<Card  style={{ border: '5px solid white', cursor: 'pointer' }} className="mb-3">
								<Card.Body style={{ backgroundColor:x[3], opacity: '0.9' }}>
									<Card.Title>{x[1]}</Card.Title>
									<Card.Text>{x[2]}</Card.Text>
								</Card.Body>
							</Card>
						</Link>
					)
				}
				)
			);
		}
	}, [deets, rooms]);
	return (
		<>
				<Col style={{  }}>
					<b style={{ fontSize: '3rem' }}>Tips</b>
					<Col style={{ marginTop: '1rem'}}>{tips}</Col>
				</Col>
		</>
	);
}
