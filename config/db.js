import mariadb from "mariadb";
import { env, loadEnvFile } from 'node:process';

loadEnvFile();

const uri = env.DB_URI;
// let pool;

// if (process.env.DB_PROVIDER == "mariadb") {
	const pool = mariadb.createPool({
		host: env.DB_HOST,
		user: env.DB_USER,
		password: env.DB_PASSWORD,
		port: 3306,
		database: env.DB_NAME,
		connectionLimit: 5
	});
// }

// if (env.DB_PROVIDER == "mongodb") {
// 	pool = new MongoClient(uri, {
// 		serverApi: {
// 			version: ServerApiVersion.v1,
// 			strict: true,
// 			deprecationErrors: true,
// 		}
// 	});

// 	async function run() {
// 		try {
// 			await pool.connect();
// 			await pool.db(env.DB_NAME).command({ ping: 1 });
// 			console.log("Pinged your deployment. You successfully connected to MongoDB!");
// 		} finally {
// 			await pool.close();
// 		}
// 	}
// 	run().catch(console.dir);
// }

// else if (env.DB_PROVIDER == "mongoose") {

// 	async function pool() {
// 		console.log("Pinged your deployment. You successfully connected to Mongoose!");
// 		await mongoose.connect(uri, {
// 			dbName: env.DB_NAME
// 		});

// 		mongoose.connection.on('connected', () => console.log('connected'));
// 		mongoose.connection.on('open', () => console.log('open'));
// 		mongoose.connection.on('disconnected', () => console.log('disconnected'));
// 		mongoose.connection.on('reconnected', () => console.log('reconnected'));
// 		mongoose.connection.on('disconnecting', () => console.log('disconnecting'));
// 		mongoose.connection.on('close', () => console.log('close'));
// 	}

// 	// const conn = mongoose.createConnection(uri);
// }

// else {
// 	console.log("Please enter a DB in your .env")
// }

export default pool;