import type { Meta, StoryObj } from '@storybook/react';
import { TourProvider, Tour, useTour } from '../index';
import '../styles/theme.css';

const meta: Meta<typeof Tour> = {
  title: 'Components/Tour',
  component: Tour,
  decorators: [
    (Story) => (
      <TourProvider steps={[
        {
          selector: '#welcome-button',
          content: {
            type: 'text',
            value: 'Welcome to our app! Click here to get started.',
          },
          placement: 'bottom',
        },
        {
          selector: '#features-section',
          content: {
            type: 'image',
            value: 'https://picsum.photos/400/200',
            props: {
              alt: 'Features overview',
            },
          },
          placement: 'right',
        },
        {
          selector: '#settings-button',
          content: {
            type: 'video',
            value: 'https://example.com/demo-video.mp4',
            props: {
              poster: 'https://picsum.photos/400/200',
            },
          },
          placement: 'left',
        },
        {
          selector: '#custom-content',
          content: {
            type: 'custom',
            value: (
              <div className="space-y-2">
                <h3 className="text-lg font-semibold">Custom Content</h3>
                <p>This is a custom rendered component with multiple elements.</p>
                <ul className="list-disc list-inside">
                  <li>Feature 1</li>
                  <li>Feature 2</li>
                  <li>Feature 3</li>
                </ul>
              </div>
            ),
          },
          placement: 'top',
        },
      ]}>
        <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 p-8">
          <div className="max-w-4xl mx-auto">
            <header className="mb-12 text-center">
              <h1 className="text-4xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent dark:from-indigo-400 dark:to-purple-400 mb-4">
                Product Tour Demo
              </h1>
              <p className="text-lg text-gray-600 dark:text-gray-300">
                Click the button below to start the guided tour
              </p>
            </header>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-8">
                <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 border-2 border-indigo-100 dark:border-indigo-900/50 hover:border-indigo-200 dark:hover:border-indigo-800/50 transition-colors duration-200">
                  <h2 className="text-2xl font-semibold text-indigo-900 dark:text-indigo-200 mb-4">
                    Welcome Section
                  </h2>
                  <button
                    id="welcome-button"
                    className="w-full px-6 py-3 bg-gradient-to-r from-indigo-500 to-purple-500 hover:from-indigo-600 hover:to-purple-600 text-white font-medium rounded-lg transition-all duration-200 shadow-md hover:shadow-lg transform hover:-translate-y-0.5"
                  >
                    Get Started
                  </button>
                </div>

                <div
                  id="features-section"
                  className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 border-2 border-purple-100 dark:border-purple-900/50 hover:border-purple-200 dark:hover:border-purple-800/50 transition-colors duration-200"
                >
                  <h2 className="text-2xl font-semibold text-purple-900 dark:text-purple-200 mb-4">
                    Features
                  </h2>
                  <ul className="space-y-3 text-gray-600 dark:text-gray-300">
                    <li className="flex items-center">
                      <span className="w-2 h-2 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full mr-2"></span>
                      Interactive Tour Guide
                    </li>
                    <li className="flex items-center">
                      <span className="w-2 h-2 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full mr-2"></span>
                      Customizable Steps
                    </li>
                    <li className="flex items-center">
                      <span className="w-2 h-2 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full mr-2"></span>
                      Keyboard Navigation
                    </li>
                  </ul>
                </div>
              </div>

              <div className="space-y-8">
                <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 border-2 border-pink-100 dark:border-pink-900/50 hover:border-pink-200 dark:hover:border-pink-800/50 transition-colors duration-200">
                  <h2 className="text-2xl font-semibold text-pink-900 dark:text-pink-200 mb-4">
                    Settings
                  </h2>
                  <button
                    id="settings-button"
                    className="w-full px-6 py-3 bg-gradient-to-r from-pink-500 to-rose-500 hover:from-pink-600 hover:to-rose-600 text-white font-medium rounded-lg transition-all duration-200 shadow-md hover:shadow-lg transform hover:-translate-y-0.5"
                  >
                    Configure
                  </button>
                </div>

                <div
                  id="custom-content"
                  className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 border-2 border-emerald-100 dark:border-emerald-900/50 hover:border-emerald-200 dark:hover:border-emerald-800/50 transition-colors duration-200"
                >
                  <h2 className="text-2xl font-semibold text-emerald-900 dark:text-emerald-200 mb-4">
                    Custom Content
                  </h2>
                  <p className="text-gray-600 dark:text-gray-300">
                    This section demonstrates custom content rendering in the tour.
                  </p>
                </div>

                <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 border-2 border-emerald-100 dark:border-emerald-900/50 hover:border-emerald-200 dark:hover:border-emerald-800/50 transition-colors duration-200">
                  <h2 className="text-2xl font-semibold text-emerald-900 dark:text-emerald-200 mb-4">
                    Start Tour
                  </h2>
                  <Story />
                </div>
              </div>
            </div>
          </div>
        </div>
      </TourProvider>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof Tour>;

export const Default: Story = {
  render: () => {
    const { start } = useTour();
    return (
      <>
        <button
          onClick={start}
          className="w-full px-6 py-3 bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600 text-white font-medium rounded-lg transition-all duration-200 shadow-md hover:shadow-lg transform hover:-translate-y-0.5"
        >
          Start Tour
        </button>
        <Tour
          tooltipClassName="!bg-white !border-indigo-200 !text-gray-900 dark:!bg-gray-800 dark:!border-indigo-900 dark:!text-gray-100"
          buttonClassName="!bg-indigo-500 !text-white hover:!bg-indigo-600"
          buttonContainerClassName="!border-t !border-gray-200 dark:!border-gray-700 !pt-4 !mt-4"
          highlightTarget={{
            className: '!bg-indigo-500/10 !border-indigo-500/30 !shadow-indigo-500/20',
            style: {
              borderRadius: '0.75rem',
              boxShadow: '0 0 0 4px rgba(99, 102, 241, 0.2)',
              transition: 'all 0.2s ease-in-out',
            }
          }}
        />
      </>
    );
  },
};

export const WithCustomStyling: Story = {
  render: () => {
    const { start } = useTour();
    return (
      <>
        <button
          onClick={start}
          className="w-full px-6 py-3 bg-gradient-to-r from-violet-500 to-purple-500 hover:from-violet-600 hover:to-purple-600 text-white font-medium rounded-lg transition-all duration-200 shadow-md hover:shadow-lg transform hover:-translate-y-0.5"
        >
          Start Tour
        </button>
        <Tour
          overlayClassName="!bg-black/40"
          tooltipClassName="!bg-purple-100 !border-purple-300 !text-purple-900 dark:!bg-gray-800 dark:!border-purple-900 dark:!text-purple-100"
          buttonClassName="!bg-purple-500 !text-white hover:!bg-purple-600"
          buttonContainerClassName="!border-t !border-purple-200 dark:!border-purple-800 !pt-4 !mt-4"
          highlightTarget={{
            className: '!bg-purple-500/10 !border-purple-500/30 !shadow-purple-500/20',
            style: {
              borderRadius: '1rem',
              boxShadow: '0 0 0 4px rgba(168, 85, 247, 0.2)',
              transition: 'all 0.3s ease-in-out',
              animation: 'pulse 2s infinite',
            }
          }}
        />
      </>
    );
  },
};

export const WithBlurEffect: Story = {
  render: () => {
    const { start } = useTour();
    return (
      <>
        <button
          onClick={start}
          className="w-full px-6 py-3 bg-gradient-to-r from-blue-500 to-indigo-500 hover:from-blue-600 hover:to-indigo-600 text-white font-medium rounded-lg transition-all duration-200 shadow-md hover:shadow-lg transform hover:-translate-y-0.5"
        >
          Start Tour
        </button>
        <Tour
          overlayClassName="!bg-black/40 tour-overlay-blur"
          tooltipClassName="!bg-blue-50 !border-blue-200 !text-blue-900 dark:!bg-gray-800 dark:!border-blue-900 dark:!text-blue-100"
          buttonClassName="!bg-blue-500 !text-white hover:!bg-blue-600"
          buttonContainerClassName="!border-t !border-blue-200 dark:!border-blue-800 !pt-4 !mt-4"
          highlightTarget={{
            className: '!bg-blue-500/10 !border-blue-500/30 !shadow-blue-500/20',
            style: {
              borderRadius: '0.75rem',
              boxShadow: '0 0 0 4px rgba(59, 130, 246, 0.2)',
              transition: 'all 0.2s ease-in-out',
            }
          }}
        />
      </>
    );
  },
};

export const DarkMode: Story = {
  render: () => {
    const { start } = useTour();
    return (
      <>
        <button
          onClick={start}
          className="w-full px-6 py-3 bg-gradient-to-r from-gray-700 to-gray-600 hover:from-gray-600 hover:to-gray-500 text-white font-medium rounded-lg transition-all duration-200 shadow-md hover:shadow-lg transform hover:-translate-y-0.5"
        >
          Start Tour
        </button>
        <Tour
          overlayClassName="!bg-black/80 tour-overlay-blur"
          tooltipClassName="!bg-gray-800 !border-gray-700 !text-gray-100"
          buttonClassName="!bg-gray-700 !text-gray-100 hover:!bg-gray-600"
          buttonContainerClassName="!border-t !border-gray-700 !pt-4 !mt-4"
          highlightTarget={{
            className: '!bg-gray-500/10 !border-gray-500/30 !shadow-gray-500/20',
            style: {
              borderRadius: '0.5rem',
              boxShadow: '0 0 0 4px rgba(107, 114, 128, 0.2)',
              transition: 'all 0.2s ease-in-out',
              border: '2px solid rgba(107, 114, 128, 0.3)',
            }
          }}
        />
      </>
    );
  },
};

export const WithPartialBlur: Story = {
  render: () => {
    const { start } = useTour();
    return (
      <>
        <button
          onClick={start}
          className="w-full px-6 py-3 bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600 text-white font-medium rounded-lg transition-all duration-200 shadow-md hover:shadow-lg transform hover:-translate-y-0.5"
        >
          Start Tour
        </button>
        <Tour
          overlayClassName="!bg-black/40 tour-overlay-partial-blur"
          tooltipClassName="!bg-blue-50 !border-blue-200 !text-blue-900 dark:!bg-gray-800 dark:!border-blue-900 dark:!text-blue-100"
          buttonClassName="!bg-blue-500 !text-white hover:!bg-blue-600"
          buttonContainerClassName="!border-t !border-blue-200 dark:!border-blue-800 !pt-4 !mt-4"
          highlightTarget={{
            className: '!bg-blue-500/10 !border-blue-500/30 !shadow-blue-500/20',
            style: {
              borderRadius: '0.75rem',
              boxShadow: '0 0 0 4px rgba(59, 130, 246, 0.2)',
              transition: 'all 0.2s ease-in-out',
            }
          }}
        />
      </>
    );
  },
};

export const WithoutSkipButton: Story = {
  render: () => {
    const { start } = useTour();
    return (
      <>
        <button
          onClick={start}
          className="w-full px-6 py-3 bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white font-medium rounded-lg transition-all duration-200 shadow-md hover:shadow-lg transform hover:-translate-y-0.5"
        >
          Start Tour
        </button>
        <Tour
          skip={false}
          tooltipClassName="!bg-amber-50 !border-amber-200 !text-amber-900 dark:!bg-gray-800 dark:!border-amber-900 dark:!text-amber-100"
          buttonClassName="!bg-amber-500 !text-white hover:!bg-amber-600"
          buttonContainerClassName="!border-t !border-amber-200 dark:!border-amber-800 !pt-4 !mt-4"
          highlightTarget={{
            className: '!bg-amber-500/10 !border-amber-500/30 !shadow-amber-500/20',
            style: {
              borderRadius: '0.75rem',
              boxShadow: '0 0 0 4px rgba(245, 158, 11, 0.2)',
              transition: 'all 0.2s ease-in-out',
            }
          }}
        />
      </>
    );
  },
};

export const WithProgressIndicator: Story = {
  render: () => {
    const { start } = useTour();
    return (
      <>
        <button
          onClick={start}
          className="w-full px-6 py-3 bg-gradient-to-r from-rose-500 to-pink-500 hover:from-rose-600 hover:to-pink-600 text-white font-medium rounded-lg transition-all duration-200 shadow-md hover:shadow-lg transform hover:-translate-y-0.5"
        >
          Start Tour
        </button>
        <Tour
          showProgress
          tooltipClassName="!bg-white !border-rose-200 !text-gray-900 dark:!bg-gray-800 dark:!border-rose-900 dark:!text-gray-100"
          buttonClassName="!bg-rose-500 !text-white hover:!bg-rose-600"
          buttonContainerClassName="!border-t !border-gray-200 dark:!border-gray-700 !pt-4 !mt-4"
          highlightTarget={{
            className: '!bg-rose-500/10 !border-rose-500/30 !shadow-rose-500/20',
            style: {
              borderRadius: '0.75rem',
              boxShadow: '0 0 0 4px rgba(244, 63, 94, 0.2)',
              transition: 'all 0.2s ease-in-out',
            }
          }}
        />
      </>
    );
  },
};

export const WithStepCallbacks: Story = {
  render: () => {
    const { start } = useTour();

    return (
      <div className="p-8 space-y-8">
        <div className="flex justify-between items-center">
          <button
            id="welcome-button"
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          >
            Welcome
          </button>
          <button
            id="settings-button"
            className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600"
          >
            Settings
          </button>
        </div>

        <div
          id="features-section"
          className="p-4 border border-gray-200 rounded"
        >
          <h2 className="text-xl font-bold mb-4">Features</h2>
          <p>Explore our amazing features!</p>
        </div>

        <div
          id="custom-content"
          className="p-4 border border-gray-200 rounded"
        >
          <h2 className="text-xl font-bold mb-4">Custom Section</h2>
          <p>This section demonstrates custom content rendering.</p>
        </div>

        <button
          onClick={start}
          className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
        >
          Start Tour with Callbacks
        </button>

        <Tour
          tooltipClassName="!bg-white !border-blue-200 !text-gray-900 dark:!bg-gray-800 dark:!border-blue-900 dark:!text-gray-100"
          buttonClassName="!bg-blue-500 !text-white hover:!bg-blue-600"
          buttonContainerClassName="!border-t !border-gray-200 dark:!border-gray-700 !pt-4 !mt-4"
          highlightTarget={{
            className: '!bg-blue-500/10 !border-blue-500/30 !shadow-blue-500/20',
            style: {
              borderRadius: '0.75rem',
              boxShadow: '0 0 0 4px rgba(59, 130, 246, 0.2)',
              transition: 'all 0.2s ease-in-out',
            }
          }}
        />
      </div>
    );
  },
  decorators: [
    (Story) => (
      <TourProvider
        steps={[
          {
            selector: '#welcome-button',
            content: 'Welcome to our app! Click here to get started.',
            placement: 'bottom',
          },
          {
            selector: '#features-section',
            content: 'Check out our amazing features!',
            placement: 'right',
          },
          {
            selector: '#settings-button',
            content: 'Configure your settings here.',
            placement: 'left',
          },
          {
            selector: '#custom-content',
            content: 'This section shows custom content rendering.',
            placement: 'top',
          },
        ]}
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
        <Story />
      </TourProvider>
    ),
  ],
}; 