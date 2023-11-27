import './App.css';
import ReactDOM from 'react-dom';  
import { Routes, Route, Link, BrowserRouter as Router } from 'react-router-dom'
import Dashboard from './pages/Dashboard';
import Setbudget from "./pages/Setbudget";

function App() {

  return (
   
    <Routes>
        <Route path="/" element={<Setbudget/>}></Route>
      <Route path="/dashboard" element={<Dashboard/>}></Route>
    </Routes>

  );
}

export default App;
