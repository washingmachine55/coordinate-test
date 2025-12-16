import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
const app = express();
const port = 3000;

import coordinateRoutes from "./routes/coordinates.js";

app.use(bodyParser.json());
app.use(express.json());
app.use(cors());

app.use("/coordinates", coordinateRoutes);

app.listen(port, () => {
	console.log(`CORS-enabled web server listening on port ${port}`)
})
