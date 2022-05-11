import { useState, useEffect } from 'react';
import { Card } from 'react-bootstrap';

export default function Information() {
	const [information, setInformation] = useState([]);

	useEffect(() => {
		setInformation(getInformation());
	}, []);

	function getInformation() {
		// Get the information from the database using a fetch to an API
		// Temporarily some static information
		const tips = [
			{
				title: 'Tips 1',
				description:
					'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla quis lorem ut libero malesuada feugiat. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla quis lorem ut libero malesuada feugiat.',
				link: '#',
			},
			{
				title: 'Tips 2',
				description:
					'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla quis lorem ut libero malesuada feugiat. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla quis lorem ut libero malesuada feugiat.',
				link: '#',
			},
			{
				title: 'Tips 3',
				description:
					'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla quis lorem ut libero malesuada feugiat. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla quis lorem ut libero malesuada feugiat.',
				link: '#',
			},
			{
				title: 'Tips 4',
				description:
					'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla quis lorem ut libero malesuada feugiat. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla quis lorem ut libero malesuada feugiat.',
				link: '#',
			},
		];

		let data = tips.map((tip, index) => (
			<div key={index}>
				<br />
				<Card>
					<Card.Body>
						<Card.Title
							style={{ fontSize: '1rem' }}
						>
							{tip.title}
						</Card.Title>
						<Card.Text>
							{tip.description}
						</Card.Text>
					</Card.Body>
				</Card>
			</div>
		));

		return data;
	}

	return (
		<></>
	)
}