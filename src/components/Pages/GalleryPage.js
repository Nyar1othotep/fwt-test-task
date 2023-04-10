import { useState, useEffect } from "react";
import useFWTService from "../../services/FWTService";

import Filters from "../Filters/Filters";
import Gallery from "../Gallery/Gallery";

const GalleryPage = () => {
   const [authors, setAuthors] = useState([]);
   const [locations, setLocations] = useState([]);
   const [paintings, setPaintings] = useState([]);
   const [totalPaintings, setTotalPaintings] = useState(0);
   const [filtersProcess, setFiltersProcess] = useState("waiting");

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
      Promise.all([getAllAuthors(), getAllLocations(), getAllPaintings()])
         .then(onDataLoaded)
         .then(() => {
            setProcess((process) => "confirmed");
            setFiltersProcess((filtersProcess) => "confirmed");
         });
   };

   const onPaintingsRequest = (page) => {
      getAllPaintings(page)
         .then(onPaintingsLoaded)
         .then(() => setProcess((process) => "confirmed"));
   };

   const onDataLoaded = ([authorsData, locationsData, paintingsData]) => {
      setAuthors(authorsData);
      setLocations(locationsData);
      setTotalPaintings(paintingsData.totalCount);
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
      authorsData.forEach((author) => {
         authorsObj[author.id] = author.option;
      });

      const locationsObj = {};
      locationsData.forEach((location) => {
         locationsObj[location.id] = location.option;
      });

      const modifiedPaintings = paintingsData.map((painting) => ({
         ...painting,
         authorId: authorsObj[painting.authorId],
         locationId: locationsObj[painting.locationId],
      }));
      setPaintings((paintings) => modifiedPaintings);
   };

   return (
      <>
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
