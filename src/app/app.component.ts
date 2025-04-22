import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { MicrophoneService } from './services/microphone.service';
import { AutoCorrelationService } from './services/autoCorrelationService.service';
@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  audioContext = new AudioContext();
  stream: MediaStream | null = null;
  analyzerNode: AnalyserNode | null = null;
  source: MediaStreamAudioSourceNode | null = null;
  buffer: Float32Array | null = null;
  frequency: number = -1;
  notes: string[] = ['C', 'C♯', 'D', 'D♯', 'E', 'F', 'F♯', 'G', 'G♯', 'A', 'A♯', 'B']
  midiNoteNumber: number = 0
  playingNote: string | undefined = undefined
  centsOff: number = 0;
  tuningValue: number = 0;

  constructor(public microphoneService: MicrophoneService, public autoCorrelationService: AutoCorrelationService) {
    this.analyzerNode = this.audioContext.createAnalyser();
    this.buffer = new Float32Array(this.analyzerNode.fftSize);
  }

  async microphoneOn(){
    if (this.audioContext.state === 'suspended') {
       await this.audioContext.resume();
     }
       this.stream = await this.microphoneService.getMicrophoneStream();
       this.source = this.audioContext.createMediaStreamSource(this.stream)
       if(this.analyzerNode){
          this.source.connect(this.analyzerNode)
       }
       setInterval(()=> this.analyze(), 10)
  }

  analyze(){
    if(this.buffer){
      this.analyzerNode?.getFloatTimeDomainData(this.buffer);
      this.frequency = this.autoCorrelationService.autoCorrelate(this.buffer, this.audioContext.sampleRate);
      this.midiNoteNumber = this.getNoteFromPitchFrequecy(this.frequency);
      this.playingNote = this.notes[this.midiNoteNumber % 12];
      this.centsOff = this.centsOffPitch(this.frequency, this.getPitchFrequencyFromNote(this.midiNoteNumber));
      this.tuningValue = 50 + this.centsOff
    }
  }

  isValueNaN(value: any): boolean {
    return isNaN(value);
  }

  getNoteFromPitchFrequecy(freq: number){
        if (freq <= 0) {
        return NaN;
      }
      const midiNote = 12 * Math.log2(freq / 440) + 69;
      return Math.round(midiNote);
  }

  centsOffPitch(freqPlayed: number, correctFreq: number){
    if (freqPlayed <= 0) {
    return NaN;
    }
    const centsOffset = 1200 * Math.log2(freqPlayed / correctFreq);
    return Math.round(centsOffset);
  }

  getPitchFrequencyFromNote(note: number) {
    return Math.round(Math.pow(2, (note - 69) / 12) * 440);
  }
}
