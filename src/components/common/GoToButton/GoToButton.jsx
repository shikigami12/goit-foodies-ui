
import { Link } from 'react-router-dom';
import { ROUTES } from '../../../constants';
import { RoundButton } from '../RoundButton';
import Icon from '../Icon';

export const GoToButton = ({ id, iconSize }) => (
  <Link to={ROUTES.RECIPE.replace(':id', id)}>
    <RoundButton>
      <Icon name="arrow-up-right" size={iconSize} color= '#050505' stroke='#050505'/>
    </RoundButton>
  </Link>
);