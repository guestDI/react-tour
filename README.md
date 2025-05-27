# Product Tour Component

A flexible and accessible product tour component for React applications.

## Features

- Interactive step-by-step guided tours
- Customizable styling and animations
- Keyboard navigation support
- Screen reader accessibility
- Dark mode support
- High contrast mode support
- Reduced motion support
- Rich content support (text, images, videos, custom components)
- Optional skip button

## Installation

```bash
npm install product-tour
# or
yarn add product-tour
```

## Basic Usage

```tsx
import { TourProvider, Tour, useTour } from 'product-tour';

const steps = [
  {
    selector: '#welcome-button',
    content: 'Welcome to our app! Click here to get started.',
    placement: 'bottom',
  },
  {
    selector: '#features-section',
    content: {
      type: 'image',
      value: 'https://example.com/features.jpg',
      props: {
        alt: 'Features overview',
      },
    },
    placement: 'right',
  },
];

function App() {
  return (
    <TourProvider steps={steps}>
      <YourApp />
    </TourProvider>
  );
}

function YourApp() {
  const { start } = useTour();
  
  return (
    <>
      <button onClick={start}>Start Tour</button>
      <Tour />
    </>
  );
}
```

## API Reference

### TourProvider Props

```tsx
interface TourProviderProps {
  steps: TourStep[];
  children: React.ReactNode;
  defaultActive?: boolean;
  onComplete?: () => void;
  onSkip?: () => void;
}

interface TourStep {
  selector: string;      // CSS selector for target element
  content: React.ReactNode | ContentType; // Content to display in tooltip
  placement?: 'top' | 'bottom' | 'left' | 'right'; // Tooltip placement
  waitFor?: () => Promise<void>; // Optional async function to wait for element
}

interface ContentType {
  type: 'text' | 'image' | 'video' | 'custom';
  value: string | React.ReactNode;
  props?: Record<string, any>;
}
```

### Tour Component Props

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
  skip?: boolean;           // Show/hide skip button (default: true)
}
```

## Content Types

The tour supports various types of content:

### Text Content
```tsx
{
  selector: '#element',
  content: 'Simple text content',
  placement: 'bottom'
}
```

### Image Content
```tsx
{
  selector: '#element',
  content: {
    type: 'image',
    value: 'https://example.com/image.jpg',
    props: {
      alt: 'Description',
      className: 'custom-class'
    }
  },
  placement: 'bottom'
}
```

### Video Content
```tsx
{
  selector: '#element',
  content: {
    type: 'video',
    value: 'https://example.com/video.mp4',
    props: {
      poster: 'https://example.com/poster.jpg',
      controls: true
    }
  },
  placement: 'bottom'
}
```

### Custom React Component
```tsx
{
  selector: '#element',
  content: {
    type: 'custom',
    value: <YourCustomComponent />
  },
  placement: 'bottom'
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
  overlayClassName="!bg-black/40" // Semi-transparent overlay
  skip={false} // Hide skip button
/>
```

### 3. Overlay and Blur Effects

The overlay can be customized with or without blur effects:

```tsx
// Basic overlay without blur
<Tour
  overlayClassName="!bg-black/40"
/>

// Overlay with blur effect
<Tour
  overlayClassName="!bg-black/40 tour-overlay-blur"
/>

// Overlay with partial blur (only non-spotlighted areas are blurred)
<Tour
  overlayClassName="!bg-black/40 tour-overlay-partial-blur"
/>
```

The partial blur effect creates a spotlight effect where only the non-spotlighted areas are blurred, making the highlighted element stand out even more. This is particularly useful when you want to maintain context while focusing attention on specific elements.

### 4. Custom Classes

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
- High contrast mode support
- Reduced motion support

## Contributing

Contributions are welcome! Please read our [contributing guidelines](CONTRIBUTING.md) to get started.

## License

MIT © [Your Name]
