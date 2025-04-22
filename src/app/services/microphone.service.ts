// audio.service.ts or a component.ts
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class MicrophoneService {
  async getMicrophoneStream(): Promise<MediaStream> {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      return stream;
    } catch (error) {
      console.error('Error accessing microphone:', error);
      throw error; // Rethrow the error to handle it in the component
    }
  }
}