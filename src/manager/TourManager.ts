import type { TourStep } from '../types';

interface TourState {
  steps: TourStep[];
  currentStep: number;
  isActive: boolean;
}

type TourListener = (state: TourState) => void;

class TourManager {
  private static instance: TourManager;
  private state: TourState;
  private listeners: Set<TourListener>;

  private constructor() {
    this.state = {
      steps: [],
      currentStep: 0,
      isActive: false
    };
    this.listeners = new Set();
  }

  static getInstance(): TourManager {
    if (!TourManager.instance) {
      TourManager.instance = new TourManager();
    }
    return TourManager.instance;
  }

  getState(): TourState {
    return { ...this.state };
  }

  initialize(steps: TourStep[]) {
    this.state.steps = steps;
    this.state.currentStep = 0;
    this.state.isActive = false;
    this.notifyListeners();
  }

  start() {
    if (this.state.steps.length === 0) return;
    this.state.isActive = true;
    this.state.currentStep = 0;
    this.notifyListeners();
  }

  stop() {
    this.state.isActive = false;
    this.notifyListeners();
  }

  next() {
    if (!this.state.isActive || this.state.currentStep >= this.state.steps.length - 1) {
      this.stop();
      return;
    }

    this.state.currentStep += 1;
    this.notifyListeners();
  }

  back() {
    if (!this.state.isActive || this.state.currentStep <= 0) return;

    this.state.currentStep -= 1;
    this.notifyListeners();
  }

  skip() {
    this.stop();
  }

  subscribe(listener: TourListener): () => void {
    this.listeners.add(listener);
    return () => this.listeners.delete(listener);
  }

  private notifyListeners() {
    this.listeners.forEach(listener => listener({ ...this.state }));
  }
}

export const tourManager = TourManager.getInstance(); 