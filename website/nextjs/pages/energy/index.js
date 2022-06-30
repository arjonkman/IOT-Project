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
			<div>
				<div className='col'>
					<div className='row' style={{ marginTop: '2rem' }}>
						<h1 style={{ fontSize: '3rem' }} className='text-center'>Energy</h1>
					</div>
					<div className='row'  style={{ marginTop: '5rem' }}>
						<div className='col'>
							<h2 className='text-center'>Kilo Wattage used:</h2>
							<h2 style={{ fontSize: '3.5rem', color: 'rgba(255,260,0)' }} className='text-center'>1204378</h2>
						</div>
						<div className='col'>
							<h2 className='text-center'>Kilo Wattage used without our product:</h2>
							<h2 style={{ fontSize: '3.5rem', color: 'rgba(255,260,0)'  }} className='text-center'>2147743</h2>
						</div>
					</div>
					<div className='row' style={{ marginTop: '5rem' }}>
						<h2 style={{ fontSize: '3.1rem' }} className='text-center'>Kilo Wattage saved:</h2>
						<h2 style={{ fontSize: '3.5rem', color: 'rgba(255,260,0)', textDecoration: 'underline solid 4px'  }} className='text-center'>943.365</h2>
					</div>
				</div>
			</div>
		</main>
	);
}
