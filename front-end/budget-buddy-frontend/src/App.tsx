import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
// @ts-ignore
import Dashboard from './pages/Dashboard';
import React from 'react';
import Setbudget from "./pages/Setbudget";
import NotFound from "./pages/NotFound";
import About from "./pages/About";

function App(): JSX.Element {
    return (
        <>
            <Routes>
                <Route path="/" element={<Setbudget />} />
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/about" element={<About />} />
                <Route path="*" element={<NotFound />} />
            </Routes>
        </>
    );
}

export default App;
