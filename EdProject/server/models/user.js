import mongoose from 'mongoose';

const userSchema = mongoose.Schema({
    username:String,
    email:String,
    password:String,
})

const UsersDB = mongoose.model('UsersDB',userSchema);
export default UsersDB;