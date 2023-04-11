import PaginationPage from "./PaginationPage/PaginationPage";
import PaginationPageWithActive from "./PaginationPageWithActive/PaginationPageWithActive";
import usePaginationSlice from "../../hooks/usePaginationSlice";
import svg from "../../resources/svg/sprites.svg";

const Pagination = ({ currentPage, pagesAmount, className, onChange }) => {
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
      <div className={(className, "Pagination")}>
         <PaginationPage {...leftArrowProps} onClick={() => onChange(1)}>
            <svg className="icon__p-doubleArrow">
               <use href={`${svg}#p-doubleArrow`}></use>
            </svg>
         </PaginationPage>
         <PaginationPage
            {...leftArrowProps}
            onClick={() => onChange(currentPage - 1)}
         >
            <svg className="icon__p-arrow">
               <use href={`${svg}#p-arrow`}></use>
            </svg>
         </PaginationPage>

         {slicedPagesArray.map((el) => (
            <PaginationPageWithActive
               onClick={() => onChange(el)}
               isActive={currentPage === el}
               key={el}
            >
               {el}
            </PaginationPageWithActive>
         ))}
         <PaginationPage
            {...rightArrowProps}
            onClick={() => onChange(currentPage + 1)}
         >
            <svg className="icon__p-arrow icon__p-arrow--r">
               <use href={`${svg}#p-arrow`}></use>
            </svg>
         </PaginationPage>
         <PaginationPage
            {...rightArrowProps}
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
