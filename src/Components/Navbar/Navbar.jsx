import React, { useContext } from 'react'
import logo from '../../assets/freshcart-logo.svg'
import { Link } from 'react-router-dom'
import { CartContext } from '../../Context/CartContext'

export default function Navbar({userData,logout}) {
let {numOfCartItems} =useContext(CartContext)
  return<>
 
  <nav className="navbar navbar-expand-lg navbar-light bg-light fixed-top  shadow">
  <div className="container">
    <Link className="navbar-brand fa-fade" to="home">
      <img width={100} src={logo} alt="" />
    </Link>
    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon"></span>
    </button>
    <div className="collapse navbar-collapse" id="navbarSupportedContent">
    {userData !==null? <ul className="navbar-nav  me-auto mb-2  mb-lg-0">
        <li className="nav-item">
          <Link className="nav-link active text-main fw-bold" aria-current="page" to="">Home</Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link text-main fw-bold" to="Products">products</Link>
        </li>
       
        <li className="nav-item">
          <Link className="nav-link text-main fw-bold" to="brands">Brands</Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link text-main fw-bold" to="cart">cart</Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link text-main fw-bold" to="Categories">categories</Link>
        </li>

      </ul>:null}
   
  
    
      
      <ul className="navbar-nav ms-auto  mb-2 mb-lg-0">
      <ul className="navbar-nav ms-auto py-0 mt-2  mb-lg-0">
      <i className='fab fa-facebook-f ' ></i>
      <i className='fab fa-twitter ' ></i>
      <i className='fab fa-tiktok ' ></i>
      <i className='fab fa-instagram ' ></i>
      <i className='fab fa-linkedin-in ' ></i>
      <i className='fab fa-youtube ' ></i>
      </ul>
       {userData === null? <>
       
      <li className="nav-item">
          <Link className="nav-link btn btn-outline-success py-1 m-1 text-warning" to="login">Login</Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link btn btn-outline-secondary m-1 py-1 text-main" to="register">Register</Link>
        </li>
       </>: <>
       <li className="nav-item position-relative">
          <Link className="nav-link text-main fw-bold" to="Cart">
            <i className='fas fa-shopping-cart ' ></i>
          <span className='badge bg-info text-black position-absolute p-1 px-2 top-0 end-0'>{numOfCartItems}</span>
          </Link>
        </li>


         <li className='nav-item'>
      <span onClick={logout}  className='nav-link btn btn-warning text-black py-1 m-1'>Logout</span>
      </li>
       </>
       
       
     }
      </ul>
      
    </div>
  </div>
</nav>
  
  </>
}
