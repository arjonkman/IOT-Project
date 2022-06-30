import { useEffect, useState } from 'react';
import { useCookies } from 'react-cookie';
import { Button, ProgressBar } from 'react-bootstrap';

export default function Light(id) {
	const [light, setLight] = useState([]);
	const [tekst, setTekst] = useState('Zet deze lamp aan');
	const [now, setNow] = useState(0);
	const [cookies, setCookie] = useCookies(['session_id']);

	useEffect(() => {
		console.log(id);
		fetch(
			`http://localhost:2053/api?function=GET_LIGHTS&session_id=${cookies['session_id']}&type=${id.id}`
		)
			.then((response) => response.json())
			.then((data) => {
				setLight(data);
			});
	}, []);

	const handleClick = (e) => {
		if (e.target.innerText === 'Zet deze lamp aan') {
			setTekst('Zet deze lamp uit');
			setNow(100);
		} else {
			setTekst('Zet deze lamp aan');
			setNow(0);
		}
	};

	if (light !== []) {
		console.log(light);
		return (
			<div style={{ marginTop: '3rem' }}>
				<h1>Lights</h1>
				<ul>
					{light.map((light) => (
						<li key={light[0]}>
							<h2>{light[2]}</h2>
							<dev className="col">
								<Button onClick={handleClick}>{tekst}</Button>
							</dev>
							<dev className="col">
								<ProgressBar
									animated="true"
									now={now}
									variant="warning"
								/>
							</dev>
						</li>
					))}
				</ul>
			</div>
		);
	} else {
		return <></>;
	}
}
