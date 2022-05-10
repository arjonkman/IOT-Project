import { Row, Col, Form } from 'react-bootstrap';

function onSubmit(e) {
	e.preventDefault();
	console.log(e);
}

export default function RoomSearch() {
	return (
		<form onSubmit={onSubmit}>
			<Row>
				<Col className='pb-1' md={9}>
					<Form.Control type='text' placeholder='Search' />
				</Col>
				<Col className='pb-1' md={3}>
					<Form.Control variant='primary' type='submit' placeholder='Submit' />
				</Col>
			</Row>
		</form>
	)
}