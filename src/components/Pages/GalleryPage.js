import { useState, useEffect, useCallback, memo } from "react";
import useFWTService from "../../services/FWTService";

import Filters from "../Filters/Filters";
import Gallery from "../Gallery/Gallery";
import PaginationControl from "../PaginationControl/PaginationControl";

const FiltersMemoized = memo(Filters);
const GalleryMemoized = memo(Gallery);

const GalleryPage = () => {
   const [authors, setAuthors] = useState([]);
   const [locations, setLocations] = useState([]);
   const [paintings, setPaintings] = useState([]);
   const [totalPaintings, setTotalPaintings] = useState(0);
   const [currentPage, setCurrentPage] = useState(1);
   const [filtersProcess, setFiltersProcess] = useState("waiting");
   const itemsPerPage = 12;

   const { getAllAuthors, getAllLocations, getPaintings, setProcess, process } =
      useFWTService();

   useEffect(() => {
      onRequest();
      // eslint-disable-next-line
   }, []);

   const onRequest = () => {
      setFiltersProcess("loading");
      Promise.all([
         getAllAuthors(),
         getAllLocations(),
         getPaintings(currentPage),
      ])
         .then(onDataLoaded)
         .then(() => {
            setProcess("confirmed");
            setFiltersProcess("confirmed");
         });
   };

   const onPaintingsRequest = useCallback(
      ({ page, authorId, locationId }) => {
         getPaintings(page, itemsPerPage, authorId, locationId)
            .then(onPaintingsLoaded)
            .then(() => setProcess("confirmed"));
      },
      // eslint-disable-next-line
      [authors, locations]
   );

   const onDataLoaded = ([authorsData, locationsData, paintingsData]) => {
      setAuthors(authorsData);
      setLocations(locationsData);
      modifiedPaintingsData(authorsData, locationsData, paintingsData);
   };

   const onPaintingsLoaded = (paintingsData) => {
      modifiedPaintingsData(authors, locations, paintingsData);
   };

   const modifiedPaintingsData = useCallback(
      (authorsData, locationsData, paintingsData) => {
         setTotalPaintings(Math.ceil(paintingsData.totalCount / itemsPerPage));

			// Все еще нужно оптмизировать объекты
         const authorsObj = authorsData.reduce(
            (obj, author) => ({
               ...obj,
               [author.id]: {
                  id: author.id,
                  option: author.option,
               },
            }),
            {}
         );

         const locationsObj = locationsData.reduce(
            (obj, location) => ({
               ...obj,
               [location.id]: {
                  id: location.id,
                  option: location.option,
               },
            }),
            {}
         );

         const modifiedPaintings = paintingsData.data.map((painting) => ({
            ...painting,
            authorId: authorsObj[painting.authorId],
            locationId: locationsObj[painting.locationId],
         }));
         setPaintings((paintings) => modifiedPaintings);
      },
      [itemsPerPage]
   );

   return (
      <>
         <FiltersMemoized
            authors={authors}
            locations={locations}
            process={filtersProcess}
            onRequest={onPaintingsRequest}
         />

         <GalleryMemoized paintings={paintings} process={process} />

         <PaginationControl
            currentPage={totalPaintings === 1 ? 1 : currentPage}
            setPage={setCurrentPage}
            totalPaintings={totalPaintings}
            onRequest={onPaintingsRequest}
            process={process}
         />
      </>
   );
};

export default GalleryPage;
