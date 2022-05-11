import { Form } from 'react-bootstrap';
import { useState } from 'react';

export default function Search() {
	const [data, setData] = useState(getData());

	function getData(query) {
		const posts = [
			{ id: '1', name: 'Kamer 1' },
			{ id: '2', name: 'Kamer 2' },
			{ id: '3', name: 'Kamer 3' },
			{ id: '4', name: 'Kamer 4' },
		];

		if (!query) {
			let temp = posts.map((post) => {
				return (
					<div key={post.id}>
						<h3>{post.name}</h3>
					</div>
				)
			});
			return temp;
		} else {
			return [];
		}
	}

	function handleChange(e) {
		setData(getData(e.target.value));
	}

	return (
		<>
			<form>
				<Form.Control
					onChange={handleChange}
					type="text"
					placeholder="Zoeken"
				/>
			</form>
			{data}
		</>
	);
}
