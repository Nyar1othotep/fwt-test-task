import Image from "../Image/Image";

const GalleryItem = ({ name, authorId, created, locationId, imageUrl }) => {
   return (
      <li className="gallery__column">
         <div className="gallery__item item-gallery">
            <div className="item-gallery__container">
               <h2 className="item-gallery__name">{name}</h2>
               <ul className="item-gallery__list">
                  <li className="item-gallery__item">
                     <strong>Author:</strong>
                     {authorId.option}
                  </li>
                  <li className="item-gallery__item">
                     <strong>Created:</strong>
                     {created}
                  </li>
                  <li className="item-gallery__item">
                     <strong>Location:</strong>
                     {locationId.option}
                  </li>
               </ul>
            </div>
            <div className="item-gallery__img _ibg">
               <Image url={imageUrl} alt={name} />
            </div>
         </div>
      </li>
   );
};

export default GalleryItem;
