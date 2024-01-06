import './css/Header.css';
import React, { useContext } from 'react';
import { BudgetContext } from '../context';

const Header: React.FC = () => {
    const { budgetMonthAndYear } = useContext(BudgetContext);

    return (
        <div className='header'>
            <div className='logo'>
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
