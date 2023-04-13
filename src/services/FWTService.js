import { useHttp } from "../hooks/http.hook";
import queryString from "query-string";

const useFWTService = () => {
   const { request, process, setProcess } = useHttp();

   const _apiBase = "https://test-front.framework.team/";
   const _basePage = 1;
   const _baseLimit = 12;
   const params = {};

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
      q,
      authorId,
      locationId,
      created_gte,
      created_lte
   ) => {
      if (q === null) {
         delete params.q;
      } else if (q) {
         params.q = q;
      }

      if (authorId === null) {
         delete params.authorId;
      } else if (authorId) {
         params.authorId = authorId;
      }

      if (locationId === null) {
         delete params.locationId;
      } else if (locationId) {
         params.locationId = locationId;
      }

      if (created_gte === null) {
         delete params.created_gte;
      } else if (created_gte) {
         params.created_gte = created_gte;
      }

      if (created_lte === null) {
         delete params.created_lte;
      } else if (created_lte) {
         params.created_lte = created_lte;
      }

      const queryParams = queryString.stringify(params, {
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
