import { Row, Col, Card, Form } from 'react-bootstrap';
import { useState, useEffect } from 'react';
import { useCookies } from 'react-cookie';
import axios from 'axios';

export default function Tips() {
	const [cookies, setCookie, removeCookie] = useCookies(['session_id']);
	const [rooms, setRooms] = useState([]);
    const [deets, setDeets] = useState([]);
    const tips = [];
    useEffect(() => {
		fetch(
			`http://localhost:2053/api?function=GET_ROOMS&session_id=${cookies['session_id']}&room=all`
		)
			.then((res) => res.json())
			.then((data) => setRooms(data));
        
        }, []);
    
    useEffect(() => {
        for (let i = 0; i < rooms.length; i++) {
            fetch(
                `http://localhost:2053/api?function=LATEST_DATA&session_id=${cookies['session_id']}&id=${rooms[i][0]}`
            )
                .then((response) => response.json())
                .then((data) => setDeets(data));
                ;
        }
    }, [rooms]);

    function getTips() {
        for (let i = 0; i < rooms.length; i++) {

            if (deets == [])
                break;

            else {
                let title = rooms[i][1];

                for (let j = 0; j < deets.length; j++) {

                    if (deets[j].type == "light") {
                        // if (deets[j].data == 0) {
                        //     tips[title] = "It's dark in here, you should turn on the lights!";
                        // }
                    }
                    else if (deets[j].type == "temperature") {
                        if (deets[j].data > 25) {
                            tips[title] = "It's too hot in here, you should turn down the temperature!";
                        }
                        else if (deets[j].data < 16) {
                            tips[title] = "It's too cold in here, you should turn up the temperature!";
                        }
                    }
                    else if (deets[j].type == "humidity") {
                        if (deets[j].data > 80) {
                            tips[title] = "It's too humid in here, you should turn down the humidity!";
                        }
                        else if (deets[j].data < 20) {
                            tips[title] = "It's too dry in here, you should turn up the humidity!";
                        }
                                               
                    }
                }

            }
        }
    }

    getTips();
    console.log(tips);
    

    return (
        <Col>
            <Card
                style={{
                    minHeight: '70vh',
                    borderRadius: '15px',
                }}
            >
                <Card.Body>
                    <Card.Title>
                        <b style={{ fontSize: '3rem' }}>Tips</b>
                    </Card.Title>
                    {tips.map((tip, index) => (
                        <div key={index}>
                            <br />
                            <Card>
                                <Card.Body>
                                    <Card.Title
                                        style={{ fontSize: '1rem' }}
                                    >
                                        {tip.title}
                                    </Card.Title>
                                    <Card.Text>
                                        {tip.description}
                                    </Card.Text>
                                </Card.Body>
                            </Card>
                        </div>
                    ))}
                </Card.Body>
            </Card>
		</Col>
	);
}
