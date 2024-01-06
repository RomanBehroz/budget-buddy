import { createContext, useContext } from 'react';
interface EditExpense {
    _id: string;
    name: string;
    amount: string;
    category: string;
    date: string;
    image: string;
    // Add other properties as needed
}

type BudgetContextType = {
    budgetMonthAndYear: string | null;
    budget: { amount: number, _id:number } | null;
    budgetId: string | null;
    budgetTotalSpend: number;
    expenses:  [date: string, items: any[] ];
    budgetMonth: string | "";
    toggleAddExpenseState: () => void,
    setEditExpense: (arg: any) => void,
    fetchExpenses: () => void,
    categories: any[],
    editExpense: EditExpense | '',
    fetchBudget: () => void,
    fetchBudgetTotalSpendSum: () => void,
    setBudgetId: (arg: string) => void,
};

export const BudgetContext = createContext<BudgetContextType>({
    budgetMonthAndYear: null,
    budget: null,
    budgetTotalSpend: 0,
    expenses: ['', []],
    budgetMonth: "",
    toggleAddExpenseState: () => {},
    setEditExpense: (arg: any)=> {},
    fetchExpenses: () => {},
    categories: [],
    editExpense: '',
    fetchBudget: () => {},
    fetchBudgetTotalSpendSum: ()=> {},
    budgetId: null,
    setBudgetId: (arg: string)=> {},
});