import { Form, Row, Col, Button } from 'react-bootstrap';
import Head from 'next/head';
import sha256 from 'crypto-js/sha256';
import { useCookies } from 'react-cookie';

function encrypt(password) {
	return sha256(password).toString();
}

export default function Login() {
	const [cookies, setCookie] = useCookies(['session_id']);

	if (cookies.session_id != undefined) {
		window.location.href = '/';
		return <div style={{ minHeight: '100vh' }}></div>;
	}

	function handleSubmit(e) {
		e.preventDefault();
		const form = e.target;
		const email = form.elements.formBasicEmail.value;
		const password = form.elements.formBasicPassword.value;
		const passwordEncrypted = encrypt(password);

		fetch(
			`http://localhost:5000/api?function=login&email=${email}&password=${passwordEncrypted}`
		)
			.then((response) => response.json())
			.then((data) => {
				if (data.status == 'OK') {
					setCookie('session_id', data.session_id, {
						path: '/',
						maxAge: 3600,
					});
					window.location.href = '/';
				} else {
					alert(data.message);
				}
			})
			.catch((error) => {
				console.log(error);
			});
	}

	return (
		<main style={{ minHeight: '95vh' }}>
			<Head>
				<title>Ettudo - Login</title>
			</Head>
			<Row className="mx-0 p-4 justify-content-center">
				<Col md={6}>
					<b style={{ fontSize: '3rem' }}>Login</b>
					<Form onSubmit={handleSubmit}>
						<Form.Group controlId="formBasicEmail">
							<Form.Label>Email address</Form.Label>
							<Form.Control
								type="email"
								placeholder="Enter email"
							/>
						</Form.Group>
						<Form.Group controlId="formBasicPassword">
							<Form.Label>Password</Form.Label>
							<Form.Control
								type="password"
								placeholder="Password"
							/>
						</Form.Group>
						<Button
							variant="primary"
							type="submit"
							style={{ marginTop: '10px' }}
						>
							Submit
						</Button>
					</Form>
				</Col>
			</Row>
		</main>
	);
}
