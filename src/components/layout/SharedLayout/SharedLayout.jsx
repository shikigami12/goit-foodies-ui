import { Outlet } from 'react-router-dom';
import { Header } from '../Header/Header';
import { Footer } from '../Footer/Footer';
import { Toaster } from 'react-hot-toast';

export const SharedLayout = () => {
  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Header />

      <main className="flex-1 p-4">
        <Outlet />
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
