import { useState, useCallback } from "react";
import useFWTService from "../../services/FWTService";
import Select from "../Select/Select";

const Filters = () => {
   const [selectValue, setSelectValue] = useState("Author");
   const [authors, setAuthors] = useState([]);

   const { getAllAuthors, setProcess, process } = useFWTService();

   const onRequest = useCallback((getFunc, setLoadedData, loadedData) => {
      getFunc()
         .then((data) => setLoadedData((loadedData) => data))
         .then(() => setProcess("confirmed"));
      // eslint-disable-next-line
   }, []);

   return (
      <div className="filters">
         <div className="filters__container _container">
            <div className="filters__body">
               <Select
                  className="author"
                  onChange={(name) => setSelectValue((selectValue) => name)}
                  onClick={() => onRequest(getAllAuthors, setAuthors, authors)}
                  options={authors}
                  value={selectValue}
                  spinner="true"
                  error="true"
                  process={process}
               />
            </div>
         </div>
      </div>
   );
};

export default Filters;
