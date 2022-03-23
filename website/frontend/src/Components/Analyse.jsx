import { useState, useEffect } from "react";
import { Row, Col, Spinner } from "react-bootstrap";
import { ResponsiveContainer, AreaChart, XAxis, YAxis, Area, Tooltip, CartesianGrid} from "recharts";

function Analyse() {
  const [temp, setTemp] = useState([]);

  const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

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
            <Area dataKey="value" type="natural"/>
            <XAxis dataKey="date" axisLine={false} tickLine={false} minTickGap={30} tickFormatter={str => {
              const month = str.substring(0, 2);
              const day = str.substring(3, 5);
              const year = str.substring(6, 10);
              const hour = str.substring(11, 13);
              const minute = str.substring(14, 16);
              const date = new Date(year, month, day, hour, minute);
              if (date.getDate() % 7 == 0) {
                return months[date.getMonth()-1] + ", " + date.getDate();
              }
              return "";
            }}/>
            <YAxis dataKey="value" axisLine={false} tickCount={10} tickLine={false} domain={[0, 3500]}/>
            <CartesianGrid vertical={false} opacity={0.2} />
            <Tooltip content={<DataTooltip/>}/>
          </AreaChart>
        </ResponsiveContainer> : <Spinner animation="border" />}
      </Col>
    </Row>
  );
}

function DataTooltip({active, payload, label}) {
  const tooltip = {
    borderRadius: '0.25rem',
    background: '#26313c',
    color: '#fff',
    padding: '1rem',
    boxShadow: '15px 30px 40px 5px rgba(0, 0, 0, 0.5)',
    textAlign: 'center'
  };

  if (active) {
    return (
      <div style={tooltip}>
        <h6>{label}</h6>
        <p>
          {payload[0].value} ppm
        </p>
      </div>
    )
  }
  return null;
}

export default Analyse;
