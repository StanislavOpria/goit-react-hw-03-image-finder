import PropTypes from 'prop-types';

export const ImageGalleryItem = ({ item: { webformatURL, tags } }) => {
  return (
    <li>
      <img src={webformatURL} alt={tags} />
    </li>
  );
};

ImageGalleryItem.propTypes = {
  webformatURL: PropTypes.string,
  tags: PropTypes.string,
};
