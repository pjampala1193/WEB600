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