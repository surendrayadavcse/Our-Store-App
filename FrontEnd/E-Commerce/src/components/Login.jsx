import { Button } from 'bootstrap';
import React, { useEffect, useState } from 'react';
import { userService } from '../service/userservice/userservice';
import { useNavigate,Link } from 'react-router-dom';

const service = new userService();

function Login() {
    const navigate = useNavigate();

    const [userCreds, setUserCreds] = useState({
        email: "",
        password: ""
    });
    const [message,setMessage]=useState()
    const [error,setError]=useState()
    function handleInput(e) {
        setUserCreds((prevCreds) => {
            return { ...prevCreds, [e.target.name]: e.target.value };
        });
    }

    async function handleSubmit(e) {
        e.preventDefault();
        
        try {
            const response = await service.Login(userCreds);
          
            console.log(response);
            if (response.token !== undefined) {
                // Save both token and userId to local storage
                localStorage.setItem("token", response.token);
                localStorage.setItem("userId", response.userId); // Save userId
                setMessage(response.message)
                setTimeout(() => {
                    
                    setMessage(" ")
                }, 2000);
               
                setTimeout(() => {
                    navigate('/products');
                }, 2000);
                
            }
        } catch (err) {
            setError(err)
            setTimeout(() => {
               setError(" ")
                
            }, 2000);
            
        }
    }

    console.log(userCreds);

    return (
        <>
            <form className='form' onSubmit={handleSubmit}>
                <input
                className='input'
                    type='text'
                    onChange={handleInput}
                    name='email'
                    placeholder='Enter email'
                /><br></br><br></br>
                <input
                className='input'
                    type='password'
                    onChange={handleInput}
                    name='password'
                    placeholder='Enter password'
                /><br></br><br></br>
                <button className='btn btn-primary' type="submit">Login</button>
                {error && <p style={{color:'red'}}>{error}</p>}
                {message &&<p style={{color:"green"}}>{message}</p>}

                <hr></hr>
                <br></br>
                <p1>New To Our Store <Link to="/register">Register</Link></p1>
                
            
            </form>
        </>
    );
}

export default Login;
