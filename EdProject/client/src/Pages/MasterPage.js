import React,{useEffect,useState} from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import Header from '../components/userComponents/Header'
import Sidemenu from '../components/userComponents/Sidemenu'
import { Button, Card ,Dialog ,DialogContent,FormControl,InputLabel,Select,MenuItem} from '@mui/material'
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { toast } from 'react-toastify'


function MasterPage() {
  
  axios.defaults.withCredentials = true;
  const navigate = useNavigate();
  
  const [fname,setFname] = useState("")
  const [isopen,setIsopen] = useState(false)
  const [isopenview,setIsopenview] = useState(false)
  const [mail,setMail] = useState("")
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
    const [admins,setAdmins]=useState([{
        fname:'',
        email:'',
        year:'',
        section:'',
        branch:'',
        rollno:'',
        opinion:'',
        mobile:''
    }])


  function handleChange(e){
       setMail(e.target.value)
  }

  function handleClick(e){
      const applicationemail = specificobj.email;
      const assignedto = mail;

      axios.post("http://localhost:5000/assignment",{applicationemail:applicationemail,assignedto:assignedto})
      .then((response)=>{
          toast.success(response.data.message)
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

  function handleClickAssign(e){
      const applicationemail = e.target.name;
      applications.map(application=>{
         if(application.email === applicationemail){
             setIsopen(true)
             setSpecificobj(application)
         }
     })
  }

  useEffect(()=>{
        fetch("http://localhost:5000/applicationdata").then(res=>{
            return res.json()
        }).then(jsonRes => setApplications(jsonRes))
    })
  
  useEffect(()=>{
        fetch("http://localhost:5000/adminsdata").then(res=>{
            return res.json()
        }).then(jsonRes => setAdmins(jsonRes))
    })

  useEffect(()=>{
        axios.get('http://localhost:5000/adminlogin')
        .then((response)=>{
          if(response.data.loggedIn){
             setFname(response.data.usersession.username)
             navigate('/MasterPage')
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
                    <InputLabel>AssignTo</InputLabel>
                    <Select value={mail} label="AssignTo" onChange={handleChange} style={{width:'300px'}}>
                        {admins.map(admin=>
                            (
                              <MenuItem value={admin.email}>{admin.email}</MenuItem>
                            )
                        )}
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
        {applications.map(application=>
            
            (   
                <>
                  <Card elevation={5} sx={{height:'75px',width:'900px',marginLeft:'280px',marginTop:'30px',display:'flex',flexDirection:'row'}}>
                      <AccountCircleIcon sx={{fontSize:'35px',marginLeft:'10px',marginTop:'20px'}}/>
                      <h3 style={{marginLeft:'30px',marginTop:'27px',color:'#253053',width:'250px'}}>{application.email}</h3> 
                      <Button name={application.email} onClick={handleClickAssign} variant='contained' sx={{height:'35px',width:'100px',marginTop:'20px',marginLeft:'300px'}}>Assign</Button>
                      <Button name={application.email} onClick={handleClickview} variant='contained' sx={{height:'35px',width:'100px',marginTop:'20px',marginLeft:'30px'}}>View</Button> 
                  </Card>

                </>
              )
          )}

          
      </div>

      
      
    </>
  )
}

export default MasterPage