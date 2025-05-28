# React Product Tour

A flexible and accessible product tour component for React applications.

## Features

- 🎯 Spotlight focus on target elements
- 🎨 Customizable styling and theming
- ♿ Accessibility support
- 📱 Responsive design
- 🎭 Multiple content types (text, images, videos, custom content)
- 🔄 Navigation controls (next, back, skip)
- 🎥 Support for both remote and local media files
- 🎯 Highlight target elements with customizable styles
- 🎨 Partial blur overlay option
- 🎭 Composable component architecture
- 📊 Progress indicator
- 🛡️ Error boundaries for graceful degradation
- 🔍 Source maps for better debugging
- 🎯 Debounced event handlers for better performance

## Installation

```bash
npm install @your-org/react-product-tour
# or
yarn add @your-org/react-product-tour
```

## Usage

### Basic Usage

```tsx
import { TourProvider, useTour } from '@your-org/react-product-tour';

const steps = [
  {
    selector: '#feature-1',
    content: 'Welcome to Feature 1!',
    placement: 'bottom',
  },
  {
    selector: '#feature-2',
    content: {
      type: 'image',
      value: {
        type: 'local',
        src: '/assets/images/feature-2.jpg'
      }
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
```

### Content Types

The tour supports various content types:

1. **Text Content**
```tsx
{
  selector: '#feature-1',
  content: 'Simple text content'
}
```

2. **Image Content**
```tsx
// Remote image
{
  selector: '#feature-2',
  content: {
    type: 'image',
    value: 'https://example.com/image.jpg'
  }
}

// Local image
{
  selector: '#feature-2',
  content: {
    type: 'image',
    value: {
      type: 'local',
      src: '/assets/images/feature-2.jpg'
    }
  }
}
```

3. **Video Content**
```tsx
// Remote video
{
  selector: '#feature-3',
  content: {
    type: 'video',
    value: 'https://example.com/video.mp4'
  }
}

// Local video
{
  selector: '#feature-3',
  content: {
    type: 'video',
    value: {
      type: 'local',
      src: '/assets/videos/feature-3.mp4'
    }
  }
}
```

4. **Custom Content**
```tsx
{
  selector: '#feature-4',
  content: {
    type: 'custom',
    value: <YourCustomComponent />
  }
}
```

### Component Structure

The package is built using a composable architecture:

- `TourProvider`: Main context provider for tour state management
- `Spotlight`: Core component that handles positioning and rendering
- `TourOverlay`: Manages the overlay and spotlight cutout
- `TourHighlight`: Handles the highlight outline around target elements
- `TourTooltip`: Manages the tooltip content and navigation

### Styling

The component uses CSS modules and supports customization through className props:

```tsx
<TourProvider
  steps={steps}
  overlayClassName="custom-overlay"
  tooltipClassName="custom-tooltip"
  buttonClassName="custom-button"
  buttonContainerClassName="custom-button-container"
>
  <YourApp />
</TourProvider>
```

### Highlight Configuration

You can customize the highlight appearance:

```tsx
{
  selector: '#feature-1',
  content: 'Welcome!',
  highlightTarget: {
    className: 'custom-highlight',
    style: {
      borderColor: 'blue',
      borderWidth: '2px'
    }
  }
}
```

### Partial Blur Overlay

Enable partial blur effect for the overlay:

```tsx
<TourProvider
  steps={steps}
  overlayClassName="tour-overlay-partial-blur"
>
  <YourApp />
</TourProvider>
```

### Progress Indicator

Enable a progress bar to show the current step and total steps:

```tsx
<TourProvider
  steps={steps}
  showProgress={true}
>
  <YourApp />
</TourProvider>
```

### Error Handling

The tour includes built-in error boundaries and fallback content for media loading errors:

```tsx
// Custom error boundary
<ErrorBoundary
  fallback={<YourCustomErrorComponent />}
  onError={(error, errorInfo) => {
    console.error('Tour error:', error, errorInfo);
  }}
>
  <TourProvider steps={steps}>
    <YourApp />
  </TourProvider>
</ErrorBoundary>
```

### Development

The package includes source maps for better debugging in both development and production:

```bash
# Development
npm run dev

# Production build with source maps
npm run build
```

## API Reference

### TourProvider Props

| Prop | Type | Description |
|------|------|-------------|
| steps | TourStep[] | Array of tour steps |
| children | ReactNode | Child components |
| defaultActive | boolean | Whether the tour should start automatically |
| onComplete | () => void | Callback when tour is completed |
| onSkip | () => void | Callback when tour is skipped |
| showProgress | boolean | Whether to show the progress indicator |
| overlayClassName | string | Custom class for the overlay |
| tooltipClassName | string | Custom class for the tooltip |
| buttonClassName | string | Custom class for the buttons |
| buttonContainerClassName | string | Custom class for the button container |

### TourStep

| Property | Type | Description |
|----------|------|-------------|
| selector | string | CSS selector for the target element |
| content | ReactNode \| ContentType | Content to display in the tooltip |
| placement | Placement | Tooltip placement relative to target |
| waitFor | () => Promise<void> | Optional function to wait for before showing step |
| highlightTarget | boolean \| HighlightConfig | Configuration for target highlighting |

### ContentType

| Property | Type | Description |
|----------|------|-------------|
| type | 'text' \| 'image' \| 'video' \| 'custom' | Type of content |
| value | ReactNode \| MediaSource | Content value |
| props | Record<string, unknown> | Additional props for the content |

### MediaSource

| Property | Type | Description |
|----------|------|-------------|
| type | 'remote' \| 'local' | Type of media source |
| src | string | Source URL or path |

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

MIT
