import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
// @ts-ignore
import Dashboard from './pages/Dashboard';
import React, {useEffect} from 'react';
import Setbudget from "./pages/Setbudget";
import NotFound from "./pages/NotFound";
import About from "./pages/About";
import Login from "./pages/Login";
import {UserProvider, useUser} from "./userContext";
import Profile from "./pages/Profile";

function App(): JSX.Element {

    return (
        <>
        <UserProvider>
            <Routes>

                <Route path="/" element={<Dashboard />} />
                <Route path="/profile" element={<Profile />} />
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/login" element={<Login />} />
                <Route path="/about" element={<About />} />
                <Route path="*" element={<NotFound />} />

            </Routes>
        </UserProvider>
            <div className='footer'>This application is developed and designed by Roman Behroz</div>
        </>

    );
}

export default App;
