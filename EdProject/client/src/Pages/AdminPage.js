import React,{useEffect,useState} from 'react'
import Header from '../components/userComponents/Header'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Sidemenu from '../components/userComponents/Sidemenu'
import { Card,Button,Dialog,DialogContent,MenuItem,Select,FormControl,InputLabel } from '@mui/material';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { toast } from 'react-toastify'

function AdminPage() {
  
  axios.defaults.withCredentials = true;
  const navigate = useNavigate();

  const [fname,setFname] = useState("")
  const [isopen,setIsopen] = useState(false)
  const [updatestatus,setUpdatestatus] = useState("")
  const [isopenview,setIsopenview] = useState(false)
  const [specificobj,setSpecificobj] = useState({})
  const [applications,setApplications]=useState([{
        email:'',
        rollno:'',
        branch:'',
        year:'',
        section:'',
        place:'',
        time:'',
        issue:'',
        mobile:'',
        assignedto:'',
        status:''
    }])

    function handleChange(e){
        setUpdatestatus(e.target.value)
    }
    
    function handleClick(e){
        const applicationemail = specificobj.email;
        
        axios.post("http://localhost:5000/updatestatus",{applicationemail:applicationemail,updatestatus:updatestatus})
        .then((response)=>{
            toast.success(response.data.message)
        })
    } 

    function handleClickUpdate(e){
        const applicationemail = e.target.name;
        applications.map(application=>{
          if(application.email === applicationemail){
              setIsopen(true)
              setSpecificobj(application)
          }
      })
    }

    function handleClickview(e){
      const applicationemail = e.target.name;
      applications.map(application=>{
          if(application.email === applicationemail){
              setIsopenview(true)
              setSpecificobj(application)
          }
      })
    }


  useEffect(()=>{
         axios.get('http://localhost:5000/adminlogin')
        .then((response)=>{
          if(response.data.loggedIn){
             setFname(response.data.usersession.username)

             axios.post('http://localhost:5000/specificapps',{email:response.data.usersession.email})
             .then(res=>{
                 const app = res.data
                 setApplications(app)
             })
             navigate('/AdminPage') 
          }
          else{
            navigate('/AdminLogin')
          }
        })
    },[])

  return (
    <>
     <Sidemenu />
     <Header username={fname}/>

     <div style={{overflow:'scroll',height:'530px'}}>

        <Dialog open={isopen}>
            <DialogContent sx={{width:'350px'}}>

                  <FormControl style={{marginLeft:'30px',marginTop:'20px'}}>
                    <InputLabel>Update</InputLabel>
                    <Select value={updatestatus} label="Update" onChange={handleChange} style={{width:'300px'}}>
                          <MenuItem value='ongoing'>Ongoing</MenuItem>
                          <MenuItem value='resolved'>Resolved</MenuItem>
                          <MenuItem value='rejected'>Rejected</MenuItem>
                    </Select>

                  </FormControl>
                  <Button variant='contained' onClick={()=>{setIsopen(false)}} sx={{marginLeft:'30px',marginTop:'15px'}} >Close</Button>
                  <Button variant='contained' onClick={handleClick} sx={{marginLeft:'30px',marginTop:'15px'}}>Submit</Button>
            </DialogContent>
         </Dialog>

        <Dialog open={isopenview} >
                <DialogContent sx={{width:'300px'}}>
                     <h3 style={{marginLeft:'30px'}}>Email : {" "+specificobj.email}</h3>
                     <h3 style={{marginLeft:'30px'}}>RollNo : {" "+specificobj.rollno}</h3> 
                     <h3 style={{marginLeft:'30px'}}>Branch : {" "+specificobj.branch}</h3>
                     <h3 style={{marginLeft:'30px'}}>Year : {" "+specificobj.year}</h3>
                     <h3 style={{marginLeft:'30px'}}>Section : {" "+specificobj.section}</h3>
                     <h3 style={{marginLeft:'30px'}}>Mobile : {" "+specificobj.mobile}</h3>
                <Button variant='contained' onClick={()=>{setIsopenview(false)}}  sx={{marginLeft:'120px'}}>Close</Button>
              </DialogContent>
        </Dialog>
        {applications[0]?
          applications.map((application)=>
            (
              <>
                      <Card elevation={5} sx={{height:'75px',width:'900px',marginLeft:'280px',marginTop:'30px',display:'flex',flexDirection:'row'}}>
                          <AccountCircleIcon sx={{fontSize:'35px',marginLeft:'10px',marginTop:'20px'}}/>
                          <h3 style={{marginLeft:'30px',marginTop:'27px',color:'#253053',width:'250px'}}>{application.email}</h3> 
                          <Button name={application.email} onClick={handleClickUpdate} variant='contained' sx={{height:'35px',width:'100px',marginTop:'20px',marginLeft:'300px'}}>Update</Button>
                          <Button name={application.email} onClick={handleClickview} variant='contained' sx={{height:'35px',width:'100px',marginTop:'20px',marginLeft:'30px'}}>View</Button> 
                      </Card>
              </>
            )):console.log("Not updated yet")
          }
      </div>
    </>
  )
}

export default AdminPage