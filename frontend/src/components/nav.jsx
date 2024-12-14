import { useEffect } from "react";

const usePreventBackNavigation = () => {
  useEffect(() => {
    // Replace the current history state to block backward navigation
    window.history.pushState(null, document.title, window.location.href);
    
    // Listen for popstate event, which is triggered on back or forward navigation
    const handlePopState = (event) => {
      window.history.pushState(null, document.title, window.location.href);
    };

    window.addEventListener("popstate", handlePopState);

    return () => {
      // Clean up the event listener when the component unmounts
      window.removeEventListener("popstate", handlePopState);
    };
  }, []);
};

export default usePreventBackNavigation;
