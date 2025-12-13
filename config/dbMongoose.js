
import mongoose from "mongoose";

const uri = "mongodb://127.0.0.1:27017/?directConnection=true&serverSelectionTimeoutMS=2000&appName=mongosh+2.5.10";

// conn().catch(err => console.log(err));

async function conn() {
	console.log("Pinged your deployment. You successfully connected to Mongoose!");
	await mongoose.connect(uri, {
			dbName: "geo_news"
		});

	mongoose.connection.on('connected', () => console.log('connected'));
	mongoose.connection.on('open', () => console.log('open'));
	mongoose.connection.on('disconnected', () => console.log('disconnected'));
	mongoose.connection.on('reconnected', () => console.log('reconnected'));
	mongoose.connection.on('disconnecting', () => console.log('disconnecting'));
	mongoose.connection.on('close', () => console.log('close'));
}

// const conn = mongoose.createConnection(uri);



export default conn;
