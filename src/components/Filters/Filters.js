import { useState, useCallback } from "react";
import useFWTService from "../../services/FWTService";
import Select from "../Select/Select";
import Input from "../Input/Input";
import Range from "../Range/Range";
import Spinner from "../Spinner/Spinner";
import ErrorMessage from "../ErrorMessage/ErrorMessage";

const Filters = () => {
   const [inputValue, setInputValue] = useState("");
   const [selectLocationsValue, setSelectLocationsValue] = useState("Location");
   const [selectAuthorsValue, setSelectAuthorsValue] = useState("Author");
   const [fromValue, setFromValue] = useState("");
   const [beforeValue, setBeforeValue] = useState("");
   const [authors, setAuthors] = useState([]);
   const [locations, setLocations] = useState([]);

   const { getAllAuthors, getAllLocations, setProcess, process } =
      useFWTService();

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
               <Input
                  placeholder="Name"
                  value={inputValue}
                  onChange={(e) =>
                     setInputValue((inputValue) => e.target.value)
                  }
               />

               <Select
                  onChange={(name) =>
                     setSelectAuthorsValue((selectAuthorsValue) => name)
                  }
                  onClick={() => onRequest(getAllAuthors, setAuthors, authors)}
                  options={authors}
                  value={selectAuthorsValue}
                  Spinner={Spinner}
                  ErrorMessage={ErrorMessage}
                  process={process}
               />

               <Select
                  onChange={(name) =>
                     setSelectLocationsValue((selectLocationsValue) => name)
                  }
                  onClick={() =>
                     onRequest(getAllLocations, setLocations, locations)
                  }
                  options={locations}
                  value={selectLocationsValue}
                  Spinner={Spinner}
                  ErrorMessage={ErrorMessage}
                  process={process}
               />

               <Range
                  onChangeFrom={(value) => setFromValue((fromValue) => value)}
                  onChangeBefore={(value) =>
                     setBeforeValue((beforeValue) => value)
                  }
                  fromValue={fromValue}
                  beforeValue={beforeValue}
               />
            </div>
         </div>
      </div>
   );
};

export default Filters;
