import { Row, Col, Card } from 'react-bootstrap';
import Head from 'next/Head';
import Search from '../components/Search';
import { useCookies } from 'react-cookie';

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

export default function Home() {
	const [cookies, setCookie] = useCookies(['session_id']);

	if (cookies.session_id == undefined) {
		if (typeof window !== 'undefined') {
			window.location.href = '/login';
		}
	} else {
		setCookie('session_id', cookies.session_id, {
			path: '/',
			maxAge: 3600,
		});
	}

	return (
		<main style={{ minHeight: '95vh' }}>
			<Head>
				<title>Ettudo - Home</title>
			</Head>
			<Row className="mx-0 p-4 justify-content-center text-center">
				<Col md={6}>
					<Card style={{ minHeight: '70vh' }}>
						<Card.Body>
							<Card.Title>
								<b style={{ fontSize: '3rem' }}>Tips</b>
							</Card.Title>
							{tips.map((tip, index) => (
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
							))}
						</Card.Body>
					</Card>
				</Col>
				<Col md={6}>
					<b style={{ fontSize: '3rem' }}>Ruimtes</b>
					<Search />
				</Col>
			</Row>
		</main>
	);
}
