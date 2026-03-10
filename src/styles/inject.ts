// AUTO-GENERATED — do not edit. Run `npm run build` to regenerate.
const __tourStyles__ = `@layer react-product-tour {

:root {
  /* Tour Component Colors */
  --tour--overlay--background: rgba(0, 0, 0, 0.5);
  --tour--tooltip--background: white;
  --tour--tooltip--border: #e5e7eb;
  --tour--tooltip--text: black;
  --tour--tooltip--shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);

  /* Tour Component Spacing */
  --tour--tooltip--padding: 1rem;
  --tour--tooltip--gap: 0.5rem;

  /* Tour Component Border */
  --tour--tooltip--radius: 0.5rem;
  --tour--tooltip--border-width: 1px;

  /* Tour Component Animation */
  --tour--tooltip--transition: all 0.2s ease-in-out;

  /* Tour Highlight */
  --tour--highlight--radius: 10px;

  /* Tour Button Colors */
  --tour--button--primary--background: #646cff;
  --tour--button--primary--text: white;
  --tour--button--secondary--background: #e5e7eb;
  --tour--button--secondary--text: #374151;
}

/* Dark mode variables */
.dark {
  --tour--tooltip--background: #1f2937;
  --tour--tooltip--border: #374151;
  --tour--tooltip--text: #f9fafb;
}

/* Screen reader utilities */
.sr-only {
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  white-space: nowrap;
  border: 0;
}

/* Focus styles */
.tour-button:focus-visible {
  outline: 2px solid #3b82f6;
  outline-offset: 2px;
}

.tour-button:focus:not(:focus-visible) {
  outline: none;
}

/* High contrast mode support */
@media (forced-colors: active) {
  .tour-button {
    border: 2px solid currentColor;
  }

  .tour-tooltip {
    border: 2px solid currentColor;
  }

  .tour-highlight {
    border: 2px solid currentColor;
  }
}

/* Reduced motion */
@media (prefers-reduced-motion: reduce) {
  .tour-tooltip,
  .tour-highlight,
  .tour-overlay,
  .tour-button {
    animation: none !important;
    transition: none !important;
  }
}

/* Base tooltip styles */
.tour-tooltip {
  position: absolute;
  background-color: var(--tour--tooltip--background);
  color: var(--tour--tooltip--text);
  padding: var(--tour--tooltip--padding);
  border-radius: var(--tour--tooltip--radius);
  box-shadow: var(--tour--tooltip--shadow);
  max-width: 300px;
  z-index: 1001;
  opacity: 0;
  border: var(--tour--tooltip--border-width) solid var(--tour--tooltip--border);
}

/* Allow Tailwind classes to override base styles */
.tour-tooltip[class*="bg-"] {
  background-color: inherit;
}

.tour-tooltip[class*="text-"] {
  color: inherit;
}

.tour-tooltip[class*="border-"] {
  border-color: inherit;
}

.tour-tooltip[class*="rounded-"] {
  border-radius: inherit;
}

.tour-tooltip[class*="shadow-"] {
  box-shadow: inherit;
}

.tour-tooltip[class*="p-"] {
  padding: inherit;
}

/* Animation variants */
.tour-tooltip[data-animation="slide"] {
  transition: transform 0.3s ease-in-out, opacity 0.3s ease-in-out;
  transform-origin: center;
  transform: scale(0.95);
}

.tour-tooltip[data-animation="slide"][data-placement="top"] {
  transform: translateY(10px) scale(0.95);
}

.tour-tooltip[data-animation="slide"][data-placement="bottom"] {
  transform: translateY(-10px) scale(0.95);
}

.tour-tooltip[data-animation="slide"][data-placement="left"] {
  transform: translateX(10px) scale(0.95);
}

.tour-tooltip[data-animation="slide"][data-placement="right"] {
  transform: translateX(-10px) scale(0.95);
}

.tour-tooltip[data-animation="slide"].visible {
  opacity: 1;
  transform: scale(1) translate(0, 0);
}

.tour-tooltip[data-animation="bounce"] {
  transition: transform 0.5s cubic-bezier(0.68, -0.55, 0.265, 1.55), opacity 0.3s ease-in-out;
  transform-origin: center;
  transform: scale(0.3);
}

.tour-tooltip[data-animation="bounce"][data-placement="top"] {
  transform: translateY(20px) scale(0.3);
}

.tour-tooltip[data-animation="bounce"][data-placement="bottom"] {
  transform: translateY(-20px) scale(0.3);
}

.tour-tooltip[data-animation="bounce"][data-placement="left"] {
  transform: translateX(20px) scale(0.3);
}

.tour-tooltip[data-animation="bounce"][data-placement="right"] {
  transform: translateX(-20px) scale(0.3);
}

.tour-tooltip[data-animation="bounce"].visible {
  opacity: 1;
  transform: scale(1) translate(0, 0);
}

.tour-tooltip[data-animation="fade"] {
  transition: all 0.4s ease-out;
  transform: translateY(10px);
  opacity: 0;
}

.tour-tooltip[data-animation="fade"].visible {
  opacity: 1;
  transform: translateY(0);
}

.tour-tooltip-content {
  margin-bottom: 1rem;
}

.tour-buttons {
  display: flex;
  gap: var(--tour--tooltip--gap);
  justify-content: flex-end;
}

/* Tooltip arrow */
.tour-tooltip::before {
  content: '';
  position: absolute;
  width: 0.75rem;
  height: 0.75rem;
  background-color: var(--tour--tooltip--background);
  border: var(--tour--tooltip--border-width) solid var(--tour--tooltip--border);
  transform: rotate(45deg);
}

/* Tooltip arrow positions */
.tour-tooltip[data-placement="top"]::before {
  bottom: -0.375rem;
  border-right: none;
  border-bottom: none;
}

.tour-tooltip[data-placement="bottom"]::before {
  top: -0.375rem;
  border-left: none;
  border-top: none;
}

.tour-tooltip[data-placement="left"]::before {
  right: -0.375rem;
  border-top: none;
  border-right: none;
}

.tour-tooltip[data-placement="right"]::before {
  left: -0.375rem;
  border-bottom: none;
  border-left: none;
}

/* Button styles */
.tour-button {
  border-radius: var(--tour--tooltip--radius);
  font-weight: 500;
  font-family: inherit;
  cursor: pointer;
  padding: 0.5rem 1rem;
  border: none;
  transition: var(--tour--tooltip--transition);
}

.tour-button-primary {
  background-color: var(--tour--button--primary--background);
  color: var(--tour--button--primary--text);
}

.tour-button-secondary {
  background-color: var(--tour--button--secondary--background);
  color: var(--tour--button--secondary--text);
}

/* Allow Tailwind classes to override button styles */
.tour-button[class*="bg-"] {
  background-color: inherit;
}

.tour-button[class*="text-"] {
  color: inherit;
}

.tour-button[class*="rounded-"] {
  border-radius: inherit;
}

.tour-button[class*="p-"] {
  padding: inherit;
}

.tour-button[class*="font-"] {
  font-weight: inherit;
}

.tour-button:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.dark .tour-button-secondary {
  background-color: #4b5563;
}

/* Overlay styles */
.tour-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: var(--tour--overlay--background);
  z-index: 1000;
}

.tour-overlay[class*="bg-"] {
  background-color: inherit;
}

.tour-overlay-blur {
  backdrop-filter: blur(2px);
}

/* Highlight styles */
.tour-highlight {
  position: absolute;
  border-radius: var(--tour--highlight--radius);
  box-shadow: 0 0 0 9999px var(--tour--overlay--background);
  z-index: 1001;
  opacity: 0;
}

.tour-highlight[class*="rounded-"] {
  border-radius: inherit;
}

.tour-highlight[class*="shadow-"] {
  box-shadow: inherit;
}

.tour-highlight[data-animation="slide"] {
  transition: all 0.3s ease-in-out;
  transform: scale(0.98);
}

.tour-highlight[data-animation="slide"].visible {
  opacity: 1;
  transform: scale(1);
}

.tour-highlight[data-animation="bounce"] {
  transition: all 0.5s cubic-bezier(0.68, -0.55, 0.265, 1.55);
  transform: translateY(20px) scale(0.95);
  opacity: 0;
}

.tour-highlight[data-animation="bounce"].visible {
  opacity: 1;
  transform: translateY(0) scale(1);
}

.tour-highlight[data-animation="fade"] {
  transition: all 0.4s ease-out;
  transform: translateY(10px);
  opacity: 0;
}

.tour-highlight[data-animation="fade"].visible {
  opacity: 1;
  transform: translateY(0);
}

.dark .tour-highlight {
  background-color: rgba(255, 255, 255, 0.05);
  border-color: rgba(255, 255, 255, 0.2);
}

} /* end @layer react-product-tour */
`;

if (typeof document !== 'undefined') {
  const id = '__react_product_tour_styles__';
  if (!document.getElementById(id)) {
    const style = document.createElement('style');
    style.id = id;
    style.textContent = __tourStyles__;
    document.head.insertBefore(style, document.head.firstChild);
  }
}
