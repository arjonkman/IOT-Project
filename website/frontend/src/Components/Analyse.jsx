import { useState, useEffect } from "react";
import { Row, Col, Card, Spinner } from "react-bootstrap";
import { ResponsiveContainer, AreaChart, XAxis, YAxis, Area, Tooltip, CartesianGrid} from "recharts";

function Analyse() {
  const [temp, setTemp] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5000/api/humidity")
      .then((res) => res.json())
      .then((json) => {
        setTemp(json);
      });
  }, []);

  return (
    <Row className="mx-0 p-4 justify-content-center text-center vh-100">
      <Col>
        {temp != "" ? <ResponsiveContainer width="100%" height={400}>
          <AreaChart data={temp[1]}>
            <Area dataKey="value"/>
            <XAxis dataKey="date"/>
            <YAxis type="number" domain={[0, 2000]} dataKey="value"/>
          </AreaChart>
        </ResponsiveContainer> : <Spinner animation="border" />}
      </Col>
    </Row>
  );
}

export default Analyse;
