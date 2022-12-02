import React,{useState} from 'react';
import {Button, Paper, TextField, Typography } from '@mui/material';
import LoginNinja from '../images/LoginNinja.png'
import { Link} from 'react-router-dom'
import axios from 'axios'; 
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom'
import 'react-toastify/dist/ReactToastify.css';

export default function Register(){

  const navigate=useNavigate()

  const [value,setValue] = useState({
     username:"",
     email:"",
     password:"",
  })
  
  const [errors,setErrors] = useState({
    username :"",
    email:"",
    password:"",
  })

  function validate(){
     let temp={};
     temp.username = value.username ? "" : "This field is required";
     temp.email = value.email ? (/$^|.+@.+..+/).test(value.email) ?"":"Enter a valid Email" :"This field is required";
     temp.password = value.password ? "":"This field is required";
     setErrors({
       ...temp
     })

     return Object.values(temp).every(x=>x==="")
  }
  
  function handleChange(e){
      
    const {name,value}=e.target;
    setValue((prev)=>{
      return(
        {...prev,[name]:value}
      )
    })

  }

  function handleSubmit(e){
      e.preventDefault();
      if(validate()){
         axios.post('http://localhost:5000/register',{username:value.username,email:value.email,password:value.password})
         .then((response)=>{
            if(response.data.status){
               toast.success(response.data.message)
               navigate('/Login')
            }
            else{
              toast.error(response.data.message)
              navigate('/Register')
            }
         })
      }
    }

  return( 
         <div style={{display:'flex',flexDirection:'row'}} >

           <Paper sx={{height:'430px',width:'400px',marginLeft:'140px',marginTop:'90px',paddingTop:'40px'}} container elevation={5}>
              
                  <Typography variant='h6'sx={{paddingTop:'10px',paddingLeft:'170px',paddingBottom:'15px'}}>
                       Register
                  </Typography>

                  <TextField  helperText={errors.username} required name="username" value={value.username} onChange={handleChange} label='Username' sx={{marginLeft:'25px',width:'350px'}}>
                  </TextField>

                  <TextField  helperText={errors.email} required name="email" value={value.email} onChange={handleChange} label='Email' type='email' sx={{marginTop:'14px',marginLeft:'25px',width:'350px'}}>
                  </TextField>
                  
                  <TextField  helperText={errors.password} required name="password" value={value.password} onChange={handleChange}  label='Password' type='password' sx={{marginTop:'14px',marginLeft:'25px',width:'350px'}}>
                  </TextField>

                  <Button onClick={handleSubmit} variant="contained" sx={{marginTop:'18px',marginLeft:'155px'}}>
                    Submit
                  </Button>
                  
                  <Typography sx={{marginLeft:'80px',marginTop:'20px'}}>
                      Already a member?
                      <Button disableRipple >
                         <Link to='/Login' style={{textDecorationLine:'none',color:'#4285F4',fontWeight:'bolder'}}>
                           Login
                         </Link>
                      </Button>
                      Here
                  </Typography>
           </Paper>

           <img src={LoginNinja} alt="LoginNinja" style={{height:'600px',width:'600px',marginLeft:'50px'}}>
           </img>
        </div>
     ) 
    
}