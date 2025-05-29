import { Outlet } from "react-router-dom";
import Navbar from "@/components/Navbar";

const Layout = () => {
  return (
    <main className="bg-secondary min-h-svh">
      <Navbar />
      <Outlet />
    </main>
  );
};

export default Layout;
