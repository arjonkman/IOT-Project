import { useState } from "react";
import { Row, Col, Spinner } from "react-bootstrap";
import {
  ResponsiveContainer,
  AreaChart,
  XAxis,
  YAxis,
  Area,
  Tooltip,
  CartesianGrid,
} from "recharts";

function Analyse() {
  const [temp, setTemp] = useState([]);
  const [begin, setBegin] = useState("1-1-1970")
  const [end, setEnd] = useState("31-12-2100")
  const [kamer, setKamer] = useState('kamer')
  const [maximum, setMaximum] = useState(0)

  const handleInputBegin = event => {
    setBegin(event.target.value);
  };
  const handleInputEnd = event => {
    setEnd(event.target.value);
  };
  const handleInputButton = event => {
    api()
    max()
  }
  const handleSelect = event => {
    setKamer(event.target.value)
  }

  if (temp.length == 0) {
    api()
  }



  const months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];

  return (
    <div>
      <div className="d-flex flex-row">
        <input onChange={handleInputBegin} type='date'/>
        <input onChange={handleInputEnd} type='date'/>
        <select onChange={handleSelect} className="form-select form-select-sm">
          <option value="" defaultValue>Select a room</option>
          <option value="kamer">Kamer</option>
          <option value="studeer">Studeer</option>
          <option value="studeer_co2">Studeer CO2</option>
        </select>
        <button className="btn btn-primary" onClick={handleInputButton}>submit</button>
      </div>
      <Row className="mx-0 p-4 justify-content-center text-center vh-100">
        <Col>
          {temp != "" ? (
            <ResponsiveContainer width="100%" height={400}>
              <AreaChart data={temp[1]}>
                <Area dataKey="value" type="natural" />
                <XAxis
                  dataKey="date"
                  axisLine={false}
                  tickLine={false}
                  minTickGap={30}
                  tickFormatter={(str) => {
                    // const month = str.substring(0, 2);
                    // const day = str.substring(3, 5);
                    // const date = new Date(0, month, day);
                    // if (date.getDate() % 7 == 0) {
                    //   return months[date.getMonth() - 1] + ", " + date.getDate();
                    // }
                    return "";
                  }}
                />
                <YAxis
                  dataKey="value"
                  axisLine={false}
                  tickCount={10}
                  tickLine={false}
                  domain={[0, {maximum}]}
                />
                <CartesianGrid vertical={false} opacity={0.2} />
                <Tooltip content={<DataTooltip />} />
              </AreaChart>
            </ResponsiveContainer>
          ) : (
            <Spinner animation="border" />
          )}
        </Col>
      </Row>
    </div>
  );


  function api() {
    fetch(`http://193.42.11.96:5000/api/humidity/${begin}/${end}/${kamer}`)
      .then((res) => res.json())
      .then((json) => {
        setTemp(json);
      });
  }

  function max() {
    for (let i in temp[1]) {
      if (maximum < temp[1][i]['value']) {
        setMaximum(temp[1][i]['value'])
      }
    }
    return maximum
  }
}

function DataTooltip({ active, payload, label }) {
  const tooltip = {
    borderRadius: "0.25rem",
    background: "#26313c",
    color: "#fff",
    padding: "1rem",
    boxShadow: "15px 30px 40px 5px rgba(0, 0, 0, 0.5)",
    textAlign: "center",
  };

  if (active) {
    return (
      <div style={tooltip}>
        <h6>{label}</h6>
        <p>{payload[0].value}</p>
      </div>
    );
  }
  return null;
}

export default Analyse;
