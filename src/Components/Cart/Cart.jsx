import React, { useContext, useEffect, useState } from 'react'
import { CartContext } from '../../Context/CartContext'
import {Helmet} from "react-helmet";
import { Link } from 'react-router-dom';

export default function Cart() {
 
let {getLoggdUserCart,updateProductCount,deleteCartItem} = useContext(CartContext)
const[cartDetails,setCartDetails]=useState(null);

async function getCart(){
  let response = await getLoggdUserCart();
  setCartDetails(response.data)
 
 
}
 async function updateCount(productId,count){
  let response =  await updateProductCount(productId,count);
 setCartDetails(response.data)
}
 async function deleteCart(productId){
  let response =  await deleteCartItem(productId);
 setCartDetails(response.data)

}
useEffect(()=>{
  getCart();
})
  return <>
  <Helmet>
  <title>Shop Cart</title>
</Helmet>
  <div className="container p-2 ">
  {cartDetails !== null?<div className="bg-light mt-5 shadow p-4 my-4">
    <h5>shop cart</h5>
    <h6 className='text-main'>TotalPrice: <b>{cartDetails?.data?.totalCartPrice}</b> EGP</h6>
{cartDetails?.data.products.map((product,index)=><div key={index} className='row border border-1 mt-3'>
  <div className="col-md-1"> 
  <img className='w-100'  src={product.product.imageCover} alt="" />
  </div>
  <div className="col-md-11 d-flex justify-content-between">
    <div>
    <h6>{product.product.title}</h6>
          <h6 className='text-main'>{product.price} <b className='text-danger'> EGP</b> </h6>
          <button onClick={()=>deleteCart(product.product._id)} className='btn mx-0 p-0'> <i className=  ' text-danger fa-regular fa-trash-can   ' ></i>  Remove</button>
    </div>
    <div>
      <button onClick={()=>updateCount(product.product._id,product.count-1)} className='btn border-main m-1 btn-sm'>-</button>
     <span className='text-first d-inline-block mx-2'>{product.count}</span>
      <button onClick={()=>updateCount(product.product._id,product.count+1)} className='btn border-main m-1   btn-sm '>+</button>
    </div>
  </div>
</div> )}
<button className='btn btn-info mt-2'>
  <Link className='text-white fw-bold' to={'/Checkout'}>
  checkout
  </Link>
</button>
  </div>:null}



 
</div>
  </>
}
