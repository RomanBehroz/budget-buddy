import './css/Header.css'
import { BudgetContext } from '../context'
import React, { useContext } from 'react'

const Header = () => {
 
  const {budgetMonthAndYear} = useContext(BudgetContext);

  return (
    <div className='header'>
        <div>
            <div className='heading4'>Hello again!</div>
        </div>
        <div>
            <div className='box box-dark para1'>{budgetMonthAndYear}</div>
        </div>
    </div>
  )
}

export default Header