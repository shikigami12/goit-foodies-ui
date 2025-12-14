import { useState } from "react";
import { Logo } from "../../common/Logo/Logo";
import { Nav } from "../Nav/Nav";
import PropTypes from "prop-types";

export const BurgerMenu = ({ isDarkTheme = true }) => {
    const [isOpen, setIsOpen] = useState(false);
    const toggle = () => setIsOpen((p) => !p);
    const themeClass = isDarkTheme ? 'text-white' : 'text-black';

    return (
        <>
            <button
                type="button"
                onClick={toggle}
                className="inline-flex sm:hidden items-center justify-center p-2 rounded-full border border-white/20"
            >
                <svg className={`w-6 h-6 ${themeClass}`}>
                    <use href="/sprite.svg#icon-burger" />
                </svg>
            </button>

            {isOpen && (
                <div className="fixed inset-0 z-50 bg-black text-white">
                    <div className="max-w-screen-xl mx-auto flex items-center justify-between px-6 py-6">
                        <Logo isDarkTheme />
                        <button
                            type="button"
                            onClick={toggle}
                            className="p-2 cursor-pointer"
                            aria-label="Close menu"
                        >
                            <svg className="w-6 h-6 text-white">
                                <use href="/sprite.svg#icon-x" />
                            </svg>
                        </button>
                    </div>

                    <div className="flex flex-col items-center justify-center gap-10 mt-36">
                        <Nav isDarkTheme={isDarkTheme} isMobile />
                    </div>
                </div>
            )}
        </>
    );
};

BurgerMenu.propTypes = {
    isDarkTheme: PropTypes.bool,
};
