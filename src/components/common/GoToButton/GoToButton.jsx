
import { Link } from 'react-router-dom';
import { ROUTES } from '../../../constants';
import { RoundButton } from '../RoundButton';
import Icon from '../Icon';

export const GoToButton = ({ id, iconSize }) => (
  <Link to={ROUTES.RECIPE.replace(':id', id)}>
    <RoundButton>
      <Icon name="arrow-up-right" size={iconSize} stroke="currentColor"/>
    </RoundButton>
  </Link>
);