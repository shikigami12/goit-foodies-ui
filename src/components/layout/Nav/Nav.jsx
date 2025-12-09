import { NavLink } from 'react-router-dom';
import { ROUTES } from '../../../constants';

export const Nav = () => {
  return (
    <nav>
      <NavLink to={ROUTES.HOME}>Home</NavLink>
      <NavLink to={ROUTES.ADD_RECIPE}>Add Recipe</NavLink>
    </nav>
  );
};
