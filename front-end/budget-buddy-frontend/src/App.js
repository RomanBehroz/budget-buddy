import './App.css';
import ReactDOM from 'react-dom';  
import { Routes, Route, Link, BrowserRouter as Router } from 'react-router-dom'
import Dashboard from './pages/Dashboard';
import Setbudget from "./pages/Setbudget";
import {BudgetContext} from "./context";
import {useState} from "react";
function App() {

    const [budgetId, setBudgetId] = useState()

  return (
      <>      <BudgetContext.Provider value={{budgetId, setBudgetId}}>
          <Routes>
              <Route path="/" element={<Setbudget/>}></Route>
              <Route path="/dashboard" element={<Dashboard/>}></Route>
          </Routes>
      </BudgetContext.Provider>
      </>

  );
}

export default App;
