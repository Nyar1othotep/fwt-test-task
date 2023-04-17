import PaginationPage from "./PaginationPage/PaginationPage";
import PaginationPageWithActive from "./PaginationPageWithActive/PaginationPageWithActive";
import usePaginationSlice from "../../hooks/usePaginationSlice";
import svg from "../../resources/svg/sprites.svg";

const Pagination = ({
   currentPage,
   pagesAmount,
   className,
   onChange,
   process = "confirmed",
}) => {
   const slicedPagesArray = usePaginationSlice({
      current: currentPage,
      amount: pagesAmount,
   });

   const leftArrowProps = {
      disabled: currentPage < 2,
   };

   const rightArrowProps = {
      disabled: currentPage >= pagesAmount,
   };

   return (
      <div
         className={
            (className, "Pagination") +
            (process === "loading" ? " disabled" : "")
         }
         style={process === "loading" ? { pointerEvents: "none" } : {}}
      >
         <PaginationPage
            {...leftArrowProps}
            ariaLabel="first page"
            onClick={() => onChange(1)}
         >
            <svg className="icon__p-doubleArrow">
               <use href={`${svg}#p-doubleArrow`}></use>
            </svg>
         </PaginationPage>
         <PaginationPage
            {...leftArrowProps}
            ariaLabel="next page"
            onClick={() => onChange(currentPage - 1)}
         >
            <svg className="icon__p-arrow">
               <use href={`${svg}#p-arrow`}></use>
            </svg>
         </PaginationPage>

         {slicedPagesArray.map((el) => (
            <PaginationPageWithActive
               onClick={() => onChange(el)}
               isActive={currentPage === el || pagesAmount === 1}
               key={el}
            >
               {el}
            </PaginationPageWithActive>
         ))}
         <PaginationPage
            {...rightArrowProps}
            ariaLabel="previous page"
            onClick={() => onChange(currentPage + 1)}
         >
            <svg className="icon__p-arrow icon__p-arrow--r">
               <use href={`${svg}#p-arrow`}></use>
            </svg>
         </PaginationPage>
         <PaginationPage
            {...rightArrowProps}
            ariaLabel="last page"
            onClick={() => onChange(pagesAmount)}
         >
            <svg className="icon__p-doubleArrow icon__p-doubleArrow--r">
               <use href={`${svg}#p-doubleArrow`}></use>
            </svg>
         </PaginationPage>
      </div>
   );
};
export default Pagination;
