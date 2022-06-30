import { Container, Row, Col } from 'react-bootstrap'

export default function Footer() {
	return (
		<footer className="bg-dark text-center text-white text-lg-start">
			<Container className="pt-4">
				<Row className='text-center justify-content-center'>
					<Col className='col-6'>
						<h5>Ettudo</h5>
						<p>
							We hebben deze website gebouwd voor een <br></br> schoolproject van de Hanze Hogeschool.  <br></br>
							Deze website is gemaakt door: <br></br>
							Reinder, Francois, Rick, Raoul en Bas
						</p>
					</Col>
				</Row>
			</Container>
			<div className="text-center pb-3">
				<p>© 2022 Copyright:</p>
				<a className="text-light" href="https://ettudo.com/">
					Ettudo.com
				</a>
			</div>
		</footer>
	);
}