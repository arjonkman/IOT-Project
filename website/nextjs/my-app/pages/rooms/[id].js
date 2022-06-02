import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { useCookies } from 'react-cookie';

export default function id() {
	const [cookies, setCookie] = useCookies(['session_id']);
	const router = useRouter();
	const { id } = router.query;
	const [room, setRoom] = useState(null);

	useEffect(() => {
		fetch(
			`http://localhost:2053/api?function=GET_ROOMS&session_id=${cookies['session_id']}&id=${id}`
		)
			.then((response) => response.json())
			.then((data) => {
				setRoom(data);
			});
	}, []);

	return <main style={{ minHeight: '100vh' }}>{id}</main>;
}
