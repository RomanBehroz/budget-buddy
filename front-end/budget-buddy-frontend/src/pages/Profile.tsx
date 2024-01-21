// @ts-ignore
import React, {useContext} from 'react'
import './css/Dashboard.css'
import './css/Setbudget.css'
import {useNavigate} from "react-router-dom";
import { useState } from 'react';
import { useEffect } from 'react';
import axios from "axios";
import {BudgetContext} from "../context";
import Header from "../components/Header";
import {useUser} from "../userContext";
import AddExpenseButton from "../components/AddExpenseButton";
import AddExpenseForm from "../components/AddExpenseForm";

const Profile = () => {
    let navigate = useNavigate()
    const { loginUser, user } = useUser();

    useEffect(() => {
        let loggedUser = sessionStorage.getItem('user')
        if(loggedUser != undefined || loggedUser != null){
            // Perform login logic, fetch user data, etc.
            const loggedInUser = { username: loggedUser};
            loginUser(loggedInUser);
        }else{
            setTimeout(()=> { navigate('/dashboard')}, 4000);
        }

    }, []);


    return (
        <>
            <Header/>
            <div className='setbudget-page'>
                <div className='setbudget-content'>
                    <div className='setbudget-text'>

                        <p>Profile</p>
                        <br/>
                        <div className='heading4'>
                            {
                            user? <>Hello {user.username} <button onClick={()=> {navigate('/')}} className='btn-cancel'>Back to Dashboard</button> </>:<>You are not authorized to visit this page. You will be redirected to dashboard automatically...</>
                            }
                        </div>
                    </div>

                    <div className='setbudget-input'>

                        {/*<input type="number" pattern="[0-9]*" inputMode="numeric" required={true} placeholder='Enter budget amount in euros'/>*/}

                    </div>
                </div>
            </div>
        </>
    )
}

export default Profile