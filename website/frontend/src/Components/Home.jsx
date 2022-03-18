import { Row, Col, Card } from "react-bootstrap";

function Home() {
  return (
    <Row className="mx-0 p-4 justify-content-center text-center vh-100">
      <Col xs={6} className="my-auto">
        <Card>
          <Card.Body>
            <Card.Title>Hello</Card.Title>
            <Card.Text>This is a demo project</Card.Text>
          </Card.Body>
        </Card>
      </Col>
    </Row>
  );
}

export default Home;
