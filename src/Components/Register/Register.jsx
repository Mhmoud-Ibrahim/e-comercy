import axios from 'axios';
import { useFormik } from 'formik'
import React, { useState } from 'react'
import *as Yup from 'yup';
import { navigate, useNavigate } from 'react-router-dom';
import {Helmet} from "react-helmet";

export default function Register() {
  const [loading,setLoading]=useState(false)
let navigate = useNavigate()
const[errormessage,setErrormessage]=useState('')
 
async function sendregistertoapi(values){
  setLoading(true);
  console.log(values);
  let {data} = await axios.post(`https://route-ecommerce.onrender.com/api/v1/auth/signup`,values).catch((err)=>{
    setLoading(false);
  setErrormessage(`${err.response.data.errors.msg}`)
})
if(data.message === 'success'){
  setLoading(false);
navigate('/login')
}
}


let validationSchema =Yup.object({
  name:Yup.string().required('name is required').min(4,'name canot less than 4 digits'),
  email:Yup.string().required('email is required').email().matches(/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,'email invalid EX: nnn50@gamil.com'),
  password:Yup.string().required('password is required').matches(/^[a-zA-Z0-9]{4,10}$/),
  rePassword:Yup.string().required('repassword is required').oneOf([Yup.ref('password')],'not matched'),
  phone:Yup.string().required('phone is required').matches(/^(002){0,1}01[0125][0-9]{8}$/,'invalid number')})
  
  let formik = useFormik({
    initialValues:{
      name:'',
      email:'',
      password:'',
      rePassword:'',
      phone:''
    },
   validationSchema 
    ,onSubmit:sendregistertoapi
  })
  return<>
  <Helmet>
  <title>Register</title>
</Helmet>
  <div className="container mt-5 py-4 bg-light shadow">
    <h1 className="h3">Register Now</h1>
    <form onSubmit={formik.handleSubmit}>

      {errormessage?<div className='alert alert-danger mt-2'>{errormessage}</div>:null}
      <label htmlFor="name">Name: </label>
      <input onChange={formik.handleChange} onBlur={formik.handleBlur} type="text" value={formik.values.name} name="name" id='name' className='form-control mb-2' placeholder='Enter Your Name.....'/>
     {formik.errors.name&&formik.touched.name?     <div className='alert alert-danger mt-2'>{formik.errors.name}</div>:null}
     
     <label htmlFor="email">Email: </label>
      <input onChange={formik.handleChange} onBlur={formik.handleBlur} type="email" value={formik.values.email} name="email" id='email' className='form-control mb-2' placeholder='Enter Your Email.....'/>
      {formik.errors.email&&formik.touched.email?     <div className='alert alert-danger mt-2'>{formik.errors.email}</div>:null}

      <label htmlFor="password">password: </label>
      <input onChange={formik.handleChange} onBlur={formik.handleBlur} type="password" value={formik.values.password} name="password" id='password' className='form-control mb-2' placeholder='Enter Your password.....'/>
      {formik.errors.password&&formik.touched.password?     <div className='alert alert-danger mt-2'>{formik.errors.password}</div>:null}

      <label htmlFor="rePassword">rePassword: </label>
      <input onChange={formik.handleChange} onBlur={formik.handleBlur} type="password" value={formik.values.rePassword} name="rePassword" id='rePassword' className='form-control mb-2' placeholder='Enter Your rePassword.....'/>
           {formik.errors.rePassword&&formik.touched.rePassword?<div className='alert alert-danger mt-2'>{formik.errors.rePassword}</div>:null}

      
      <label htmlFor="phone">phone: </label>
      <input onChange={formik.handleChange} onBlur={formik.handleBlur} type="tel" value={formik.values.phone} name="phone" id='phone' className='form-control mb-2' placeholder='Enter Your phone.....'/>
      {formik.errors.phone&&formik.touched.phone?<div className='alert alert-danger mt-2'>{formik.errors.phone}</div>:null}
{loading? <button disabled={!(formik.dirty&&formik.isValid) } type='button' className='btn btn-info mt-2 mb-2 '> <i className='fas fa-spinner fa-spin' ></i></button>
:<button disabled={!(formik.dirty&&formik.isValid) } type='submit' className='btn btn-info mt-2 mb-2 '>Register</button>}
    </form>
  </div>
  </>
}
