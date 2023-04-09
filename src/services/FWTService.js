import { useHttp } from "../hooks/http.hook";

const useFWTService = () => {
   const { request, process, setProcess } = useHttp();

   const _apiBase = "https://test-front.framework.team/";

   const getAllAuthors = async () => {
      const res = await request(`${_apiBase}authors`);
      return res;
   };

   return {
      getAllAuthors,
      process,
      setProcess,
   };
};

export default useFWTService;
