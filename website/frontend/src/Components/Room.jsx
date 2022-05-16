import { Col, Card, Button } from "react-bootstrap";
import Bulb from "./Bulb"




function Room(props) {
	let room = props.room;
	let lux = props.lux;
	return (
		<>
			<Col className="p-0 m-2 room" xs={10} md={4} lg={3}>
				<Card>
					<Bulb/>	
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
// nog mee bezig rick
// const firstStop = document.getElementById('F1gst1');
// const percentage = lux_percentage()
// firstStop.setAttribute('offset',percentage); 	

Room.defaultProps = {
	room: "UNDEFINED",
	lux: "UNDEFINED"
}

export default Room;