import {
	AreaChart,
	Area,
	XAxis,
	YAxis,
	CartesianGrid,
	Tooltip,
	Legend,
	ResponsiveContainer,
} from 'recharts';
import { useState, useEffect } from 'react';
import { useCookies } from 'react-cookie';
import { useRouter } from 'next/router';

export default function Chart() {
	const [data, setData] = useState([]);
	const [realData, setRealData] = useState(NaN);
	const [cookies, setCookie] = useCookies(['session_id']);
	const [dataType, setDataType] = useState('temperature');
	const [graph, setGraph] = useState(<>sus</>);
	// get the id from the url
	const router = useRouter();
	const { id } = router.query;

	useEffect(() => {
		fetch(
			`http://localhost:2053/api?function=DATA&session_id=${cookies['session_id']}&id=${id}&type=${dataType}`
		)
			.then((response) => response.json())
			.then((data) => {
				setData(data);
			});
	}, [dataType]);

	useEffect(() => {
		if (data !== []) {
			setRealData(
				data.map((data) => {
					const date = new Date(data.date);
					// convert date to string in format 'weekday, day, month, year'
					const dateString = `${date.toLocaleString('en-US', {
						hour: 'numeric',
						weekday: 'long',
						day: 'numeric',
						month: 'long',
						year: 'numeric',
					})}`;
					return {
						name: dateString,
						// set data in the format of `${dataType}`: data.data (e.g. humidity: data.data) to the `value` property
						value: data.data,
					};
				})
			);
		}
	}, [data]);

	useEffect(() => {
		console.log(realData);
		if (realData !== NaN) {
			setGraph(
				<ResponsiveContainer height={300}>
					<AreaChart
						data={realData}
						margin={{
							top: 10,
							right: 30,
							left: 0,
							bottom: 0,
						}}
					>
						<CartesianGrid strokeDasharray="3 3" />
						<XAxis dataKey="name" />
						<YAxis />
						<Tooltip />
						<Area dataKey="value" stroke="#8884d8" fill="#0f0f0f" />
					</AreaChart>
				</ResponsiveContainer>
			);
		}
	}, [realData]);

	return (
		<main style={{ minHeight: '100vh' }}>
			<div className="container">
				<div className="row">
					{/* buttons to select data type (CO2, Humidity, Temperature, Motion, Illuminance) */}
					<div className="col-md-4">
						<div
							className="btn-group btn-group-toggle"
							data-toggle="buttons"
						>
							<label
								className={`btn btn-secondary ${
									dataType === 'temperature' ? 'active' : ''
								}`}
							>
								<input
									type="radio"
									name="options"
									id="option1"
									autoComplete="off"
									checked={dataType === 'temperature'}
									onChange={() => setDataType('temperature')}
								/>
								Temperature
							</label>
							<label
								className={`btn btn-secondary ${
									dataType === 'humidity' ? 'active' : ''
								}`}
							>
								<input
									type="radio"
									name="options"
									id="option2"
									autoComplete="off"
									checked={dataType === 'humidity'}
									onChange={() => setDataType('humidity')}
								/>
								Humidity
							</label>
							<label
								className={`btn btn-secondary ${
									dataType === 'co2' ? 'active' : ''
								}`}
							>
								<input
									type="radio"
									name="options"
									id="option3"
									autoComplete="off"
									checked={dataType === 'CO2'}
									onChange={() => setDataType('CO2')}
								/>
								CO2
							</label>
							<label
								className={`btn btn-secondary ${
									dataType === 'motion' ? 'active' : ''
								}`}
							>
								<input
									type="radio"
									name="options"
									id="option4"
									autoComplete="off"
									checked={dataType === 'motion'}
									onChange={() => setDataType('motion')}
								/>
								Motion
							</label>
							<label
								className={`btn btn-secondary ${
									dataType === 'illuminance' ? 'active' : ''
								}`}
							>
								<input
									type="radio"
									name="options"
									id="option5"
									autoComplete="off"
									checked={dataType === 'illuminance'}
									onChange={() => setDataType('illuminance')}
								/>
								Illuminance
							</label>
						</div>
					</div>
				</div>
				<div className="row">
					<div className="col-md-12">
						<h2>{dataType} Graph</h2>
						{graph}
					</div>
				</div>
			</div>
		</main>
	);
}
