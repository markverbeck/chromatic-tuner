import { TestBed } from '@angular/core/testing';
import { AppComponent } from '../app/app.component';
import { MicrophoneService } from '../app/services/microphone.service';
import { AutoCorrelationService } from '../app/services/autoCorrelationService.service';

describe('AppComponent Integration Tests', () => {
  let component: AppComponent;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        AppComponent,
        { provide: MicrophoneService, useValue: {} },
        { provide: AutoCorrelationService, useValue: { autoCorrelate: () => 440 } }, // Mock service
      ],
    });
    component = TestBed.inject(AppComponent);
  });

  it('should correctly calculate the MIDI note and frequency for a given pitch', () => {
    const frequency = 440; // A4
    const midiNote = component.getNoteFromPitchFrequecy(frequency);
    const calculatedFrequency = component.getPitchFrequencyFromNote(midiNote);

    expect(midiNote).toBe(69); // A4
    expect(calculatedFrequency).toBe(440); // A4 frequency
  });

  it('should calculate the correct cents offset for a slightly sharp frequency', () => {
    const freqPlayed = 445; // Slightly sharp A4
    const midiNote = component.getNoteFromPitchFrequecy(freqPlayed);
    const correctFreq = component.getPitchFrequencyFromNote(midiNote);
    const centsOffset = component.centsOffPitch(freqPlayed, correctFreq);

    expect(midiNote).toBe(69); // A4
    expect(correctFreq).toBe(440); // A4 frequency
    expect(centsOffset).toBeGreaterThan(0); // Positive offset
  });

  it('should calculate the correct cents offset for a slightly flat frequency', () => {
    const freqPlayed = 435; // Slightly flat A4
    const midiNote = component.getNoteFromPitchFrequecy(freqPlayed);
    const correctFreq = component.getPitchFrequencyFromNote(midiNote);
    const centsOffset = component.centsOffPitch(freqPlayed, correctFreq);

    expect(midiNote).toBe(69); // A4
    expect(correctFreq).toBe(440); // A4 frequency
    expect(centsOffset).toBeLessThan(0); // Negative offset
  });

  it('should correctly update the playing note and tuning value in the analyze method', () => {
    spyOn(component.autoCorrelationService, 'autoCorrelate').and.returnValue(440); // Mock frequency
    component.buffer = new Float32Array([/* mock data */]);
    component.analyze();

    expect(component.midiNoteNumber).toBe(69); // A4
    expect(component.playingNote).toBe('A'); // A4 note
    expect(component.tuningValue).toBe(50); // Perfectly in tune
  });

  it('should handle invalid frequencies gracefully in the analyze method', () => {
    spyOn(component.autoCorrelationService, 'autoCorrelate').and.returnValue(-1); // Invalid frequency
    component.buffer = new Float32Array([/* mock data */]);
    component.analyze();
    expect(component.midiNoteNumber).toBeNaN();
    expect(component.playingNote).toBe(undefined);
    expect(component.tuningValue).toBeNaN(); // Default value
  });
});