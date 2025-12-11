import { BrowserRouter, Routes, Route } from "react-router-dom";
import { SharedLayout } from "./components/layout/SharedLayout";
import { HomePage, RecipePage, AddRecipePage, UserPage } from "./pages";
import { PrivateRoute } from "./routes";
import { ROUTES } from "./constants";
import "./App.css";
import RecipeList from "./components/common/RecipeList";
import FollowersList from "./components/common/FollowersList";

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
          >
            <Route element={<RecipeList />} path={ROUTES.RECIPES_MY} />
            <Route element={<RecipeList />} path={ROUTES.RECIPES_FAVORITES} />
            <Route element={<FollowersList />} path={ROUTES.FOLLOWERS_LIST} />
            <Route element={<FollowersList />} path={ROUTES.FOLLOWING_LIST} />
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
