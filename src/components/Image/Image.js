import { LazyLoadImage } from "react-lazy-load-image-component";

const Image = ({ url, alt }) => {
   try {
      const image = require(`../../resources${url}`);
      const imagePreload = require(`../../resources/preloadResources${url}`);
      return (
         <LazyLoadImage src={image} placeholderSrc={imagePreload} alt={alt} />
      );
   } catch (error) {
      return <div className="error-message">Image not found</div>;
   }
};

export default Image;
