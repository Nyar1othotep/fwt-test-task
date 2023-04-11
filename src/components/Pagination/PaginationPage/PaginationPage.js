const PaginationPage = ({ className, ...other }) => {
   return (
      <button
         type="button"
         className={(className ? className : "") + "PaginationPage"}
         {...other}
      />
   );
};

export default PaginationPage;
