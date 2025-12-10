const mongoose = require('mongoose');

// Some versions of passport-local-mongoose export the plugin as `default`
const plm = require('passport-local-mongoose');
const passportLocalMongoose = plm.default || plm;

// Define the user schema
const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true
  },
  email: {
    type: String
  },
  phone: {
    type: String
  }
  // password fields are added by passport-local-mongoose
});

// IMPORTANT: plugin must receive a FUNCTION, not an object
userSchema.plugin(passportLocalMongoose);

module.exports = mongoose.model('User', userSchema);
