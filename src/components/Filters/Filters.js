import { useState, memo } from "react";
import Select from "../Select/Select";
import Input from "../Input/Input";
import Range from "../Range/Range";
import Spinner from "../Spinner/Spinner";
import ErrorMessage from "../ErrorMessage/ErrorMessage";

const SelectMemoized = memo(Select);

const Filters = ({ authors, locations, process, onRequest }) => {
   const [inputValue, setInputValue] = useState("");
   const [selectLocationsValue, setSelectLocationsValue] = useState("");
   const [selectAuthorsValue, setSelectAuthorsValue] = useState("");
   const [fromValue, setFromValue] = useState("");
   const [beforeValue, setBeforeValue] = useState("");

   return (
      <div className="filters">
         <div className="filters__container _container">
            <div className="filters__body">
               <Input
                  placeholder="Name"
                  value={inputValue}
                  onChange={(e) => {
                     setInputValue((inputValue) => e.target.value);
                  }}
                  onKeyPress={(e) => {
                     if (e.key === "Enter") {
                        const trimmedValue = inputValue.trim();
                        onRequest({ q: trimmedValue || null });
                     }
                  }}
                  onReset={(event) => {
                     setInputValue((inputValue) => "");
                     onRequest({ q: null });
                  }}
               />

               <SelectMemoized
                  onChange={(option) => {
                     setSelectAuthorsValue(
                        (selectAuthorsValue) => option.option
                     );
                     onRequest({ authorId: option.id });
                  }}
                  options={authors}
                  initialValue="Authors"
                  value={selectAuthorsValue}
                  Spinner={Spinner}
                  ErrorMessage={ErrorMessage}
                  process={process}
                  onReset={(event) => {
                     event.stopPropagation();
                     setSelectAuthorsValue((selectAuthorsValue) => "");
                     onRequest({ authorId: null });
                  }}
               />

               <SelectMemoized
                  onChange={(option) => {
                     setSelectLocationsValue(
                        (selectLocationsValue) => option.option
                     );
                     onRequest({ locationId: option.id });
                  }}
                  options={locations}
                  initialValue="Locations"
                  value={selectLocationsValue}
                  Spinner={Spinner}
                  ErrorMessage={ErrorMessage}
                  process={process}
                  onReset={(event) => {
                     event.stopPropagation();
                     setSelectLocationsValue((selectLocationsValue) => "");
                     onRequest({ locationId: null });
                  }}
               />

               <Range
                  onChangeFrom={(value) => setFromValue((fromValue) => value)}
                  onChangeBefore={(value) =>
                     setBeforeValue((beforeValue) => value)
                  }
                  fromValue={fromValue}
                  beforeValue={beforeValue}
                  onRequest={onRequest}
                  onReset={(event) => {
                     event.stopPropagation();
                     setFromValue((fromValue) => "");
                     setBeforeValue((beforeValue) => "");
                     onRequest({ created_gte: null, created_lte: null });
                  }}
               />
            </div>
         </div>
      </div>
   );
};

export default Filters;
