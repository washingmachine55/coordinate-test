import express from 'express';
import bodyParser from 'body-parser';
const app = express();
const port = 3000;
import coordinateRoutes from "./routes/coordinates.js";
app.use(bodyParser.json());

app.use(express.json());
app.use("/coordinates", coordinateRoutes);

app.listen(port, () => {
	console.log(`Example app listening on port ${port}`)
})
