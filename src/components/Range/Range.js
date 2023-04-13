import { useState, useRef } from "react";
import svg from "../../resources/svg/sprites.svg";
import useOutsideClick from "../../hooks/useOutsideClick";

const Range = ({
   className,
   onChangeFrom,
   onChangeBefore,
   fromValue,
   beforeValue,
   onRequest,
   onReset,
}) => {
   const [isOpen, setIsOpen] = useState(false);
   const ref = useRef(null);

   const openMenu = () => {
      setIsOpen(true);
   };

   const hideMenu = () => {
      setIsOpen(false);
   };

   useOutsideClick(ref, hideMenu);

   return (
      <div
         ref={ref}
         className={
            (className ? className : "") +
            "Range " +
            (isOpen ? "Range--open " : "")
         }
         tabIndex={0}
         onClick={isOpen ? hideMenu : openMenu}
         onKeyPress={(e) => {
            if ((e.key === " " && isOpen) || (e.key === "Enter" && isOpen)) {
               hideMenu();
            } else {
               openMenu();
            }
         }}
      >
         <span className={"Range__title"}>
            {!fromValue && !beforeValue ? "Created" : ""}
            {fromValue} {beforeValue}
         </span>
         {(fromValue || beforeValue) && (
            <div
               className="Range__remove"
               onClick={onReset}
               onKeyPress={(e) => {
                  if (e.key === " " || e.key === "Enter") {
                     onReset(e);
                  }
               }}
               tabIndex={0}
            >
               <svg className="icon__remove">
                  <use href={`${svg}#remove`}></use>
               </svg>
            </div>
         )}
         <div className="Range__arrow">
            <svg className="icon__arrow">
               <use href={`${svg}#arrow`}></use>
            </svg>
         </div>
         {isOpen && (
            <div
               className={
                  "Range__сontainer " +
                  (isOpen ? "Range__сontainer--open " : "")
               }
               onClick={(e) => e.stopPropagation()}
            >
               <div className="Range__inner">
                  <input
                     className="Range__input"
                     type="number"
                     name="from"
                     id="from"
                     placeholder="from"
                     onChange={(e) => onChangeFrom(e.target.value)}
                     value={fromValue}
                     onKeyPress={(e) => {
                        if (e.key === "Enter") {
                           const trimmedValue = e.target.value.trim();
                           onRequest({ created_gte: trimmedValue || null });
                        }
                     }}
                  />
                  <hr />
                  <input
                     className="Range__input"
                     type="number"
                     name="before"
                     id="before"
                     placeholder="before"
                     onChange={(e) => onChangeBefore(e.target.value)}
                     value={beforeValue}
                     onKeyPress={(e) => {
                        if (e.key === "Enter") {
                           const trimmedValue = e.target.value.trim();
                           onRequest({ created_lte: trimmedValue || null });
                        }
                     }}
                  />
               </div>
            </div>
         )}
      </div>
   );
};

export default Range;
