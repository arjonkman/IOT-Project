import { Col, Card, Button } from "react-bootstrap";
import Bulb from "../svg/bulb.svg";

function Room(props) {
	let room = props.room;
	let lux = props.lux;
	return (
		<>
			<Col className="p-0 m-2 room" xs={10} md={4} lg={3}>
				<Card>
					<Card.Img variant="top" src={Bulb} />
					<Card.Body>
						<Card.Title>{room}</Card.Title>
						<Card.Text>{lux}</Card.Text>
					</Card.Body>
					<Button variant="primary">More information</Button>
				</Card>
			</Col>
		</>
	)
}

Room.defaultProps = {
	room: "UNDEFINED",
	lux: "UNDEFINED"
}

export default Room;