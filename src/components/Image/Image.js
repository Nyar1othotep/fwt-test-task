const Image = ({ url, alt }) => {
   try {
      const image = require(`../../resources${url}`);
      return <img src={image} alt={alt} />;
   } catch (error) {
      return <div className="error-message">Image not found</div>;
   }
};

export default Image;
