import mongoose from 'mongoose';

const AppSchema = mongoose.Schema({
    email:String, 
    rollno:String,
    branch:String,
    year:String,
    section:String,
    place:String,
    time:String,
    issue:String,
    mobile:String,
    assignedto:String,
    status:String
})

const ApplicationDB = mongoose.model('ApplicationDB',AppSchema);
export default ApplicationDB;