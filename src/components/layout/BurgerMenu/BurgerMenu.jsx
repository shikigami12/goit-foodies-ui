import { useState, useEffect } from "react";
import { Logo } from "../../common/Logo/Logo";
import { Nav } from "../Nav/Nav";
import PropTypes from "prop-types";

export const BurgerMenu = ({ isDarkTheme = true }) => {
    const [isOpen, setIsOpen] = useState(false);
    const toggle = () => setIsOpen((p) => !p);
    const themeClass = isDarkTheme ? 'text-white' : 'text-black';

    useEffect(() => {
        if (isOpen) {
            // Prevent scrolling on both body and html for cross-browser support
            document.body.style.overflow = 'hidden';
            document.documentElement.style.overflow = 'hidden';
            // Prevent touch scrolling on iOS
            document.body.style.position = 'fixed';
            document.body.style.width = '100%';
            document.body.style.top = `-${window.scrollY}px`;
        } else {
            const scrollY = document.body.style.top;
            document.body.style.overflow = '';
            document.documentElement.style.overflow = '';
            document.body.style.position = '';
            document.body.style.width = '';
            document.body.style.top = '';
            // Restore scroll position
            if (scrollY) {
                window.scrollTo(0, parseInt(scrollY || '0') * -1);
            }
        }

        return () => {
            document.body.style.overflow = '';
            document.documentElement.style.overflow = '';
            document.body.style.position = '';
            document.body.style.width = '';
            document.body.style.top = '';
        };
    }, [isOpen]);

    return (
        <>
            <button
                type="button"
                onClick={toggle}
                className="inline-flex sm:hidden items-center justify-center"
                aria-label="Open menu"
            >
                <svg className={`w-7 h-7 ${themeClass}`}>
                    <use href="/sprite.svg#icon-burger" />
                </svg>
            </button>

            {isOpen && (
                <div className="fixed inset-0 z-50 bg-black text-white">
                    {/* Header */}
                    <div className="w-[327px] mx-auto flex items-center justify-between pt-6">
                        <Logo isDarkTheme />
                        <button
                            type="button"
                            onClick={toggle}
                            className="cursor-pointer"
                            aria-label="Close menu"
                        >
                            <svg className="w-7 h-7 text-white">
                                <use href="/sprite.svg#icon-x" />
                            </svg>
                        </button>
                    </div>

                    {/* Menu items */}
                    <div className="flex flex-col items-center justify-center gap-6 mt-[210px]">
                        <Nav isDarkTheme={true} isMobile onNavClick={toggle} />
                    </div>

                    {/* Decorative images */}
                    <div className="flex items-center gap-8 pointer-events-none justify-center mt-[50px]">
                        <div className="w-[77px] h-[70px] rotate-[11deg] rounded-[15px] overflow-hidden shrink-0 mt-[100px]">
                            <img
                                src="/src/assets/smallCard_zylboe_c_scale,w_190.webp"
                                srcSet="/src/assets/smallCard_zylboe_c_scale,w_190.webp 1x, /src/assets/smallCard_zylboe_c_scale,w_911.webp 2x"
                                alt=""
                                className="w-full h-full object-cover"
                            />
                        </div>
                        <div className="w-[190px] h-[172px] -rotate-12 rounded-[30px] overflow-hidden shrink-0">
                            <img
                                src="/src/assets/bigCard_e92lgl_c_scale,w_405.webp"
                                srcSet="/src/assets/bigCard_e92lgl_c_scale,w_405.webp 1x, /src/assets/bigCard_e92lgl_c_scale,w_559.webp 1.5x, /src/assets/bigCard_e92lgl_c_scale,w_683.webp 2x"
                                alt=""
                                className="w-full h-full object-cover"
                            />
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

BurgerMenu.propTypes = {
    isDarkTheme: PropTypes.bool,
};
