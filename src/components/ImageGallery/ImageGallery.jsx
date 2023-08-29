import PropTypes from 'prop-types';
import { ImageGalleryItem } from 'components/ImageGalleryItem/ImageGalleryItem';

import { Gallery } from './ImageGallery.styled';

export const ImageGallery = ({ collection }) => {
  return (
    <Gallery>
      {collection.map(item => (
        <ImageGalleryItem key={item.id} item={item} />
      ))}
    </Gallery>
  );
};

ImageGallery.propTypes = {
  collection: PropTypes.arrayOf(PropTypes.object),
};
