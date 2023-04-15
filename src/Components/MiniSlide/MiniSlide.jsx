import axios from 'axios';
import React, { useEffect, useState } from 'react'
import Slider from 'react-slick';

export default function MiniSlide() {
 
  const[productsslid,setproductsslid]=useState([])
  async function getProductslider(){
    let {data} =await axios.get(`https://route-ecommerce.onrender.com/api/v1/products`)
    setproductsslid(data.data);
  }


  const settings = {
    
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay:true
  };

  useEffect(()=>{
    getProductslider();
  },[])
  return  <>
  <Slider {...settings}>
{productsslid.map((product,index)=> 
<div className='shadow border border-3 border-white  rounded-2 text-center' key={index}>
  <img height={350} className="w-100 rounded-2" src={product.imageCover} alt="" />
  <h5 className='h6 pt-0 text-main'>{product.title}</h5>

</div>
)}
  </Slider>
  </>
}
