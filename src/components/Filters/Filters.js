import { useState } from "react";
import { Input, Select } from "fwt-internship-uikit";

const Filters = () => {
   const [selectValue, setSelectValue] = useState("Author");

   return (
      <div className="filters">
         <div className="filters__container _container">
            <div className="filters__body">
               <Input placeholder="Name" />
               <Select
                  className="author"
                  onChange={(name) => {
                     setSelectValue((selectValue) => name);
                  }}
                  options={[
                     {
                        id: 1,
                        name: "Ivan Aivazovsky",
                     },
                     {
                        id: 2,
                        name: "François Boucher",
                     },
                     {
                        id: 3,
                        name: "Leonardo da Vinci",
                     },
                     {
                        id: 4,
                        name: "Edvard Munch",
                     },
                     {
                        id: 5,
                        name: "Rembrandt Harmenszoon van Rijn Gueerrj",
                     },
                     {
                        id: 6,
                        name: "Vincent van Gogh",
                     },
                     {
                        id: 7,
                        name: "Sandro Botticelli",
                     },
                     {
                        id: 8,
                        name: "Ivan Shishkin",
                     },
                     {
                        id: 9,
                        name: "Peter Paul Rubens",
                     },
                  ]}
                  value={selectValue}
               />
            </div>
         </div>
      </div>
   );
};

export default Filters;
