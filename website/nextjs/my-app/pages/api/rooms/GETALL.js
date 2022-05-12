export default function handler(req, res) {
	if (req.method == 'POST') {
		res.statusCode = 200;
		res.setHeader('Content-Type', 'text/plain');
		res.end('Hello World\n');
	} else {
		res.status(405).json({ 'status': 'Method not allowed' })
	}
}