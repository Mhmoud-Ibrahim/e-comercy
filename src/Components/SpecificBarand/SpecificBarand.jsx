import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';

export default function SpecificBarand() {
let params = useParams();
const[brands,setBrands]=useState([])
 async  function getSpecificBrand(id){
    let {data} = await axios.get(`https://route-ecommerce.onrender.com/api/v1/brands/${id}`)
    setBrands(data.data)
    
     
  }



useEffect(()=>{
  getSpecificBrand(params.id)
})

  return <>
<div className=" w-75 bg-light shadow mt-5 m-auto">
  <div className="itemDetails p-4 shadow">
    <img height={400}  className='w-100' src={brands.image} alt="" />
  <h2 className=' fw-bold text-success w-50 m-auto text-center mt-4' >{brands.name}</h2>

  </div>



</div>
  </>
}
