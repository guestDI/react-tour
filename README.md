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

The tour component offers multiple ways to customize its appearance:

1. CSS Variables (Default Theme)
2. Tailwind Classes
3. Custom CSS Classes
4. Inline Styles

#### 1. CSS Variables (Default Theme)

The component comes with a set of CSS variables that you can override:

```css
:root {
  /* Tour Component Colors */
  --tour--overlay--background: rgba(0, 0, 0, 0.5);
  --tour--tooltip--background: white;
  --tour--tooltip--border: #e5e7eb;
  --tour--tooltip--text: black;
  --tour--tooltip--shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
  
  /* Tour Component Spacing */
  --tour--tooltip--padding: 1rem;
  --tour--tooltip--gap: 0.5rem;
  
  /* Tour Component Border */
  --tour--tooltip--radius: 0.5rem;
  --tour--tooltip--border-width: 1px;
  
  /* Tour Button Colors */
  --tour--button--primary--background: #646cff;
  --tour--button--primary--text: white;
  --tour--button--secondary--background: #e5e7eb;
  --tour--button--secondary--text: #374151;
}
```

#### 2. Tailwind Classes

You can use Tailwind classes to override the default styles:

```tsx
<Tour
  overlayClassName="bg-black/60 backdrop-blur-sm"
  tooltipClassName="bg-gradient-to-br from-amber-50 to-orange-50 border-2 border-amber-200 text-amber-900 rounded-xl shadow-lg p-6"
  buttonConfig={{
    primary: {
      className: "bg-gradient-to-r from-amber-500 to-orange-500 text-white font-semibold rounded-lg px-6 py-2 hover:from-amber-600 hover:to-orange-600 transition-all duration-200 shadow-md hover:shadow-lg",
      content: "Continue →"
    },
    secondary: {
      className: "bg-amber-100 text-amber-900 font-medium rounded-lg px-4 py-2 hover:bg-amber-200 transition-colors",
      content: "← Back"
    },
    container: {
      className: "flex flex-col gap-4 mt-6 pt-6 border-t-2 border-amber-200",
      direction: "column",
      align: "center",
      gap: "1rem"
    }
  }}
  highlightTarget={{
    className: "bg-amber-500/10 border-2 border-amber-500/30 shadow-amber-500/20 rounded-xl",
    style: {
      boxShadow: '0 0 0 4px rgba(245, 158, 11, 0.2)',
      transition: 'all 0.2s ease-in-out',
    }
  }}
/>
```

#### 3. Custom Button Rendering

You can completely customize the button rendering:

```tsx
<Tour
  buttonConfig={{
    primary: {
      render: ({ onNext, isLastStep, currentStep, totalSteps }) => (
        <button
          onClick={onNext}
          className="px-4 py-2 bg-violet-500 text-white rounded-lg hover:bg-violet-600 transition-colors flex items-center gap-2"
        >
          <span>{isLastStep ? 'Finish' : 'Continue'}</span>
          {currentStep !== undefined && totalSteps !== undefined && (
            <span className="text-sm opacity-75">
              {currentStep + 1}/{totalSteps}
            </span>
          )}
        </button>
      ),
    },
    secondary: {
      render: ({ onBack, onSkip, isFirstStep }) => (
        <div className="flex gap-2">
          {!isFirstStep && (
            <button
              onClick={onBack}
              className="px-4 py-2 bg-violet-100 text-violet-900 rounded-lg hover:bg-violet-200 transition-colors"
            >
              ← Back
            </button>
          )}
          <button
            onClick={onSkip}
            className="px-4 py-2 bg-violet-100 text-violet-900 rounded-lg hover:bg-violet-200 transition-colors"
          >
            Skip Tour
          </button>
        </div>
      ),
    },
    container: {
      render: ({ onNext, onBack, onSkip, onComplete, isFirstStep, isLastStep, currentStep, totalSteps }) => (
        <div className="flex flex-col gap-4 mt-4 pt-4 border-t border-violet-200">
          <div className="flex justify-between items-center">
            {currentStep !== undefined && totalSteps !== undefined && (
              <div className="text-sm text-violet-600">
                Step {currentStep + 1} of {totalSteps}
              </div>
            )}
            <div className="flex gap-2">
              {!isFirstStep && (
                <button
                  onClick={onBack}
                  className="px-4 py-2 bg-violet-100 text-violet-900 rounded-lg hover:bg-violet-200 transition-colors"
                >
                  ← Back
                </button>
              )}
              <button
                onClick={onSkip}
                className="px-4 py-2 bg-violet-100 text-violet-900 rounded-lg hover:bg-violet-200 transition-colors"
              >
                Skip Tour
              </button>
            </div>
          </div>
          <button
            onClick={isLastStep ? onComplete : onNext}
            className="w-full px-4 py-2 bg-violet-500 text-white rounded-lg hover:bg-violet-600 transition-colors"
          >
            {isLastStep ? 'Finish Tour' : 'Continue →'}
          </button>
        </div>
      ),
    },
  }}
/>
```

