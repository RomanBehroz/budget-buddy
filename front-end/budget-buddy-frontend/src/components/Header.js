import './css/Header.css'
import { BudgetContext } from '../context'
import React, { useContext } from 'react'

const Header = () => {
 
  const {budgetMonthAndYear} = useContext(BudgetContext);

  return (
    <div className='header'>
        <div className='logo'>
            <img src="/budget-planning.png"/>
            <div className='heading4'>budget buddy</div>
        </div>
        <div>
            {
                budgetMonthAndYear? <>   <div className='box box-dark para1'>{budgetMonthAndYear}</div></> : <></>
            }

        </div>
    </div>
  )
}

export default Header