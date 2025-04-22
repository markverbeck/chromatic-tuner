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

  describe('getNoteFromPitchFrequecy', () => {
    it('should return NaN for a frequency of 0', () => {
      const result = component.getNoteFromPitchFrequecy(0);
      expect(result).toBeNaN();
    });

    it('should return NaN for a negative frequency', () => {
      const result = component.getNoteFromPitchFrequecy(-440);
      expect(result).toBeNaN();
    });

    it('should return 69 for a frequency of 440 Hz (A4)', () => {
      const result = component.getNoteFromPitchFrequecy(440);
      expect(result).toBe(69);
    });

    it('should return 60 for a frequency of 261.63 Hz (Middle C)', () => {
      const result = component.getNoteFromPitchFrequecy(261.63);
      expect(result).toBe(60);
    });

    it('should return 57 for a frequency of 220 Hz (A3)', () => {
      const result = component.getNoteFromPitchFrequecy(220);
      expect(result).toBe(57);
    });

    it('should return 81 for a frequency of 880 Hz (A5)', () => {
      const result = component.getNoteFromPitchFrequecy(880);
      expect(result).toBe(81);
    });
  });
});