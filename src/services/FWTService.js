import { useHttp } from "../hooks/http.hook";

const useFWTService = () => {
   const { request, process, setProcess } = useHttp();

   const _apiBase = "https://test-front.framework.team/";
   const _basePage = 1;

   const getAllAuthors = async () => {
      const { data } = await request(`${_apiBase}authors`);
      return data.map(_transfromAuthors);
   };

   const getAllLocations = async () => {
      const { data } = await request(`${_apiBase}locations`);
      return data.map(_transfromLocations);
   };

   const getAllPaintings = async (page = _basePage) => {
      const { data, totalCount } = await request(
         `${_apiBase}paintings?_page=${page}`
      );
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
      getAllPaintings,
      process,
      setProcess,
   };
};

export default useFWTService;
