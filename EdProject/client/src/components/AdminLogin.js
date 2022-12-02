import React,{useState,useEffect} from 'react';
import {Button, Paper, TextField, Typography } from '@mui/material';
import AdminNinja from '../images/AdminNinja.jpg'
import { Link,useNavigate } from 'react-router-dom'
import axios from 'axios'
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function Login(){
   
  axios.defaults.withCredentials = true;
  const navigate = useNavigate();
  
  const [value,setValue] = useState({
     email:"",
     password:"",
  })

  function handleChange(e){
      
    const {name,value}=e.target;
    setValue((prev)=>{
      return(
        {...prev,[name]:value}
      )
    })

  }
  
  function handleSubmit(){
      axios.post('http://localhost:5000/adminlogin',{email:value.email,password:value.password})
      .then((response)=>{
        if(response.data.status)
        { 
          toast.success(response.data.message+" "+response.data.usersession.username)
          if(response.data.usersession.email === 'raghav97274@gmail.com'){
                navigate('/MasterPage')
          }
          else{
                navigate('/AdminPage')
          }
        }
        else
        {
           toast.error(response.data.message)
           navigate('/AdminLogin')
        }
      }).catch((err) => {
        console.log(err);
      }); 
    }

  useEffect(()=>{
        axios.get('http://localhost:5000/adminlogin')
        .then((response)=>{
          if(response.data.loggedIn){
             if(response.data.usersession.email==='raghav97274@gmail.com'){
                  navigate('/MasterPage')
             }
             else{
                  navigate('/AdminPage')
             }
          }
          else{
            navigate('/AdminLogin')
          }
        })
    },[])


  return( 
         <div style={{display:'flex',flexDirection:'row'}} >

           <Paper sx={{height:'350px',width:'400px',marginLeft:'90px',marginTop:'90px',paddingTop:'40px'}} container elevation={5}>
              
                  <Typography variant='h6'sx={{paddingTop:'10px',paddingLeft:'170px',paddingBottom:'15px'}}>
                       Login
                  </Typography>

                  <TextField name='email' value={value.email} onChange={handleChange} label='Email' sx={{marginLeft:'25px',width:'350px'}}>
                  </TextField>
                  
                  <TextField name='password' value={value.password} onChange={handleChange} variant='outlined' type='password' label='Password' sx={{marginTop:'14px',marginLeft:'25px',width:'350px'}}>
                  </TextField>

                  <Button onClick={handleSubmit} variant="contained" sx={{marginTop:'18px',marginLeft:'155px'}}>
                    Submit
                  </Button>
                  
                  <Typography sx={{marginLeft:'80px',marginTop:'20px'}}>
                      Not A Ninja Yet?
                      <Button disableRipple >
                         <Link to='/ApplyNinja' style={{textDecorationLine:'none',color:'#4285F4',fontWeight:'bolder'}}>
                           Apply
                         </Link>
                      </Button>
                      Here
                  </Typography>
           </Paper>

           <img src={AdminNinja} alt="LoginNinja" style={{height:'380px',width:'740px',marginLeft:'30px',marginTop:'100px'}}>
           </img>
         </div>
     ) 
    
}