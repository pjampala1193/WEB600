const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/test', {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));

db.once('open', async function () {
  try {
    // 1) Create schema
    const kittySchema = new mongoose.Schema({
      name: String
    });

    // 2) Add a method
    kittySchema.methods.speak = function () {
      // match the demo output from the PDF
      return `Meow name is ${this.name}`;
    };

    // 3) Create model and use the method
    const Kitten = mongoose.model('Kitten', kittySchema);

    const fluffy = new Kitten({ name: 'fluffy' });
    await fluffy.save();

    console.log(fluffy.speak()); // should print: Meow name is fluffy
  } catch (err) {
    console.error(err);
  } finally {
    await mongoose.connection.close();
  }
});
