import { createContext, useEffect, useState } from "react";
import { account } from "../api";


export const UserAuthContext = createContext();

export const UserProvider = ({ children }) => {
    const [user, setUser] = useState(null);

    const [isLoading, setIsLoading] = useState(true); // Track loading state

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const response = await account.get(); // Fetch user data
                setUser(response); // Set user data 
            } catch (error) {
                console.error("Error fetching user data:", error);
            } finally {
                setIsLoading(false); // Always set loading state to false after fetching
            }
        };

        fetchUserData();
    }, []);


    return (
        <UserAuthContext.Provider value={{ user, setUser, isLoading }}>
            {children}
        </UserAuthContext.Provider>
    );
};