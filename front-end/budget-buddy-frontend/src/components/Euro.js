import React, { useContext } from 'react'
import './css/Euro.css'
import { BudgetContext } from '../context';

const Euro = () => {
    const {budget} = useContext(BudgetContext);
  return (
    <div className='euro'>
        <div className='section-a'>
            <img src="/images/percent-diag.png" alt="" />
        </div>
        <div className='section-b'>
            <div className='para1'>
                Balance
            </div>
            <div className='heading1'>
                {budget?.amount - budget?.spendAmount}€
            </div>
        </div>
    </div>
  )
}

export default Euro