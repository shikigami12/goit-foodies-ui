import { NavLink } from "react-router-dom";
import { ROUTES } from "../../../constants";
import PropTypes from "prop-types";

export const Nav = ({ isDarkTheme = true, isMobile = false, onNavClick }) => {
    const navItems = [
        { path: ROUTES.HOME, label: "HOME" },
        { path: ROUTES.ADD_RECIPE, label: "ADD RECIPE" },
    ];

    // Base styles differ between mobile and desktop
    const baseLink = isMobile
        ? "px-3.5 py-3.5 rounded-[30px] font-bold text-sm leading-5 tracking-[-0.02em] uppercase transition-colors duration-200 text-center"
        : "p-3.5 rounded-[30px] font-bold text-xs leading-[18px] tracking-[-0.02em] uppercase transition-colors duration-200";

    // isDarkTheme = true means dark background, so use light (white) text
    // isDarkTheme = false means light background, so use dark (black) text
    const styles = {
        darkBg: {
            active: isMobile ? "border border-borders text-white min-w-[111px]" : "border border-white/20 text-white",
            inactive: "text-white hover:text-white/80",
        },
        lightBg: {
            active: "border border-borders text-black",
            inactive: "text-black/80 hover:text-black",
        },
    };

    const theme = isDarkTheme ? styles.darkBg : styles.lightBg;
    const navClass = isMobile
        ? "flex flex-col items-center gap-6"
        : "hidden sm:flex items-center gap-10";

    return (
        <nav className={navClass}>
            {navItems.map(({ path, label }) => (
                <NavLink
                    key={path}
                    to={path}
                    onClick={onNavClick}
                    className={({ isActive }) =>
                        `${baseLink} ${isActive ? theme.active : theme.inactive}`
                    }
                >
                    {label}
                </NavLink>
            ))}
        </nav>
    );
};

Nav.propTypes = {
    isDarkTheme: PropTypes.bool,
    isMobile: PropTypes.bool,
    onNavClick: PropTypes.func,
};
