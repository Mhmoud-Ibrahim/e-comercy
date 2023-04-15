import axios from 'axios';
import React, { useEffect, useState } from 'react'
import {Helmet} from "react-helmet";
import { Link } from 'react-router-dom';
import Loading from '../Loading/Loading';

export default function Brands() {
  const[loading,setLoading]=useState(true)
const[brands,useBrands]=useState([])
  async function getBrands(){
   
    let {data} = await axios.get(`https://route-ecommerce.onrender.com/api/v1/brands`)
    useBrands(data.data);
    setLoading(false)
  }
useEffect(()=>{
  getBrands()
})
  return <> 
   <Helmet>
  <title>Brands</title>
</Helmet>
{loading? <Loading/>:null }
<div className="container">
  <div className="row g-4 p-2">
  {brands?.map((brand,index)=>
    <div key={index} className='col-md-4 p-2' >
      <Link to={`/SpecificBarand/${brand._id}`}>
      <div className="itembrand  shadow border border-2 text-center rounded-2">
         <img className='w-100 text-success' src={brand.image} alt="" />
    <h2 className="h4 text-success">{brand.name}</h2>
      </div></Link>
  </div>)}
  
</div>
</div>
  








  </> 
 
  
 
}
