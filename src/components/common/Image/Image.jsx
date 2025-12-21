import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import placeholderUser from '../../../images/user_without_avatar.jpg';
import placeholderRecipe from '../../../assets/No_Preview_image_2.png';

export const Image = ({
  src,
  alt = '',
  type = 'recipe',
  className = '',
  ...props
}) => {
  const [imgSrc, setImgSrc] = useState(src);
  const [hasError, setHasError] = useState(false);

  const fallbackSrc = type === 'user' ? placeholderUser : placeholderRecipe;

  // Reset error state when src changes
  useEffect(() => {
    setImgSrc(src);
    setHasError(false);
  }, [src]);

  const handleError = () => {
    if (!hasError) {
      setHasError(true);
      setImgSrc(fallbackSrc);
    }
  };

  // Handle invalid src values
  const isValidSrc = src && src !== '[object FileList]' && src.trim() !== '';
  const finalSrc = isValidSrc ? imgSrc : fallbackSrc;

  return (
    <img
      src={finalSrc}
      alt={alt}
      className={className}
      onError={handleError}
      {...props}
    />
  );
};

Image.propTypes = {
  src: PropTypes.string,
  alt: PropTypes.string,
  type: PropTypes.oneOf(['user', 'recipe']),
  className: PropTypes.string,
};
