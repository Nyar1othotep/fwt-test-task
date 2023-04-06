import { useHttp } from "../hooks/http.hook";

const useFWTService = () => {
   const { request, clearError, process, setProcess } = useHttp();

   const _apiBase = "https://test-front.framework.team/";

   const getAllAuthors = async () => {
      const res = await request(`${_apiBase}authors`);
      // return res.data.results.map(_transfromAuthors);
      return res;
   };

   const _transfromAuthors = (char) => {
      return {
         // id: char.id,
         // name: char.name,
         // description:
         //    char.description.length > 190
         //       ? char.description.substring(0, 190) + "..."
         //       : "This character has no description :(",
         // thumbnail: char.thumbnail.path + "." + char.thumbnail.extension,
         // homepage: char.urls[0].url,
         // wiki: char.urls[1].url,
         // comics: char.comics.items,
      };
   };

   return {
      getAllAuthors,
      clearError,
      process,
      setProcess,
   };
};

export default useFWTService;
