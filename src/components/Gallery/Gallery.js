import { useMemo } from "react";
import setContent from "../../utils/setContent";
import GalleryItem from "../GalleryItem/GalleryItem";

const Gallery = ({ paintings, process }) => {
   const renderItems = (arr) => {
      if (arr.length === 0) {
         return <div>No images.</div>;
      }

      return arr.map(({ id, ...props }) => {
         return <GalleryItem key={id} {...props} />;
      });
   };

   const elements = useMemo(() => {
      return setContent(process, () => renderItems(paintings), paintings);
   }, [process, paintings]);

   return (
      <div className="gallery">
         <div className="gallery__container _container">
            <div className="gallery__body">
               <ul className="gallery__row">{elements}</ul>
            </div>
         </div>
      </div>
   );
};

export default Gallery;
