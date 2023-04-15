import { useFormik } from 'formik'
import React, { useContext } from 'react'
import { CartContext } from '../../Context/CartContext';

export default function Checkout() {
let {onlinePayment,cartId} =useContext(CartContext)
 async function handlesubmit(values){
  let response = await onlinePayment(cartId,values)
  if(response.data.status === 'success'){window.location.href= response.data.session.url;
}
console.log(response);
}

  let formik = useFormik({
    initialValues:{
      details:'',
      phone:'',
      city:''
    },onSubmit:handlesubmit
  });
  return <>
  <div className="container mt-5 w-75 mx-auto bg-light shadow">
  <form onSubmit={formik.handleSubmit}>
  <label htmlFor="details">Details</label>
  <input onChange={formik.handleChange} onBlur={formik.handleBlur} name='details' className='form-control mt-2' id='details' type="text" value={formik.values.details} placeholder='details.....' />

  <label htmlFor="phone">Phone</label>
  <input onChange={formik.handleChange} onBlur={formik.handleBlur} name='phone' className='form-control mt-2' id='phone' type="te;" value={formik.values.phone} placeholder='phone.....' />

  <label htmlFor="city">City</label>
  <input onChange={formik.handleChange} onBlur={formik.handleBlur} name='city' className='form-control mt-2' id='city' type="text" value={formik.values.city} placeholder='city.....' />
 <button type='submit' onClick={onlinePayment} className='btn btn-danger mt-2 w-100 mb-2'>Pay</button>


  </form>
  </div>
  </>
}
