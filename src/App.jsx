import { BrowserRouter, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useMemo } from 'react';
import { SharedLayout } from './components/layout/SharedLayout';
import { HomePage, RecipePage, AddRecipePage, UserPage } from './pages';
import { PrivateRoute } from './routes';
import { ROUTES } from './constants';
import RecipeList from './components/common/RecipeList';
import FollowersList from './components/common/FollowersList';

const ProfileRoutes = () => (
  <>
    <Route index element={<Navigate to={ROUTES.RECIPES_MY} replace />} />
    <Route element={<RecipeList />} path={ROUTES.RECIPES_MY} />
    <Route element={<RecipeList />} path={ROUTES.RECIPES_FAVORITES} />
    <Route element={<FollowersList />} path={ROUTES.FOLLOWERS_LIST} />
    <Route element={<FollowersList />} path={ROUTES.FOLLOWING_LIST} />
  </>
);

function App() {
  const { isAuthenticated } = useSelector(state => state.auth);
  const location = useLocation();
  
  // Unique key based on current profile ID and auth status to force remount
  const userPageKey = useMemo(() => {
    const parts = location.pathname.split('/');
    const userIndex = parts.indexOf('user');
    const idFromPath = userIndex !== -1 && parts[userIndex + 1] ? parts[userIndex + 1] : 'current';
    return `user-page-${idFromPath}-${isAuthenticated}`;
  }, [location.pathname, isAuthenticated]);

  return (
    <Routes>
      <Route path={ROUTES.HOME} element={<SharedLayout />}>
        <Route index element={<HomePage />} />
        <Route path={ROUTES.CATEGORY} element={<HomePage />} />
        <Route path={ROUTES.RECIPE} element={<RecipePage />} />
        <Route path={ROUTES.ADD_RECIPE}
          element={
            <PrivateRoute>
              <AddRecipePage />
            </PrivateRoute>
          }
        />

        {/* Unified User Profile Route */}
        <Route 
          path="/user/:id?" 
          element={<UserPage key={userPageKey} />}
        >
          {ProfileRoutes()}
        </Route>
      </Route>
    </Routes>
  );
}

const AppWrapper = () => (
  <BrowserRouter>
    <App />
  </BrowserRouter>
);

export default AppWrapper;
