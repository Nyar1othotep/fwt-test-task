const setContent = (process, Component, data) => {
   switch (process) {
      case "waiting":
         return "waiting";
      case "loading":
         return "loading";
      case "confirmed":
         return <Component data={data} />;
      case "error":
         return "error";
      default:
         throw new Error("Unexpected process state");
   }
};

export default setContent;
