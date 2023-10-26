import React, {useContext} from 'react'
import ExpenseListItem from './ExpenseListItem'
import './css/ExpenseListGroup.css'
import { BudgetContext } from '../context'
const ExpenseListGroup = () => {
    const {expenses} = useContext(BudgetContext);
    const groupedData = expenses?.reduce((grouped, item) => {
        
        const { date } = item;
        const inDate = new Date(date);
        const formatedDate = inDate.getDate() +' '+ (inDate.getMonth()+1)
      
        if (!grouped[inDate]) {
          grouped[inDate] = [];
        }
        grouped[inDate].push(item);
        return grouped;
      }, {});

      console.log(groupedData.sort((a, b) => a.localeCompare(b)));
  return (
   <div className='expense-list-group'>
       
            {
                groupedData? <>     {Object.keys(groupedData).map((inDate) => (
                    <div key={inDate}>
                       <div className='heading3-5'>{
                       
                       inDate}</div>
                     
                        {groupedData[inDate].map((item) => (
                            <div key={item._id} className='expense-list-items'>
        
                            <div >
                              <ExpenseListItem name={item.name} amount={item.amount} category={item.category}/>
                          </div>
                        
                  
                          </div>
                        ))}
                     
                    </div>
                  ))}</> :<></>
            }
   
        


 
      
    </div>
  )
}

export default ExpenseListGroup