import React, {useContext} from 'react'
import ExpenseListItem from './ExpenseListItem'
import './css/ExpenseListGroup.css'
import { BudgetContext } from '../context'
const ExpenseListGroup = () => {
    const {expenses} = useContext(BudgetContext);
    const {budgetMonth} = useContext(BudgetContext);




    // const groupedData = expenses?.reduce((grouped, item) => {
    //
    //     const { date } = item;
    //     const inDate = new Date(date);
    //     const formatedDate = inDate.getDate() +' '+ (inDate.getMonth()+1)
    //
    //     if (!grouped[inDate]) {
    //       grouped[inDate] = [];
    //     }
    //     grouped[inDate].push(item);
    //     return grouped;
    //   }, {});

    console.log(expenses)
  return (
   <div className='expense-list-group'>
       
            {/*{*/}
            {/*    expenses? <>     {Object.keys(data).map((date) => (*/}
            {/*        <div key={date}>*/}
            {/*           <div className='heading3-5'>{*/}

            {/*               date}</div>*/}

            {/*            {expenses[date].map((item) => (*/}
            {/*                <div key={item._id} className='expense-list-items'>*/}

            {/*                <div >*/}
            {/*                  <ExpenseListItem name={item.name} amount={item.amount} category={item.category}/>*/}
            {/*              </div>*/}


            {/*              </div>*/}
            {/*            ))}*/}

            {/*        </div>*/}
            {/*      ))}</> :<></>*/}
            {/*}*/}


       {/*{*/}
       {/*    expenses.map(expense => (*/}
       {/*    <ExpenseListItem name={expense.name} amount={expense.amount} category={expense.category}/> ))*/}
       {/*}*/}

       {expenses?.map(([date, items]) => (
           <div key={date}>
               <div className='box2'><div className='heading3-5'>{date} { budgetMonth}</div></div>

                   {items.map(item => (
                          <ExpenseListItem key={item._id} name={item.name} category={item.category} amount={item.amount}/>

                   ))}

           </div>
       ))}
 
      
    </div>
  )
}

export default ExpenseListGroup