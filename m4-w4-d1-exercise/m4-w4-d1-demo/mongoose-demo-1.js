const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/test', {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));

db.once('open', async function () {
  try {
    // 1) Create schema + model
    const fruitSchema = new mongoose.Schema({
      name: String
    });

    const Fruit = mongoose.model('Fruit', fruitSchema);

    // 2) Add a new Fruit and display it
    const apple = new Fruit({ name: 'apple' });

    const saved = await apple.save();
    console.log(saved.name); // should print: apple
  } catch (err) {
    console.error(err);
  } finally {
    await mongoose.connection.close();
  }
});
