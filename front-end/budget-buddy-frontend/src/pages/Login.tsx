// @ts-ignore
import React, {useContext} from 'react'
import './css/Dashboard.css'
import './css/Login.css'
import {useNavigate} from "react-router-dom";
import { useState } from 'react';
import { useEffect } from 'react';
import axios from "axios";
import {BudgetContext} from "../context";
import Header from "../components/Header";

import { useUser } from '../userContext';
import {Simulate} from "react-dom/test-utils";
import error = Simulate.error;

const Login: React.FC = () => {



    const { loginUser } = useUser();
    let navigate = useNavigate()
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [status, setStatus] = useState('initial')



    useEffect(() => {
        let loggedUser = sessionStorage.getItem('user')
        if(loggedUser != undefined || loggedUser != null){
            // Perform login logic, fetch user data, etc.
            const loggedInUser = { username: loggedUser};
            loginUser(loggedInUser);
            navigate('/dashboard')
        }

    }, []);
    const handleLogin = async () => {


        if((username && password) !=='' ) {
            try {
                const response = await axios.post(
                    'http://localhost:3000/login',
                    {
                        username,
                        password,
                    },
                    {
                        headers: {
                            'Content-Type': 'application/json',
                        },
                    }
                ).then(() => {
                    const loggedInUser = { username: username};
                    loginUser(loggedInUser);
                    sessionStorage.setItem('user', loggedInUser.username)
                    navigate('/dashboard')
                    }
                ).catch(error => {
                    if (error.response.status === 401) {
                        setStatus('wrong_credentials')
                    }
                })


            } catch (error) {
                setStatus('error');
            }
        }else{
            setStatus('credentials_required')
        }


    };
    return (
        <>
            <Header/>
            <div className='setbudget-page'>
                <div className='setbudget-content'>
                    <div className='setbudget-text'>
                        Login
                        <p>Please provide your credentials.</p>
                        {
                            status ==='wrong_credentials' && <>  <p style={{color:"darkred"}}>Wrong credentials.</p></>

                        }
                        { status ==='credentials_required' && <>  <p style={{color:"darkred"}}>Please enter a username and password.</p></>}
                    </div>

                    <div className='setbudget-input'>

                        <input  value={username}
                                onChange={(e) => setUsername(e.target.value)} required={true} placeholder='Enter your username'/>
                        <div style={{marginBottom: "10px"}}></div>
                        <input  value={password}
                                onChange={(e) => setPassword(e.target.value)} type="password"  required={true} placeholder='Enter your password'/>
                        <div style={{marginTop:"10px"}} ><br/></div>
                        <div onClick={ handleLogin} className='setbudget-button'>Login</div>
                        <div onClick={ ()=> {navigate('/dashboard')}} className='setbudget-button btn-cancel'>Cancel</div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Login