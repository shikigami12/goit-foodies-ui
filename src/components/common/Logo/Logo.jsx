import { Link } from 'react-router-dom';
import { ROUTES } from '../../../constants';

export const Logo = () => {
  return (
    <Link to={ROUTES.HOME}>
      <span>Foodies</span>
    </Link>
  );
};
