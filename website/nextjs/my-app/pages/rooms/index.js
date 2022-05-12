import { Row, Col } from 'react-bootstrap';
import Head from 'next/Head';

import Room from '../../components/Room';
import RoomSearch from '../../components/RoomSearch';

export default function Rooms(props) {
	return (
		<main style={{ minHeight: '100vh' }}>
			<Head>
				<title>Ettudo - Rooms</title>
			</Head>
		</main>
	);
}
