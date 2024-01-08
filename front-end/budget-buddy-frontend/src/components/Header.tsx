import './css/Header.css';
import React, { useContext } from 'react';
import { BudgetContext } from '../context';
import {useNavigate} from "react-router-dom";
const Header: React.FC = () => {
    const { budgetMonthAndYear } = useContext(BudgetContext);
    let navigate = useNavigate()
    return (
        <div className='header'>
            <div className='logo' onClick={() => {navigate('/about')}}>
                <img src="/budget-planning.png" alt="Budget Planning Logo" />
                <div className='heading4'>budget buddy</div>
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
