import { useEffect, useRef } from "react";

const Spinner = ({ width, height }) => {
   const spinner = useRef(null);

   useEffect(() => {
      spinner.current.style.setProperty("--spinner-width", width + "px");
      spinner.current.style.setProperty("--spinner-height", height + "px");
      // eslint-disable-next-line
   }, []);

   return (
      <div className="spinner" ref={spinner}>
         <div className="spinner__wrapper">
            <div></div>
         </div>
      </div>
   );
};

export default Spinner;
