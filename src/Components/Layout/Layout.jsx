import React, { useEffect, useState } from 'react'
import Navbar from '../Navbar/Navbar'
import { Navigate, Outlet, useNavigate } from 'react-router-dom'
import { Offline, Online } from "react-detect-offline";


export default function Layout({userData,setUserData}) {
let navigate = useNavigate();

  
function logout(){
    localStorage.removeItem('uerToken');
    setUserData(null);
    navigate('/login')
  }


  return<>
  
  <Navbar logout={logout} userData={userData}/>
 <Outlet></Outlet>
   {/* <Online><div className='network'>Only shown when you're online</div> </Online> */}
    <Offline ><div className='network' >You are Ofline <i className='fas fa-wifi' ></i> </div> </Offline>
  </>
}
