// app.js
const { MongoClient } = require("mongodb");
const censusData = require("./uscensus_data.json");

const url = "mongodb://localhost:27017";
const client = new MongoClient(url);

// homework database name
const dbName = "statsdb";

// helper: connect, run some work, then close
async function connectAndRun(action) {
  try {
    await client.connect();
    const db = client.db(dbName);
    await action(db);
  } catch (err) {
    console.error("Error", err);
  } finally {
    await client.close();
  }
}

// connectAndRun(async (db) => {
//   console.log(`Database created: ${db.databaseName}`);
// });

// connectAndRun(async (db) => {
//   await db.createCollection("uscensus");
//   console.log("Collection 'uscensus' created!");
// });

// connectAndRun(async (db) => {
//   const result = await db.collection("uscensus").insertMany(censusData);
//   console.log(`${result.insertedCount} records inserted into 'uscensus'`);
// });


// connectAndRun(async (db) => {
//   const extraRecords = [
//     { city: "Pacoima",   zip: "91331", state: "CA", income: "60360", age: "33" },
//     { city: "Ketchikan", zip: "99950", state: "AK", income: "00000", age: "00" }
//   ];

//   const result = await db.collection("uscensus").insertMany(extraRecords);
//   console.log(`${result.insertedCount} extra records inserted`);
// });


// connectAndRun(async (db) => {
//   const doc = await db
//     .collection("uscensus")
//     .findOne({ city: "Corona", state: "NY" });

//   if (doc) {
//     console.log(`Zip code for Corona, NY is ${doc.zip}`);
//   } else {
//     console.log("Corona, NY not found");
//   }
// });


// connectAndRun(async (db) => {
//   const cursor = db.collection("uscensus").find(
//     { state: "CA" },                    // filter
//     { projection: { _id: 0, city: 1, income: 1 } } // show only city & income
//   );

//   const results = await cursor.toArray();
//   console.log("Incomes for all cities in California:");
//   results.forEach((doc) => {
//     console.log(`${doc.city}: ${doc.income}`);
//   });
// });

// connectAndRun(async (db) => {
//   const result = await db.collection("uscensus").updateMany(
//     { state: "AK" },                      // every record for Alaska
//     { $set: { income: "38910", age: "46" } }
//   );

//   console.log(`${result.modifiedCount} Alaska record(s) updated`);
// });


connectAndRun(async (db) => {
  const cursor = db
    .collection("uscensus")
    .find({}, { projection: { _id: 0 } }) // hide _id
    .sort({ state: 1 });                  // 1 = ascending

  const results = await cursor.toArray();

  console.log("Records sorted by state (ascending):");
  results.forEach((doc) => console.log(doc));
});




