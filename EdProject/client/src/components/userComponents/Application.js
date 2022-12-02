import React,{useState,useEffect} from 'react';
import {Button, Paper, TextField, Typography,Select,MenuItem, FormControl, InputLabel, Container } from '@mui/material';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom'
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';

export default function Application({setOpenPopup}){
   
   const navigate=useNavigate()
   axios.defaults.withCredentials = true;
   
   const [mail,setMail] = useState("")
   const [value,setValue] = useState({
      email:"",
      rollno:"",
      year:"",
      branch:"",
      section:"",
      place:"",
      time:"",
      issue:"",
      mobile:"",
      assignedto:"",
      status:"Pending"
  })
  
  const [errors,setErrors] = useState({
        rollno:"",
        year:"",
        branch:"",
        section:"",
        place:"",
        time:"",
        issue:"",
        mobile:"",
  })
  
  function validate(){
     let temp={};
     temp.rollno = value.rollno ? (/16012[0-2]73[1-9][0-2][0-9][0-9]/).test(value.rollno)?"":"Enter valid Roll Number":"This field is required";
     temp.year = value.year ? "":"This field is required";
     temp.branch = value.branch ? "":"This field is required";
     temp.section = value.section ? "":"This field is required";
     temp.place = value.place ? "":"This field is required";
     temp.time = value.time ? "":"This field is required";
     temp.issue = value.issue ? "" :"This field is required";
     temp.mobile = value.mobile ? (/[6-9][0-9][0-9][0-9][0-9][0-9][0-9][0-9][0-9][0-9]/).test(value.mobile)? value.mobile.length === 10?"":"Mobile number should contain 10 numbers":"Enter a valid Mobile number" :"This field is required";
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
          axios.post('http://localhost:5000/application',{email:mail,rollno:value.rollno,year:value.year,branch:value.branch,section:value.section,place:value.place,time:value.time,issue:value.issue,mobile:value.mobile,assignedto:value.assignedto,status:value.status})
          .then((response)=>{
            if(response.data.status){
               toast.success(response.data.message)
               setOpenPopup(false)
            }
            else{
              toast.error(response.data.message)
              navigate('/Application')
            }
         })  
      }
    }
    
    useEffect(()=>{
        axios.get('http://localhost:5000/login')
        .then((response)=>{
          if(response.data.loggedIn){
             setMail(response.data.usersession.email)
          }
          else{
            navigate('/Login')
          }
        })
    },[])

  return( 
         <>
           <Container sx={{height:'900px',marginTop:'20px',paddingTop:'10px'}} >
              
                  <Typography variant='h6'sx={{paddingLeft:'200px',paddingBottom:'15px'}}>
                       Application
                  </Typography>

                  <TextField helperText={errors.rollno} name="rollno" value={value.rollno} onChange={handleChange}  label='Roll Number' sx={{marginTop:'14px',marginLeft:'55px',width:'400px'}}>
                  </TextField>

                  <TextField helperText={errors.year} name="year" value={value.year} onChange={handleChange} type='number' inputProps={{ min: 1, max: 4 }} label='Year of Graduation' sx={{marginTop:'14px',marginLeft:'55px',width:'400px'}}>
                  </TextField>

                  <FormControl style={{marginLeft:'55px',marginTop:'14px',width:'400px'}}>
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
                  
                  <TextField helperText={errors.section} name="section" value={value.section} onChange={handleChange} type='number' inputProps={{ min: 1, max: 3 }} label='Section' placeholder="If applicable" sx={{marginTop:'14px',marginLeft:'55px',width:'400px'}}>
                  </TextField>
                  
                  <TextField helperText={errors.place} name="place" value={value.place} onChange={handleChange}  label='Place of Incident' placeholder='like Near R&D block' sx={{marginTop:'14px',marginLeft:'55px',width:'400px'}}>
                  </TextField>

                  <TextField helperText={errors.time} name="time" value={value.time} onChange={handleChange}  label='Time of Incident' placeholder="Choose Today,yesterday or other" sx={{marginTop:'14px',marginLeft:'55px',width:'400px'}}>
                  </TextField>

                  <TextField helperText={errors.issue} name="issue" value={value.issue} onChange={handleChange} placeholder='Tell us what happened in brief.' multiline rows={3} sx={{marginLeft:'55px',marginTop:'14px',width:'400px'}}>
                  </TextField> 
                
                  <TextField helperText={errors.mobile} name="mobile" value={value.mobile} onChange={handleChange} label='Mobile'  sx={{marginLeft:'55px',marginTop:'14px',width:'400px'}}>
                  </TextField>

                  <Button onClick={handleSubmit} disableRipple variant="contained" sx={{width:'200px',height:'50px',marginTop:'18px',marginLeft:'55px'}}>
                     Submit
                  </Button>

                  <Button onClick={()=>{setOpenPopup(false)}} disableRipple variant="contained" sx={{width:'140px',height:'50px',marginTop:'18px',marginLeft:'60px'}}>
                     Close
                  </Button>

                  
           </Container>

        </>
     ) 
    
}