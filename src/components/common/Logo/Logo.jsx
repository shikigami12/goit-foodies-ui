import { Link } from 'react-router-dom';
import { ROUTES } from '../../../constants';

export const Logo = () => {
  return (
    <Link to={ROUTES.HOME}>
        <svg className="w-22 h-6">
            <use href="/sprite.svg#logo-footer"></use>
        </svg>
    </Link>
  );
};
