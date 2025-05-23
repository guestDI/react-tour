import { render, screen, fireEvent } from '@testing-library/react';
import { TourProvider, Tour, useTour } from '../../context/TourContext';

const steps = [
  {
    selector: '#test-element',
    content: 'Test content',
    placement: 'bottom' as const,
  },
];

function TestApp() {
  const { start } = useTour();

  return (
    <div>
      <div id="test-element">Test Element</div>
      <button onClick={start}>Start Tour</button>
      <Tour />
    </div>
  );
}

describe('Tour', () => {
  it('renders tour content when active', () => {
    render(
      <TourProvider steps={steps}>
        <TestApp />
      </TourProvider>
    );

    // Start the tour
    fireEvent.click(screen.getByText('Start Tour'));

    // Check if tour content is rendered
    expect(screen.getByText('Test content')).toBeInTheDocument();
  });

  it('handles navigation buttons', () => {
    render(
      <TourProvider steps={steps}>
        <TestApp />
      </TourProvider>
    );

    // Start the tour
    fireEvent.click(screen.getByText('Start Tour'));

    // Check if navigation buttons are present
    expect(screen.getByText('Next')).toBeInTheDocument();
    expect(screen.getByText('Skip')).toBeInTheDocument();
  });
}); 