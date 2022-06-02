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
			`http://localhost:2053/api?function=DATA&session_id=${cookies['session_id']}&id=1`
		)
			.then((response) => response.json())
			.then((data) => setRoomData(data));
	}, []);

	useEffect(() => {
		setData(getData());
	}, [posts]);

	const [roomData, setRoomData] = useState('');
	const [color, setColor] = useState('0');
	const [light, setLight] = useState('0');

	const cardStyle = {
		backgroundColor: `rgba(246,190,0, ${color})`,
		color: 'white',
		borderRadius: '15px',
	};

	function color_percentage() {
		for (let i = 0; i < roomData.length; i++) {
			if (roomData[i].type === 'light') {
				setLight(roomData[i].data);
				break;
			}
			setColor(light / 4 + '%');
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
				return (
					<Link key={post[0]} href={href}>
						<Col className="link pt-4" md={4}>
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
					return (
						<Link key={post[0]} href={href}>
							<Col className="link pt-4" md={4}>
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
