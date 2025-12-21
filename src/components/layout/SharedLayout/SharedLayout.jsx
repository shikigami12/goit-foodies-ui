import { Outlet, useLocation } from 'react-router-dom';
import { Header } from '../Header/Header';
import { Footer } from '../Footer/Footer';
import { Toaster } from 'react-hot-toast';
import { ROUTES } from '../../../constants';

export const SharedLayout = () => {
  const location = useLocation();
  const isHomePage = location.pathname === ROUTES.HOME || location.pathname.startsWith('/category');

  return (
    <div className="min-h-screen flex flex-col bg-white">
      {/* Hide Header on home page - Hero has its own header */}
      {!isHomePage && <Header isDarkTheme={false} />}

      <main className={`flex-1 ${isHomePage ? 'pt-0' : 'p-4'}`}>
        <Outlet context={{ isHomePage }} />
      </main>

      <Footer />

      <Toaster
        position="bottom-center"
        toastOptions={{
          duration: 4000,
          style: {
            background: 'var(--color-white)',
            color: 'var(--color-dark)',
            fontSize: '14px',
            lineHeight: '20px',
            borderRadius: '30px',
            padding: '14px 18px',
            border: '1px solid var(--color-borders)',
            fontFamily: 'var(--font-sans)',
            fontWeight: 500,
            letterSpacing: '-0.02em',
            boxShadow:
              '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
          },
          success: {
            iconTheme: {
              primary: 'var(--color-brand)',
              secondary: 'var(--color-white)',
            },
            style: {
              background: 'var(--color-white)',
              color: 'var(--color-dark)',
            },
          },
          error: {
            iconTheme: {
              primary: '#DC2626',
              secondary: 'var(--color-white)',
            },
            style: {
              background: 'var(--color-white)',
              color: '#DC2626',
              border: '1px solid #DC2626',
            },
          },
        }}
      />
    </div>
  );
};
