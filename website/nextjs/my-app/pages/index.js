import { Row, Col, Card } from 'react-bootstrap';
import Head from 'next/Head';
import Search from '../components/Search';

export default function Home() {

	return (
		<>
			<Head>
				<title>Ettudo - Home</title>
			</Head>
			<Row className="mx-0 p-4 justify-content-center text-center vh-100">
				<Col xs={6} className="my-auto">
					<Card>
						<Card.Body>
							<Card.Title>
								<b style={{ fontSize: '3rem' }}>Tips</b>
							</Card.Title>
							<Card.Text>Currently under development</Card.Text>
						</Card.Body>
					</Card>
				</Col>
				<Col xs={6} className="my-auto">
					<b style={{ fontSize: '3rem' }}>Rooms</b>
					<Search />
				</Col>
			</Row>
		</>
	);
}
