import svg from "../../resources/svg/sprites.svg";

const Input = ({ className, value, onReset, ...other }) => {
   return (
      <div className="Input__wrapper">
         <input className={(className, "Input")} value={value} {...other} />
         {value && (
            <div
               className="Input__remove"
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
      </div>
   );
};

export default Input;
