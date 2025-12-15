import { env } from 'node:process';


if (process.env == "mariadb") {
	const pool = mariadb.createPool({
		host: 'localhost',
		user: 'root',
		password: 'testdb123',
		port: 3306,
		database: 'geo_news',
		connectionLimit: 5
	});
} 

else if (process.env == "mongodb") {

}

else if (process.env == "mongoose") {

} 

else {
	console.log("Please enter a DB in your .env")
}