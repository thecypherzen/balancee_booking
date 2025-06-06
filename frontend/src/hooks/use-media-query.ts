import { useEffect, useState } from "react";

type MediaQueryStatus = boolean | undefined;

const useMediaQuery = (query: string) => {
  const [matches, setMatches] = useState<MediaQueryStatus>(undefined);

  useEffect(() => {
    if (
      typeof window === "undefined" ||
      typeof window.matchMedia === "undefined"
    ) {
      return;
    }
    const mediaQueryList = window.matchMedia(query);
    const listener = (event: MediaQueryListEvent) => {
      setMatches(event.matches);
    };
    setMatches(mediaQueryList.matches);
    mediaQueryList.addEventListener("change", listener);

    return () => {
      mediaQueryList.removeEventListener("change", listener);
    };
  }, [query]);
  return matches;
};

export { useMediaQuery };
