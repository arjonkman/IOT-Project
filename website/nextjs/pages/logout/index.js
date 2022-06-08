import { useEffect } from 'react';
import { useCookies } from 'react-cookie';

export default function logout() {
	const [cookies, setCookie, removeCookie] = useCookies(['session_id']);
	useEffect(() => {
		removeCookie('session_id');
		// Create fetch to delete session id from the database
		fetch(`http://localhost:2053/api?function=DELETE_SESSION_ID&session_id=${cookies['session_id']}`)
			.then((res) => res.json())
			.then((data) => console.log(data));
		window.location.href = '/';
	}, []);
	return (
		<div style={{ minHeight: '95vh' }}>
			<h1>Logging out</h1>
			<p>Redirecting you to the logging page</p>
		</div>
	);
}