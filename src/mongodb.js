const mongoose=require("mongoose")
mongoose.connect('mongodb+srv://piyushprasadods:qw8ayuZGGiwIfmuW@cluster0.bsb4q.mongodb.net/User')
.then(()=>{
    console.log("Connected with MongoDB")
})
.catch(()=>{
    console.log("Connection Failed")
})
const userSchema=new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    }
})
const adminSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    role: {
        type: String,
        default: 'admin'
    }
});

// Schema for storing names and images
const faceSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  image: {
    type: Buffer, // Storing image as binary data
    required: true
  }
});

const Face = mongoose.model('Face', faceSchema);
const User=new mongoose.model('User', userSchema)
const Admin=new mongoose.model('Admin',adminSchema)
module.exports = { User, Admin, Face };
//module.exports={User,Admin}
