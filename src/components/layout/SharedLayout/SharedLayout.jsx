import { Outlet } from "react-router-dom";
import { Header } from '../Header/Header';
import { Footer } from '../Footer/Footer';

export const SharedLayout = () => {
    return (
        <div className="min-h-screen flex flex-col bg-gray-50">

            <Header />

            <main className="flex-1 p-4">
                <Outlet />
            </main>

            <Footer />

        </div>
    );
};

