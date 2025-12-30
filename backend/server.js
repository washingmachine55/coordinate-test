import compression from 'compression';
import express from 'express';
// import bodyParser from 'body-parser';
import cors from 'cors';
import https from 'https';
import fs from 'fs';
const app = express();
const port = 3000;

import coordinateRoutes from "./routes/coordinates.js";
import authRoutes from "./routes/auth.js";

const privateKey = fs.readFileSync('./security/localhost+2-key.pem', 'utf8');
const certificate = fs.readFileSync('./security/localhost+2.pem', 'utf8');
const credentials = { key: privateKey, cert: certificate };

app.use(compression())
// app.use(bodyParser.json());
app.use(express.json());
app.use(cors({
	origin: "https://localhost:5173",
	methods: "GET,POST"
}));

app.use("/coordinates", coordinateRoutes);
app.use("/auth", authRoutes);

const httpsServer = https.createServer(credentials, app);

httpsServer.listen(port, () => {
	console.log(`CORS-enabled HTTPS web server listening on port ${port}`)
})
/* app.listen(port, () => {
	console.log(`CORS-enabled web server listening on port ${port}`)
}) */
