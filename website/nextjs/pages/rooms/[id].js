import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { useCookies } from 'react-cookie';
import Chart from '../../components/Chart';
import Tips from '../../components/Tips';

export default function id() {
	const router = useRouter();
	const { id } = router.query;
	const [roomName, setRoomName] = useState('');
	const [cookies, setCookie] = useCookies(['session_id']);

	useEffect(() => {
		// fetch the room name from the API
		fetch(
			`http://localhost:2053/api?function=GET_ROOM_NAME&session_id=${cookies['session_id']}&id=${id}`
		)
			.then((response) => response.json())
			.then((data) => {
				setRoomName(data);
			});
	}, []);

	const editName = () => {
		const newName = prompt('Enter new room name');
		if (newName) {
			fetch(
				`http://localhost:2053/api?function=UPDATE_ROOM_NAME&session_id=${cookies['session_id']}&id=${id}&name=${newName}`
			)
				.then((response) => response.json())
				.then((data) => {
					setRoomName(newName);
				});
		}
	};

	useEffect(() => {
		console.log(roomName);
	}, [roomName]);

	return (
		<main style={{ minHeight: '100vh' }}>
			<div className="container">
				<div className="row">
					<div className="col-md-12">
						<Tips />
					</div>
				</div>
				<div className="row">
					<div className="col">
						<div className="row">
							<h1>
								{roomName}
								<button
									style={{
										fontSize: '1rem',
										marginLeft: '1rem',
									}}
									onClick={editName}
								>
									<img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAAABmJLR0QA/wD/AP+gvaeTAAAAxklEQVRIie2UsRGCMBSGv0gqKjdwHXEAV7GldA8tKN1AXcAhYAYri1hANAePKEkKveO7e0WSP//PC7nAzMxfsQEawERWAxRSQApzW7U1VU6AieheQgEsEpsO+BSgeqWBY2iYdJYSGXAY0Xv3+kR2vJ8QEhQwJWSAdE11t1b25stuXgOVsO91TV2KbsEVVgEhNbCWAr5hh3xcSXE7OQO5T5wFBFx4vwBb4ASsgGuAl5ectgMD3MZEIR1YHrRfvqT9qfcIrx/mCX/OfYOQHj3MAAAAAElFTkSuQmCC" />
								</button>
							</h1>
						</div>
					</div>
				</div>
				<div className="row">
					<div className="col">
						<Chart />
					</div>
				</div>
			</div>
		</main>
	);
}
