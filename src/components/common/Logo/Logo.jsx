import { Link } from 'react-router-dom';
import { ROUTES } from '../../../constants';
import PropTypes from 'prop-types';

export const Logo = ({ isDarkTheme = false }) => {
  const BASE_LOGO_CLASS = 'w-22 h-6';
  const themeClass = isDarkTheme ? 'text-white' : 'text-black';

  return (
    <Link to={ROUTES.HOME}>
      <svg className={`${BASE_LOGO_CLASS} ${themeClass}`}>
        <use href="/sprite.svg#icon-logo-footer"></use>
      </svg>
    </Link>
  );
};

Logo.propTypes = {
  isDarkTheme: PropTypes.bool,
};
