import { useRouter } from 'next/router';

export default function id(props) {
	const router = useRouter();
	const { id } = router.query;
	console.log(id);

	return (
		<></>
	)
}