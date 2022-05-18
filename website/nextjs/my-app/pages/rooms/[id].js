import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';

export default function id(props) {
	const router = useRouter();
	const { id } = router.query;
	const [room, setRoom] = useState(null);

	useEffect(() => {
		fetch(`https://ettudo.com:2053/api?function=get_room&id=${id}`)
			.then(response => response.json())
			.then(data => {
				setRoom(data);
			});
	}, []);

	return <main style={{ minHeight: '100vh' }}>{id}</main>;
}
