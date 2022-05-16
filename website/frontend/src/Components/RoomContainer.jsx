import { useState } from "react";
import Room from "./Room";


function RoomContainer(props) {
	// Map trough the rooms and return a Room component for each room
	// let rooms = props.rooms.map((room, index) => {
	// 	return <Room key={index} />
	// });

	let rooms = '';

	return (
		<>
			<Room />
		</>
	)
}


export default RoomContainer;