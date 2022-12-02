import { Button} from '@mui/material'
import React,{useEffect} from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import '../index.css'
function Landing() {

  const navigate = useNavigate()
  axios.defaults.withCredentials = true;

    useEffect(()=>{
        axios.get('http://localhost:5000/login')
        .then((response)=>{
          if(response.data.loggedIn){
             navigate('/UserPage')
          }
        })
    },[])

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
        })
    },[])
  
  return (
    <div>
       <div className='landingimage'></div>
       <Button variant='outlined' disableRipple sx={{position:'absolute',marginTop:'450px',backgroundColor:'green',width:'150px',marginLeft:'335px'}}>
              <Link to='/Login' style={{color:'white',textDecorationLine:'none',width:'150px'}}>
                    SignIn
              </Link>
        </Button>
        <Button  disableRipple sx={{position:'absolute',marginLeft:'970px',marginTop:'30px'}}>
            <Link to='/AdminLogin' style={{color:'black',fontWeight:'900',textDecorationLine:'none'}}>
                 Admin Login
            </Link>
        </Button>
        <Button disableRipple sx={{position:'absolute',marginLeft:'1120px',marginTop:'30px'}}>
          <Link to='/ApplyNinja' style={{textDecorationLine:'none',color:'black',fontWeight:'900'}}>
              Be A Ninja
          </Link>  
        </Button>
    </div>
  )
}

export default Landing