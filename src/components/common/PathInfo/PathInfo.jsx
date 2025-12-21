import { Link } from 'react-router-dom';
import { ROUTES } from '../../../constants';

export const PathInfo = ({ currentPage }) => {
  return (
    <div className="flex items-center gap-2 font-bold text-xs leading-[150%] tracking-[-0.02em] uppercase">
      <Link 
        to={ROUTES.HOME} 
        className="text-borders hover:text-brand-dark transition-colors"
      >
        Home
      </Link>
      <span className="text-borders">/</span>
      <span className="text-brand-dark">{currentPage}</span>
    </div>
  );
};
