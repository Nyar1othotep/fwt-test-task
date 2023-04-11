import PaginationPage from "../PaginationPage/PaginationPage";

const PaginationPageWithActive = ({ isActive, className, ...other }) => {
   return (
      <PaginationPage
         className={
            (className ? className : "") +
            (isActive ? "PaginationPageWithActive " : "")
         }
         disabled={isActive}
         {...other}
      />
   );
};

export default PaginationPageWithActive;
