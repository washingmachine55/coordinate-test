// import { createPool } from 'mariadb';

// const pool = createPool({
//     host: 'localhost',
//     port: 3306,
//     user: 'coordinate_tester',
//     password: 'lat&long',
//     database: 'geo_news',
//     connectionLimit: 5 // Adjust as needed
// });
// const db = await pool.getConnection()
// export default db;


import { MongoClient, ServerApiVersion } from "mongodb";

const uri = "mongodb://127.0.0.1:27017/?directConnection=true&serverSelectionTimeoutMS=2000&appName=mongosh+2.5.10";

const clientDB = new MongoClient(uri, {
    serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
    }
});

async function run() {
    try {
        // Connect the client to the server (optional starting in v4.7)
        await clientDB.connect();
        // Send a ping to confirm a successful connection
        await clientDB.db("geo_news").command({ ping: 1 });
        console.log("Pinged your deployment. You successfully connected to MongoDB!");
    } finally {
        // Ensures that the client will close when you finish/error
        await clientDB.close();
    }
}
run().catch(console.dir);

export default clientDB;
