import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { useCookies } from 'react-cookie';

export default function id() {
	const [cookies, setCookie] = useCookies(['session_id']);
	const router = useRouter();
	const { id } = router.query;
	const [roomData, setRoomData] = useState({});
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
		if (roomData != {}) {
			roomData.map((room) => {
				setRoom(
					<>
						<h1>{room.name}</h1>
						<p>{room.description}</p>
					</>
				);
			});
		}
	}, [roomData]);

	return (
		<main style={{ minHeight: '100vh' }}>
			{room}
		</main>
	);
}
