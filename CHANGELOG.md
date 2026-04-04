# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [0.3.1] - 2026-04-04

### Fixed

- **Progress bar Tailwind dependency removed.** `ProgressBar` was using Tailwind utility classes (`w-full h-1 rounded-full`, `h-full rounded-full transition-all duration-300`) that required the consumer app to have Tailwind configured. Replaced with inline styles.
- **`placement` prop typed as `string` in `TourTooltip`** — now correctly typed as the strict `Placement` union (`'top' | 'bottom' | 'left' | 'right'`).
- **Step counter hidden from screen readers.** The "Step N of N" text had `aria-hidden="true"`, making it invisible to assistive technology. Removed the attribute so screen readers announce the current step.
- **Emoji icons in `MediaFallback` announced by screen readers.** The decorative `🖼️` / `🎥` icons were being read aloud (e.g. "frame with picture") because they had no `aria-hidden`. Added `aria-hidden="true"`; the descriptive text below remains accessible.
- **`aria-label` added to progress bar.** `role="progressbar"` without an `aria-label` caused screen readers to announce it as "progressbar" with no context. Added `aria-label="Tour progress"`.

## [0.3.0] - 2026-03-27

### Added

- **React 19 support.** Peer dependencies now accept `react: ^18.0.0 || ^19.0.0` and `react-dom: ^18.0.0 || ^19.0.0`.
- **`buttonConfig.back` and `buttonConfig.skip`** — dedicated config keys for the Back and Skip buttons. `secondary` is preserved as a backward-compatible fallback that applies to both when neither specific key is present.
- **Tag-based publishing.** The GitHub Actions workflow now triggers on `v*` tags instead of every push to `main`, giving explicit control over npm releases.

### Fixed

- **Two "Back" buttons appearing** when `buttonConfig.secondary.content` was customised: the `secondary` config was shared by both the Back and Skip buttons. Back and Skip now each resolve their own config key first, falling back to `secondary` only when not set.
- **Styles not loading in apps that don't use Tailwind CSS.** The library's own layout (button container, button group, progress bar header, content spacing) was relying on Tailwind utility classes that are only generated when the consumer's Tailwind config scans the library source. All internal layout styles are now defined in the library's injected CSS, so styles work out-of-the-box regardless of whether the consuming app uses Tailwind.
- **Style injection tree-shaken away** by esbuild during the library build. The `sideEffects` field in `package.json` now correctly marks both the source injection file and the dist entry points, preventing bundlers from dropping the style injection code.

## [0.2.0] - 2026-03-09

### Fixed

- **Critical:** `useState` was called inside a plain helper function `renderContent` in `TourTooltip`, violating React's Rules of Hooks. Extracted `ImageContent` and `VideoContent` as proper React sub-components to fix the crash that occurred when content type changed between steps.
- **Critical:** `onComplete` prop in `Tour` was incorrectly wired to `skipTour`, causing the user-provided `onComplete` callback to never fire when clicking "Done" on the last step (it fired `onSkip` instead). Changed to `onComplete={next}`, which already handles the last-step case.
- **Critical:** CSS styles were not applied in consumer apps due to `"sideEffects": false` in `package.json`, which caused bundlers (webpack/Vite) to tree-shake away all CSS imports. Changed to `"sideEffects": ["**/*.css"]`.
- Invalid CSS selectors passed as `selector` on a step now fail silently instead of throwing an uncaught `SyntaxError` that crashed the component tree.

### Changed

- CSS is now auto-imported when the library is imported — no separate CSS import required in consumer apps.
- Removed obsolete `src/styles/tour.css` which had duplicate class definitions with inconsistent CSS variable names that conflicted with `theme.css`.
- Build now uses tsup's native CSS bundling instead of manually copying CSS files. `dist/index.css` is generated automatically.
- Simplified `package.json` exports: CSS is now accessible as `import 'react-product-tour-guide/styles'` instead of the internal `dist/` path.

### Added

- Unit tests for `TourTooltip` component (20 tests): all content types, image/video error fallbacks, button callbacks, custom button config, ARIA attributes.
- Unit tests for `TourManager` singleton (13 tests): initialize, start, stop, next, back, skip, subscribe/unsubscribe.
- Additional `TourContext` tests: `defaultActive` prop, `back()` no-op on first step, `useTour` throws outside provider, `waitFor` is awaited before step advances.
- Additional `Tour` integration tests: `onComplete` callback correctness, `showProgress` prop, `skip={false}` prop, invalid selector safety.

## [0.1.0] - 2024-03-19

### Added

- Initial release of React Product Tour
- Core tour functionality with step navigation
- Multiple content types support (text, image, video, custom)
- Accessibility features (ARIA attributes, keyboard navigation)
- Screen reader support with customizable announcements
- Focus management and trapping
- Responsive design with RTL support
- Theme customization
- Progress indicator
- Error boundaries for graceful degradation
- Comprehensive TypeScript types
- Basic unit tests and component tests
- Storybook documentation

### Features

- Spotlight focus on target elements
- Customizable styling and theming
- Multiple content types support
- Navigation controls (next, back, skip)
- Media support (remote and local)
- Highlight target elements
- Partial blur overlay
- Progress indicator
- Error boundaries
- Source maps for debugging
- Debounced event handlers

### Technical

- Built with TypeScript
- React 18+ support
- Floating UI for positioning
- Tailwind CSS for styling
- Vitest for testing
- Storybook for documentation