#### 4. Dark Mode Support

The component includes built-in dark mode support:

```css
.dark {
  --tour--tooltip--background: #1f2937;
  --tour--tooltip--border: #374151;
  --tour--tooltip--text: #f9fafb;
}
```

You can also use Tailwind's dark mode classes:

```tsx
<Tour
  tooltipClassName="bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700 text-gray-900 dark:text-gray-100"
  buttonConfig={{
    primary: {
      className: "bg-blue-500 dark:bg-blue-600 text-white hover:bg-blue-600 dark:hover:bg-blue-700"
    },
    secondary: {
      className: "bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-gray-100 hover:bg-gray-200 dark:hover:bg-gray-600"
    }
  }}
/>
```

#### 5. Animation Customization

The component supports different animation types:

```tsx
<Tour
  animation="slide" // or "bounce" or "fade"
  tooltipClassName="transition-all duration-300 ease-in-out"
  highlightTarget={{
    className: "transition-all duration-300 ease-in-out",
    style: {
      transition: 'all 0.3s ease-in-out',
    }
  }}
/>
```

#### 6. Responsive Design

The component is fully responsive and can be customized for different screen sizes:

```tsx
<Tour
  tooltipClassName="max-w-[300px] sm:max-w-[400px] md:max-w-[500px]"
  buttonConfig={{
    container: {
      className: "flex-col sm:flex-row gap-2 sm:gap-4",
      direction: "column",
      align: "center",
      gap: "1rem"
    }
  }}
/>
```

### Accessibility Features

#### Screen Reader Support
```tsx
<Tour
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
</Tour>
```

**Note:** If `enableScreenReader` is set to `true`, screen reader announcements will be visible on the page. To hide them, set `enableScreenReader` to `false` or use CSS to hide the announcements.

#### Focus Management
```tsx
<Tour
  steps={steps}
  accessibility={{
    focusManagement: 'auto', // or 'manual'
    focusTrap: true,
  }}
>
  <YourApp />
</Tour>
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

## Customizing Styles

### Overriding Styles with Props

You can override default styles by passing Tailwind or custom classes via props:

```jsx
<TourProvider
  steps={steps}
  tooltipClassName="bg-gray-900 text-white border border-blue-500"
  buttonClassName="bg-blue-500 text-white rounded px-4 py-2"
  buttonContainerClassName="flex gap-2"
>
  ...
