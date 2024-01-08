import { useEffect, useState, useCallback, useContext } from "react";
import axios from "axios";
import { BudgetContext } from "./context";

type FetchState = "initial" | "loading" | "success" | "error";
type ExpensesData = [date: string, items: any[]];

interface UseExpensesResponse {
    data: ExpensesData[];
    error: Error | null;
    loading: boolean;
    state: FetchState;
    refresh: () => void;
}

export default function useExpenses(url: string): UseExpensesResponse {
    const [data, setData] = useState<ExpensesData[]>([]);
    const [error, setError] = useState<Error | null>(null);
    const [loading, setLoading] = useState<boolean>(false);
    const [state, setState] = useState<FetchState>("initial");
    const { expenses } = useContext(BudgetContext);

    const fetchData = useCallback(async () => {
        try {
            setLoading(true);
            setState("loading");
            const response = await axios.get<ExpensesData[]>(url);
            setData(response.data);
            setState("success");
        } catch (err) {
            // @ts-ignore
            setError(err);
            setState("error");
        } finally {
            setLoading(false);
        }
    }, [url]);

    const refresh = useCallback(() => {
        fetchData();
    }, [fetchData]);

    useEffect(() => {
        fetchData();

        const interval = setInterval(() => {
            fetchData();
        }, 60000);

        return () => clearInterval(interval);
    }, [fetchData]);

    return { data, error, loading, state, refresh };
}
