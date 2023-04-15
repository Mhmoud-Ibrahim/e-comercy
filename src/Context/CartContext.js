import axios from "axios";

const { createContext, useEffect, useState } = require("react");

export let CartContext=   createContext(0);
  export default  function CartContextProvider(props){
const[cartId,setcartId]=useState(null)
const[numOfCartItems,setnumOfCartItems]=useState(0)

    async function getCart(){
       let response =await getLoggdUserCart();
       if(response?.data?.status === 'success'){
        setnumOfCartItems(response.data.numOfCartItems)
        setcartId(response.data.data._id)
       }
       
    }
useEffect(()=>{
    getCart()
},[])



let userToken = localStorage.getItem('userToken');
let headers ={token:userToken}

function addToCart(productId){
   return axios.post(`https://route-ecommerce.onrender.com/api/v1/cart`,
    {productId:productId}
    ,{headers})
    .then((response)=>response)
    .catch((err)=>err)
}
//display cart
function getLoggdUserCart(){
   return axios.get(`https://route-ecommerce.onrender.com/api/v1/cart`,
    {headers})
    .then((response)=>response)
    .catch((err)=>err)
}
// update product count
function updateProductCount(productId,productCount){
   return axios.put(`https://route-ecommerce.onrender.com/api/v1/cart/${productId}`,{count:productCount},
    {headers})
    .then((response)=>response)
    .catch((err)=>err)
}
// delete product 
function deleteCartItem(productId){
   return axios.delete(`https://route-ecommerce.onrender.com/api/v1/cart/${productId}`,
    {headers})
    .then((response)=>response)
    .catch((err)=>err)
}
//online payment
function onlinePayment(cartId,shippingAdress){
   return axios.post(`https://route-ecommerce.onrender.com/api/v1/orders/checkout-session/${cartId}?url=http://localhost:3000 `,
    {shippingAdress:shippingAdress},
   {headers})
    .then((response)=>response)
    .catch((err)=>err)
}




    return <CartContext.Provider value={{setnumOfCartItems,cartId,numOfCartItems,onlinePayment,addToCart,getLoggdUserCart,updateProductCount,deleteCartItem}}>
        {props.children}
    </CartContext.Provider>

 }