import { useState, useEffect } from 'react';
import { Card } from 'react-bootstrap';
import { useRouter } from 'next/router';
import { useCookies } from 'react-cookie';
import Chart from '../../components/Chart';
import Light from '../../components/Light';

export default function id() {
	const router = useRouter();
	const { id } = router.query;
	const [roomName, setRoomName] = useState('');
	const [cookies, setCookie] = useCookies(['session_id']);
	const [deets, setDeets] = useState(undefined);
	const [tips, setTips] = useState(<></>);

	useEffect(() => {
		// fetch the room name from the API
		fetch(
			`http://localhost:2053/api?function=GET_ROOM_NAME&session_id=${cookies['session_id']}&id=${id}`
		)
			.then((response) => response.json())
			.then((data) => {
				setRoomName(data);
			});
	}, []);

	const editName = () => {
		const newName = prompt('Enter new room name');
		if (newName) {
			fetch(
				`http://localhost:2053/api?function=UPDATE_ROOM_NAME&session_id=${cookies['session_id']}&id=${id}&name=${newName}`
			)
				.then((response) => response.json())
				.then((data) => {
					setRoomName(newName);
				});
		}
	};

	useEffect(() => {
		console.log(roomName);
	}, [roomName]);

	useEffect(() => {
		fetch(
			`http://localhost:2053/api?function=LATEST_DATA&session_id=${cookies['session_id']}`
		)
			.then((response) => response.json())
			.then((data) => setDeets(data[0]));
	}, [roomName]);

	useEffect(() => {
		let tipsa = [];

		if (deets !== undefined && roomName !== undefined) {
			for (let i = 0; i < deets.length; i++) {
				let tip_kam = '';
				let color = '';
				if (deets[i].CO2 > 1000) {
					tip_kam = 'Doe een raam open, het C02-gehalte is te hoog. ';
					if (color != 'red') {
						color = 'orange';
					}
				}
				if (deets[i].light > 0 && deets[i].motion == 0) {
					tip_kam +=
						'De lampen zijn aan, maar er is niemand in de kamer. ';
					color = 'red';
				}
				if (deets[i].light > 400) {
					tip_kam +=
						'Doe de lampen wat zachter, het is te vel in de kamer ';
					if (color != 'orange' && color != 'red') {
						color = 'yellow';
					}
				}

				if (deets[i].temperature > 23) {
					tip_kam +=
						'Zet de airconditioning aan, de temperatuur is te hoog. ';
					if (color != 'orange' && color != 'red') {
						color = 'yellow';
					}
				}

				if (deets[i].temperature < 18) {
					tip_kam +=
						'Zet de verwarming aan, de temperatuur is te laag. ';
					if (color != 'orange' && color != 'red') {
						color = 'yellow';
					}
				}
				if (deets[i].humidity > 80) {
					tip_kam +=
						'Doe een raam open of zet de airco aan, de lucht is te zuur. ';
					if (color != 'red') {
						color = 'orange';
					}
				}
				if (deets[i].humidity < 30) {
					tip_kam +=
						'Gebruik een humidifier, de lucht is niet vochtig genoeg. ';
					if (color != 'red') {
						color = 'orange';
					}
				}

				try {
					if (tip_kam !== '') {
						if (deets[i].roomId == id) {
							tipsa.push([roomName, tip_kam, color]);
							break;
						}
					}
				} catch (e) {
					console.log(e);
				}
			}

			setTips(
				tipsa.map((x) => (
					<Card
						style={{ border: '5px solid white' }}
						className="mb-3"
					>
						<Card.Body
							className='text-center' style={{ backgroundColor: x[2], opacity: '0.9' }}
						>
							<Card.Text>{x[1]}</Card.Text>
						</Card.Body>
					</Card>
				))
			);
		}
	}, [deets, roomName]);

	return (
		<main style={{ minHeight: '100vh' }}>
			<div className="container">
				<div className="row">
					<div className="col">
						<div className="row">
							<h1>
								{roomName}
								<button
									style={{
										fontSize: '1rem',
										marginLeft: '1rem',
									}}
									onClick={editName}
								>
									<img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAAABmJLR0QA/wD/AP+gvaeTAAAAxklEQVRIie2UsRGCMBSGv0gqKjdwHXEAV7GldA8tKN1AXcAhYAYri1hANAePKEkKveO7e0WSP//PC7nAzMxfsQEawERWAxRSQApzW7U1VU6AieheQgEsEpsO+BSgeqWBY2iYdJYSGXAY0Xv3+kR2vJ8QEhQwJWSAdE11t1b25stuXgOVsO91TV2KbsEVVgEhNbCWAr5hh3xcSXE7OQO5T5wFBFx4vwBb4ASsgGuAl5ectgMD3MZEIR1YHrRfvqT9qfcIrx/mCX/OfYOQHj3MAAAAAElFTkSuQmCC" />
								</button>
							</h1>
						</div>
					</div>
				</div>
				<div className="row">
					<div className="col-md-12">{tips}</div>
				</div>
				<div className="row">
					<div className="col">
						<Chart />
					</div>
				</div>
				<div className="row">
					<div className="col">
						<Light id={id} />
					</div>
				</div>
			</div>
		</main>
	);
}
