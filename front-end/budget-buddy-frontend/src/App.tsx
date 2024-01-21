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

function App(): JSX.Element {

    return (
        <>
        <UserProvider>
            <Routes>

                <Route path="/" element={<Setbudget />} />
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/login" element={<Login />} />
                <Route path="/about" element={<About />} />
                <Route path="*" element={<NotFound />} />

            </Routes>
        </UserProvider>
        </>

    );
}

export default App;
