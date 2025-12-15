import { Logo } from '../../common/Logo/Logo';
import { Nav } from '../Nav/Nav';
import { AuthBar } from '../AuthBar/AuthBar';
import { UserBar } from '../UserBar/UserBar';
import PropTypes from "prop-types";

export const Header = ({isDarkTheme = false}) => {
  const isAuthenticated = true; // TODO: Get from Redux store

  return (
    <header className="w-full">
        <div className="max-w-screen-xl mx-auto flex items-center justify-between px-4 sm:px-6 py-4 sm:py-6">
            <Logo isDarkTheme={isDarkTheme} />
            {isAuthenticated && <Nav isDarkTheme={isDarkTheme}/>}
            {isAuthenticated ? <UserBar isDarkTheme={isDarkTheme} /> : <AuthBar />}
        </div>
    </header>
  );
};

Header.propTypes = {
    isDarkTheme: PropTypes.bool,
};