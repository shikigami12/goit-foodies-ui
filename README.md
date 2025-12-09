# Foodies

A food recipes site built with React - study project.

## Deployed
![Deploy](https://github.com/shikigami12/goit-foodies-ui/actions/workflows/deploy.yml/badge.svg)

## Project Information

- **Project Name:** Foodies
- **Team Name:** TBD
- **Purpose:** Study project for learning React and web development

## Tech Stack

### Core
- React 18.3 - UI library
- Vite 6.0 - Build tool
- React Router DOM 7.1 - Routing

### State Management
- Redux Toolkit 2.5 - State management
- React Redux 9.2 - React bindings

### Forms & API
- Formik 2.4 - Form management
- Yup 1.6 - Validation
- Axios 1.7 - HTTP client

### Code Quality
- ESLint 9.17 - Linting

## Getting Started

### Prerequisites

- Node.js (v18 or higher recommended)
- npm or yarn

### Installation

1. Clone the repository
2. Copy `.env.example` to `.env` and configure your environment variables
3. Install dependencies:
```bash
npm install
```

4. Start the development server:
```bash
npm run dev
```

5. Open your browser and navigate to `http://localhost:5173`

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## Project Structure

```
foodies/
├── public/              # Static assets
├── src/
│   ├── assets/         # Images, icons, fonts
│   ├── components/     # React components
│   │   ├── common/    # Reusable components
│   │   ├── layout/    # Layout components
│   │   ├── home/      # Home page components
│   │   ├── recipe/    # Recipe page components
│   │   ├── user/      # User page components
│   │   └── modals/    # Modal components
│   ├── pages/         # Page components
│   ├── redux/         # Redux store & slices
│   ├── routes/        # Route configuration
│   ├── services/      # API services
│   ├── hooks/         # Custom hooks
│   ├── utils/         # Utility functions
│   ├── constants/     # Constants & config
│   └── styles/        # Global styles
├── .env.example       # Environment template
├── index.html         # HTML template
└── vite.config.js     # Vite configuration
```

For a detailed explanation of the project structure, see [PROJECT_STRUCTURE.md](PROJECT_STRUCTURE.md).

## Deployment

This project is configured for automatic deployment to GitHub Pages. See [DEPLOYMENT.md](DEPLOYMENT.md) for complete deployment instructions.

### Quick Deploy

1. Enable GitHub Pages in repository settings (Source: GitHub Actions)
2. Push to `main` branch
3. Your site will be live at: `https://shikigami12.github.io/goit-foodies-ui/`

## Documentation

- [SETUP_COMPLETE.md](SETUP_COMPLETE.md) - Setup summary and next steps
- [PROJECT_STRUCTURE.md](PROJECT_STRUCTURE.md) - Detailed architecture guide
- [COMPONENT_TEMPLATE.md](COMPONENT_TEMPLATE.md) - Component development patterns
- [DEVELOPMENT_CHECKLIST.md](DEVELOPMENT_CHECKLIST.md) - Implementation tracker
- [DEPLOYMENT.md](DEPLOYMENT.md) - Deployment guide