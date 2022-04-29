import { Col, Card } from 'react-bootstrap'

export default function Room(props) {
	let title = props.title
	let description = props.description

	return (
		<Col className='pb-3' md={4}>
			<Card>
				<Card.Img src='/bulb.svg'></Card.Img>
				<Card.Title>{title}</Card.Title>
				<Card.Text>{description}</Card.Text>
			</Card>
		</Col>
	)
}