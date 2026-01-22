# CLAUDE.md - AI Assistant Guide for E-Commerce Validation Project

This document provides comprehensive guidance for AI assistants working on this e-commerce validation codebase.

## Project Overview

**Repository:** ecommerceforvalidation
**Purpose:** E-commerce platform for validation testing and development
**Status:** Initial setup phase

## Project Structure

```
ecommerceforvalidation/
├── CLAUDE.md              # AI assistant guidance (this file)
├── src/                   # Source code
│   ├── components/        # Reusable UI components
│   ├── pages/             # Page-level components/routes
│   ├── services/          # API and business logic services
│   ├── models/            # Data models and types
│   ├── utils/             # Utility functions and helpers
│   ├── hooks/             # Custom React hooks (if using React)
│   └── styles/            # Global styles and themes
├── tests/                 # Test files
│   ├── unit/              # Unit tests
│   ├── integration/       # Integration tests
│   └── e2e/               # End-to-end tests
├── public/                # Static assets
├── config/                # Configuration files
├── scripts/               # Build and utility scripts
└── docs/                  # Documentation
```

## Development Workflow

### Getting Started

1. Clone the repository
2. Install dependencies: `npm install` or `yarn install`
3. Set up environment variables (copy `.env.example` to `.env`)
4. Start development server: `npm run dev` or `yarn dev`

### Common Commands

| Command | Description |
|---------|-------------|
| `npm run dev` | Start development server |
| `npm run build` | Build for production |
| `npm run test` | Run test suite |
| `npm run lint` | Run linter |
| `npm run format` | Format code with Prettier |

### Git Workflow

1. **Branch naming:** Use descriptive branch names
   - Features: `feature/description`
   - Bugfixes: `fix/description`
   - Hotfixes: `hotfix/description`

2. **Commit messages:** Follow conventional commits
   - `feat:` New features
   - `fix:` Bug fixes
   - `docs:` Documentation changes
   - `style:` Code style changes (formatting, etc.)
   - `refactor:` Code refactoring
   - `test:` Adding or updating tests
   - `chore:` Maintenance tasks

3. **Pull requests:** Include description of changes and testing performed

## Code Conventions

### General Principles

- Write clean, readable, and maintainable code
- Follow DRY (Don't Repeat Yourself) principles
- Keep functions small and focused on single responsibility
- Use meaningful variable and function names
- Add comments only when code intent isn't self-evident

### TypeScript/JavaScript

- Use TypeScript for type safety when applicable
- Prefer `const` over `let`, avoid `var`
- Use arrow functions for callbacks
- Use async/await over raw promises
- Export types and interfaces for reusability

### React Components (if applicable)

- Use functional components with hooks
- Keep components small and composable
- Use proper prop typing
- Separate business logic from presentation

### CSS/Styling

- Use consistent naming conventions (BEM or CSS-in-JS)
- Avoid inline styles except for dynamic values
- Use CSS variables for theming

## E-Commerce Specific Guidelines

### Data Models

Core entities to consider:
- **Products:** name, description, price, inventory, categories, images
- **Users:** authentication, profiles, addresses, payment methods
- **Orders:** items, status, shipping, payment
- **Cart:** session-based or user-linked cart management
- **Categories:** hierarchical product categorization

### Security Considerations

- Sanitize all user inputs
- Use parameterized queries for database operations
- Implement proper authentication and authorization
- Handle sensitive data (PII, payment info) securely
- Follow OWASP security guidelines

### Validation Requirements

- Validate all form inputs on both client and server
- Implement proper error handling and user feedback
- Use schema validation (Zod, Yup, or similar)
- Test edge cases in validation logic

### Performance

- Optimize images and assets
- Implement lazy loading where appropriate
- Use caching strategies
- Monitor and optimize database queries

## Testing Guidelines

### Test Coverage

- Write unit tests for utility functions and business logic
- Write integration tests for API endpoints
- Write E2E tests for critical user flows (checkout, authentication)

### Test Structure

```javascript
describe('ComponentName', () => {
  describe('functionality', () => {
    it('should do something specific', () => {
      // Arrange
      // Act
      // Assert
    });
  });
});
```

### Critical Test Paths for E-Commerce

1. User registration and login
2. Product browsing and search
3. Cart operations (add, update, remove)
4. Checkout flow
5. Payment processing
6. Order management

## AI Assistant Instructions

### When Making Changes

1. **Read before editing:** Always read existing files before making modifications
2. **Understand context:** Review related files to understand patterns and conventions
3. **Minimal changes:** Make only the changes necessary to accomplish the task
4. **Preserve style:** Match existing code style and patterns
5. **Test impact:** Consider how changes affect existing functionality

### Code Quality Checklist

Before completing a task, verify:
- [ ] Code follows project conventions
- [ ] No security vulnerabilities introduced
- [ ] Error handling is appropriate
- [ ] Changes are tested or testable
- [ ] No unnecessary dependencies added
- [ ] Documentation updated if needed

### What to Avoid

- Don't add features beyond what's requested
- Don't refactor unrelated code
- Don't add unnecessary abstractions
- Don't include time estimates
- Don't add comments to unchanged code
- Don't create unnecessary files

### File Operations

- Prefer editing existing files over creating new ones
- Only create new files when structurally necessary
- Follow existing file naming conventions
- Place files in appropriate directories per project structure

## Environment Variables

Expected environment variables (create `.env` from `.env.example`):

```
# Application
NODE_ENV=development
PORT=3000

# Database
DATABASE_URL=

# Authentication
JWT_SECRET=
SESSION_SECRET=

# Payment Processing
STRIPE_PUBLIC_KEY=
STRIPE_SECRET_KEY=

# External Services
API_BASE_URL=
```

## Dependencies (Recommended)

### Core
- React/Next.js or Vue/Nuxt for frontend
- Node.js/Express or similar for backend
- PostgreSQL/MongoDB for database

### Validation
- Zod or Yup for schema validation
- React Hook Form or Formik for form handling

### Testing
- Jest for unit/integration tests
- Cypress or Playwright for E2E tests
- React Testing Library for component tests

### Utilities
- Axios or fetch for HTTP requests
- date-fns for date manipulation
- lodash for utility functions (use sparingly)

## Troubleshooting

### Common Issues

1. **Build failures:** Check for TypeScript errors, missing dependencies
2. **Test failures:** Verify test database setup, mock configurations
3. **Runtime errors:** Check environment variables, API connections

### Getting Help

- Check existing documentation in `/docs`
- Review similar implementations in codebase
- Check package documentation for third-party dependencies

---

*Last updated: January 2026*
*This document should be updated as the project evolves.*
