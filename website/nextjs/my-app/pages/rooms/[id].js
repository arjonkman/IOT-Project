import { useRouter } from 'next/router';

export default function id(props) {
	const router = useRouter();
	const { id } = router.query;

	return <main style={{ minHeight: '100vh' }}>{id}</main>;
}
