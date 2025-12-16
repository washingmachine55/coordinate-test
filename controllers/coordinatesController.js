// import entries from "../database/schema.js";
import pool from "../config/db.js";
import validateCoordinates from "../validations/coordinatesValidator.js";
import addCoordinateEntryToDataBase from '../services/coordinatesDatabaseService.js';

// async function readAllRecords(_req, res) {
//   try {
//     const result = await entries.find({});
//     await res.format({
//       json() {
//         res.send(result)
//       }
//     })
//   } catch (err) {
//     console.error("Error reading records:", err)
//   }
// }

// async function addRecord(req, res) {
//   try {
//     const entry = [req.body[0], req.body[1], req.body[2], req.body[3], req.body[4], req.body[5]]
//     const result = new entries(entry[0]);
//     await result.save();
//     res.format({
//       json() {
//         res.send({ message: 'Record Added!', record_id: `${result._id}` })
//       }
//     })
//   } catch (err) {
//     console.error("Error creating record:", err)
//   } 
// }

// export {
//   readAllRecords,
//   addRecord
// };


async function readAllRecords(_req, res) {
  // let pool;
  try {
    const conn = await pool.getConnection();
    const result = await conn.query("SELECT * FROM entries");
    await res.format({
      json() {
        res.send(result)
      }
    })
  } catch (err) {
    console.error("Error reading records:", err)
  } finally {
    // if (conn) conn.end();
  }
}

async function addRecord(req, res) {
  // let conn;
  try {
    // conn = await pool.getConnection();

    let request = Object.values(req.body)

    const validatedEntryStart = validateCoordinates(request[0])
    const validatedEntryEnd = validateCoordinates(request[1])
    // console.log(validateCoordinates(request[1]));

    console.log(`Validated Entry: ${validatedEntryStart}`)
    console.log(`Validated Entry: ${validatedEntryEnd}`)

    // try {
    //   const uploadToDB = addCoordinateEntryToDataBase(validatedEntry);
    //   console.log(uploadToDB);

    // } catch (error) {
    //   console.error(error);
    // }


    // const entryArray = Object.values(req.body[0])
    // const entry = [entryArray[0], entryArray[1], entryArray[2], entryArray[3], entryArray[4], entryArray[5]]
    // const saveToDB = conn.query("INSERT INTO entries(start_lat,start_long,end_lat,end_long,distance_km,decision) VALUES (?, ?, ?, ?, ?, ?)", entry);
    // await saveToDB;
    res.format({
      json() {
        // res.send({ message: 'Record Added!', record_id: `${saveToDB.id}` })
        // res.send({ message: 'Record Added!', entry: `${validatedEntry}` })
      }
    })
  } catch (err) {
    console.error("Error creating record:", err)
  }
}

export {
  readAllRecords,
  addRecord
};