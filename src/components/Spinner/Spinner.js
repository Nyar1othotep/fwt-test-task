import { useEffect } from "react";

const Spinner = ({ width, height }) => {
   let root = document.documentElement;

   useEffect(() => {
      root.style.setProperty("--spinner-width", width + "px");
      root.style.setProperty("--spinner-height", height + "px");
      // eslint-disable-next-line
   }, []);

   return (
      <div class="spinner">
         <div class="spinner__wrapper">
            <div></div>
         </div>
      </div>
   );
};

export default Spinner;
