import { Row, Col, Card, Form } from 'react-bootstrap';
import { useState, useEffect } from 'react';
import Link from 'next/link';

export default function Search() {
	const [data, setData] = useState(<></>);
	const [posts, setPosts] = useState([]);
	useEffect(() => {
		fetch('http://127.0.0.1:5000/api?function=get_rooms')
			.then((res) => res.json())
			.then((data) => setPosts(data));
		fetch('http://127.0.0.1:5000/api?function=light_intensity')
			.then((response) => response.json())
			.then((data) => setLight(data));
	}, []);

	useEffect(() => {
		setData(getData());
	}, [posts]);

	const [light, setLight] = useState('');
	const [color, setColor] = useState('0');
	

	function color_percentage() {
		setColor(light / 4 + '%');
	}

	useEffect(() => {
		color_percentage();
	}, [light]);

	function getData(query) {
		var return_data = [];
		if (!query) {
			return_data = posts.map((post) => {
				let href = `/rooms/${post[1]}_${post[2]}`
					.replace(/ /g, '_')
					.toLowerCase();
				return (
					<Link key={post[0]} href={href}>
						<Col className="link pt-1" md={4}>
							<Card>
								<Card.Img src="/bulb.svg" />
								<Card.Title>
									<h3>{post[1]}</h3>
								</Card.Title>
								<Card.Subtitle>
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
							<Col className="link pt-1" md={4}>
								<Card>
									<Card.Img src="/bulb.svg" />
									<Card.Title>
										<h3>{post[1]}</h3>
									</Card.Title>
									<Card.Subtitle>
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
			<form method="GET" action="/rooms">
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
