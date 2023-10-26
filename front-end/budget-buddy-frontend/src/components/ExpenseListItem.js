import React from 'react'
import './css/ExpenseListItem.css'
const ExpenseListItem = ({name, amount, category}) => {

  const getColorForCategory = (category) =>{
    if(category === "Grocery")
    {
      return "icon icon-a";
    }

    if(category === "Restaurant")
    {
      return "icon icon-b";
    }

    if(category === "Entertainment")
    {
      return "icon icon-c";
    }

    return "icon icon-d";

  }

  return (
    <div className='expense-list-item'>
        <div className='expense-item-icon-name'>
          <div className={getColorForCategory(category)}></div>
          <div className='heading3-5'>{name}</div>
        </div>
        <div className='heading3-5'>{amount}€</div>
    </div>
  )
}

export default ExpenseListItem