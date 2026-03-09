# React Product Tour

A flexible and accessible product tour component for React applications.

## Features

- Spotlight focus on target elements with smooth highlighting
- Multiple content types: text, images, videos, custom React components
- Fully accessible — ARIA attributes, keyboard navigation, screen reader support
- Dark mode support via CSS variables and `.dark` class
- Three animation styles: `slide`, `bounce`, `fade`
- Progress indicator
- Async step support via `waitFor`
- Customizable styling via CSS variables, class names, or fully custom button renders
- Error boundaries for graceful media failure degradation
- Debounced scroll/resize handling for smooth repositioning

## Installation

```bash
npm install react-product-tour-guide
```

Styles are loaded automatically — no separate CSS import needed.

## Quick Start

```tsx
import { TourProvider, Tour, useTour } from 'react-product-tour-guide';

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

function TourButton() {
  const { start } = useTour();
  return <button onClick={start}>Start Tour</button>;
}

function App() {
  return (
    <TourProvider steps={steps} onComplete={() => console.log('Tour done!')}>
      <TourButton />
      <Tour />
      {/* rest of your app */}
    </TourProvider>
  );
}
```

`Tour` renders the overlay and tooltip into a portal. `TourProvider` manages state. `useTour` exposes controls anywhere in the tree.

## API Reference

### `TourProvider` Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `steps` | `TourStep[]` | required | Array of tour steps |
| `children` | `ReactNode` | required | Child components |
| `defaultActive` | `boolean` | `false` | Start tour automatically on mount |
| `onComplete` | `() => void` | — | Called when the last step is completed |
| `onSkip` | `() => void` | — | Called when the tour is skipped |
| `onStepChange` | `(index, step) => void` | — | Called after navigating to a new step |
| `onStepEnter` | `(index, step) => void` | — | Called when entering a step |
| `onStepExit` | `(index, step) => void` | — | Called when leaving a step |

### `Tour` Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `skip` | `boolean` | `true` | Show the Skip button |
| `showProgress` | `boolean` | `false` | Show a progress bar |
| `animation` | `'slide' \| 'bounce' \| 'fade'` | `'slide'` | Tooltip entrance animation |
| `overlayClassName` | `string` | — | Class applied to the overlay |
| `tooltipClassName` | `string` | — | Class applied to the tooltip |
| `buttonClassName` | `string` | — | Class applied to all buttons |
| `buttonContainerClassName` | `string` | — | Class applied to the button container |
| `highlightTarget` | `boolean \| HighlightConfig` | — | Highlight the target element |
| `accessibility` | `AccessibilityConfig` | — | Screen reader and focus options |
| `buttonConfig` | `ButtonConfigObj` | — | Custom button content or render functions |

### `useTour`

Returns the tour context:

```ts
const {
  steps,        // TourStep[]
  currentStep,  // number
  isActive,     // boolean
  start,        // () => void
  stop,         // () => void
  next,         // () => Promise<void>  — awaits step.waitFor if present
  back,         // () => void
  skip,         // () => void
} = useTour();
```

`useTour` must be used inside a `TourProvider`.

### `TourStep`

| Property | Type | Description |
|----------|------|-------------|
| `selector` | `string` | CSS selector for the target element |
| `content` | `ReactNode \| ContentType` | Content to display in the tooltip |
| `placement` | `'top' \| 'bottom' \| 'left' \| 'right'` | Tooltip placement |
| `waitFor` | `() => Promise<void>` | Async gate before advancing to this step |

### `ContentType`

| Property | Type | Description |
|----------|------|-------------|
| `type` | `'text' \| 'image' \| 'video' \| 'custom'` | Content type |
| `value` | `ReactNode \| string \| MediaSource` | Content value |
| `props` | `Record<string, unknown>` | Extra props forwarded to the element |

### `MediaSource`

| Property | Type | Description |
|----------|------|-------------|
| `type` | `'remote' \| 'local'` | Media source type |
| `src` | `string` | URL or asset path |

### `AccessibilityConfig`

| Property | Type | Description |
|----------|------|-------------|
| `enableScreenReader` | `boolean` | Enable aria-live announcements |
| `announcements` | `{ start, end, step }` | Custom announcement strings |
| `focusManagement` | `'auto' \| 'manual'` | Focus strategy |
| `focusTrap` | `boolean` | Trap Tab key within the tour dialog |

---

## Content Types

### Plain text or ReactNode

```tsx
{ selector: '#el', content: 'Simple text' }
{ selector: '#el', content: <strong>Bold step</strong> }
```

### Image

```tsx
{
  selector: '#el',
  content: {
    type: 'image',
    value: 'https://example.com/screenshot.jpg',
    props: { alt: 'Feature screenshot', className: 'rounded-lg' },
  },
}
```

