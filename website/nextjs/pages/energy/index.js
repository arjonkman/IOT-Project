import { useState, useEffect } from 'react';
import { useCookies } from 'react-cookie';

export default function Energy() {
	const [wattage, setWattage] = useState(undefined);
	const [cookies, setCookie] = useCookies(['session_id']);

	useEffect(() => {
		fetch(
			`http://localhost:2053/api?function=GET_WATTAGE&session_id=${cookies['session_id']}`
		)
			.then((response) => response.json())
			.then((data) => {
				setWattage(data);
			});
	}, []);

	useEffect(() => {
		console.log(wattage);
	}, [wattage]);

	return (
		<main style={{ minHeight: '100vh' }}>
			<h1>Energy</h1>
		</main>
	);
}
