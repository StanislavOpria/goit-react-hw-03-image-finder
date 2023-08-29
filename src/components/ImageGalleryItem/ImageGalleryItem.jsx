import PropTypes from 'prop-types';

import { GalleryItem, Image } from './ImageGalleryItem.styled';

export const ImageGalleryItem = ({ item: { webformatURL, tags } }) => {
  return (
    <GalleryItem>
      <Image src={webformatURL} alt={tags} />
    </GalleryItem>
  );
};

ImageGalleryItem.propTypes = {
  webformatURL: PropTypes.string,
  tags: PropTypes.string,
};
