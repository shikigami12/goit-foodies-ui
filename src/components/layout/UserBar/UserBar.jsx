import { useState } from "react";
import { Link } from "react-router-dom";
import { ROUTES } from "../../../constants";
import PropTypes from "prop-types";
import { BurgerMenu } from "../BurgerMenu/index.js";

// Default avatar SVG as data URI
const DEFAULT_AVATAR = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='50' height='50' viewBox='0 0 50 50'%3E%3Ccircle cx='25' cy='25' r='25' fill='%23BFBEBE'/%3E%3Cpath d='M25 20C27.7614 20 30 17.7614 30 15C30 12.2386 27.7614 10 25 10C22.2386 10 20 12.2386 20 15C20 17.7614 22.2386 20 25 20Z' fill='%231A1A1A'/%3E%3Cpath d='M25 22C18.9249 22 14 26.9249 14 33V40H36V33C36 26.9249 31.0751 22 25 22Z' fill='%231A1A1A'/%3E%3C/svg%3E";

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
                        <svg
                            className={`w-[18px] h-[18px] transition-transform ${
                                isOpen ? "rotate-180" : ""
                            }`}
                            viewBox="0 0 18 18"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                            aria-hidden="true"
                        >
                            <path
                                d="M4.5 6.75L9 11.25L13.5 6.75"
                                stroke="white"
                                strokeWidth="1.5"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            />
                        </svg>
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
                            <svg
                                className="w-[18px] h-[18px]"
                                viewBox="0 0 32 32"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                                aria-hidden="true"
                            >
                                <path
                                    strokeLinejoin="round"
                                    strokeLinecap="round"
                                    strokeMiterlimit="4"
                                    strokeWidth="1.3"
                                    d="M9.333 22.667l13.333-13.333M9.333 9.333h13.333v13.333"
                                    stroke="white"
                                />
                            </svg>
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