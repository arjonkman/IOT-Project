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
		
		if (deets !== undefined && deets !== undefined) {
				for (let i = 0; i < deets.length; i++) {
					let tip_kam = ''
					if (deets[i].CO2 > 1000) {
						tip_kam = "Het C02-gehalte is te hoog. ";
						
					}
						if (deets[i].CO2 > 2000) {
							tip_kam += "Het C02-gehalte is gevaarlijk hoog. ";
							
						}
							if (deets[i].light > 0 && deets[i].motion == 0) {
								tip_kam += 'De lampen zijn aan, maar er is niemand in de kamer. ';
								
							}
								if (deets[i].light > 400) {
									tip_kam += 'Er is teveel licht in de kamer voor een goede concentratie ';
									
								}

									if (deets[i].temperature > 23) {
										tip_kam += 'De temperatuur is te hoog. ';
										
									}
									
										if (deets[i].temperature < 18) {
											tip_kam += 'De temperatuur is te laag. ';
											
										}
											if (deets[i].humidity > 80) {
												tip_kam += 'De lucht is te zuur. ';
												
											}
												if (deets[i].humidity < 40) {
													tip_kam += 'De lucht is niet vochtig genoeg. ';
													
												}
				
					try {
						if (tip_kam !== '') {
						tipsa.push([rooms[i][1], tip_kam])
						}	
					}
					catch (e) {
						console.log(e);
					}
				}
			
			setTips(
				tipsa.map((x) => (
					<Card className="mb-3">
						<Card.Body>
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

					{tips}
				</Col>
		</>

	);
}
