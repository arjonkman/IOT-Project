import { useState, useEffect } from "react";
import { Row, Col, Card, Spinner } from "react-bootstrap";
import { ResponsiveContainer, AreaChart, XAxis, YAxis, Area, Tooltip, CartesianGrid} from "recharts";

function Analyse() {
  const [temp, setTemp] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5000/api/temperature")
      .then((res) => res.json())
      .then((json) => {
        setTemp(json);
      });
  }, []);

  return (
    <Row className="mx-0 p-4 justify-content-center text-center vh-100">
      <Col xs={6}>
        <Card>
          <Card.Body>
            <Card.Title>Analyse</Card.Title>
            <Card.Text>
              Get all of your needed hardware information from this page
            </Card.Text>
          </Card.Body>
        </Card>
      </Col>
      <Col>
        {temp != "" ? <ResponsiveContainer width="99%" height={100}>
          <AreaChart data={temp}>
            <Area dataKey="value" />
            <XAxis dataKey="date"/>
          </AreaChart>
        </ResponsiveContainer> : <Spinner animation="border" />}
      </Col>
    </Row>
  );
}

export default Analyse;
