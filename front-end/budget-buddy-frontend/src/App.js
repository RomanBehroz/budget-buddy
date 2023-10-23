import './App.css';
import ReactDOM from 'react-dom';  
import { Routes, Route, Link, BrowserRouter as Router } from 'react-router-dom'
import Dashboard from './pages/Dashboard';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Dashboard/>}></Route>
    </Routes>
  );
}

export default App;
