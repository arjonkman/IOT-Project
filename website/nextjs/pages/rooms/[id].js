import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { useCookies } from 'react-cookie';
import Chart from '../../components/Chart';

export default function id() {
	const router = useRouter();
	const { id } = router.query;

	return (
		<main style={{ minHeight: '100vh' }}>
			<div className="container">
				<div className="row">
					<div className="col">
						<h1>Room {id}</h1>
					</div>
				</div>
				<div className="row">
					<div className="col">
						<Chart />
					</div>
				</div>
			</div>
		</main>
	);
}
