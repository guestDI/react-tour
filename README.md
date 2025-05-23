# React Tour Guide

A flexible and accessible React component library for creating guided product tours in your application.

## Features

- 🎯 Spotlight effect with customizable positioning
- ⌨️ Full keyboard navigation support
- 🎨 Themeable with CSS variables and Tailwind classes
- 🌙 Dark mode support
- ♿ Accessibility features
- ⏳ Async step support
- 🎭 React Portal for tooltip rendering
- 📱 Responsive design

## Installation

```bash
npm install react-tour-guide
# or
yarn add react-tour-guide
# or
pnpm add react-tour-guide
```

## Quick Start

```tsx
import { TourProvider, Tour, useTour } from 'react-tour-guide';

const steps = [
  {
    selector: '#welcome-button',
    content: 'Welcome to our app! Click here to get started.',
    placement: 'bottom',
  },
  {
    selector: '#features-section',
    content: 'Check out our amazing features!',
    placement: 'right',
  },
];

function App() {
  return (
    <TourProvider steps={steps}>
      <YourApp />
      <Tour />
    </TourProvider>
  );
}

function YourApp() {
  const { start } = useTour();

  return (
    <button onClick={start}>
      Start Tour
    </button>
  );
}
```

## API Reference

### TourProvider

The main provider component that manages the tour state.

```tsx
<TourProvider
  steps={TourStep[]}
  defaultActive={boolean}
  onComplete={() => void}
  onSkip={() => void}
>
  {children}
</TourProvider>
```

### useTour Hook

A hook that provides tour controls and state.

```tsx
const {
  start,    // Start the tour
  stop,     // Stop the tour
  next,     // Go to next step
  back,     // Go to previous step
  skip,     // Skip the tour
  currentStep, // Current step index
  isActive, // Whether tour is active
} = useTour();
```

### TourStep Type

```tsx
interface TourStep {
  selector: string;      // CSS selector for target element
  content: React.ReactNode; // Content to display in tooltip
  placement?: 'top' | 'bottom' | 'left' | 'right'; // Tooltip placement
  waitFor?: () => Promise<void>; // Optional async function to wait for element
}
```

## Styling

The library provides multiple ways to customize its appearance:

### 1. CSS Variables

You can override the default theme by setting CSS variables in your root:

```css
:root {
  --tour-overlay-bg: rgba(0, 0, 0, 0.5);
  --tour-tooltip-bg: #ffffff;
  --tour-tooltip-border: #e5e7eb;
  --tour-tooltip-text: #1f2937;
  --tour-tooltip-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
  --tour-tooltip-padding: 1rem;
  --tour-tooltip-radius: 0.5rem;
  --tour-tooltip-transition: all 0.2s ease-in-out;
}

/* Dark mode variables */
.dark {
  --tour-tooltip-bg: #1f2937;
  --tour-tooltip-border: #374151;
  --tour-tooltip-text: #f9fafb;
}
```

### 2. Tailwind Classes

You can customize the appearance using Tailwind classes through the `Tour` component props:

```tsx
<Tour
  tooltipClassName="!bg-purple-100 !border-purple-300 !text-purple-900"
  buttonClassName="!bg-purple-500 !text-white hover:!bg-purple-600"
  overlayClassName="!bg-black/60 backdrop-blur-sm"
/>
```

### 3. Custom Classes

You can also use your own CSS classes by extending the default ones:

```css
/* Your custom styles */
.custom-tooltip {
  /* Extend tour-tooltip */
  @apply tour-tooltip;
  /* Add your custom styles */
  background: linear-gradient(to right, #4f46e5, #7c3aed);
}
```

### Available Style Props

```tsx
interface TourProps {
  className?: string;        // Root container class
  overlayClassName?: string; // Overlay background class
  tooltipClassName?: string; // Tooltip container class
  buttonClassName?: string;  // Button classes
  buttonContainerClassName?: string; // Button container class
  highlightTarget?: boolean | {      // Target element highlight
    className?: string;              // Custom highlight class
    style?: React.CSSProperties;     // Custom highlight styles
  };
}
```

### Example Usage

```tsx
<Tour
  tooltipClassName="!bg-purple-100 !border-purple-300 !text-purple-900"
  buttonClassName="!bg-purple-500 !text-white hover:!bg-purple-600"
  overlayClassName="!bg-black/60 backdrop-blur-sm"
  buttonContainerClassName="!border-t !border-purple-200 !pt-4 !mt-4"
  highlightTarget={{
    className: '!bg-purple-500/10 !border-purple-500/30 !shadow-purple-500/20'
  }}
/>
```

### Default Highlight Styles

The library provides default highlight styles that can be customized:

```css
.tour-highlight {
  background-color: rgba(255, 255, 255, 0.1);
  border: 2px solid rgba(255, 255, 255, 0.3);
  border-radius: 4px;
  box-shadow: 0 0 0 4px rgba(255, 255, 255, 0.1);
}

.dark .tour-highlight {
  background-color: rgba(255, 255, 255, 0.05);
  border-color: rgba(255, 255, 255, 0.2);
  box-shadow: 0 0 0 4px rgba(255, 255, 255, 0.05);
}
```

## Accessibility

- Keyboard navigation (Arrow keys, Enter, Escape)
- ARIA attributes for screen readers
- Focus management
- Semantic HTML structure

## Contributing

Contributions are welcome! Please read our [contributing guidelines](CONTRIBUTING.md) to get started.

## License

MIT © [Your Name]
