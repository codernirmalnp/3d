import { createContext, useEffect, useState } from "react";
import { account } from "../api";


export const UserAuthContext = createContext();

export const UserProvider = ({ children }) => {

    const database = import.meta.env.VITE_APP_DATABASE_ID
    const certificate_bucket = import.meta.env.VITE_APP_CERTIFICATE_BUCKET
    const certificate_collection = import.meta.env.VITE_APP_CERTIFICATE_COLLECTION
    const project_collection = import.meta.env.VITE_APP_PROJECT_COLLECTION
    const project_bucket = import.meta.env.VITE_APP_PROJECT_BUCKET
    const tag_collection = import.meta.env.VITE_APP_TAG_COLLECTION
    const credentials = {
        database,
        certificate_bucket,
        certificate_collection,
        project_collection,
        project_bucket,
        tag_collection

    }
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

        if (window.location.pathname === '/') {
            return;
        }

        fetchUserData();
    }, [window]);


    return (
        <UserAuthContext.Provider value={{ user, setUser, isLoading,credentials }}>
            {children}
        </UserAuthContext.Provider>
    );
};