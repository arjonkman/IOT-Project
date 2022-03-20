import { Row, Col, Card } from "react-bootstrap";


function Analyse() {
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
        </Row>
    );
}

export default Analyse;