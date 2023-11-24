import React, {useContext} from 'react'
import './css/MainContent.css'
import { BudgetContext } from '../context';
import ExpenseListGroup from './ExpenseListGroup';

const MainContent = () => {
    const {budget, budgetTotalSpend} = useContext(BudgetContext);
    return (
    <div className='main-content'>
        <div className='money-stats-section'>
            <div>
                <div className='para1'>Budget</div>
                <div className='heading3'>{budget?.amount}€</div>
            </div>
            <div className='vertical-line'></div>
            <div>
                <div className='para1'>Expense</div>
                <div className='heading3'>{budgetTotalSpend}€</div>
            </div>
        </div>

        <div className='expense-list-section'>
          <ExpenseListGroup />
        </div>

    </div>
  )
}

export default MainContent