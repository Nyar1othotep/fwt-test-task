const GalleryItem = ({ name, authorId, created, locationId, imageUrl }) => {
   return (
      <li className="gallery__column">
         <div className="gallery__item item-gallery">
            <div className="item-gallery__container">
               <h2 className="item-gallery__name">{name}</h2>
               <ul className="item-gallery__list">
                  <li className="item-gallery__item">
                     <strong>Author:</strong>
                     {authorId}
                  </li>
                  <li className="item-gallery__item">
                     <strong>Created:</strong>
                     {created}
                  </li>
                  <li className="item-gallery__item">
                     <strong>Location:</strong>
                     {locationId}
                  </li>
               </ul>
            </div>
            <img src={imageUrl} alt={name} />
         </div>
      </li>
   );
};

export default GalleryItem;
