import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';

export default function id(props) {
	const router = useRouter();
	const { id } = router.query;
	const [room, setRoom] = useState(null);

	useEffect(() => {
		fetch(`http://localhost:5000/api?function=get_room&id=${id}`)
			.then(response => response.json())
			.then(data => {
				setRoom(data);
			});
	}, []);

	return <main style={{ minHeight: '100vh' }}>{id}</main>;
}
