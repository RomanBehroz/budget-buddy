import React, { useContext } from 'react';
import './css/Euro.css';
import { BudgetContext } from '../context';

const Euro: React.FC = () => {
    const { budget, budgetTotalSpend } = useContext(BudgetContext);
    const balance = budget?.amount !== undefined ? (budget.amount - budgetTotalSpend).toFixed(2).replace('.', ',') : 'N/A';
    return (
        <div className='euro'>
            <div className='section-a'>
                <img src="/images/percent-diag.png" alt="Percentage Diagram" />
            </div>
            <div className='section-b'>
                <div className='para1'>Balance</div>
                <div className='heading1'>
                    {balance}€
                </div>
            </div>
        </div>
    );
};

export default Euro;
