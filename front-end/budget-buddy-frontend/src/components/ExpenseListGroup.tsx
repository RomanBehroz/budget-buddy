import React, { useContext } from 'react';
import ExpenseListItem, {ExpenseListItemProps} from './ExpenseListItem';
import './css/ExpenseListGroup.css';
import { BudgetContext } from '../context';

const ExpenseListGroup: React.FC = () => {
    const { expenses, budgetMonth } = useContext(BudgetContext);

    return (
        <div className='expense-list-group'>
            {expenses?.map(([date, items]) => (
                <div key={date}>
                    <div className='box2'>
                        <div className='heading3-5'>
                            {date} {budgetMonth}
                        </div>
                    </div>
                    {items.map((item: ExpenseListItemProps) => (
                        <ExpenseListItem
                            key={item._id}
                            _id={item._id}
                            name={item.name}
                            category={item.category}
                            amount={item.amount}
                        />
                    ))}
                </div>
            ))}
        </div>
    );
};

export default ExpenseListGroup;
