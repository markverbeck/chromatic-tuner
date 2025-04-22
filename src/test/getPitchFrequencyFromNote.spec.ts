import { TestBed } from '@angular/core/testing';
import { AppComponent } from '../app/app.component';

describe('AppComponent', () => {
  let component: AppComponent;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AppComponent],
    });
    component = TestBed.inject(AppComponent);
  });

  describe('getPitchFrequencyFromNote', () => {
    it('should return 440 Hz for note 69 (A4)', () => {
      const result = component.getPitchFrequencyFromNote(69);
      expect(result).toBe(440);
    });

    it('should return 261 Hz for note 60 (Middle C)', () => {
      const result = component.getPitchFrequencyFromNote(60);
      expect(result).toBeCloseTo(261.63, 0); // Allowing rounding
    });

    it('should return 220 Hz for note 57 (A3)', () => {
      const result = component.getPitchFrequencyFromNote(57);
      expect(result).toBe(220);
    });

    it('should return 880 Hz for note 81 (A5)', () => {
      const result = component.getPitchFrequencyFromNote(81);
      expect(result).toBe(880);
    });
  });
});