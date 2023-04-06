import { useEffect } from "react";
import useFWTService from "../../services/FWTService";
import setContent from "../../utils/setContent";

const App = () => {
   const { getAllAuthors, setProcess, process } = useFWTService();

	console.log(process);

   useEffect(() => {
      onRequest();
   }, []);

   const onRequest = () => {
      getAllAuthors()
         .then(onAuthorsLoaded)
         .then(() => setProcess("confirmed"));
   };

   const onAuthorsLoaded = (data) => {
      console.log(data);
   };

   return <h1>hi</h1>;
};

export default App;
