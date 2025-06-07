import ContentWrapper from "@/components/ContentWrapper";
import { useCallback, useEffect, useState } from "react";
import { useTheme } from "@/hooks/ThemeContext";
import { Sun, Moon } from "lucide-react";

const Navbar = () => {
  // states
  const [isSticky, setIsSticky] = useState<boolean>(false);
  const { theme, setTheme } = useTheme();

  // scroll position tracker
  const handleScroll = useCallback(() => {
    if (window.scrollY > 50) {
      setIsSticky(true);
    } else {
      if (window.scrollY === 0) {
        setIsSticky(false);
      }
    }
  }, []);

  // theme toggle handler
  const toggleTheme = () => {
    const newTheme = theme == "light" ? "dark" : "light";
    setTheme(newTheme);
    window.localStorage.setItem("balancee_theme", newTheme);
  };

  // track scroll changes effect
  useEffect(() => {
    window.onscroll = handleScroll;
    handleScroll();
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [handleScroll]);

  return (
    <div
      className={`transition-all duration-500 py-4 shadow-md dark:shadow-xl shadow-black/5 dark:shadow-black/20 bg-white dark:bg-zinc-900 ${isSticky ? "sticky top-0 z-20 text-zinc-900 dark:text-secondary" : ""}`}
    >
      <ContentWrapper className="flex items-center justify-center gap-2">
        <div
          className="shadow-none size-8 text-primary/90 bg-zinc-100 hover:bg-zinc-200 dark:bg-zinc-200 dark:hover:bg-zinc-100 p-[5px] rounded-sm flex flex-col items-center justify-center cursor-pointer"
          onClick={toggleTheme}
        >
          {theme === "light" ? (
            <Sun strokeWidth="2.2px" size="40px" />
          ) : (
            <Moon strokeWidth="2.2px" size="40px" />
          )}
        </div>
      </ContentWrapper>
    </div>
  );
};

export default Navbar;
