import jwt from 'jsonwebtoken';
const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY

const verifyToken = (req, res, next) => {
	const token = req.header('Authorization');

	if (!token) return res.status(401).send('Access Denied');

	try {
		const verified = jwt.verify(token, JWT_SECRET_KEY);
		req.user = verified;
		next();
	} catch (err) {
		res.status(400).send('Invalid Token. Please login.');
	}
};

export default verifyToken;
