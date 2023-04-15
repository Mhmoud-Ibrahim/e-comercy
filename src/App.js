
import './App.css';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import Layout from './Components/Layout/Layout';
import Home from './Components/Home/Home';
import Products from './Components/Products/Products';
import Cart from './Components/Cart/Cart';
import Brands from './Components/Brands/Brands';
import Categories from './Components/Categories/Categories';
import Notfound from './Components/Notfound/Notfound';
import Register from './Components/Register/Register';
import Login from './Components/Login/Login';
import SpecificCategory from './Components/SpecificCategory/SpecificCategory';
import ProtectedRoute from './Components/ProtectedRoute/ProtectedRoute';
import Checkout from './Components/Checkout/Checkout';
import SpecificBarand from './Components/SpecificBarand/SpecificBarand';
import CartContextProvider from './Context/CartContext';
import { Toaster, toast } from 'react-hot-toast';
import jwtDecode from 'jwt-decode';
import { useEffect, useState } from 'react';

function App() {

useEffect(()=>{
  if(localStorage.getItem('userToken') !==null){
    saveUserData();
  }
},[])

const[userData,setUserData]=useState(null);

function saveUserData(){
  let endecodedToken =localStorage.getItem('userToken');
  let decodedToken =jwtDecode(endecodedToken);
  setUserData(decodedToken);
} 

  let routers =createBrowserRouter([
  {path:'',element:<Layout setUserData={setUserData} userData={userData}/>,children:[
    {index:true,element:<Home/>},
    {path:'Products',element: <ProtectedRoute><Products/></ProtectedRoute>  },
    {path:'Cart',element:<ProtectedRoute><Cart/></ProtectedRoute> },
    {path:'brands',element:<ProtectedRoute><Brands/></ProtectedRoute>},
    {path:'SpecificBarand/:id',element:<ProtectedRoute><SpecificBarand/></ProtectedRoute>},
    {path:'Categories',element:<ProtectedRoute><Categories/></ProtectedRoute>},
    {path:'Checkout',element:<ProtectedRoute><Checkout/></ProtectedRoute>},
    {path:'register',element:<Register/>},
    {path:'SpecificCategory/:id',element:<ProtectedRoute><SpecificCategory/></ProtectedRoute>},
    {path:'login',element:<Login saveUserData={saveUserData}/>},
    {path:'*',element:<Notfound/> }

  ]}


])
  return <CartContextProvider>
<Toaster/>
    <RouterProvider router={routers} ></RouterProvider>
  </CartContextProvider>

  
}

export default App;
