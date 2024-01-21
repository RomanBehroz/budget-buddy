import React, {createContext, ReactNode, useContext} from 'react';


export interface User {
    username: string;
    // Add other user properties as needed
}

interface UserContextType {
    user: User | null;
    loginUser: (user: User) => void;
    logoutUser: () => void;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

interface UserProviderProps {
    children: ReactNode;
}

export const UserProvider: React.FC<UserProviderProps> = ({ children }) => {
    const [user, setUser] = React.useState<User | null>(null);

    const loginUser = (loggedInUser: User) => {
        setUser(loggedInUser);
    };

    const logoutUser = () => {
        setUser(null);
        sessionStorage.removeItem('user');
    };

    return (
        <UserContext.Provider value={{ user, loginUser, logoutUser }}>
            {children}
        </UserContext.Provider>
    );
};

export const useUser = (): UserContextType => {
    const context = useContext(UserContext);
    if (!context) {
        throw new Error('useUser must be used within a UserProvider');
    }
    return context;
};