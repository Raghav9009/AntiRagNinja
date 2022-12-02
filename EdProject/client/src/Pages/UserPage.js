import React,{useEffect,useState} from 'react' 
import axios from 'axios'
import {useNavigate} from 'react-router-dom'
import Header from '../components/userComponents/Header'
import SideMenu from '../components/userComponents/Sidemenu'
import Card from '../components/userComponents/Card'
import { Button } from '@mui/material'
import Popup from '../components/userComponents/Popup'

function UserPage() {
    
    axios.defaults.withCredentials = true;
    const navigate = useNavigate()
    
    const [username,setUsername] = useState("");
    const [totalcount,setTotalcount] = useState(0);
    const [resolvedcount,setResolvedcount] = useState(0);
    const [ongoingcount,setOngoingcount] = useState(0);
    const [pendingcount,setPendingcount] = useState(0);

    const [openPopup,setOpenPopup] = useState(false);

    useEffect(()=>{
        axios.get('http://localhost:5000/login')
        .then((response)=>{
          if(response.data.loggedIn){
             setUsername(response.data.usersession.username)
             setTotalcount(response.data.totalusers)
             setResolvedcount(response.data.resolvedusers)
             setOngoingcount(response.data.ongoingusers)
             setPendingcount(response.data.pendingusers)
             navigate('/UserPage')
          }
          else{
            navigate('/Login')
          }
        })
    },[])

    function handleClick(e){
        e.preventDefault()
        setOpenPopup(true)
    }

  return (
    <>
      <SideMenu /> 
      <Header username={username}/>
      <div style={{display:'flex',marginLeft:'280px',flexDirection:'row'}}>
        <Card totalcount={totalcount} message={"Applications received"}/>
        <Card totalcount={resolvedcount} message={"Applications resolved"}/>
      </div>
      <div style={{display:'flex',marginLeft:'280px',flexDirection:'row'}}>
        <Card totalcount={ongoingcount} message={"Applications ongoing"} />
        <Card totalcount={pendingcount} message={"Applications pending"} />
      </div>
      <Button onClick={handleClick} sx={{marginLeft:'678px',marginTop:'30px'}} variant='contained'>Complain</Button>
      <Popup openPopup={openPopup} setOpenPopup={setOpenPopup}/>
    </>
  )
}

export default UserPage