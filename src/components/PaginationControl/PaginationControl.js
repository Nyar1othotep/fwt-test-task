import Pagination from "../Pagination/Pagination";

const PaginationControl = ({
   currentPage,
   totalPaintings,
   setPage,
   onRequest,
   process,
}) => {
   return (
      <div className="pagination-control">
         <div className="pagination-control__container _container">
            <div className="pagination-control__body">
               <Pagination
                  currentPage={currentPage}
                  pagesAmount={totalPaintings}
                  onChange={(value) => {
                     setPage((currentPage) => value);
                     onRequest({ page: value });
                  }}
                  process={process}
               />
            </div>
         </div>
      </div>
   );
};

export default PaginationControl;
