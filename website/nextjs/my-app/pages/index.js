import { Row, Col, Card } from 'react-bootstrap';
import Head from 'next/Head';
import Search from '../components/Search';
import { useState } from 'react';

const posts = [
	{ id: '1', name: 'This first post is about React' },
	{ id: '2', name: 'This next post is about Preact' },
	{ id: '3', name: 'We have yet another React post!' },
	{ id: '4', name: 'This is the fourth and final post' },
];

const filterPosts = (posts, query) => {
	if (!query) {
		return posts;
	}

	return posts.filter((post) => {
		const postName = post.name.toLowerCase();
		return postName.includes(query);
	});
};

export default function Home() {
	const { search } = window.location;
	const query = new URLSearchParams(search).get('kamer');
	const [searchQuery, setSearchQuery] = useState(query || '');
	const filteredPosts = filterPosts(posts, searchQuery);

	return (
		<>
			<Head>
				<title>Ettudo - Home</title>
			</Head>
			<Row className="mx-0 p-4 justify-content-center text-center vh-100">
				<Col xs={6} className="my-auto">
					<Card>
						<Card.Body>
							<Card.Title>
								<b style={{ fontSize: '3rem' }}>Tips</b>
							</Card.Title>
							<Card.Text>Currently under development</Card.Text>
						</Card.Body>
					</Card>
				</Col>
				<Col xs={6} className="my-auto">
					<b style={{ fontSize: '3rem' }}>Rooms</b>
					<Search
						searchQuery={searchQuery}
						setSearchQuery={setSearchQuery}
					/>
					<ul>
						{filteredPosts.map((post) => (
							<li key={post.id}>{post.name}</li>
						))}
					</ul>
				</Col>
			</Row>
		</>
	);
}
