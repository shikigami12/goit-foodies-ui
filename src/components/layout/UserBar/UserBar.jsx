import {useState} from "react";
import {Link} from "react-router-dom";
import {ROUTES} from "../../../constants";
import PropTypes from "prop-types";
import {BurgerMenu} from "../BurgerMenu/index.js";

export const UserBar = ({isDarkTheme = true}) => {
    const [isOpen, setIsOpen] = useState(false);
    const user = {name: "VICTORIA", avatar: null};

    const toggle = () => setIsOpen((prev) => !prev);
    const BASE_AUTH_CLASS = 'flex items-center gap-1 sm:gap-3 rounded-full bg-black px-4 py-2 text-white cursor-pointer';
    const themeClass = isDarkTheme ? 'bg-dark' : 'bg-black';

    return (
        <div className="relative">
            <div className="flex justify-between items-center">
                <button
                    type="button"
                    onClick={toggle}
                    className={`${BASE_AUTH_CLASS} ${themeClass}`}
                >
                    <img
                        src={user.avatar || "/default-avatar.png"}
                        alt={user.name}
                        className="w-6 h-6 sm:h-10 sm:w-10 rounded-full object-cover"
                    />
                    <span className="text-xs sm:text-sm font-semibold uppercase tracking-[0.15em]">
                  {user.name}
                </span>
                    <svg
                        className={`h-3 w-3 transition-transform ${
                            isOpen ? "rotate-180" : ""
                        }`}
                        viewBox="0 0 12 8"
                        aria-hidden="true"
                    >
                        <path
                            d="M1 6.5L6 1.5L11 6.5"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="1.5"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        />
                    </svg>
                </button>

                <BurgerMenu isDarkTheme={isDarkTheme}/>
            </div>


            {isOpen && (
                <div
                    className="absolute left-0 mt-1 rounded-3xl border border-white/20 bg-black px-8 sm:px-10 py-6 z-30 text-white shadow-lg">
                    <Link
                        to={ROUTES.USER}
                        className="block text-sm font-semibold uppercase tracking-[0.2em]"
                    >
                        PROFILE
                    </Link>

                    <button
                        type="button"
                        className="mt-4 flex items-center gap-2 text-sm font-semibold uppercase tracking-[0.2em]"
                    >
                        <span>LOG OUT</span>
                        <span aria-hidden="true">↗</span>
                    </button>
                </div>
            )}
        </div>
    );
};
UserBar.propTypes = {
    isDarkTheme: PropTypes.bool,
};