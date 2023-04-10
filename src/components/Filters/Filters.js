import { useState, memo } from "react";
import Select from "../Select/Select";
import Input from "../Input/Input";
import Range from "../Range/Range";
import Spinner from "../Spinner/Spinner";
import ErrorMessage from "../ErrorMessage/ErrorMessage";

const Filters = memo(({ authors, locations, process }) => {
   const [inputValue, setInputValue] = useState("");
   const [selectLocationsValue, setSelectLocationsValue] = useState("Location");
   const [selectAuthorsValue, setSelectAuthorsValue] = useState("Author");
   const [fromValue, setFromValue] = useState("");
   const [beforeValue, setBeforeValue] = useState("");

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
});

export default Filters;
