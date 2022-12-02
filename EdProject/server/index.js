import express, { application, response } from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import session from 'express-session';
import User from './models/user.js'
import Admin from './models/Admins.js'
import Application from './models/Applications.js';
import bcrypt from 'bcrypt'

const app=express();

app.use(cors({
    origin:["http://localhost:3000"],
    methods:["GET","POST","PUT","PATCH","DELETE","OPTIONS"],
    credentials:true
})); 
app.use(bodyParser.json({limit:"30mb", extended:true}));
app.use(bodyParser.urlencoded({limit:"30mb",extended:true}));
app.use(cookieParser());


app.use(session({
    key:'loginUsers',
    secret:'RaghavReddyVenkataVarlaIndiraRamchander',
    resave:false,
    saveUninitialized:false,
    cookie:{
        expires:60*60*1000,
    }
}));

app.post('/register',async(req,res)=>{
    const username=req.body.username; 
    const email=req.body.email;
    const password=req.body.password;
    
    try {
        const response = await User.findOne({ email:email })
        if (response) {
           return res.send({ status: false, message: 'Email already in use' })
        }
        else {
            try {
                const saltRounds = 12;
                bcrypt.hash(password, saltRounds, async function (err, hash) {
                    // Store hash in your password DB.
                    try {
                          const newUser= new User({
                                username,
                                email,
                                password:hash,
                          });
                        const response = await newUser.save()
                        if (response) {
                           return res.send({ status: true, message: 'Registration Successful' })
                        }
                        else {
                           return res.send({ status: false, message: 'Registration failed.Try again' })
                        }
                    }
                    catch (err) {
                       return res.send({ status: false, message: 'Registration failed.Try again' })
                    }

                });

            } catch (error) {
                console.log(error);
            }


        }
    } catch (error) {
        console.log(error)
    }

})


app.post('/adminregister',async(req,res)=>{
    const fname=req.body.fname; 
    const email=req.body.email;
    const year=req.body.year; 
    const section=req.body.section;
    const branch=req.body.branch;
    const rollno=req.body.rollno;
    const opinion=req.body.opinion
    const mobile=req.body.mobile;
    const password = req.body.password;
    
    try {
        const response = await Admin.findOne({ email:email })
        if (response) {
           return res.send({ status: false, message: 'Email already in use' })
        }
        else {
            try {
                const saltRounds = 12;
                bcrypt.hash(password, saltRounds, async function (err, hash) {
                    // Store hash in your password DB.
                    try {
                          const newAdmin= new Admin({
                                fname,
                                email,
                                year,
                                section,
                                branch,
                                rollno,
                                opinion,
                                mobile,
                                password:hash,
                            });
                        const response = await newAdmin.save()
                        if (response) {
                           return res.send({ status: true, message: 'Registration Successful' })
                        }
                        else {
                           return res.send({ status: false, message: 'Registration failed.Try again' })
                        }
                    }
                    catch (err) {
                       return res.send({ status: false, message: 'Registration failed.Try again' })
                    }

                });

            } catch (error) {
                console.log(error);
            }


        }
    } catch (error) {
        console.log(error)
    }
})


app.post('/login',async(req,res)=>{
    const email=req.body.email;
    const password=req.body.password;
    const response = await User.findOne({ email: email })

    if (response) {
        bcrypt.compare(password, response.password, function (err, result) {
            // result == true
            if (result) {
                req.session.user = {username:response.username,email:response.email}
                return res.send({ status: true, message: 'Welcome back',usersession: {username:response.username,email:response.email} })
            }
            else {
                return res.send({
                    status: false, message: 'Username or Password incorrect'
                })

            }
        });

    }
    else {
       return  res.send({ status: false, message: "User does't exist"})
    }

})

app.get('/login',async(req,res)=>{ 

    const totalusers = await Application.find().countDocuments();
    const resolvedusers = await Application.find({status:"resolved"}).countDocuments();
    const ongoingusers = await Application.find({status:'ongoing'}).countDocuments();
    const pendingusers = await Application.find({status:'Pending'}).countDocuments();
    if(req.session.user){
         return res.send({loggedIn:true,usersession:req.session.user,totalusers:totalusers,resolvedusers:resolvedusers,ongoingusers:ongoingusers,pendingusers:pendingusers})
    }
    else{
       return  res.send({loggedIn:false});
    } 
})

