import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { SharedLayout } from './components/layout/SharedLayout';
import { HomePage, RecipePage, AddRecipePage, UserPage } from './pages';
import { PrivateRoute } from './routes';
import { ROUTES } from './constants';
import './App.css';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path={ROUTES.HOME} element={<SharedLayout />}>
          <Route index element={<HomePage />} />
          <Route path={ROUTES.RECIPE} element={<RecipePage />} />
          <Route
            path={ROUTES.ADD_RECIPE}
            element={
              <PrivateRoute>
                <AddRecipePage />
              </PrivateRoute>
            }
          />
          <Route
            path={ROUTES.USER}
            element={
              <PrivateRoute>
                <UserPage />
              </PrivateRoute>
            }
          />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
