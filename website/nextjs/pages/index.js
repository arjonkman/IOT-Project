import { Row, Col, Card } from 'react-bootstrap';
import Head from 'next/head';
import Search from '../components/Search';
import Map from '../components/Map';

import { useCookies } from 'react-cookie';
import Tips from '../components/Tips';

export default function Home() {
	return (
		<main style={{ minHeight: '95vh' }}>
			<Head>
				<title>Ettudo - Home</title>
			</Head>
			<Row className="mx-0 p-4 justify-content-center text-center">
				<Tips />
				<Col xs={8}>
					<b style={{ fontSize: '3rem' }}>Ruimtes</b>
					<Search />
					{/* <Map /> */}
				</Col>
			</Row>
		</main>
	);
}
