// models/user.schema.js

const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  username:  {
    type: String,
   
},
email: { 
    type: String, 
    required: true, 
    unique: true, 
    match: [/.+@.+\..+/, 'Invalid email address'] 
  },
password: {
    type: String,
},
});

const User = mongoose.model('User', userSchema);

module.exports = User;
