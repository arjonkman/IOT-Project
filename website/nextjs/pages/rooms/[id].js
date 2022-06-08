import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { useCookies } from 'react-cookie';

export default function id() {
	const [cookies, setCookie] = useCookies(['session_id']);
	const router = useRouter();
	const { id } = router.query;
	const [roomData, setRoomData] = useState([]);
	const [room, setRoom] = useState(<></>);

	useEffect(() => {
		fetch(
			`http://localhost:2053/api?function=DATA&session_id=${cookies['session_id']}&id=${id}`
		)
			.then((response) => response.json())
			.then((data) => {
				setRoomData(data);
			});
	}, [id]);

	useEffect(() => {
		console.log(roomData);
		if (roomData !== []) {
			setRoom(
				roomData.map((roomData, index) => {
					return (
						<div className="col" md={3} key={index}>
							<div className="card">
								<div className="card-body">
									<h5 className="card-title">
										{roomData.type}
									</h5>
									<p className="card-text">{roomData.data}</p>
								</div>
							</div>
						</div>
					);
				})
			);
		}
	}, [roomData]);

	return (
		<main style={{ minHeight: '100vh' }}>
			<div className="row px-3 pt-4">{room}</div>
		</main>
	);
}
