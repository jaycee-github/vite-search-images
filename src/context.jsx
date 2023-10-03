import { createContext, useContext, useState, useEffect } from "react";

const AppContext = createContext();

const getInitialDarkMode = () => {
    const prefersDarkMode = window.matchMedia(
        "(prefers-color-scheme:dark)"
    ).matches;
    // console.log(prefersDarkMode);

    // console.log(localStorage.getItem("darkTheme"));
    const storedDarkMode = localStorage.getItem("darkTheme") === "true";

    // Only works properly in Firefox since it has themes by default;
    return storedDarkMode || prefersDarkMode;

    // return storedDarkMode;
};

export const AppProvider = ({ children }) => {
    const [isDarkTheme, setIsDarkTheme] = useState(getInitialDarkMode());
    const [searchTerm, setSearchTerm] = useState("cat");

    const toggleDarkTheme = () => {
        const newDarkTheme = !isDarkTheme;
        setIsDarkTheme(newDarkTheme);

        // const body = document.querySelector("body");
        // body.classList.toggle("dark-theme", newDarkTheme);
        // console.log(body);

        localStorage.setItem("darkTheme", newDarkTheme);
    };

    useEffect(() => {
        document.body.classList.toggle("dark-theme", isDarkTheme);
    }, [isDarkTheme]);

    return (
        <AppContext.Provider
            value={{
                isDarkTheme,
                toggleDarkTheme,
                searchTerm,
                setSearchTerm,
            }}
        >
            {children}
        </AppContext.Provider>
    );
};

export const useGlobalContext = () => {
    return useContext(AppContext);
};
