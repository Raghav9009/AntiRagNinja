import React,{useState} from 'react';
import {Button, Paper, TextField, Typography,Select,MenuItem, FormControl, InputLabel } from '@mui/material';
import { Link } from 'react-router-dom'
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom'
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';

export default function ApplyNinja(){
   
   const navigate=useNavigate()

   const [value,setValue] = useState({
      fname:"",
      email:"",
      year:"",
      section:"",
      branch:"",
      rollno:"",
      opinion:"",
      mobile:"",
      password:"",
  })
  
  const [errors,setErrors] = useState({
    fname :"",
    email:"",
    year:"",
    section:"",
    branch:"",
    rollno:"",
    opinion:"",
    mobile:"",
    password:"",
  })
  
  function validate(){
     let temp={};
     temp.fname = value.fname ? "" : "This field is required";
     temp.email = value.email ? (/$^|.+@.+..+/).test(value.email) ?"":"Enter a valid Email" :"This field is required";
     temp.year = value.year ? "":"This field is required";
     temp.section = value.section ? "":"This field is required";
     temp.branch = value.branch ? "":"This field is required";
     temp.rollno = value.rollno ? (/16012[0-2]73[1-9][0-2][0-9][0-9]/).test(value.rollno)?"":"Enter valid Roll Number":"This field is required";
     temp.opinion = value.opinion ? "" :"This field is required";
     temp.mobile = value.mobile ? (/[6-9][0-9][0-9][0-9][0-9][0-9][0-9][0-9][0-9][0-9]/).test(value.mobile)? value.mobile.length === 10?"":"Mobile number should contain 10 numbers":"Enter a valid Mobile number" :"This field is required";
     temp.password = value.password ?"":"This field is required";
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
          axios.post('http://localhost:5000/adminregister',{fname:value.fname,email:value.email,year:value.year,section:value.section,branch:value.branch,rollno:value.rollno,opinion:value.opinion,mobile:value.mobile,password:value.password})
          .then((response)=>{
            if(response.data.status){
               toast.success(response.data.message)
               navigate('/AdminLogin')
            }
            else{
              toast.error(response.data.message)
              navigate('/ApplyNinja')
            }
         })  
      }
    }

  return( 
         <>
           <Paper sx={{height:'600px',width:'1100px',marginLeft:'100px',marginTop:'27px',paddingTop:'30px'}} container elevation={5}>
              
                  <Typography variant='h6'sx={{paddingLeft:'500px',paddingBottom:'15px'}}>
                       Application
                  </Typography>

                  <TextField helperText={errors.fname} name="fname" value={value.fname} onChange={handleChange} label='Full Name' sx={{marginLeft:'120px',width:'400px'}}>
                  </TextField>

                  <TextField helperText={errors.email} name="email" value={value.email} onChange={handleChange} label='Email' id='email' sx={{marginLeft:'50px',width:'400px'}}>
                  </TextField>
                  
                  <TextField helperText={errors.year} name="year" value={value.year} onChange={handleChange} type='number' inputProps={{ min: 1, max: 4 }} label='Year of Graduation' sx={{marginTop:'14px',marginLeft:'120px',width:'400px'}}>
                  </TextField>
                   
                  <TextField helperText={errors.section} name="section" value={value.section} onChange={handleChange} type='number' inputProps={{ min: 1, max: 3 }} label='Section' placeholder="If applicable" sx={{marginTop:'14px',marginLeft:'50px',width:'400px'}}>
                  </TextField>

                  <FormControl style={{marginLeft:'120px',marginTop:'14px',width:'400px'}}>
                    <InputLabel>Branch</InputLabel>
                    <Select helperText={errors.branch} name="branch" value={value.branch} label="Branch" onChange={handleChange}>
                        <MenuItem value={"IOT"}>IOT</MenuItem>
                        <MenuItem value={"CSE"}>CSE</MenuItem>
                        <MenuItem value={"EEE"}>EEE</MenuItem>
                        <MenuItem value={"ECE"}>ECE</MenuItem>
                        <MenuItem value={"BIO"}>BIO</MenuItem>
                        <MenuItem value={"CHEMICAL"}>CHEMICAL</MenuItem>
                        <MenuItem value={"CSM"}>CSM</MenuItem>
                        <MenuItem value={"AIDS"}>AIDS</MenuItem>
                        <MenuItem value={"IT"}>IT</MenuItem>
                    </Select>

                  </FormControl>
                  
                  <TextField helperText={errors.rollno} name="rollno" value={value.rollno} onChange={handleChange}  label='Roll Number' sx={{marginTop:'14px',marginLeft:'50px',width:'400px'}}>
                  </TextField>
                  
                  <TextField helperText={errors.opinion} name="opinion" value={value.opinion} onChange={handleChange} placeholder='Tell us why you fit into this role' multiline rows={3} sx={{marginLeft:'120px',marginTop:'14px',width:'850px'}}>
                  </TextField>
                
                  <TextField helperText={errors.mobile} name="mobile" value={value.mobile} onChange={handleChange} label='Mobile'  sx={{marginLeft:'120px',marginTop:'14px',width:'400px'}}>
                  </TextField>

                  <TextField name="password" value={value.password} onChange={handleChange} variant='outlined' type='password' label='Preferred Password' sx={{marginLeft:'50px',marginTop:'14px',width:'400px'}}>
                  </TextField>

                  <Button onClick={handleSubmit} disableRipple variant="contained" sx={{width:'300px',height:'50px',marginTop:'18px',marginLeft:'400px'}}>
                     Submit
                  </Button>
                  
                  <Typography sx={{marginLeft:'450px',marginTop:'23px'}}>
                      Already a Ninja?{" "}
                         <Link to='/AdminLogin' style={{textDecorationLine:'none',color:'#4285F4',fontWeight:'bolder'}}>
                           Login
                         </Link>
                      {" "}Here
                  </Typography>
           </Paper>

        </>
     ) 
    
}