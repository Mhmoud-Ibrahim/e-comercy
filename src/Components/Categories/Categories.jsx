import axios from 'axios';
import React, {  useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import {Helmet} from "react-helmet";
import Loading from '../Loading/Loading';
export default function Categories() {
  const[categories,setCategories]=useState([]);
const[loading,setLoading]=useState(true)
  async function getCategory(){
    setLoading(true)
    let {data} =await axios.get(`https://route-ecommerce.onrender.com/api/v1/categories`)
    setCategories(data.data);
    setLoading(false)
  }
  useEffect(()=>{
    getCategory();
  },[])
  return <>
  <Helmet>
  <title>Categories</title>
</Helmet>

{loading? <Loading/>:null }
 <div className="container">
    <h5 className='secound fw-bold '>Categories</h5>
    <div className="row  categories g-4"> 
    {categories?.map((category,index)=>
  <div key={index} className="col-md-3">
<Link  to={`/SpecificCategory/${category._id}`}>
    <div className="item item shadow   text-center">  <img height={200}  className='w-100'  src={category?.image} alt="category" />
   <h3 className='main h5'>{category.name}</h3>
   </div>
</Link>
  </div>
) }</div>
  </div>
 
 
  
  </>
}
