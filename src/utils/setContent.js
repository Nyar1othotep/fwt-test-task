import Spinner from "../components/Spinner/Spinner";
import ErrorMessage from "../components/ErrorMessage/ErrorMessage";

const setContent = (process, Component, data) => {
   switch (process) {
      case "waiting":
         return "waiting";
      case "loading":
         return <Spinner width="50" height="50" />;
      case "confirmed":
         return <Component data={data} />;
      case "error":
         return <ErrorMessage />;
      default:
         throw new Error("Unexpected process state");
   }
};

export default setContent;
