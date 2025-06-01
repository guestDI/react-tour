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
npm install react-product-tour-guide
# or
yarn add react-product-tour-guide
```

## Quick Start

```tsx
import { TourProvider, useTour } from 'react-product-tour-guide';

function App() {
  const steps = [
    {
      selector: '#welcome',
      content: 'Welcome to our app!',
      placement: 'bottom',
    },
    {
      selector: '#features',
      content: 'Check out our amazing features!',
      placement: 'right',
    },
  ];

  return (
    <TourProvider steps={steps}>
      <YourApp />
    </TourProvider>
  );
}
```

## Advanced Usage

### Custom Content Types

#### Text Content
```tsx
const steps = [
  {
    selector: '#feature-1',
    content: 'Simple text content',
    placement: 'bottom',
  },
  {
    selector: '#feature-2',
    content: {
      type: 'text',
      value: 'Formatted text content',
      props: {
        className: 'text-lg font-bold',
      },
    },
    placement: 'right',
  },
];
```

#### Image Content
```tsx
const steps = [
  // Remote image
  {
    selector: '#feature-1',
    content: {
      type: 'image',
      value: 'https://example.com/image.jpg',
      props: {
        alt: 'Feature screenshot',
        className: 'rounded-lg shadow-lg',
      },
    },
    placement: 'bottom',
  },
  // Local image
  {
    selector: '#feature-2',
    content: {
      type: 'image',
      value: {
        type: 'local',
        src: '/assets/images/feature.jpg',
      },
      props: {
        alt: 'Local feature image',
        className: 'rounded-lg',
      },
    },
    placement: 'right',
  },
];
```

#### Video Content
```tsx
const steps = [
  // Remote video
  {
    selector: '#feature-1',
    content: {
      type: 'video',
      value: 'https://example.com/video.mp4',
      props: {
        poster: 'https://example.com/poster.jpg',
        controls: true,
        className: 'rounded-lg',
      },
    },
    placement: 'bottom',
  },
  // Local video
  {
    selector: '#feature-2',
    content: {
      type: 'video',
      value: {
        type: 'local',
        src: '/assets/videos/feature.mp4',
      },
      props: {
        poster: '/assets/images/poster.jpg',
        controls: true,
        className: 'rounded-lg',
      },
    },
    placement: 'right',
  },
];
```

#### Custom Content
```tsx
const steps = [
  {
    selector: '#feature-1',
    content: {
      type: 'custom',
      value: (
        <div className="space-y-4">
          <h3 className="text-xl font-bold">Custom Feature</h3>
          <p className="text-gray-600">Detailed feature description</p>
          <ul className="list-disc list-inside">
            <li>Feature point 1</li>
            <li>Feature point 2</li>
          </ul>
          <button className="px-4 py-2 bg-blue-500 text-white rounded">
            Learn More
          </button>
        </div>
      ),
    },
    placement: 'bottom',
  },
];
```

### Styling Customization

#### Basic Styling
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

#### Theme Customization
```tsx
// styles/theme.css
:root {
  --tour-overlay-bg: rgba(0, 0, 0, 0.5);
  --tour-tooltip-bg: white;
  --tour-tooltip-text: black;
  --tour-button-primary-bg: #3b82f6;
  --tour-button-primary-text: white;
}

.dark {
  --tour-overlay-bg: rgba(0, 0, 0, 0.7);
  --tour-tooltip-bg: #1f2937;
  --tour-tooltip-text: white;
  --tour-button-primary-bg: #60a5fa;
  --tour-button-primary-text: black;
}
```

### Accessibility Features

#### Screen Reader Support
```tsx
<TourProvider
  steps={steps}
  accessibility={{
    enableScreenReader: true,
    announcements: {
      start: 'Starting product tour. Use arrow keys to navigate.',
      end: 'Tour completed. Thank you for exploring our features.',
      step: 'Step {step} of {total}: {content}',
    },
  }}
>
  <YourApp />
</TourProvider>
```

#### Focus Management
```tsx
<TourProvider
  steps={steps}
  accessibility={{
    focusManagement: 'auto', // or 'manual'
    focusTrap: true,
  }}
>
  <YourApp />
</TourProvider>
```

### Error Handling

#### Media Error Handling
```tsx
const steps = [
  {
    selector: '#feature-1',
    content: {
      type: 'image',
      value: 'https://example.com/image.jpg',
      props: {
        alt: 'Feature image',
        onError: () => {
          console.error('Failed to load image');
          // Show fallback content
        },
      },
    },
    placement: 'bottom',
  },
];
```

### Step Callbacks

```tsx
<TourProvider
  steps={steps}
  onStepChange={(stepIndex, step) => {
    console.log(`Step changed to ${stepIndex}:`, step);
  }}
  onStepEnter={(stepIndex, step) => {
    console.log(`Entering step ${stepIndex}:`, step);
  }}
  onStepExit={(stepIndex, step) => {
    console.log(`Exiting step ${stepIndex}:`, step);
  }}
  onComplete={() => {
    console.log('Tour completed!');
  }}
  onSkip={() => {
    console.log('Tour skipped!');
  }}
>
  <YourApp />
</TourProvider>
```

### RTL Support

```tsx
<TourProvider
  steps={steps}
  isRTL={true}
>
  <YourApp />
</TourProvider>
```

### Progress Indicator

```tsx
<TourProvider
  steps={steps}
  showProgress={true}
>
  <YourApp />
</TourProvider>
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
| isRTL | boolean | Whether the tour is in RTL mode |
| accessibility | AccessibilityConfig | Accessibility configuration |

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

### AccessibilityConfig

| Property | Type | Description |
|----------|------|-------------|
| enableScreenReader | boolean | Whether to enable screen reader announcements |
| announcements | AnnouncementsConfig | Custom screen reader announcements |
| focusManagement | 'auto' \| 'manual' | Focus management strategy |
| focusTrap | boolean | Whether to trap focus within the tour |

## Contributing

See [CONTRIBUTING.md](CONTRIBUTING.md) for details on how to contribute to this project.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
