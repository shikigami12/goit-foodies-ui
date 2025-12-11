import { Logo } from "../../common";
import { NetworkLinks } from "../NetworkLinks";
import { Copyright } from "../Copyright";

export const Footer = () => {
    return (
        <footer className="w-full">
            <div className="max-w-screen-xl mx-auto flex items-center justify-between px-6 py-6">
                <Logo />
                <NetworkLinks />
            </div>

            <div className="border-t border-borders"></div>

            <div className="py-6 flex justify-center">
                <Copyright />
            </div>
        </footer>
    );
};
