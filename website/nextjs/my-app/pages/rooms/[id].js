import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { useCookies } from 'react-cookie';

export default function id() {
	const [cookies, setCookie] = useCookies(['session_id']);
	const router = useRouter();
	const { id } = router.query;
	const [room, setRoom] = useState(null);

	useEffect(() => {
		const id = 'test';
		fetch(`http://localhost:2053/api?function=GET_ROOMS&session_id=${cookies['session_id']}&room=1`)
			.then(response => response.json())
			.then(data => {
				setRoom(data);
				console.log(data)
			});
	}, []);

	return <main style={{ minHeight: '100vh' }}>{id}</main>;
}
