import mongoose from 'mongoose';

const AdminsSchema = mongoose.Schema({
    fname:String,
    email:String,
    year:String,
    section:String,
    branch:String,
    rollno:String,
    opinion:String,
    mobile:String,
    password:String,
})

const AdminsDB = mongoose.model('AdminsDB',AdminsSchema);
export default AdminsDB;