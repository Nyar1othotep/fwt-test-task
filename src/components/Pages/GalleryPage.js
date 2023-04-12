import { useState, useEffect, useCallback, memo, useMemo } from "react";
import useFWTService from "../../services/FWTService";

import Filters from "../Filters/Filters";
import Gallery from "../Gallery/Gallery";
import PaginationControl from "../PaginationControl/PaginationControl";

const FiltersMemoized = memo(Filters);
const GalleryMemoized = memo(Gallery);

const GalleryPage = () => {
   const [paintings, setPaintings] = useState([]);
   const [authorsObj, setAuthorsObj] = useState({});
   const [locationsObj, setLocationsObj] = useState({});
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
      ({ page, q, authorId, locationId }) => {
         getPaintings(page, itemsPerPage, q, authorId, locationId)
            .then(onPaintingsLoaded)
            .then(() => setProcess("confirmed"));
      },
      // eslint-disable-next-line
      [authorsObj, locationsObj]
   );

   const onDataLoaded = ([authorsData, locationsData, paintingsData]) => {
      setAuthorsObj((authorsObj) => modifiedObj(authorsData));
      setLocationsObj((locationsObj) => modifiedObj(locationsData));
      modifiedPaintingsData(
         modifiedObj(authorsData),
         modifiedObj(locationsData),
         paintingsData
      );
   };

   const onPaintingsLoaded = (paintingsData) => {
      modifiedPaintingsData(authorsObj, locationsObj, paintingsData);
   };

   const modifiedObj = useMemo(() => {
      return (data) => {
         const obj = {};
         for (const item of data) {
            obj[item.id] = {
               id: item.id,
               option: item.option,
            };
         }
         return obj;
      };
   }, []);

   const modifiedPaintingsData = useCallback(
      (authorsObj, locationsObj, paintingsData) => {
         setTotalPaintings(Math.ceil(paintingsData.totalCount / itemsPerPage));

         const modifiedData = paintingsData.data.map((painting) => ({
            ...painting,
            authorId: authorsObj[painting.authorId],
            locationId: locationsObj[painting.locationId],
         }));
         setPaintings((paintings) => modifiedData);
      },
      // eslint-disable-next-line
      [itemsPerPage]
   );

   return (
      <>
         <FiltersMemoized
            authors={authorsObj}
            locations={locationsObj}
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
