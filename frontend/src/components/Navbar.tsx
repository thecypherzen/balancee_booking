import ContentWrapper from "@/components/ContentWrapper";
import { useCallback, useEffect, useState } from "react";

const Navbar = () => {
  const [isSticky, setIsSticky] = useState<boolean>(false);
  const handleScroll = useCallback(() => {
    if (window.scrollY > 50) {
      setIsSticky(true);
    } else {
      if (window.scrollY === 0) {
        setIsSticky(false);
      }
    }
  }, []);

  useEffect(() => {
    window.onscroll = handleScroll;
    handleScroll();
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [handleScroll]);
  return (
    <div
      className={`transition-all duration-500 py-4 shadow-md shadow-primary/5 ${isSticky ? "sticky top-0 z-20 bg-zinc-800 text-secondary shadow-none" : ""}`}
    >
      <ContentWrapper className="flex items-center justify-center">
        Nabar
      </ContentWrapper>
    </div>
  );
};

export default Navbar;
