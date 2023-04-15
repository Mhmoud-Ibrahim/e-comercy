import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import Loading from '../Loading/Loading';
import { Helmet } from 'react-helmet';

export default function Products() {
  
  const[allproducts,setProducts]=useState([]);
const[loading,setLoading]=useState(true)
  async function getallproducts(){
  let {data} =await axios.get(`https://route-ecommerce.onrender.com/api/v1/products`)
 setProducts(data.data);
 setLoading(false)
}
  
  
useEffect(()=>{
  getallproducts();
},[])
  return <>
 <Helmet>
  <title>Products</title>
</Helmet>
  
{loading? <Loading/>:null }
  <div className="container">
    <h5>All products</h5>
    <div className="row  allProducts g-4"> 
    {allproducts?.map((product,index)=>

<Link key={index} className="col-md-3" >
  <div className="item shadow   text-center">
    <img height={200}  className='w-100'  src={product?.imageCover} alt="product" />
   <h3 className='main h5'>{product.title.split(' ').slice(0,2).join(" ")}</h3>
   <p className='text-muted fw-semibold'  >{product.description.split(' ').slice(0,5).join(" ")}</p>
   <span className='secound fw-bold'>Quantity:{product.quantity}</span>
   <span className='text-danger fw-bold m-2'> Price:{product.price} EGP</span>
  
<i className='fas fa-star text-warning' >  <b className='text-secondary ' >{product.ratingsAverage}</b></i>

   
      
  </div>
</Link>



) }</div>
   
  </div>
  
  
  </>
}
