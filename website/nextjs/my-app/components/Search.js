import { Row, Col, Card, Form } from 'react-bootstrap';
import { useState } from 'react';

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
				return (
					<Col className='pt-1' md={4} key={post.id}>
						<Card>
							<h3>{post.name}</h3>
						</Card>
					</Col>
				)
			});
		} else {
			return_data = posts.map((post) => {
				if (post.name.toLowerCase().includes(query.toLowerCase()) || post.building.toLowerCase().includes(query.toLowerCase())) {
					return (
						<Col className='pt-1' md={4} key={post.id}>
							<Card>
								<h3>{post.name}</h3>
							</Card>
						</Col>
					)
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
			<Row>
				{data}
			</Row>
		</>
	);
}
