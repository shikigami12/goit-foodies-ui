import { MainTitle } from '../components/common/MainTitle/MainTitle';
import { Subtitle } from '../components/common/Subtitle/Subtitle';

export const NotFoundPage = () => {
    return (
        <main className="mx-auto w-full max-w-[1440px] px-4 md:px-8 xl:px-20 py-10 flex flex-col items-center justify-center min-h-[60vh] text-center">
            <MainTitle className="mb-4">404</MainTitle>
            <Subtitle className="mb-8">
                Oops! The page you are looking for does not exist.
            </Subtitle>
        </main>
    );
};
