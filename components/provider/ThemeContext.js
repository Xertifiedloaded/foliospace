import { useEffect } from "react";

const useDarkMode = () => {
  useEffect(() => {
    const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;

    // Set the initial theme based on system preference
    if (prefersDark) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }

    // Listen for changes in system theme
    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
    const onChange = (e) => {
      if (e.matches) {
        document.documentElement.classList.add("dark");
      } else {
        document.documentElement.classList.remove("dark");
      }
    };

    mediaQuery.addEventListener("change", onChange);

    // Cleanup listener on unmount
    return () => mediaQuery.removeEventListener("change", onChange);
  }, []);
};

export default useDarkMode;
