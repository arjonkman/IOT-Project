function Room(props) {
	console.log(props.room)
	let room = props.room;
	let lux = props.lux;
	return (
		<>
		{lux}
		</>
	)
}

Room.defaultProps = {
	room: "UNDEFINED",
	lux: "UNDEFINED"
}

export default Room;