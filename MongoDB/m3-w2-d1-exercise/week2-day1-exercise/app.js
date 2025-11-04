const { MongoClient } = require("mongodb");
const url = "mongodb://localhost:27017";
const client = new MongoClient(url);
const dbName = "nodemongo";
async function connectAndRun(action) {
try {
await client.connect();
const db = client.db(dbName);
await action(db);
} catch (err) {
console.error("Error:", err);
} finally {
await client.close();
}
}

/* connectAndRun(async (db) => {
console.log("Database created!");
}); */

/* connectAndRun(async (db) => {
await db.createCollection("customers");
console.log("Collection created!");
}); */


/* connectAndRun(async (db) => {
const custData = { name: "Westcliff Inc", address: "Irvine, CA" };
const result = await db.collection("customers").insertOne(custData);
console.log("1 document inserted, ID:", result.insertedId);
}); */

/* connectAndRun(async (db) => {
const custData = [
{ name: 'John', address: 'Highway 71' },
{ name: 'Peter', address: 'Lowstreet 4' },
{ name: 'Amy', address: 'Apple st 652' },
{ name: 'Hannah', address: 'Mountain 21' },
{ name: 'Michael', address: 'Valley 345' },
{ name: 'Sandy', address: 'Ocean blvd 2' },
{ name: 'Betty', address: 'Green Grass 1' },
{ name: 'Richard', address: 'Sky st 331' },
{ name: 'Susan', address: 'One way 98' },
{ name: 'Vicky', address: 'Yellow Garden 2' },
{ name: 'Ben', address: 'Park Lane 38' },
{ name: 'William', address: 'Central st 954' },
{ name: 'Chuck', address: 'Main Road 989' },

{ name: 'Viola', address: 'Sideway 1633' }
];
const result = await db.collection("customers").insertMany(custData);
console.log("Number of documents inserted:", result.insertedCount);
}); */


/* connectAndRun(async (db) => {
const result = await db.collection("customers").findOne({});
console.log("First customer:", result.name);
}); */

/* connectAndRun(async (db) => {
const query = { address: "Park Lane 38" };
const results = await db.collection("customers").find(query).toArray();
console.log("Query results:", results);
});
 */

/* connectAndRun(async (db) => {
const mysort = { name: 1 }; // 1 = ascending, -1 = descending
const results = await db.collection("customers").find().sort(mysort).toArray();
console.log("Sorted results:", results);
}); */


/* connectAndRun(async (db) => {
const myquery = { address: "Mountain 21" };
const result = await db.collection("customers").deleteOne(myquery);
console.log(result.deletedCount, "document deleted");
}); */


connectAndRun(async (db) => {
const myquery = { address: "Valley 345" };
const newvalues = { $set: { name: "Mickey", address: "Canyon 123" } };
const result = await db.collection("customers").updateOne(myquery, newvalues);
console.log(result.modifiedCount, "document updated");
});