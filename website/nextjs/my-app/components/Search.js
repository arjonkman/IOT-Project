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
		];

		var return_data = [];

		if (!query) {
			return_data = posts.map((post) => {
				let href = `/rooms/${post.id}`;
				return (
					<Link key={post.id} href={href}>
						<Col className="link pt-1" md={4} key={post.id}>
							<Card>
								<Card.Title>
									<h3>{post.name}</h3>
								</Card.Title>
								<Card.Subtitle>
									<i>{post.building}</i>
								</Card.Subtitle>
								<Card.Img src="/bulb.svg" />
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
							<Col className="link pt-1" md={4} key={post.id}>
								<Card>
									<Card.Title>
										<h3>{post.name}</h3>
									</Card.Title>
									<Card.Subtitle>
										<i>{post.building}</i>
									</Card.Subtitle>
									<Card.Img src="/bulb.svg" />
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
			<form>
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
