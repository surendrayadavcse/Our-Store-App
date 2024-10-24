// import React from 'react'
// import NavBar from './components/NavBar'
// import {BrowserRouter,Routes,Route} from 'react-router-dom'
// import ProductList from './components/ProductList'
// import Login from './components/Login'
// import Register from './components/Register'

// function App() {
//   return (
//      <BrowserRouter>
//       <NavBar/>
//       <Routes>
//         <Route path='/products' element={<ProductList/>}/>
//         <Route path='/login' element={<Login/>}/>
//         <Route path='/register' element={<Register/>}/>
//       </Routes>
     
//      </BrowserRouter>
      
  
//   )
// }

// export default App

// App.js
import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import NavBar from './components/NavBar';
import ProductList from './components/ProductList';
import Cart from './components/Cart'; // Import Cart component
import Login from './components/Login';
import Register from './components/Register';
import Private from './components/Private';

function App() {
  return (
    <BrowserRouter>
      <NavBar />
      <Routes>
        <Route path="/" element={<ProductList />} /> {/* Home */}
        <Route path="/products" element={<ProductList />} /> 
        {/* <Route path="/products" element={<Private component={ProductList} />} />  */}
        <Route path="/cart" element={<Private component={Cart}/>} /> {/* Cart Page */}
        <Route path="/login" element={<Login />} /> {/* Login */}
        <Route path="/register" element={<Register />} /> {/* Register */}
        
      </Routes>
    </BrowserRouter>
  );
}

export default App;
