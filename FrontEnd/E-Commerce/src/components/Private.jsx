import React from 'react'
import {Navigate} from 'react-router-dom'
function Private(props) {
  const userId=localStorage.getItem("userId")
  console.log(userId)
  return (
    userId!==null?(
    <props.component/>)
    :(
      <>
    {alert("please Login To access this page")}
    
    <Navigate to="/login"/>
    </>
    )
  )
}

export default Private