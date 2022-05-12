import { Row, Col, Card, Form } from 'react-bootstrap';
import { useState } from 'react';
import Link from 'next/link';

export default function Search() {
	const [data, setData] = useState(getData());

	function getData(query) {
		const posts = [
			{ id: '1', name: 'A201', building: 'ZP11' },
			{ id: '2', name: 'A225', building: 'ZP11' },
			{ id: '3', name: 'A125', building: 'ZP11' },
			{ id: '4', name: 'A147', building: 'ZP11' },
			{ id: '5', name: 'D211', building: 'ZP11' },
			{ id: '6', name: 'D225', building: 'ZP11' },
			{ id: '7', name: 'D125', building: 'ZP11' },
			{ id: '8', name: 'D147', building: 'ZP11' },
			{ id: '9', name: 'D211', building: 'ZP11' },
			{ id: '10', name: 'D225', building: 'ZP11' },
			{ id: '11', name: 'U132', building: 'ZP07' },
			{ id: '12', name: 'U133', building: 'ZP07' },
			{ id: '13', name: 'U134', building: 'ZP07' },
			{ id: '14', name: 'U135', building: 'ZP07' },
		];

		var return_data = [];

		if (!query) {
			return_data = posts.map((post) => {
				let href = `/rooms/${post.id}`;
				return (
					<Link key={post.id} href={href}>
						<Col className="link pt-1" md={4}>
							<Card>
								<Card.Img src="/bulb.svg" />
								<Card.Title>
									<h3>{post.name}</h3>
								</Card.Title>
								<Card.Subtitle>
									<i>{post.building}</i>
								</Card.Subtitle>
							</Card>
						</Col>
					</Link>
				);
			});
		} else {
			return_data = posts.map((post) => {
				if (
					post.name.toLowerCase().includes(query.toLowerCase()) ||
					post.building.toLowerCase().includes(query.toLowerCase())
				) {
					let href = `/rooms/${post.id}`;
					return (
						<Link key={post.id} href={href}>
							<Col className="link pt-1" md={4}>
								<Card>
									<Card.Img src="/bulb.svg" />
									<Card.Title>
										<h3>{post.name}</h3>
									</Card.Title>
									<Card.Subtitle>
										<i>{post.building}</i>
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
