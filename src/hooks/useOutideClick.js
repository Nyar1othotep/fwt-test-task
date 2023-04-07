import { useEffect } from "react";

const useOutsideClick = (ref, handler) => {
   useEffect(() => {
      const handleClickOutside = (event) => {
         if (ref.current && !ref.current.contains(event.target)) {
            handler();
         }
      };
      document.addEventListener("mousedown", handleClickOutside);

      return () => {
         document.removeEventListener("mousedown", handleClickOutside);
      };
      // eslint-disable-next-line
   }, [ref]);
};

export default useOutsideClick;
