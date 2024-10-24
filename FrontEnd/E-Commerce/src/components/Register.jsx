import React, { useState } from 'react'
import { userService } from '../service/userservice/userservice'
import {useNavigate,Link} from "react-router-dom"
function Register() {
  
  const navigate=useNavigate()
  const service=new userService()

  const [userdata,setUserdata]=useState({
    name:"",
    email:"",
    password:""
  })
 const [message,setMessage]=useState("")
  function handleInput(event){
    setUserdata((prevdata)=>{
        return {...prevdata,[event.target.name]:event.target.value}
    })
  }
  
 async function handleSubmit(){
    try{
    const response=await service.Register(userdata)
    if(response!==undefined){
      setMessage(response)
      setTimeout(() => {
        setMessage(" ")
        navigate("/login")
        
      }, 2000);
    }
    
    }
    catch(err){
         console.log(err)
    }
 }

  return (
    <div className='form'>
        <input  type='text' name='name' placeholder='Enter your name' onChange={handleInput}></input><br></br><br></br>
        <input type='text' name='email' placeholder='Enter your email' onChange={handleInput}></input><br></br><br></br>
        <input type='password' name='password' placeholder='Enter your password' onChange={handleInput}></input><br></br><br></br>
        <button className='btn btn-primary' onClick={handleSubmit}>Register</button>
        {message && <p style={{color:"green"}}>{message}</p>}
        <hr></hr>
        <p>Existing User ? <Link to="/login">Login </Link></p>
    </div>
  )
}

export default Register