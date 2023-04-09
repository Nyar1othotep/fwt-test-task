import { useRef, useState } from "react";
import svg from "../../resources/svg/sprites.svg";
import useOutsideClick from "../../hooks/useOutideClick";
import SimpleBar from "simplebar-react";

const Select = ({
   className,
   disabled = false,
   options,
   value,
   onChange,
   onClick,
   Spinner = false,
   ErrorMessage = false,
   process = "confirmed",
}) => {
   const [isOpen, setIsOpen] = useState(false);
   const ref = useRef(null);
   const shouldLog = useRef(true);
   const toggleOpen = () => setIsOpen((prev) => !prev);

   useOutsideClick(ref, toggleOpen);

   return (
      <div
         ref={isOpen ? ref : null}
         className={
            (className ? className : "") +
            "Select " +
            (isOpen ? "Select--open " : "")
         }
         onClick={() => {
            if (!disabled) {
               if (shouldLog.current && options.length === 0) {
                  shouldLog.current = false;
                  onClick();
               }
               toggleOpen();
            }
         }}
         onKeyPress={(e) => {
            if (e.key === " " || (e.key === "Enter" && !disabled)) {
               if (shouldLog.current && options.length === 0) {
                  shouldLog.current = false;
                  onClick();
               }
               toggleOpen();
            }
         }}
         tabIndex={0}
      >
         {!value && <span className="Select__title">Choose an option</span>}
         <span className="Select__title">{value}</span>
         <div className="Select__arrow">
            <svg width={10} height={6}>
               <use href={`${svg}#arrow`}></use>
            </svg>
         </div>
         {isOpen && options && (
            <ul
               className={
                  "Select__optionContainer " +
                  (isOpen ? "Select__optionContainer--open " : "")
               }
            >
               <SimpleBar style={{ maxHeight: "inherit" }}>
                  {Spinner && process === "loading" ? (
                     <Spinner width="50" height="50" />
                  ) : ErrorMessage && process === "error" ? (
                     <ErrorMessage />
                  ) : (
                     options.map((option) => {
                        return (
                           <li
                              onClick={() => onChange(option.name)}
                              onKeyPress={(e) => {
                                 if (e.key === " " || e.key === "Enter") {
                                    onChange(option.name);
                                 }
                              }}
                              className={"Select__option "}
                              key={option.id}
                              tabIndex={0}
                           >
                              <p className="Select__optionName">
                                 {option.name}
                              </p>
                           </li>
                        );
                     })
                  )}
               </SimpleBar>
            </ul>
         )}
      </div>
   );
};

export default Select;
