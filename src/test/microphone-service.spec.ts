import { TestBed } from '@angular/core/testing';
import { MicrophoneService } from '../app/services/microphone.service';

describe('MicrophoneService', () => {
  let service: MicrophoneService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [MicrophoneService],
    });
    service = TestBed.inject(MicrophoneService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should return a MediaStream when getMicrophoneStream is called', async () => {
    const mockMediaStream = new MediaStream();
    spyOn(navigator.mediaDevices, 'getUserMedia').and.returnValue(Promise.resolve(mockMediaStream));

    const stream = await service.getMicrophoneStream();
    expect(stream).toBe(mockMediaStream);
    expect(navigator.mediaDevices.getUserMedia).toHaveBeenCalledWith({ audio: true });
  });

  it('should throw an error if getUserMedia fails', async () => {
    const mockError = new Error('Microphone access denied');
    spyOn(navigator.mediaDevices, 'getUserMedia').and.returnValue(Promise.reject(mockError));

    try {
      await service.getMicrophoneStream();
      fail('Expected error to be thrown');
    } catch (error) {
      expect(error).toBe(mockError);
      expect(navigator.mediaDevices.getUserMedia).toHaveBeenCalledWith({ audio: true });
    }
  });
});