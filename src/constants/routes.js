export const ROUTES = {
  HOME: "/",
  RECIPE: "/recipe/:id",
  ADD_RECIPE: "/add",
  CATEGORY: "/category/:category",
  USER: "/user",
  USER_PROFILE: "/user/:id",
  RECIPES_MY: "my_recipes",
  RECIPES_FAVORITES: "my_favorites",
  FOLLOWERS_LIST: "followers",
  FOLLOWING_LIST: "following",
};

export const TABS = [
  ROUTES.RECIPES_MY,
  ROUTES.RECIPES_FAVORITES,
  ROUTES.FOLLOWERS_LIST,
  ROUTES.FOLLOWING_LIST,
];
