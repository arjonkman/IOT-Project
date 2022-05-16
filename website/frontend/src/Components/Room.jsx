import { Col, Card, Button } from "react-bootstrap";
import Bulb from "./Bulb"
import { useState, useEffect, React } from "react";



function Room() {
	let room = 'UNDEFINED'
	const [light, setLight] = useState('');
	const [color, setColor] = useState('');
	function color_percentage () {
		setColor((light / 4) + '%')
	}
	fetch('http://127.0.0.1:5000/api?function=light_intensity')
			.then((response) => response.json())
			.then((data) => setLight(100))	

	useEffect(() => {
		color_percentage()
	}, [light]);
	
	

		
	
	return (
		<>
			<Col className="p-0 m-2 room" xs={10} md={4} lg={3}>
				<Card onClick={handleClick} id={room} style={{backgroundColor:'yellow', opacity:`${color}`, color:'black'}}>
					<Bulb/>	
					<Card.Body>
						<Card.Title>{room}</Card.Title>
						<Card.Text>{light}</Card.Text>
						<Card.Text>{color}</Card.Text>
					</Card.Body>
				</Card>
			</Col>
		</>
	)
}
// nog mee bezig
// const firstStop = document.getElementById('F1gst1');
// const percentage = lux_percentage()
// firstStop.setAttribute('offset',percentage); 	

// Room.defaultProps = {
// 	room: "UNDEFINED",
// 	lux: setLight(lux)
// }

export default Room;