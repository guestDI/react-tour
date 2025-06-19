# Theme Customization Guide

This guide explains how to customize the appearance of the React Product Tour Guide using CSS variables and other styling approaches.

## CSS Variables Naming Convention

The package uses a structured naming convention for CSS variables to make customization more intuitive and maintainable:

```
--tour--[component]--[property]
```

Where:
- `tour`: Namespace prefix to avoid conflicts
- `component`: The component being styled (e.g., tooltip, button, overlay)
- `property`: The specific property being customized

### Examples:
```css
--tour--tooltip--background    /* Tooltip background color */
--tour--button--primary--text  /* Primary button text color */
--tour--overlay--background    /* Overlay background color */
```

## Available CSS Variables

### Colors
```css
:root {
  /* Overlay */
  --tour--overlay--background: rgba(0, 0, 0, 0.5);

  /* Tooltip */
  --tour--tooltip--background: white;
  --tour--tooltip--border: #e5e7eb;
  --tour--tooltip--text: black;
  --tour--tooltip--shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);

  /* Buttons */
  --tour--button--primary--background: #646cff;
  --tour--button--primary--text: white;
  --tour--button--secondary--background: #e5e7eb;
  --tour--button--secondary--text: #374151;
}
```

### Spacing
```css
:root {
  --tour--tooltip--padding: 1rem;
  --tour--tooltip--gap: 0.5rem;
}
```

### Borders
```css
:root {
  --tour--tooltip--radius: 0.5rem;
  --tour--tooltip--border-width: 1px;
}
```

### Animation
```css
:root {
  --tour--tooltip--transition: all 0.2s ease-in-out;
}
```

## Customization Methods

### 1. CSS Variables Override

The simplest way to customize the tour is by overriding CSS variables in your application's CSS:

```css
:root {
  /* Override specific properties */
  --tour--tooltip--background: #f0f0f0;
  --tour--button--primary--background: #00b894;
}
```

### 2. Dark Mode Support

The package includes built-in dark mode support. Override dark mode variables in your `.dark` class:

```css
.dark {
  --tour--tooltip--background: #1f2937;
  --tour--tooltip--border: #374151;
  --tour--tooltip--text: #f9fafb;
}
```

### 3. Props-based Customization

You can also customize the tour using props in the `TourProvider`:

```tsx
<TourProvider
  tooltipBg="#f0f0f0"
  tooltipTextColor="#333"
  buttonBg="#00b894"
  buttonTextColor="white"
  borderRadius="0.5rem"
>
  <YourApp />
</TourProvider>
```

### 4. Class-based Customization

The package provides several classes that you can extend or override:

```css
/* Override tooltip styles */
.tour-tooltip {
  /* Your custom styles */
}

/* Override button styles */
.tour-button {
  /* Your custom styles */
}

/* Override overlay styles */
.tour-overlay {
  /* Your custom styles */
}
```

### 5. Component-Level Style Props

The package now supports granular styling through component-level style props. This allows you to customize specific components with both CSS classes and inline styles:

```tsx
<TourProvider
  steps={steps}
  styles={{
    tooltip: {
      className: 'custom-tooltip',
      style: {
        backgroundColor: '#f0f0f0',
        borderRadius: '8px',
      },
    },
    overlay: {
      className: 'custom-overlay',
      style: {
        backdropFilter: 'blur(4px)',
      },
    },
    button: {
      primary: {
        className: 'custom-primary-button',
        style: {
          backgroundColor: '#00b894',
          color: 'white',
        },
      },
      secondary: {
        className: 'custom-secondary-button',
        style: {
          backgroundColor: '#f1f1f1',
          color: '#333',
        },
      },
      container: {
        className: 'custom-button-container',
        style: {
          gap: '1rem',
        },
      },
    },
    highlight: {
      className: 'custom-highlight',
      style: {
        boxShadow: '0 0 0 4px rgba(0, 184, 148, 0.2)',
      },
    },
  }}
>
  <YourApp />
</TourProvider>
```

This approach:
- Provides fine-grained control over each component's styling
- Supports both CSS classes and inline styles
- Maintains backward compatibility with existing styling methods
- Works well with CSS-in-JS solutions

You can combine this with other styling methods:

```tsx
<TourProvider
  steps={steps}
  // Legacy props
  tooltipBg="#f0f0f0"
  tooltipTextColor="#333"
  // New style props
  styles={{
    tooltip: {
      className: 'custom-tooltip',
      style: {
        borderRadius: '8px',
      },
    },
  }}
>
  <YourApp />
</TourProvider>
```

## Integration with CSS Frameworks

### Tailwind CSS

When using Tailwind CSS, you can override styles using the `!important` modifier:

```tsx
<TourProvider
  tooltipClassName="!bg-white !border !border-gray-200 !rounded-lg !shadow-lg"
  buttonClassName="!bg-blue-500 !text-white !px-4 !py-2 !rounded-md"
>
  <YourApp />
</TourProvider>
```

### Styled Components

When using styled-components, you can extend the base components:

```tsx
import styled from 'styled-components';

const StyledTourTooltip = styled.div`
  background-color: ${props => props.theme.colors.background};
  color: ${props => props.theme.colors.text};
  border-radius: ${props => props.theme.borderRadius};
`;
```

## Best Practices

1. **Consistent Theming**: Keep your tour styling consistent with your application's design system
2. **Accessibility**: Ensure sufficient color contrast and maintain focus states
3. **Responsive Design**: Test your customizations across different screen sizes
4. **Performance**: Avoid complex CSS calculations or heavy animations
5. **Maintainability**: Use the structured naming convention for custom variables

## Troubleshooting

### Common Issues

1. **Styles Not Applying**
   - Ensure CSS variables are defined in the correct scope
   - Check for CSS specificity conflicts
   - Verify that the tour styles are imported after your custom styles

2. **Dark Mode Not Working**
   - Ensure the `.dark` class is applied to a parent element
   - Verify dark mode variables are correctly defined
   - Check for conflicting dark mode styles

3. **Custom Classes Not Working**
   - Use the `!important` modifier when necessary
   - Ensure proper class specificity
   - Check for conflicting styles from other sources

## Examples

### Basic Customization
```css
:root {
  --tour--tooltip--background: #ffffff;
  --tour--tooltip--text: #333333;
  --tour--button--primary--background: #3b82f6;
  --tour--button--primary--text: #ffffff;
}
```

### Dark Mode Customization
```css
.dark {
  --tour--tooltip--background: #1f2937;
  --tour--tooltip--text: #f9fafb;
  --tour--button--primary--background: #60a5fa;
  --tour--button--primary--text: #1f2937;
}
```

### Advanced Customization
```css
:root {
  /* Custom theme */
  --tour--tooltip--background: var(--my-app-background);
  --tour--tooltip--text: var(--my-app-text);
  --tour--button--primary--background: var(--my-app-primary);
  --tour--button--primary--text: var(--my-app-primary-text);
  --tour--tooltip--radius: var(--my-app-border-radius);
  --tour--tooltip--transition: var(--my-app-transition);
}
``` 