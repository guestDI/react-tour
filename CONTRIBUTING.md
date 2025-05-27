# Contributing to Product Tour

Thank you for your interest in contributing to our Product Tour component! This document provides guidelines and instructions for contributing.

## Table of Contents

- [Development Setup](#development-setup)
- [Project Structure](#project-structure)
- [Coding Standards](#coding-standards)
- [Testing](#testing)
- [Documentation](#documentation)
- [Pull Request Process](#pull-request-process)
- [Code Review Guidelines](#code-review-guidelines)

## Development Setup

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn
- Git

### Installation

1. Fork the repository
2. Clone your fork:
   ```bash
   git clone https://github.com/your-username/product-tour.git
   cd product-tour
   ```
3. Install dependencies:
   ```bash
   npm install
   # or
   yarn install
   ```

### Development Workflow

1. Create a new branch:
   ```bash
   git checkout -b feature/your-feature-name
   # or
   git checkout -b fix/your-fix-name
   ```

2. Start the development server:
   ```bash
   npm run dev
   # or
   yarn dev
   ```

3. Run tests:
   ```bash
   npm test
   # or
   yarn test
   ```

## Project Structure

```
product-tour/
├── src/
│   ├── components/     # React components
│   ├── context/       # React context providers
│   ├── styles/        # CSS and theme files
│   ├── types/         # TypeScript type definitions
│   └── stories/       # Storybook stories
├── tests/             # Test files
├── docs/              # Documentation
└── examples/          # Example implementations
```

## Coding Standards

### TypeScript

- Use TypeScript for all new code
- Define proper types for all props and functions
- Avoid using `any` type
- Use interfaces for component props
- Export types that might be used by consumers

### React

- Use functional components with hooks
- Follow React best practices
- Keep components small and focused
- Use proper prop types and default props
- Implement proper cleanup in useEffect

### CSS

- Use Tailwind CSS for styling
- Follow BEM naming convention for custom classes
- Use CSS variables for theming
- Support dark mode
- Ensure responsive design

### Accessibility

- Follow WCAG 2.1 guidelines
- Include proper ARIA attributes
- Ensure keyboard navigation
- Support screen readers
- Test with accessibility tools

## Testing

### Unit Tests

- Write tests for all new features
- Maintain existing test coverage
- Use React Testing Library
- Test user interactions
- Mock external dependencies

### Component Tests

- Test component rendering
- Test user interactions
- Test accessibility
- Test error states
- Test edge cases

### E2E Tests

- Test complete user flows
- Test in different browsers
- Test responsive design
- Test performance

## Documentation

### Code Documentation

- Document complex logic
- Add JSDoc comments for functions
- Document component props
- Keep README up to date
- Document breaking changes

### Storybook

- Create stories for new components
- Document component variants
- Add usage examples
- Include prop documentation
- Show accessibility features

## Pull Request Process

1. Update the README.md with details of changes if needed
2. Update the documentation with any new features
3. Add or update tests as needed
4. Ensure all tests pass
5. Update the CHANGELOG.md
6. The PR will be merged once you have the sign-off of at least one other developer

### PR Template

```markdown
## Description
[Describe your changes here]

## Type of Change
- [ ] Bug fix
- [ ] New feature
- [ ] Breaking change
- [ ] Documentation update

## Checklist
- [ ] My code follows the style guidelines
- [ ] I have performed a self-review
- [ ] I have added tests
- [ ] I have updated the documentation
- [ ] My changes generate no new warnings
- [ ] I have added necessary accessibility features
```

## Code Review Guidelines

### What to Review

- Code quality and style
- Test coverage
- Documentation
- Accessibility
- Performance
- Security

### Review Process

1. Check the code style
2. Verify tests are present and passing
3. Test the changes locally
4. Check accessibility
5. Review documentation
6. Provide constructive feedback

### Review Comments

- Be specific and constructive
- Explain the reasoning
- Suggest improvements
- Reference documentation
- Be respectful

## Getting Help

- Open an issue for bugs
- Use discussions for questions
- Join our community chat
- Check existing documentation
- Review previous issues

## License

By contributing, you agree that your contributions will be licensed under the project's MIT License. 