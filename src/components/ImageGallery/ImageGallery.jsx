import PropTypes from 'prop-types';
import style from './ImageGallery.module.css';
import ImageCard from '../ImageCard/ImageCard';

const ImageGallery = ({ images, onImageClick }) => {
  return (
    <ul className={style.gallery}>
      {images.map(image => (
        <li key={image.id} className={style.item}>
          <ImageCard image={image} onImageClick={onImageClick} />
        </li>
      ))}
    </ul>
  );
};

ImageGallery.propTypes = {
  images: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
    })
  ).isRequired,
  onImageClick: PropTypes.func.isRequired,
};

export default ImageGallery;
