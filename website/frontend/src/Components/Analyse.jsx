import {useState, useEffect} from 'react';
import { Row, Col, Card } from "react-bootstrap";


function Analyse() {
    const [temp, setTemp] = useState([]);

    useEffect(() => {
        fetch(
            "http://localhost:5000/api/temperature")
			.then((res) => res.json())
			.then((json) => {
				setTemp(json)
			}
        );
    }, []);

    return (
        <Row className="mx-0 p-4 justify-content-center text-center vh-100">
            <Col xs={6}>
                <Card>
                    <Card.Body>
                        <Card.Title>Analyse</Card.Title>
                        <Card.Text>Get all of your needed hardware information from this page</Card.Text>
                    </Card.Body>
                </Card>
            </Col>
            <Col>
                <p>{temp['22-03-21-17-35']}</p>
            </Col>
        </Row>
    );
}

export default Analyse;