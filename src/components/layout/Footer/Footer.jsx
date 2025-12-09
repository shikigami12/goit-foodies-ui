import { Logo } from '../../common/Logo/Logo';
import { NetworkLinks } from '../NetworkLinks/NetworkLinks';
import { Copyright } from '../Copyright/Copyright';

export const Footer = () => {
  return (
    <footer>
      <Logo />
      <NetworkLinks />
      <Copyright />
    </footer>
  );
};
