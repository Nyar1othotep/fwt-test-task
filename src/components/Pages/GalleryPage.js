import { useState, useEffect, useCallback } from "react";
import useFWTService from "../../services/FWTService";

import Filters from "../Filters/Filters";
import Gallery from "../Gallery/Gallery";

import Pagination from "../Pagination/Pagination";

const GalleryPage = () => {
   const [authors, setAuthors] = useState([]);
   const [locations, setLocations] = useState([]);
   const [paintings, setPaintings] = useState([]);
   const [totalPaintings, setTotalPaintings] = useState(0);
   const [currentPage, setCurrentPage] = useState(1);
   const [filtersProcess, setFiltersProcess] = useState("waiting");
   const itemsPerPage = 10;

   const {
      getAllAuthors,
      getAllLocations,
      getAllPaintings,
      setProcess,
      process,
   } = useFWTService();

   useEffect(() => {
      onRequest();
      // eslint-disable-next-line
   }, []);

   const onRequest = () => {
      setFiltersProcess((filtersProcess) => "loading");
      Promise.all([
         getAllAuthors(),
         getAllLocations(),
         getAllPaintings(currentPage),
      ])
         .then(onDataLoaded)
         .then(() => {
            setProcess((process) => "confirmed");
            setFiltersProcess((filtersProcess) => "confirmed");
         });
   };

   const onPaintingsRequest = useCallback(
      (page) => {
         getAllPaintings(page)
            .then(onPaintingsLoaded)
            .then(() => setProcess((process) => "confirmed"));
      },
      // eslint-disable-next-line
      [authors, locations]
   );

   const onDataLoaded = ([authorsData, locationsData, paintingsData]) => {
      setAuthors(authorsData);
      setLocations(locationsData);
      setTotalPaintings(Math.ceil(paintingsData.totalCount / itemsPerPage));
      modifiedPaintingsData(authorsData, locationsData, paintingsData.data);
   };

   const onPaintingsLoaded = (paintingsData) => {
      modifiedPaintingsData(authors, locations, paintingsData.data);
   };

   const modifiedPaintingsData = (
      authorsData,
      locationsData,
      paintingsData
   ) => {
      const authorsObj = {};
      for (const author of authorsData) {
         authorsObj[author.id] = author.option;
      }

      const locationsObj = {};
      for (const location of locationsData) {
         locationsObj[location.id] = location.option;
      }

      const modifiedPaintings = paintingsData.map((painting) => ({
         ...painting,
         authorId: authorsObj[painting.authorId],
         locationId: locationsObj[painting.locationId],
      }));
      setPaintings((paintings) => modifiedPaintings);
   };

   return (
      <>
         <Pagination
            currentPage={currentPage}
            pagesAmount={totalPaintings}
            onChange={(value) => {
               setCurrentPage((currentPage) => value);
               onPaintingsRequest(value);
            }}
         />
         <Filters
            authors={authors}
            locations={locations}
            process={filtersProcess}
         />
         <Gallery paintings={paintings} process={process} />
      </>
   );
};

export default GalleryPage;
