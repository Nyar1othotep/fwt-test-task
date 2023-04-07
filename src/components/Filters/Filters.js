import { useState, useCallback, useRef } from "react";
import useFWTService from "../../services/FWTService";
import setContent from "../../utils/setContent";
import Select from "../Select/Select";

const Filters = () => {
   const [selectValue, setSelectValue] = useState("Author");
   const [authors, setAuthors] = useState([]);
   const shouldLog = useRef(true);

   const { getAllAuthors, setProcess, process } = useFWTService();

   const onRequestAuthors = useCallback(() => {
      getAllAuthors()
         .then(onAuthorsLoaded)
         .then(() => setProcess("confirmed"));
      // eslint-disable-next-line
   }, []);

   const onAuthorsLoaded = (data) => {
      setAuthors((authors) => data);
   };

	// Доделать setContent, его скроее всего в сам select

   return (
      <div className="filters">
         <div className="filters__container _container">
            <div className="filters__body">
               <Select
                  className="author"
                  onChange={(name) => {
                     setSelectValue((selectValue) => name);
                  }}
                  onClick={(isClick) => {
                     if (isClick && shouldLog.current) {
                        shouldLog.current = false;
                        onRequestAuthors();
                     }
                  }}
                  options={authors}
                  value={selectValue}
               />
            </div>
         </div>
      </div>
   );
};

export default Filters;
