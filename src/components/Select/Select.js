import { useRef, useState, memo } from "react";
import svg from "../../resources/svg/sprites.svg";
import useOutsideClick from "../../hooks/useOutsideClick";
import SimpleBar from "simplebar-react";

const Select = memo(
   ({
      className,
      disabled = false,
      options = [],
      initialValue,
      value,
      onChange,
      onClick = () => null,
      Spinner = false,
      ErrorMessage = false,
      process = "confirmed",
      onReset,
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
               if (
                  (e.key === " " && !disabled) ||
                  (e.key === "Enter" && !disabled)
               ) {
                  if (shouldLog.current && options.length === 0) {
                     shouldLog.current = false;
                     onClick();
                  }
                  toggleOpen();
               }
            }}
            tabIndex={0}
         >
            <span className="Select__title">
               {value ? value : initialValue}
            </span>
            {value && (
               <div className="Select__remove" onClick={onReset}>
                  <svg className="icon__remove">
                     <use href={`${svg}#remove`}></use>
                  </svg>
               </div>
            )}
            <div className="Select__arrow">
               <svg className="icon__arrow">
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
                     ) : options.length === 0 ? (
                        <span>No options yet.</span>
                     ) : (
                        Object.keys(options).map((key) => {
                           return (
                              <li
                                 onClick={() => onChange(options[key])}
                                 onKeyPress={(e) => {
                                    if (e.key === " " || e.key === "Enter") {
                                       onChange(options[key]);
                                    }
                                 }}
                                 className={"Select__option "}
                                 key={options[key].id}
                                 tabIndex={0}
                              >
                                 <p className="Select__optionName">
                                    {options[key].option}
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
   }
);

export default Select;
