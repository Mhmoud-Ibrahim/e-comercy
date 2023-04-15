import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import { CartContext } from '../../Context/CartContext';
import { toast } from 'react-hot-toast';


export default function FeaturedProducts() {

 
  const[products,setProducts]=useState([]);
  let {addToCart,setnumOfCartItems} = useContext(CartContext)
 
  async function getfeaturedproducts(){
    let {data} =await axios.get(`https://route-ecommerce.onrender.com/api/v1/products`)
    setProducts(data.data);
   
  }
      async function addcarttod(productId){
    let response =await addToCart(productId);
    if(response.data.status == 'success'){
      setnumOfCartItems(response.data.numOfCartItems)
      toast.success(response.data.message,{duration:1500,className:'text-center border border-success ',position:'bottom-right'});
    }else{
      toast.error('Err adding product')
    }
   }
    
  useEffect(()=>{
    getfeaturedproducts();
  },[])
  
  return <>
  

  <div className="container mt-0">
    <h5>PRODUCTS</h5>
    <div className="row allProducts g-5"> 
    {products?.map((product,index)=>


  <div key={index} className="col-md-3 text-center" >
   <div className="items  shadow">
    <Link  >
   <img height={200}  className='w-100'  src={product?.imageCover} alt="product" />
   <h3 className='main h5'>{product.title.split(' ').slice(0,2).join(" ")}</h3>
   <p className='text-muted fw-semibold'  >{product.description.split(' ').slice(0,5).join(" ")}</p>
   <span className='secound fw-bold'>Quantity:{product.quantity}</span>
   <span className='text-danger fw-bold m-2'> Price:{product.price} EGP</span>
      <i className='fas fa-star text-warning' >  <b className='text-secondary ' >{product.ratingsAverage}</b></i>

   </Link>
   <div> <button id='btnaddtocart' onClick={()=>addcarttod(product._id)} className='btn  mb-2 btn-outline-success py-1 mt-2 '>add to cart</button>
   </div>
</div>
      
  </div>




) }</div>
   
  </div>
  
  
  </>
}
