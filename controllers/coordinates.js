import entries from "../database/schema.js";

async function readAllRecords(_req, res) {
  try {
    const result = await entries.find({});
    await res.format({
      json() {
        res.send(result)
      }
    })
  } catch (err) {
    console.error("Error reading records:", err)
  }
}

async function addRecord(req, res) {
  try {
    const entry = [req.body[0], req.body[1], req.body[2], req.body[3], req.body[4], req.body[5]]
    const result = new entries(entry[0]);
    await result.save();
    res.format({
      json() {
        res.send({ message: 'Record Added!', record_id: `${result._id}` })
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