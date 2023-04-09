import { useState, useEffect } from "react";
import useFWTService from "../../services/FWTService";

import Filters from "../Filters/Filters";
import Gallery from "../Gallery/Gallery";

const GalleryPage = () => {
   const [authors, setAuthors] = useState([]);
   const [locations, setLocations] = useState([]);
   const [paintings, setPaintings] = useState([]);

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
      Promise.all([getAllAuthors(), getAllLocations(), getAllPaintings()])
         .then(onDataLoaded)
         .then(() => setProcess("confirmed"));
   };

   const onDataLoaded = ([authorsData, locationsData, paintingsData]) => {
      const authorsObj = {};
      authorsData.forEach((author) => {
         authorsObj[author.id] = author.option;
      });
      setAuthors((authors) => authorsData);

      const locationsObj = {};
      locationsData.forEach((location) => {
         locationsObj[location.id] = location.option;
      });
      setLocations((locations) => locationsData);

      const modifiedPaintings = paintingsData.map((painting) => ({
         ...painting,
         authorId: authorsObj[painting.authorId],
         locationId: locationsObj[painting.locationId],
      }));
      setPaintings((paintings) => modifiedPaintings);
   };

   return (
      <>
         <Filters authors={authors} locations={locations} process={process} />
         <Gallery paintings={paintings} process={process} />
      </>
   );
};

export default GalleryPage;
