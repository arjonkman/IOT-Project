import React, { useState, useEffect } from "react";
import axios from "axios";

const Data = (props) => {
  const [data, setData] = useState([]);

    const handleSelect = event => {
        props.setKamer(event.target.value)
    }

  useEffect(() => {
    axios
      .get("http://193.42.11.96:5000/api/csvfiles")
        .then((res) => {
            setData(res.data);
            })
        .catch((err) => console.log(err));
    }, []);
    return (
        <select onChange={handleSelect} className="form-select form-select-sm">
            {data.map((item) => (
                <option key={item} value={item.slice(0, -4)}>{item.slice(0, -4).replace(/_/g, " ")}</option>
            ))}
        </select>
    );
}

export default Data;