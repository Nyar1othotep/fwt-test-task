const PaginationPage = ({ className, ariaLabel, ...other }) => {
   return (
      <button
         type="button"
         className={(className ? className : "") + "PaginationPage"}
         {...other}
         aria-label={ariaLabel}
      />
   );
};

export default PaginationPage;
