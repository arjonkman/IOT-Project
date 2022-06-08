import { Row, Col, Card, Form } from 'react-bootstrap';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useCookies } from 'react-cookie';

export default function Search() {
	const [cookies, setCookie, removeCookie] = useCookies(['session_id']);
	const [data, setData] = useState(<></>);
	const [posts, setPosts] = useState([]);
	useEffect(() => {
		fetch(
			`http://localhost:2053/api?function=GET_ROOMS&session_id=${cookies['session_id']}&room=all`
		)
			.then((res) => res.json())
			.then((data) => setPosts(data));
		fetch(
			`http://localhost:2053/api?function=GET_LIGHT&session_id=${cookies['session_id']}`
		)
			.then((response) => response.json())
			.then((data) => setRoomData(data));
	}, []);

	const [roomData, setRoomData] = useState('');
	const [color, setColor] = useState({});

	function color_percentage() {
		if (roomData !== '') {
			setColor(
				roomData.map((roomData) => {
					let procent = roomData.data / 4 + '%';
					return { room: roomData.roomId, color: procent };
				})
			);
		}
	}

	useEffect(() => {
		setData(getData());
	}, [color]);

	useEffect(() => {
		color_percentage();
	}, [roomData]);

	function getData(query) {
		var return_data = [];
		if (!query) {
			if (posts.status == 'session_id invalid') {
				removeCookie('session_id');
				return;
			}
			return_data = posts.map((post) => {
				let href = `/rooms/${post[0]}`;
				let cardStyle = {
					backgroundColor: `rgba(246,190,0, ${
						color[post[4] - 1].color
					})`,
					color: 'white',
					borderRadius: '15px',
				};
				return (
					<Link key={post[0]} href={href}>
						<Col className="link pt-4" md={3} xs={6}>
							<Card style={cardStyle}>
								<Card.Img src="/bulb.svg" />
								<Card.Title>
									<h3>{post[1]}</h3>
								</Card.Title>
								<Card.Subtitle className="pb-2">
									<i>{post[2]}</i>
								</Card.Subtitle>
							</Card>
						</Col>
					</Link>
				);
			});
		} else {
			return_data = posts.map((post) => {
				if (
					post[1].toLowerCase().includes(query.toLowerCase()) ||
					post[2].toLowerCase().includes(query.toLowerCase())
				) {
					let href = `/rooms/${post[0]}`;
					let cardStyle = {
						backgroundColor: `rgba(246,190,0, ${
							color[post[4] - 1].color
						})`,
						color: 'white',
						borderRadius: '15px',
					};
					return (
						<Link key={post[0]} href={href}>
							<Col className="link pt-4" md={3} xs={6}>
								<Card style={cardStyle}>
									<Card.Img src="/bulb.svg" />
									<Card.Title>
										<h3>{post[1]}</h3>
									</Card.Title>
									<Card.Subtitle className="pb-2">
										<i>{post[2]}</i>
									</Card.Subtitle>
								</Card>
							</Col>
						</Link>
					);
				}
			});
		}
		return return_data;
	}

	function handleChange(e) {
		setData(getData(e.target.value));
	}

	return (
		<>
			<form method="GET" action="/rooms" style={{ borderRadius: '15px' }}>
				<Form.Control
					onChange={handleChange}
					type="text"
					placeholder="Zoeken"
				/>
			</form>
			<Row>{data}</Row>
		</>
	);
}
