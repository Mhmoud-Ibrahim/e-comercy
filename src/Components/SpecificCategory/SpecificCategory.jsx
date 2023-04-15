import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom';

export default function SpecificCategory() {

  let params = useParams()
  const[categories,setCategories]=useState([]);
  const[productDetails,setProductDetails]=useState(null);

  async function getSpecificCategory(id){
    let {data} =await axios.get(`https://route-ecommerce.onrender.com/api/v1/categories/${id}`)
    setProductDetails(data.data);
    
  }
    
    
  useEffect(()=>{
    getSpecificCategory(params.id);
  },[])
return<>
<div className="row w-75 bg-light shadow mt-5 m-auto g-4">
  <div className="itemDetails p-4 shadow">
    <img height={400}  className='w-100' src={productDetails?.image} alt="" />
  <h3 className=' fw-bold text-dark w-50 m-auto text-center mt-4' >{productDetails?.name}</h3>

  </div>



</div>


</>

}