app.post('/adminlogin',async(req,res)=>{
    const email=req.body.email;
    const password=req.body.password;
    const response = await Admin.findOne({ email: email })

        if (response) {
            bcrypt.compare(password, response.password, function (err, result) {
                // result == true
                if (result) {
                    req.session.admin = {username:response.fname,email:response.email}
                    return res.send({ status: true, message: 'Welcome back',usersession: {username:response.fname,email:response.email} })
                }
                else {
                    return res.send({
                        status: false, message: 'Username or Password incorrect'
                    })

                }
            });
        }
        else {
           return  res.send({ status: false, message: "Admin doesn't exist"})
        }
})

app.get('/adminlogin',(req,res)=>{
    if(req.session.admin){
         return res.send({loggedIn:true,usersession:req.session.admin})
    }
    else{
       return  res.send({loggedIn:false});
    } 
})
 

app.post('/logout',async(req,res)=>{
    if(req.session.user){
        req.session.destroy()
        return res.send({status:true,message:"Logged out Successfully",oftype:"user"})
    }
    else{
        req.session.destroy()
        return res.send({status:true,message:"Logged out Successfully",oftype:"admin"})
    }
    
})


app.post('/application',async(req,res)=>{
    const email=req.body.email;
    const rollno=req.body.rollno; 
    const year=req.body.year;
    const branch=req.body.branch;
    const section=req.body.section;
    const place=req.body.place;
    const time=req.body.time;
    const issue=req.body.issue;
    const mobile=req.body.mobile;
    const assignedto=req.body.assignedto;
    const status=req.body.status;
 

    try{
        const response = await Application.findOne({ email:email })
        if(response){
           return res.send({ status: false, message: 'Application already recieved' })
        }
        else{
            try {
                const newApplication= new Application({
                    email,
                    rollno,
                    year,
                    branch,
                    section,
                    place,
                    time,
                    issue,
                    mobile,
                    assignedto,
                    status
                });
                const response = await newApplication.save()
                if (response) {
                  return res.send({ status: true, message: 'Received Successfully' })
                }
                else {
                   return res.send({ status: false, message: 'Please try again' })
                }
            }
            catch (err) {
               return res.send({ status: false, message: 'Please try again' })
            }
        }
    }
    catch(error){
        console.log(error) 
    }
})

app.get('/applicationdata',async(req,res)=>{
    try {
         await Application.find({assignedto:""}).then(foundApplications => res.json(foundApplications))
    } catch (error) {
        res.status(401).json({message:error.message})
    }
})

app.get('/adminsdata',async(req,res)=>{
    try {
         await Admin.find().then(foundAdmins => res.json(foundAdmins))
    } catch (error) {
        res.status(401).json({message:error.message}) 
    }
})

app.post('/assignment',async(req,res)=>{
     const email = req.body.applicationemail;
     const assigned = req.body.assignedto;
     console.log({email,assigned})
     const result = await Application.findOneAndUpdate({email:email},{status:'ongoing',assignedto:assigned})
     .then((response)=>{
         res.send({status:'true',message:'Successfully Assigned'})
     })
})

app.post('/specificapps',async(req,res)=>{
     
    const email = req.body.email 
    try {
         await Application.find({assignedto:email}).then(foundApplications => res.json(foundApplications))
    } catch (error) {
        res.status(401).json({message:error.message})
    }
})

app.post('/updatestatus',async(req,res)=>{
     const email = req.body.applicationemail;
     const status = req.body.updatestatus;
     const result = await Application.findOneAndUpdate({email:email},{status:status})
     .then((response)=>{
         res.send({status:'true',message:'Successfully Updated'})
     })
})

const CONNECTION_URL = 'mongodb+srv://Raghav:goldmanraghav@cluster0.iao5rok.mongodb.net/?retryWrites=true&w=majority';
const PORT = process.env.PORT || 5000;



mongoose.connect(CONNECTION_URL,{useNewUrlParser:true,useUnifiedTopology:true})
        .then(()=> app.listen(PORT,()=>console.log('Server is running at port 5000')))
        .catch((error)=>console.log(error.message));