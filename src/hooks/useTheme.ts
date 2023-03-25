import { useEffect, useState } from "react";

type Theme = "light" | "dark";

const useTheme = () => {
  const [theme, setTheme] = useState<Theme>(() => (localStorage.getItem("theme") as Theme) || "light");

  useEffect(() => {
    localStorage.setItem("theme", theme);
    if (theme === "light") {
      document.body.dataset.theme = "light";
    } else if (theme === "dark") {
      document.body.dataset.theme = "dark";
    }
  }, [theme]);

  const toggleTheme = () => {
    setTheme(theme === "light" ? "dark" : "light");
  };

  return { toggleTheme };
};

export default useTheme;
