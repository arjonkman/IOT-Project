import Head from 'next/Head';

export default function Rooms(props) {
	if (typeof window !== 'undefined') {
		window.location.href = '/';
	}
	return (
		<main style={{ minHeight: '100vh' }}>
			<Head>
				<title>Ettudo - Rooms</title>
			</Head>
		</main>
	);
}
