import { Outlet } from "react-router-dom";
import Navbar from "@/components/Navbar";
import { useTheme } from "@/hooks/ThemeContext";

const Layout = () => {
  const { theme } = useTheme();

  return (
    <main
      className="bg-secondary dark:bg-zinc-900 min-h-svh"
      data-theme={`${theme}`}
    >
      <Navbar />
      <Outlet />
    </main>
  );
};

export default Layout;
