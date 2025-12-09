import { Link } from 'react-router-dom';
import { ROUTES } from '../../../constants';

export const PathInfo = ({ currentPage }) => {
  return (
    <div>
      <Link to={ROUTES.HOME}>Home</Link>
      <span> / </span>
      <span>{currentPage}</span>
    </div>
  );
};
