import { useState, useEffect } from 'react';
import { useCookies } from 'react-cookie';

export default function Energy() {
	const [wattage, setWattage] = useState(undefined);
	const [cookies, setCookie] = useCookies(['session_id']);
	const [efficienty, setEfficiency] = useState(0);
	const [maximum, setMaximum] = useState(0);
	const [saved, setSaved] = useState(0);

	useEffect(() => {
		fetch(
			`http://localhost:2053/api?function=GET_WATTAGE&session_id=${cookies['session_id']}`
		)
			.then((response) => response.json())
			.then((data) => {
				setWattage(data);
			});
		// run fetchWatt every 5 seconds
		const interval = setInterval(() => {
			fetch(
				`http://localhost:2053/api?function=GET_WATTAGE&session_id=${cookies['session_id']}`
			)
				.then((response) => response.json())
				.then((data) => {
					setWattage(data);
				});
		}, 1000);
		return () => clearInterval(interval);
	}, []);

	useEffect(() => {
		if (wattage !== undefined) {
			console.log(wattage);
			setEfficiency(wattage.efficient);
			setMaximum(wattage.max);
			setSaved(wattage.max - wattage.efficient);
		}
	}, [wattage]);

	return (
		<main style={{ minHeight: '100vh' }}>
			<div>
				<div className="col">
					<div className="row" style={{ marginTop: '2rem' }}>
						<h1
							style={{ fontSize: '3rem' }}
							className="text-center"
						>
							Energy
						</h1>
					</div>
					<div className="row" style={{ marginTop: '5rem' }}>
						<div className="col">
							<h2 className="text-center">Wattage used:</h2>
							<h2
								style={{
									fontSize: '3.5rem',
									color: 'rgb(255,0,0)',
								}}
								className="text-center"
							>
								{efficienty.toPrecision(3)}
							</h2>
						</div>
						<div className="col">
							<h2 className="text-center">
								Wattage used without our product:
							</h2>
							<h2
								style={{
									fontSize: '3.5rem',
									color: 'rgb(255,0,0)',
								}}
								className="text-center"
							>
								{maximum.toPrecision(3)}
							</h2>
						</div>
					</div>
					<div className="row" style={{ marginTop: '5rem' }}>
						<h2
							style={{ fontSize: '3.1rem' }}
							className="text-center"
						>
							Wattage saved:
						</h2>
						<h2
							style={{
								fontSize: '3.5rem',
								color: 'rgb(255,0,0)',
								textDecoration: 'underline solid 4px',
							}}
							className="text-center"
						>
							{saved.toPrecision(3)}
						</h2>
					</div>
				</div>
			</div>
		</main>
	);
}
