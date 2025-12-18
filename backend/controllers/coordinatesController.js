// import entries from "../database/schema.js";
import pool from "../config/db.js";
import validateCoordinates from "../utils/validateCoordinates.js";
import addCoordinateEntryToDataBase from '../services/coordinatesDatabaseService.js';
import { calcDistance, giveDecision, splitCoordinates } from "../utils/index.js";

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
  // let conn;
  const conn = await pool.getConnection();

  try {
  // const conn = await pool.getConnection();
    const result = await conn.query("SELECT * FROM entries");
    await res.format({
      json() {
        res.send(result)
      }
    })
  } catch (err) {
    console.error("Error reading records:", err)
  } finally {
    conn.end();
  }
}

async function addRecord(req, res) {
  try {
    let request = Object.values(req.body)

    const startLat = splitCoordinates(request[0])[0];
    const startLong = splitCoordinates(request[0])[1];
    const endLat = splitCoordinates(request[1])[0];
    const endLong = splitCoordinates(request[1])[1];

    if (((validateCoordinates(startLat, startLong)) === true) && ((validateCoordinates(endLat, endLong)) === true)) {
      const calculatedDistance = calcDistance(startLat, startLong, endLat, endLong)
      const givenDecision = giveDecision(calculatedDistance)

      const entryArray = [startLat, startLong, endLat, endLong, calculatedDistance, givenDecision]

      try {
        await addCoordinateEntryToDataBase(entryArray);
        res.format({
          json() {
            res.send({
              type: 'success',
              message: 'Record Added!',
              entry: `${entryArray}`
            })
          }
        })
      } catch (error) {
        console.error(error);
      }
    } else {
      // console.log("cant work on calculation as values are in an incorrect format");
      res.format({
        json() {
          res.send({
            type: 'error',
            message: 'Can\'t work on calculation as values are in an incorrect format!'
          })
        }
      })
    }
  } catch (err) {
    console.error("Error creating record:", err)
  }
}

export {
  readAllRecords,
  addRecord
};