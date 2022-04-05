import { Col } from "react-bootstrap";

function Room(props) {
	console.log(props.room)
	let room = props.room;
	let lux = props.lux;
	return (
		<>
			<Col className="p-0 m-2 room" xs={10} md={4} lg={3}>
				{lux}
			</Col>
		</>
	)
}

Room.defaultProps = {
	room: "UNDEFINED",
	lux: "UNDEFINED"
}

export default Room;