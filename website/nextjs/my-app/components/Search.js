import { Row, Col, Card, Form } from 'react-bootstrap';
import { useState } from 'react';
import Link from 'next/link';

export default function Search() {
	const [data, setData] = useState(getData());

	function getData(query) {
		const posts = [
			{ id: 'A201_ZP11', name: 'A201', building: 'ZP11' },
			{ id: 'A225_ZP11', name: 'A225', building: 'ZP11' },
			{ id: 'A124_ZP11', name: 'A125', building: 'ZP11' },
			{ id: 'A147_ZP11', name: 'A147', building: 'ZP11' },
			{ id: 'D211_ZP11', name: 'D211', building: 'ZP11' },
			{ id: 'D225_ZP11', name: 'D225', building: 'ZP11' },
			{ id: 'D125_ZP11', name: 'D125', building: 'ZP11' },
			{ id: 'D147_ZP11', name: 'D147', building: 'ZP11' },
			{ id: 'D211_ZP11', name: 'D211', building: 'ZP11' },
			{ id: 'D225_ZP11', name: 'D225', building: 'ZP11' },
			{ id: 'U132_ZP07', name: 'U132', building: 'ZP07' },
			{ id: 'U133_ZP07', name: 'U133', building: 'ZP07' },
			{ id: 'U134_ZP07', name: 'U134', building: 'ZP07' },
			{ id: 'U135_ZP07', name: 'U135', building: 'ZP07' },
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
