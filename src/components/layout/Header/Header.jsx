import { Logo } from '../../common/Logo/Logo';
import { Nav } from '../Nav/Nav';
import { AuthBar } from '../AuthBar/AuthBar';
import { UserBar } from '../UserBar/UserBar';

export const Header = () => {
  const isAuthenticated = false; // TODO: Get from Redux store

  return (
    <header>
      <Logo />
      {isAuthenticated && <Nav />}
      {isAuthenticated ? <UserBar /> : <AuthBar />}
    </header>
  );
};