</TourProvider>
```

### Overriding CSS Variables

You can override CSS variables in your app's CSS for global theming:

```css
:root {
  --tour-tooltip-bg: #f0f0f0;
  --tour-button-primary-bg: #00b894;
}
.dark {
  --tour-tooltip-bg: #222;
  --tour-tooltip-text: #fff;
}
```

### Tailwind CSS Compatibility

- Import your app's Tailwind CSS before the tour package CSS:
  ```js
  import 'tailwindcss/tailwind.css';
  import 'react-product-tour-guide/dist/theme.css';
  import 'react-product-tour-guide/dist/index.css';
  ```
- Pass Tailwind utility classes via props to override styles.

### Example: Using Tailwind CSS for Tour Styling

To fully leverage Tailwind CSS for customizing the tour, follow these steps:

1. **Import Order**

   Import Tailwind before the tour package styles in your app entry point:

   ```js
   import 'tailwindcss/tailwind.css';
   import 'react-product-tour-guide/dist/theme.css';
   import 'react-product-tour-guide/dist/index.css';
   ```

2. **Extend Tailwind Config (Optional)**

   If you want to use CSS variables from the tour in your Tailwind config:

   ```js
   // tailwind.config.js
   module.exports = {
     theme: {
       extend: {
         colors: {
           'tour-tooltip': 'var(--tour-tooltip-bg)',
           'tour-tooltip-text': 'var(--tour-tooltip-text)',
           // Add more as needed
         },
       },
     },
     // ...
   };
   ```

3. **Use Tailwind Utility Classes with !important**

   Pass Tailwind classes (with `!` for important) to the `TourProvider` props for reliable overrides:

   ```jsx
   <TourProvider
     steps={steps}
     tooltipClassName="!bg-white !border !border-gray-200 !rounded-lg !shadow-lg !p-4"
     buttonClassName="!bg-blue-500 !text-white !px-4 !py-2 !rounded-md hover:!bg-blue-600"
     buttonContainerClassName="!flex !gap-2 !justify-end !mt-4"
     highlightTarget={{
       className: '!bg-blue-500/10 !border !border-blue-500/30 !rounded-lg',
       style: {
         boxShadow: '0 0 0 4px rgba(59, 130, 246, 0.2)',
       }
     }}
   >
     <YourApp />
   </TourProvider>
   ```

4. **Dark Mode Example**

   ```jsx
   <TourProvider
     steps={steps}
     tooltipClassName="!bg-white dark:!bg-gray-800 !border !border-gray-200 dark:!border-gray-700 !text-gray-900 dark:!text-gray-100"
     buttonClassName="!bg-blue-500 dark:!bg-blue-600 !text-white hover:!bg-blue-600 dark:hover:!bg-blue-700"
     buttonContainerClassName="!flex !gap-2 !justify-end !mt-4 !border-t !border-gray-200 dark:!border-gray-700"
   >
     <YourApp />
   </TourProvider>
   ```

**Note:** The `!` prefix in Tailwind utility classes is required to override the package's default styles due to CSS specificity. Also, the `Tour` component is not exported directly; use `TourProvider` instead.

### Dark Mode Support

- The tour supports dark mode via the `.dark` class on a parent element (e.g., `<html>` or `<body>`):
  ```html
  <html class="dark">
  ```
- You can also override variables in `.dark` for custom dark themes.

### Simple Customization with Style Props

You can easily customize the look of the tour using simple style props:

```jsx
<TourProvider
  steps={steps}
  tooltipBg="#222"
  tooltipTextColor="#fff"
  buttonBg="#6366f1"
  buttonTextColor="#fff"
  borderRadius="1rem"
>
  ...
</TourProvider>
```

This will set the background, text color, button color, and border radius for the tour components. You can combine these with the className props for even more control.

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

### Troubleshooting Common Issues

#### Tailwind Styling Not Applying

If your Tailwind classes aren't applying as expected:

- **CSS Specificity**: Ensure you're using the `!` prefix for Tailwind utilities to override the package's default styles.
- **Import Order**: Verify that Tailwind CSS is imported before the tour package styles.
- **Component Usage**: Remember that the `Tour` component is not exported directly; use `TourProvider` instead.

Example:

```jsx
<TourProvider
  steps={steps}
  tooltipClassName="!bg-white !border !border-gray-200 !rounded-lg !shadow-lg !p-4"
  buttonClassName="!bg-blue-500 !text-white !px-4 !py-2 !rounded-md hover:!bg-blue-600"
  buttonContainerClassName="!flex !gap-2 !justify-end !mt-4"
>
  <YourApp />
</TourProvider>
```

#### Screen Reader Announcements

If you see unwanted screen reader announcements (e.g., "Tour ended"):

- **Disable Screen Reader**: Set `enableScreenReader` to `false` in the `accessibility` prop:

```jsx
<Tour
  steps={steps}
  accessibility={{
    enableScreenReader: false,
  }}
>
  <YourApp />
</Tour>
```

**Note:** Ensure that `enableScreenReader` is explicitly set to `false` to disable screen reader announcements. If it is not set or set to `true`, announcements will still be made.

- **Custom Announcements**: If you want to keep screen reader support but customize the messages, provide your own announcements:

```jsx
<Tour
  steps={steps}
  accessibility={{
    enableScreenReader: true,
    announcements: {
      start: 'Starting tour...',
      end: 'Tour completed.',
      step: 'Step {step} of {total}: {content}',
    },
  }}
>
  <YourApp />
</Tour>
```

- **Hide Announcements with CSS**: If you still see the announcements on the page, you can hide them using CSS. Add the following to your global CSS file:

```css
.sr-only {
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  white-space: nowrap;
  border-width: 0;
  visibility: hidden; /* Ensure the element is not visible */
}
```

This will ensure that screen reader announcements are only accessible to screen readers and not visible on the page.

### Spotlight Component

The `Spotlight` component is used internally by `TourProvider` to highlight target elements and display tooltips. It should not be used directly in your application. The accessibility properties are managed by `TourProvider`, so you only need to configure them there.

Example of correct usage:

```jsx
<TourProvider
  steps={steps}
  accessibility={{
    enableScreenReader: false,
  }}
>
  <YourApp />
</TourProvider>
```

**Note:** Do not use the `Spotlight` component directly. All accessibility and styling configurations should be passed to `TourProvider`.
