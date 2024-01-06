import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
// @ts-ignore
import Dashboard from './pages/Dashboard';
import React from 'react';

function App(): JSX.Element {
    return (
        <>
            <Routes>
                <Route path="/dashboard" element={<Dashboard />} />
            </Routes>
        </>
    );
}

export default App;