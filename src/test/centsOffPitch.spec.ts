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

  describe('centsOffPitch', () => {
    it('should return NaN if freqPlayed is 0', () => {
      const result = component.centsOffPitch(0, 440);
      expect(result).toBeNaN();
    });

    it('should return NaN if freqPlayed is negative', () => {
      const result = component.centsOffPitch(-440, 440);
      expect(result).toBeNaN();
    });

    it('should return 0 if freqPlayed equals correctFreq', () => {
      const result = component.centsOffPitch(440, 440);
      expect(result).toBe(0);
    });

    it('should return a positive value if freqPlayed is higher than correctFreq', () => {
      const result = component.centsOffPitch(466.16, 440); // A4 sharp
      expect(result).toBeCloseTo(100, 0); // 100 cents (1 semitone)
    });

    it('should return a negative value if freqPlayed is lower than correctFreq', () => {
      const result = component.centsOffPitch(415.30, 440); // A4 flat
      expect(result).toBeCloseTo(-100, 0); // -100 cents (1 semitone)
    });

    it('should handle fractional cent offsets correctly', () => {
      const result = component.centsOffPitch(445, 440);
      console.log(result);
      expect(result).toBeCloseTo(20, 0); // Approximately 19 cents sharp
    });
  });
});