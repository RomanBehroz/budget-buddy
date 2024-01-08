import { createContext, useContext } from 'react';
import ExpenseListItem, { ExpenseListItemProps } from "./components/ExpenseListItem";
interface EditExpense {
    _id: string;
    name: string;
    amount: string;
    category: string;
    date: string;
    image: string;
    // Add other properties as needed
}
type ExpensesData = [date: string, items: any[]];
export type BudgetContextType = {
    budgetMonth: string,
    budgetMonthAndYear: string,
    setBudgetMonth:  (arg: string) => void,
    budget: { amount: number, _id:number } | null;
    expenses:  ExpensesData[] | [];
    budgetTotalSpend: number;
    toggleAddExpenseState: () => void,
    fetchExpenses: () => void,
    fetchBudget: () => void,
    categories: any[],
    editExpense: EditExpense | '',
    setEditExpense: (arg: any) => void,
    fetchBudgetTotalSpendSum: () => void,
};

export const BudgetContext = createContext<BudgetContextType>({
    budgetMonthAndYear: "",
    budget: null,
    budgetTotalSpend: 0,
    expenses: [],
    budgetMonth: "",
    toggleAddExpenseState: () => {},
    setEditExpense: (arg: any)=> {},
    fetchExpenses: () => {},
    categories: [],
    editExpense: '',
    fetchBudget: () => {},
    fetchBudgetTotalSpendSum: ()=> {},
    setBudgetMonth: (arg: string)=> {},

});