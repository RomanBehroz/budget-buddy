import './css/Header.css';
import React, { useContext } from 'react';
import { BudgetContext } from '../context';
import {useNavigate} from "react-router-dom";
import {useUser} from "../userContext";
const Header: React.FC = () => {
    const { budgetMonthAndYear } = useContext(BudgetContext);
    let navigate = useNavigate()
    const { user , logoutUser} = useUser();
    return (
        <div className='header'>
            <div className='logo'>
                <img  onClick={() => {navigate('/about')}} src="/budget-planning.png" alt="Budget Planning Logo" />
                <div  onClick={() => {navigate('/about')}} className='heading4'>budget buddy</div> <p style={{color: "white"}}>{user? <>Hi {user.username}! <button onClick={logoutUser} className="btn-logout">LOGOUT</button></> : <><button onClick={()=> {navigate('/login')}} className="btn-login"> LOGIN </button></>}</p>
            </div>
            <div>
                {
                    budgetMonthAndYear ? <div className='box box-dark para1'>{budgetMonthAndYear}</div> : <></>
                }

            </div>
        </div>
    );
};

export default Header;
