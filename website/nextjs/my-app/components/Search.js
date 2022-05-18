import { Row, Col, Card, Form } from 'react-bootstrap';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useCookies } from 'react-cookie';

export default function Search() {
	const [cookies, setCookie, removeCookie] = useCookies(['session_id']);
	const [data, setData] = useState(<></>);
	const [posts, setPosts] = useState([]);
	useEffect(() => {
		fetch(`https://ettudo.com:2053/api?function=GET_ROOMS&session_id=${cookies['session_id']}`)
			.then((res) => res.json())
			.then((data) => setPosts(data));
		fetch(`https://ettudo.com:2053/api?function=LIGHT_INTENSITY&session_id=${cookies['session_id']}`)
			.then((response) => response.json())
			.then((data) => setLight(data));
	}, []);

	useEffect(() => {
		setData(getData());
	}, [posts]);

	const [light, setLight] = useState('');
	const [color, setColor] = useState('0');

	const cardStyle = {
		backgroundColor: `rgba(246,190,0, ${color})`,
		color: 'white',
		borderRadius: '15px',
	};

	function color_percentage() {
		setColor(light / 4 + '%');
	}

	useEffect(() => {
		setData(getData());
	}, [color]);

	useEffect(() => {
		color_percentage();
	}, [light]);

	function getData(query) {
		var return_data = [];
		if (!query) {
			if (posts.status == 'session_id invalid') {
				removeCookie('session_id');
				return;
			}
			return_data = posts.map((post) => {
				let href = `/rooms/${post[1]}_${post[2]}`
					.replace(/ /g, '_')
					.toLowerCase();
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
					let href = `/rooms/${post[1]}_${post[2]}`
						.replace(/ /g, '_')
						.toLowerCase();
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
