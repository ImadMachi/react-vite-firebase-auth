// import { useState, useEffect, ReactNode, createContext } from "react";

// export interface IThemeContext {
//   themeMode: string;
//   setThemeMode: React.Dispatch<React.SetStateAction<string>>;
// }

// export const ThemeContext = createContext<IThemeContext>({ themeMode: "light", setThemeMode: () => {} });

// interface IThemeProviderNode {
//   children: ReactNode;
// }

// export const ThemeProvider = ({ children }: IThemeProviderNode) => {
//   const [themeMode, setThemeMode] = useState<string>(() => localStorage.getItem("themeMode") || "light");

//   useEffect(() => {
//     localStorage.setItem("themeMode", themeMode);
//     if (themeMode === "light") {
//       document.body.classList.add("dark-mode");
//       document.body.classList.remove("light-mode");
//     } else {
//       document.body.classList.add("light-mode");
//       document.body.classList.remove("dark-mode");
//     }
//   }, [themeMode]);

//   return <ThemeContext.Provider value={{ themeMode, setThemeMode }}>{children}</ThemeContext.Provider>;
// };

export {};
