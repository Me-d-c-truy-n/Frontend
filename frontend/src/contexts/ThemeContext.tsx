import { ReactNode, createContext, useEffect } from "react";
import { useLocalStorageState } from "../hooks/useLocalStorageState";
import { THEME } from "../types/theme";

interface ThemeContextType {
  theme: THEME;
  changeTheme: (newTheme: string) => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

interface ThemeProviderProps {
  children: ReactNode;
}

const ThemeProvider: React.FC<ThemeProviderProps> = ({children}) =>{
  const [theme, setTheme] = useLocalStorageState({
    key: 'theme',
    initialState: THEME.LIGHT,
  });

  function changeTheme(newTheme: string) {
    setTheme(newTheme);
  }

  useEffect(() =>{
    if (theme === 'dark') {
      document.documentElement.classList.add('dark')
    } else {
      document.documentElement.classList.remove('dark')
    }
  },[theme])

  return (
    <ThemeContext.Provider
      value={{ theme, changeTheme }}
    >
      {children}
    </ThemeContext.Provider>
  );
}

export { ThemeContext, ThemeProvider };