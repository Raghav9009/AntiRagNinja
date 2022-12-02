import React from 'react';
import Landing from './Pages/Landing';
import Error from './Pages/Error';
import Login from './Pages/Login';
import Register from './Pages/Register'
import AdminLogin from './Pages/AdminLogin';
import ApplyNinja from './Pages/ApplyNinja';
import UserPage from './Pages/UserPage';
import AdminPage from './Pages/AdminPage';
import MasterPage from './Pages/MasterPage';
import {BrowserRouter,Routes,Route} from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  return ( 
    <BrowserRouter>
        <Routes>
           <Route path='/' element={<Landing/>}/>
           <Route path='/Login' element={<Login/>}/>
           <Route path='/Register' element={<Register />} />
           <Route path='/AdminLogin' element={<AdminLogin/>}/>
           <Route path='/ApplyNinja' element={<ApplyNinja/>}/>
           <Route path='/UserPage' element={<UserPage />} />
           <Route path='/AdminPage' element={<AdminPage />} />
           <Route path='/MasterPage' element={<MasterPage />} />
           <Route path='*' element={<Error />} /> 
        </Routes>
        <ToastContainer />
    </BrowserRouter>
  );
}

export default App;
