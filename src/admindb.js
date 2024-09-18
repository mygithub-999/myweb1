// admin-db.js
const mongoose = require("mongoose");

// Connect to the admin database
mongoose.connect('mongodb+srv://piyushprasadods:qw8ayuZGGiwIfmuW@cluster0.bsb4q.mongodb.net/User')
.then(() => {
    console.log("Connected with MongoDB for Admins");
})
.catch((err) => {
    console.log("Connection Failed", err);
});

// Define schema for admin login
const adminSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    }
});

// Create model for admin collection
const AdminCollection = mongoose.model('AdminCollection', adminSchema);

module.exports = AdminCollection;
