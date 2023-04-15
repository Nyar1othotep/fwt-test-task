const ErrorMessage = () => {
   return (
      <div className="error-message">
         <span>Something went wrong. Please reload the page:</span>
         <button
            className="btn btn--reload"
            onClick={() => window.location.reload(false)}
         >
            Click to reload!
         </button>
      </div>
   );
};

export default ErrorMessage;
