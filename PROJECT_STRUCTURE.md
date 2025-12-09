# Foodies - Project Structure

## Overview
This document provides a comprehensive overview of the Foodies project structure, following React best practices and the technical specification.

## Technology Stack

### Core
- **React 18.3** - UI library
- **Vite 6.0** - Build tool and dev server
- **React Router DOM 7.1** - Client-side routing

### State Management
- **Redux Toolkit 2.5** - State management
- **React Redux 9.2** - React bindings for Redux

### Forms & Validation
- **Formik 2.4** - Form management
- **Yup 1.6** - Schema validation

### HTTP Client
- **Axios 1.7** - API requests

## Directory Structure

```
foodies/
├── public/                      # Static assets
│   └── vite.svg                # Vite logo
│
├── src/
│   ├── assets/                 # Static resources
│   │   ├── icons/             # SVG icons (sprite)
│   │   └── images/            # Images (optimized for retina)
│   │
│   ├── components/            # React components
│   │   ├── common/           # Reusable components
│   │   │   ├── Logo/         # Logo component
│   │   │   ├── MainTitle/    # Main title component
│   │   │   ├── Subtitle/     # Subtitle component
│   │   │   ├── PathInfo/     # Breadcrumb navigation
│   │   │   └── Modal/        # Modal wrapper
│   │   │
│   │   ├── layout/           # Layout components
│   │   │   ├── SharedLayout/ # Main layout wrapper
│   │   │   ├── Header/       # Header component
│   │   │   ├── Footer/       # Footer component
│   │   │   ├── Nav/          # Navigation
│   │   │   ├── AuthBar/      # Auth buttons for guests
│   │   │   ├── UserBar/      # User menu for authenticated
│   │   │   ├── NetworkLinks/ # Social media links
│   │   │   └── Copyright/    # Copyright text
│   │   │
│   │   ├── home/             # Home page components
│   │   │   ├── Hero/         # Hero section
│   │   │   ├── Categories/   # Categories section
│   │   │   │   └── CategoryList/
│   │   │   ├── Recipes/      # Recipes section
│   │   │   │   ├── RecipeFilters/
│   │   │   │   ├── RecipeList/
│   │   │   │   ├── RecipeCard/
│   │   │   │   └── RecipePagination/
│   │   │   └── Testimonials/ # Testimonials slider
│   │   │
│   │   ├── recipe/           # Recipe page components
│   │   │   ├── RecipeInfo/
│   │   │   ├── RecipeMainInfo/
│   │   │   ├── RecipeIngredients/
│   │   │   ├── RecipePreparation/
│   │   │   └── PopularRecipes/
│   │   │
│   │   ├── user/             # User page components
│   │   │   ├── UserInfo/
│   │   │   ├── TabsList/
│   │   │   ├── ListItems/
│   │   │   ├── RecipePreview/
│   │   │   ├── UserCard/
│   │   │   └── ListPagination/
│   │   │
│   │   └── modals/           # Modal components
│   │       ├── SignInModal/
│   │       ├── SignUpModal/
│   │       └── LogOutModal/
│   │
│   ├── pages/                # Page components
│   │   ├── HomePage.jsx
│   │   ├── RecipePage.jsx
│   │   ├── AddRecipePage.jsx
│   │   ├── UserPage.jsx
│   │   └── index.js
│   │
│   ├── redux/                # Redux state management
│   │   ├── slices/          # Redux slices
│   │   │   ├── authSlice.js       # Authentication state
│   │   │   ├── recipesSlice.js    # Recipes state
│   │   │   ├── categoriesSlice.js # Categories state
│   │   │   ├── ingredientsSlice.js# Ingredients state
│   │   │   ├── areasSlice.js      # Areas state
│   │   │   ├── usersSlice.js      # Users state
│   │   │   └── favoritesSlice.js  # Favorites state
│   │   └── store.js         # Redux store configuration
│   │
│   ├── routes/              # Routing configuration
│   │   ├── PrivateRoute.jsx # Protected route wrapper
│   │   └── index.js
│   │
│   ├── services/            # API services
│   │   ├── api.js          # Axios instance with interceptors
│   │   ├── authService.js  # Authentication API calls
│   │   └── index.js
│   │
│   ├── hooks/               # Custom React hooks
│   │   ├── useModal.js     # Modal state management
│   │   └── index.js
│   │
│   ├── utils/               # Utility functions
│   │   ├── notification.js # Notification helper
│   │   └── index.js
│   │
│   ├── constants/           # Constants and configuration
│   │   ├── breakpoints.js  # Responsive breakpoints
│   │   ├── routes.js       # Route paths
│   │   ├── api.js          # API endpoints
│   │   └── index.js
│   │
│   ├── styles/              # Global styles
│   │   └── (CSS modules, styled-components, etc.)
│   │
│   ├── App.jsx             # Root component with routing
│   ├── App.css             # App styles
│   ├── main.jsx            # Application entry point
│   └── index.css           # Global styles
│
├── .env.example            # Environment variables template
├── .gitignore              # Git ignore rules
├── eslint.config.js        # ESLint configuration
├── index.html              # HTML entry point
├── package.json            # Project dependencies
├── vite.config.js          # Vite configuration
├── README.md               # Project documentation
└── PROJECT_STRUCTURE.md    # This file

```