### Video

```tsx
{
  selector: '#el',
  content: {
    type: 'video',
    value: { type: 'remote', src: 'https://example.com/demo.mp4' },
    props: { poster: 'https://example.com/thumb.jpg' },
  },
}
```

### Custom component

```tsx
{
  selector: '#el',
  content: {
    type: 'custom',
    value: (
      <div>
        <h3>Custom content</h3>
        <p>Any React elements work here.</p>
      </div>
    ),
  },
}
```

### Async step (`waitFor`)

```tsx
{
  selector: '#async-panel',
  content: 'Panel loaded!',
  waitFor: () => new Promise(resolve => {
    // Resolve when the element is ready
    const el = document.querySelector('#async-panel');
    if (el) resolve();
    else setTimeout(resolve, 500);
  }),
}
```

---

## Theming

### CSS Variables

Override variables in your app's CSS to theme the tour globally:

```css
:root {
  --tour--overlay--background: rgba(0, 0, 0, 0.6);

  --tour--tooltip--background: white;
  --tour--tooltip--text: black;
  --tour--tooltip--border: #e5e7eb;
  --tour--tooltip--border-width: 1px;
  --tour--tooltip--radius: 0.5rem;
  --tour--tooltip--padding: 1rem;
  --tour--tooltip--gap: 0.5rem;
  --tour--tooltip--shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
  --tour--tooltip--transition: all 0.2s ease-in-out;

  --tour--button--primary--background: #646cff;
  --tour--button--primary--text: white;
  --tour--button--secondary--background: #e5e7eb;
  --tour--button--secondary--text: #374151;
}
```

### Dark Mode

Add the `.dark` class to any ancestor element (typically `<html>`):

```css
.dark {
  --tour--tooltip--background: #1f2937;
  --tour--tooltip--border: #374151;
  --tour--tooltip--text: #f9fafb;
}
```

### Custom Classes

```tsx
<Tour
  overlayClassName="bg-indigo-900/70"
  tooltipClassName="bg-indigo-800 text-white border-indigo-600"
  buttonClassName="rounded-full"
/>
```

### Custom Button Rendering

```tsx
<Tour
  buttonConfig={{
    primary: {
      content: 'Continue →',
      className: 'bg-indigo-500 text-white px-6 py-2 rounded-lg',
    },
    secondary: {
      content: '← Back',
    },
    // Or full custom render:
    primary: {
      render: ({ onNext, onComplete, isLastStep, currentStep, totalSteps }) => (
        <button onClick={isLastStep ? onComplete : onNext}>
          {isLastStep ? 'Finish' : `Next (${currentStep + 1}/${totalSteps})`}
        </button>
      ),
    },
    // Custom container layout:
    container: {
      render: (props) => (
        <div className="flex flex-col gap-3 mt-4 pt-4 border-t">
          <button onClick={props.isLastStep ? props.onComplete : props.onNext}>
            {props.isLastStep ? 'Done' : 'Next'}
          </button>
          {!props.isFirstStep && (
            <button onClick={props.onBack}>Back</button>
          )}
        </div>
      ),
    },
  }}
/>
```

---

## Callbacks

```tsx
<TourProvider
  steps={steps}
  onStepChange={(index, step) => analytics.track('tour_step', { index })}
  onStepEnter={(index, step) => console.log('entered', step.selector)}
  onStepExit={(index, step) => console.log('exited', step.selector)}
  onComplete={() => localStorage.setItem('tour_done', '1')}
  onSkip={() => console.log('skipped')}
>
  <Tour />
</TourProvider>
```

---

## Accessibility

```tsx
<Tour
  accessibility={{
    enableScreenReader: true,
    announcements: {
      start: 'Product tour started. Press Tab to navigate.',
      end: 'Tour complete.',
      step: 'Step {step} of {total}: {content}',
    },
    focusTrap: true,
    focusManagement: 'auto',
  }}
/>
```

---

## Global Manager (without context)

For use cases where `TourProvider` can't wrap your component tree:

```tsx
import { tourManager } from 'react-product-tour-guide';

tourManager.initialize(steps);
tourManager.start();
tourManager.next();
tourManager.stop();

// Subscribe to state changes
const unsubscribe = tourManager.subscribe((state) => {
  console.log(state.isActive, state.currentStep);
});
unsubscribe(); // cleanup
```

---

## Testing

The library ships with 95 unit + snapshot tests. Run them with:

```bash
npm test
```

To update DOM snapshots after intentional UI changes:

```bash
npm test -- --update-snapshots
```

---

## Contributing

See [CONTRIBUTING.md](CONTRIBUTING.md) for setup instructions, coding standards, and PR guidelines.

## License

MIT — see [LICENSE](LICENSE) for details.
