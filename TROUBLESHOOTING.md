# Tour Component Troubleshooting Guide

This guide covers common issues you might encounter when using the tour component and how to resolve them.

## Table of Contents
- [Tour Not Starting](#tour-not-starting)
- [Tour Steps Not Visible](#tour-steps-not-visible)
- [Content Not Rendering](#content-not-rendering)
- [Media Content Issues](#media-content-issues)
- [Accessibility Issues](#accessibility-issues)
- [Styling Issues](#styling-issues)
- [Performance Issues](#performance-issues)

## Tour Not Starting

### Issue: Tour doesn't start when calling `start()`
**Possible Causes:**
1. No steps defined in the tour configuration
2. Target elements not found in the DOM
3. Tour context not properly initialized

**Solutions:**
```typescript
// 1. Ensure steps are properly defined
const steps = [
  {
    selector: '#target-element',
    content: 'Step content',
    placement: 'bottom'
  }
];

// 2. Verify target elements exist
const element = document.querySelector('#target-element');
if (!element) {
  console.warn('Target element not found:', '#target-element');
}

// 3. Check tour context initialization
<TourProvider steps={steps}>
  <YourApp />
</TourProvider>
```

## Tour Steps Not Visible

### Issue: Tour steps are not visible or appear in wrong position
**Possible Causes:**
1. Z-index conflicts
2. Incorrect placement configuration
3. Target element position issues

**Solutions:**
```typescript
// 1. Ensure proper z-index
<div className="z-50"> {/* Tour tooltip */}
<div className="z-40"> {/* Overlay */}

// 2. Check placement configuration
const steps = [
  {
    selector: '#target-element',
    content: 'Step content',
    placement: 'bottom' // Valid values: top, bottom, left, right
  }
];

// 3. Verify target element positioning
const element = document.querySelector('#target-element');
if (element) {
  const rect = element.getBoundingClientRect();
  console.log('Element position:', rect);
}
```

## Content Not Rendering

### Issue: Tour content fails to render
**Possible Causes:**
1. Invalid content type
2. Missing content property
3. Error in content rendering

**Solutions:**
```typescript
// 1. Use valid content types
const steps = [
  {
    selector: '#target-element',
    content: {
      type: 'text',
      value: 'Step content'
    }
  }
];

// 2. Ensure content property is present
const steps = [
  {
    selector: '#target-element',
    content: 'Step content' // Required property
  }
];

// 3. Use ErrorBoundary for content
<ErrorBoundary
  fallback={<div>Content Error</div>}
>
  {content}
</ErrorBoundary>
```

## Media Content Issues

### Issue: Images or videos not loading
**Possible Causes:**
1. Invalid media source
2. Missing media type
3. Network issues

**Solutions:**
```typescript
// 1. Use correct media source format
const steps = [
  {
    selector: '#target-element',
    content: {
      type: 'image',
      value: {
        type: 'remote',
        src: 'https://example.com/image.jpg'
      }
    }
  }
];

// 2. Include media type
const steps = [
  {
    selector: '#target-element',
    content: {
      type: 'video',
      value: {
        type: 'remote',
        src: 'https://example.com/video.mp4'
      }
    }
  }
];

// 3. Add error handling
<img
  src={src}
  onError={() => setHasError(true)}
  alt="Tour content"
/>
```

## Accessibility Issues

### Issue: Screen reader not announcing tour steps
**Possible Causes:**
1. Missing ARIA attributes
2. Incorrect role attributes
3. Missing live regions

**Solutions:**
```typescript
// 1. Add ARIA attributes
<div
  role="dialog"
  aria-modal="true"
  aria-labelledby="tour-step-title"
  aria-describedby="tour-step-content"
>

// 2. Use correct roles
<div role="toolbar" aria-label="Tour navigation">
  <button role="button" aria-label="Next step">Next</button>
</div>

// 3. Add live regions
<div
  role="status"
  aria-live="polite"
  aria-atomic="true"
  className="sr-only"
>
  Tour started. Use arrow keys to navigate.
</div>
```

## Styling Issues

### Issue: Tour styling conflicts with application styles
**Possible Causes:**
1. CSS specificity conflicts
2. Missing style imports
3. Incorrect class names

**Solutions:**
```typescript
// 1. Use specific class names
<div className="tour-tooltip tour-tooltip-custom">

// 2. Import required styles
import '../styles/theme.css';

// 3. Use provided class names
<button className="tour-button tour-button-primary">
```

## Performance Issues

### Issue: Tour performance is slow
**Possible Causes:**
1. Too many steps
2. Heavy content
3. Frequent re-renders

**Solutions:**
```typescript
// 1. Optimize step count
const steps = [
  // Keep steps focused and minimal
  {
    selector: '#target-element',
    content: 'Concise content'
  }
];

// 2. Optimize content
const steps = [
  {
    selector: '#target-element',
    content: {
      type: 'text',
      value: 'Optimized content'
    }
  }
];

// 3. Use memoization
const TourTooltip = React.memo(({ content, ...props }) => {
  // Component implementation
});
```

## Debugging Tips

1. **Enable Debug Mode:**
```typescript
<TourProvider steps={steps} debug={true}>
  <YourApp />
</TourProvider>
```

2. **Check Console Logs:**
```typescript
useEffect(() => {
  console.log('Tour state:', {
    isActive,
    currentStep,
    steps
  });
}, [isActive, currentStep, steps]);
```

3. **Verify DOM Elements:**
```typescript
useEffect(() => {
  const element = document.querySelector(selector);
  console.log('Target element:', element);
}, [selector]);
```

## Common Error Messages

1. **"Target element not found"**
   - Verify selector exists in DOM
   - Check selector syntax
   - Ensure element is mounted

2. **"Invalid content type"**
   - Use supported content types
   - Check content structure
   - Verify content format

3. **"Tour already active"**
   - Check tour state
   - Ensure proper cleanup
   - Verify start/stop logic

## Getting Help

If you're still experiencing issues:

1. Check the [GitHub Issues](https://github.com/your-repo/issues) for similar problems
2. Review the [Documentation](https://your-docs-url) for detailed usage
3. Create a new issue with:
   - Steps to reproduce
   - Expected behavior
   - Actual behavior
   - Environment details
   - Code example 