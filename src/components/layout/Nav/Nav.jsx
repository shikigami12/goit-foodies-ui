import { NavLink } from "react-router-dom";
import { ROUTES } from "../../../constants";
import PropTypes from "prop-types";

export const Nav = ({ isDarkTheme = true, isMobile = false }) => {
    const navItems = [
        { path: ROUTES.HOME, label: "HOME" },
        { path: ROUTES.ADD_RECIPE, label: "ADD RECIPE" },
    ];

    const baseLink =
        "p-3.5 rounded-[30px] font-bold text-xs leading-[18px] tracking-[-0.02em] uppercase transition-colors duration-200";

    // isDarkTheme = true means dark background, so use light (white) text
    // isDarkTheme = false means light background, so use dark (black) text
    const styles = {
        darkBg: {
            active: "border border-white/20 text-white",
            inactive: "text-white/80 hover:text-white",
        },
        lightBg: {
            active: "border border-borders text-black",
            inactive: "text-black/80 hover:text-black",
        },
    };

    const theme = isDarkTheme ? styles.darkBg : styles.lightBg;
    const navClass = isMobile
        ? "flex flex-col items-center gap-10"
        : "hidden sm:flex items-center gap-10";

    return (
        <nav className={navClass}>
            {navItems.map(({ path, label }) => (
                <NavLink
                    key={path}
                    to={path}
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
};
