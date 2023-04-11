import { useHttp } from "../hooks/http.hook";
import queryString from "query-string";

const useFWTService = () => {
   const { request, process, setProcess } = useHttp();

   const _apiBase = "https://test-front.framework.team/";
   const _basePage = 1;
   const _baseLimit = 12;
   const urlDependencies = {};

   const getAllAuthors = async () => {
      const { data } = await request(`${_apiBase}authors`);
      return data.map(_transfromAuthors);
   };

   const getAllLocations = async () => {
      const { data } = await request(`${_apiBase}locations`);
      return data.map(_transfromLocations);
   };

   const getPaintings = async (
      page = _basePage,
      limit = _baseLimit,
      authorId,
      locationId
   ) => {
      if (authorId === null) {
         delete urlDependencies.authorId;
      } else if (authorId) {
         urlDependencies.authorId = authorId;
      }

      if (locationId === null) {
         delete urlDependencies.locationId;
      } else if (locationId) {
         urlDependencies.locationId = locationId;
      }

      const queryParams = queryString.stringify(urlDependencies, {
         skipEmptyString: true,
      });

      const url = `${_apiBase}paintings?_page=${page}&_limit=${limit}&${queryParams}`;

      const { data, totalCount } = await request(url);
      return {
         data,
         totalCount,
      };
   };

   const _transfromAuthors = (authors) => {
      return {
         id: authors.id,
         option: authors.name,
      };
   };

   const _transfromLocations = (locations) => {
      return {
         id: locations.id,
         option: locations.location,
      };
   };

   return {
      getAllAuthors,
      getAllLocations,
      getPaintings,
      process,
      setProcess,
   };
};

export default useFWTService;
