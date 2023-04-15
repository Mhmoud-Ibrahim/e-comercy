import React, { useEffect, useState } from 'react'
import FeaturedProducts from '../FeaturedProducts/FeaturedProducts'
import {Helmet} from "react-helmet";
import MiniSlide from '../MiniSlide/MiniSlide';
import Cart from '../Cart/Cart';


export default function Home() {


  return<>
<Helmet>
  <title>Home</title>
  
</Helmet>

<div className="container-fluid  p-3 mb-0 mt-5 ">
  <h2 className='text-main fw-bold mt-1 h5'>E-ComercyName</h2>
  <div className="row  pt-0 mt-0">
    <div className="col-md-7  p-5 ">   <MiniSlide/> </div>
    <div className="col-md-5 minicart pt-0">  <div className=' mt-0  py-0'><Cart/></div> </div>
  </div>
</div>
  <div className="container mt-4">
    <FeaturedProducts/>
  </div>

  </>
}
