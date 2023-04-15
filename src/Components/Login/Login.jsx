import axios from 'axios';
import { useFormik } from 'formik'
import React, { useState } from 'react'
import *as Yup from 'yup';
import { navigate, useNavigate } from 'react-router-dom';
import {Helmet} from "react-helmet";

export default function Login({saveUserData}) {
  const [loading,setLoading]=useState(false)
let navigate = useNavigate()
const[errormessage,setErrormessage]=useState('')
 
async function handlelogin(values){
  setLoading(true);
  console.log(values);
  let {data} = await axios.post(`https://route-ecommerce.onrender.com/api/v1/auth/signin`,values).catch((err)=>{
    setLoading(false);
  setErrormessage(`${err.response.data.errors.msg}`)
})
if(data.message === 'success'){
  localStorage.setItem('userToken',data.token)
  saveUserData();
  setLoading(false);
  navigate('/');
}
}
let validationSchema =Yup.object({
  email:Yup.string().required('email is required').email().matches(/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,'email invalid EX: nnn50@gamil.com'),
  password:Yup.string().required('password is required').matches(/^[a-zA-Z0-9]{4,10}$/),
})
  let formik = useFormik({
    initialValues:{
   
      email:'',
      password:'',
     
    },
   validationSchema 
    ,onSubmit:handlelogin
  })
  return<>
  <Helmet>
  <title>Login</title>
</Helmet>
  <div className="container mt-5 py-4 bg-light shadow">
    <h1 className="h3">Register Now</h1>
    <form onSubmit={formik.handleSubmit}>

      {errormessage?<div className='alert alert-danger mt-2'>{errormessage}</div>:null}
    
     <label htmlFor="email">Email: </label>
      <input onChange={formik.handleChange} onBlur={formik.handleBlur} type="email" value={formik.values.email} name="email" id='email' className='form-control mb-2' placeholder='Enter Your Email.....'/>
      {formik.errors.email&&formik.touched.email?     <div className='alert alert-danger mt-2'>{formik.errors.email}</div>:null}

      <label htmlFor="password">password: </label>
      <input onChange={formik.handleChange} onBlur={formik.handleBlur} type="password" value={formik.values.password} name="password" id='password' className='form-control mb-2' placeholder='Enter Your password.....'/>
      {formik.errors.password&&formik.touched.password?     <div className='alert alert-danger mt-2'>{formik.errors.password}</div>:null}

     

{loading? <button disabled={!(formik.dirty&&formik.isValid) } type='button' className='btn btn-info mt-2 mb-2 '> <i className='fas fa-spinner fa-spin' ></i></button>
:<button disabled={!(formik.dirty&&formik.isValid) } type='submit' className='btn btn-info mt-2 mb-2 '>Register</button>}
    </form>
  </div>
  </>
}
