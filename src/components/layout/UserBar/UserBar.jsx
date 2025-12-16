import { useState } from "react";
import { Link } from "react-router-dom";
import { ROUTES } from "../../../constants";
import PropTypes from "prop-types";
import { BurgerMenu } from "../BurgerMenu/index.js";
import Icon from "../../common/Icon";

// Default avatar SVG as data URI (account icon with white background)
const DEFAULT_AVATAR =
  "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='50' height='50' viewBox='0 0 50 50'%3E%3Ccircle cx='25' cy='25' r='25' fill='%23FFFFFF'/%3E%3Cg transform='translate(8 8) scale(1.4)'%3E%3Cpath d='M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 3c1.66 0 3 1.34 3 3s-1.34 3-3 3-3-1.34-3-3 1.34-3 3-3zm0 14.2c-2.5 0-4.71-1.28-6-3.22.03-1.99 4-3.08 6-3.08 1.99 0 5.97 1.09 6 3.08-1.29 1.94-3.5 3.22-6 3.22z' fill='%23000000'/%3E%3C/g%3E%3C/svg%3E";

export const UserBar = ({ isDarkTheme = true, user, onLogoutClick }) => {
    const [isOpen, setIsOpen] = useState(false);
    const displayName = user?.name ? user.name.toUpperCase() : "";
    const avatarUrl = user?.avatar || user?.avatarURL || DEFAULT_AVATAR;

    const toggle = () => setIsOpen((prev) => !prev);

    return (
        <div className="relative">
            <div className="flex justify-between items-center">
                <button
                    type="button"
                    onClick={toggle}
                    className="flex items-center h-[50px] w-[148px] bg-dark rounded-[30px] p-0 cursor-pointer"
                >
                    {/* Avatar */}
                    <div className="flex items-center justify-center w-[50px] h-[50px] rounded-[30px] flex-shrink-0 overflow-hidden">
                        <img
                            src={avatarUrl}
                            alt={displayName}
                            className="w-full h-full rounded-[30px] object-cover"
                            onError={(e) => {
                                e.target.src = DEFAULT_AVATAR;
                            }}
                        />
                    </div>

                    {/* Name */}
                    <div className="flex items-center pl-[6px] pr-[14px] py-4 gap-1 flex-1 min-w-0">
                        <span className="font-bold text-[12px] leading-[18px] tracking-[-0.02em] uppercase text-white truncate">
                            {displayName}
                        </span>
                    </div>

                    {/* Chevron */}
                    <div className="flex items-center justify-center w-[18px] h-[18px] flex-shrink-0 mr-2">
                        <Icon
                            name="chevron-down"
                            size={18}
                            color="white"
                            className={`w-[18px] h-[18px] transition-transform ${
                                isOpen ? "rotate-180" : ""
                            }`}
                        />
                    </div>
                </button>

                <BurgerMenu isDarkTheme={isDarkTheme} />
            </div>

            {/* Dropdown Menu */}
            {isOpen && (
                <div className="absolute right-0 top-[calc(100%+8px)] w-[148px] h-[74px] z-30">
                    <div className="box-border w-full h-full border border-white rounded-[15px] bg-dark relative">
                        {/* Profile Link */}
                        <Link
                            to={ROUTES.USER}
                            className="absolute left-4 top-4 font-bold text-[12px] leading-[18px] tracking-[-0.02em] uppercase text-white hover:opacity-80 transition-opacity"
                            onClick={() => setIsOpen(false)}
                        >
                            PROFILE
                        </Link>

                        {/* Log Out Button */}
                        <button
                            type="button"
                            className="absolute left-4 top-[40px] flex items-center justify-center gap-0.5 font-bold text-[12px] leading-[18px] tracking-[-0.02em] uppercase text-white hover:opacity-80 transition-opacity"
                            onClick={() => {
                                setIsOpen(false);
                                if (onLogoutClick) {
                                    onLogoutClick();
                                }
                            }}
                        >
                            <span>LOG OUT</span>
                            <Icon
                                name="arrow-up-right"
                                size={18}
                                stroke="white"
                                className="w-[18px] h-[18px]"
                            />
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};
UserBar.propTypes = {
    isDarkTheme: PropTypes.bool,
    user: PropTypes.shape({
        name: PropTypes.string,
        avatar: PropTypes.string,
    }),
    onLogoutClick: PropTypes.func,
};