## Key Architectural Decisions

### 1. Component Organization
- **Feature-based folders**: Components are grouped by feature (home, recipe, user)
- **Common components**: Reusable components in `components/common/`
- **Layout components**: Structural components in `components/layout/`
- **Index exports**: Each component folder exports through index.js for cleaner imports

### 2. State Management
- **Redux Toolkit**: Modern Redux with simplified configuration
- **Slice pattern**: Each feature has its own slice (auth, recipes, etc.)
- **Async thunks**: For handling API calls with loading/error states
- **Persistent state**: Token stored in localStorage for auth persistence

### 3. Routing
- **React Router v7**: Latest version with nested routes
- **PrivateRoute wrapper**: HOC for protected routes
- **SharedLayout**: Common layout for all pages with Header/Footer

### 4. API Integration
- **Axios interceptors**: Automatic token injection and error handling
- **Service layer**: Abstracted API calls in service files
- **Centralized endpoints**: All API endpoints defined in constants

### 5. Forms
- **Formik + Yup**: Industry-standard form management and validation
- **Schema validation**: Type-safe validation schemas
- **Error handling**: User-friendly error messages

## Responsive Design Breakpoints

```javascript
mobile: 375px   // Adaptive from 375px, elastic from 320px
tablet: 768px   // Tablet layout
desktop: 1440px // Desktop layout
```

## Component Naming Conventions

- **PascalCase**: For component files and names (e.g., `UserCard.jsx`)
- **camelCase**: For utility functions and hooks (e.g., `useModal.js`)
- **UPPER_SNAKE_CASE**: For constants (e.g., `API_BASE_URL`)

## File Structure Patterns

### Component Pattern
```
ComponentName/
├── ComponentName.jsx        # Component logic
├── ComponentName.module.css # Styles (if using CSS modules)
└── index.js                 # Export
```

### Slice Pattern
```javascript
// Redux slice structure
{
  name: 'feature',
  initialState: { ... },
  reducers: { ... },
  extraReducers: { ... }
}
```

## Best Practices

1. **Semantic HTML**: Use appropriate HTML5 semantic elements
2. **Accessibility**: Follow WCAG guidelines
3. **Performance**:
   - Lazy loading for images
   - Code splitting for routes
   - SVG sprites for icons
   - Optimized images for retina displays
4. **SEO**: Proper meta tags and favicon
5. **Code Quality**: ESLint configuration for consistent code style

## Routes

| Route | Access | Page | Description |
|-------|--------|------|-------------|
| `/` | Public | HomePage | Main page with hero, categories, recipes |
| `/recipe/:id` | Public | RecipePage | Recipe details |
| `/add` | Private | AddRecipePage | Create new recipe |
| `/user/:id` | Private | UserPage | User profile |

## State Structure

### Auth State
```javascript
{
  user: Object | null,
  token: string | null,
  isAuthenticated: boolean,
  isLoading: boolean,
  error: string | null
}
```

### Recipes State
```javascript
{
  items: Array,
  currentRecipe: Object | null,
  popularRecipes: Array,
  pagination: { currentPage, totalPages, limit },
  filters: { category, ingredient, area }
}
```

## Next Steps

1. **Implement remaining components** (see TODO comments in component files)
2. **Add styling** (CSS modules, styled-components, or Tailwind)
3. **Connect API endpoints** to backend
4. **Add image optimization** and SVG sprite generation
5. **Implement notification system** (react-toastify or react-hot-toast)
6. **Add loading states** and error boundaries
7. **Write tests** (Vitest + React Testing Library)
8. **Set up CI/CD** pipeline

## Team Collaboration

- **Code reviews**: Required for all PRs
- **Branch naming**: `feature/`, `bugfix/`, `hotfix/`
- **Commit messages**: Conventional commits format
- **Documentation**: Keep this file updated as the project evolves
