import React, { useContext, useState } from 'react';
import './css/ExpenseListItem.css';
import { BudgetContext } from '../context';
import axios from 'axios';
// @ts-ignore
import { Expense } from '../types'; // Import Expense type if available

interface ExpenseListItemProps {
  id: string;
  name: string;
  amount: number;
  category: string;
}

const ExpenseListItem: React.FC<ExpenseListItemProps> = ({ id, name, amount, category }) => {
  const { toggleAddExpenseState, fetchExpenses, setEditExpense } = useContext(BudgetContext);
  const [likeCount, setLikeCount] = useState<number>(0); // Adjust the type according to your needs

  const getColorForCategory = (category: string): string => {
    if (category === 'Grocery') {
      return 'icon icon-a';
    }

    if (category === 'Restaurant') {
      return 'icon icon-b';
    }

    if (category === 'Entertainment') {
      return 'icon icon-c';
    }

    return 'icon icon-d';
  };

  const getExpenseById = async (id: string): Promise<void> => {
    try {
      const response = await axios.get<Expense>(`http://localhost:3000/expense/${id}`);
      setEditExpense(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const viewExpenseItem = (id: string): void => {
    toggleAddExpenseState();
    getExpenseById(id);
  };

  return (
      <div onClick={() => viewExpenseItem(id)} className="expense-list-item">
        <div className="expense-item-icon-name">
          <div className={getColorForCategory(category)}></div>
          <div className="heading3-5">{name}</div>
        </div>
        <div className="heading3-5">{amount}€</div>
      </div>
  );
};

export default ExpenseListItem;
