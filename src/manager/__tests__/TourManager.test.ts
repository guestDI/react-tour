import { describe, it, expect, beforeEach, vi } from 'vitest';
import { tourManager } from '../TourManager';
import type { TourStep } from '../../types';

const steps: TourStep[] = [
  { selector: '#step1', content: 'Step 1' },
  { selector: '#step2', content: 'Step 2' },
  { selector: '#step3', content: 'Step 3' },
];

describe('TourManager', () => {
  beforeEach(() => {
    // Reset to clean state before each test
    tourManager.initialize([]);
  });

  describe('initialize', () => {
    it('sets steps and resets state', () => {
      tourManager.initialize(steps);
      const state = tourManager.getState();
      expect(state.steps).toHaveLength(3);
      expect(state.currentStep).toBe(0);
      expect(state.isActive).toBe(false);
    });
  });

  describe('start', () => {
    it('activates the tour and resets to step 0', () => {
      tourManager.initialize(steps);
      tourManager.start();
      const state = tourManager.getState();
      expect(state.isActive).toBe(true);
      expect(state.currentStep).toBe(0);
    });

    it('does nothing if no steps are initialized', () => {
      tourManager.initialize([]);
      tourManager.start();
      expect(tourManager.getState().isActive).toBe(false);
    });
  });

  describe('stop', () => {
    it('deactivates the tour', () => {
      tourManager.initialize(steps);
      tourManager.start();
      tourManager.stop();
      expect(tourManager.getState().isActive).toBe(false);
    });
  });

  describe('next', () => {
    it('advances to the next step', () => {
      tourManager.initialize(steps);
      tourManager.start();
      tourManager.next();
      expect(tourManager.getState().currentStep).toBe(1);
    });

    it('stops the tour when called on the last step', () => {
      tourManager.initialize(steps);
      tourManager.start();
      tourManager.next(); // step 1
      tourManager.next(); // step 2
      tourManager.next(); // last step → stop
      expect(tourManager.getState().isActive).toBe(false);
    });
  });

  describe('back', () => {
    it('goes to the previous step', () => {
      tourManager.initialize(steps);
      tourManager.start();
      tourManager.next();
      tourManager.back();
      expect(tourManager.getState().currentStep).toBe(0);
    });

    it('is a no-op when on the first step', () => {
      tourManager.initialize(steps);
      tourManager.start();
      tourManager.back();
      expect(tourManager.getState().currentStep).toBe(0);
      expect(tourManager.getState().isActive).toBe(true);
    });
  });

  describe('skip', () => {
    it('stops the tour', () => {
      tourManager.initialize(steps);
      tourManager.start();
      tourManager.skip();
      expect(tourManager.getState().isActive).toBe(false);
    });
  });

  describe('getState', () => {
    it('returns a copy of the current state', () => {
      tourManager.initialize(steps);
      const state1 = tourManager.getState();
      const state2 = tourManager.getState();
      expect(state1).not.toBe(state2); // different object references
      expect(state1).toEqual(state2);  // same values
    });
  });

  describe('subscribe', () => {
    it('calls listener on state changes', () => {
      tourManager.initialize(steps);
      const listener = vi.fn();
      tourManager.subscribe(listener);
      tourManager.start();
      expect(listener).toHaveBeenCalled();
      expect(listener).toHaveBeenCalledWith(expect.objectContaining({ isActive: true }));
    });

    it('returns an unsubscribe function that stops notifications', () => {
      tourManager.initialize(steps);
      const listener = vi.fn();
      const unsubscribe = tourManager.subscribe(listener);
      unsubscribe();
      tourManager.start();
      expect(listener).not.toHaveBeenCalled();
    });

    it('notifies multiple listeners', () => {
      tourManager.initialize(steps);
      const listener1 = vi.fn();
      const listener2 = vi.fn();
      tourManager.subscribe(listener1);
      tourManager.subscribe(listener2);
      tourManager.start();
      expect(listener1).toHaveBeenCalled();
      expect(listener2).toHaveBeenCalled();
    });
  });
});
