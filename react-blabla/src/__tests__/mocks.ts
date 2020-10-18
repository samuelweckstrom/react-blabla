export class MockSpeechSynthesisUtterance {
  utterance: any;
  text: string;
  pitch: number;
  rate: number;
  lang: string = 'en-US';
  constructor() {
    this.utterance = '';
    this.text = '';
    this.pitch = 1;
    this.rate = 1;
    this.lang = 'en-US';
  }

  onend() {
    return jest.fn();
  }
}

export class MockSpeechSynthesis {
  utterance: string;
  speak() {
    jest.fn((utterance) => {
      this.utterance = utterance;
      setTimeout(() => {
        this.reset();
        utterance.onend();
      }, 500);
    });
  }

  cancel() {
    return jest.fn(() => {
      if (this.utterance) {
        this.reset();
      }
    });
  }

  reset() {
    this.utterance = undefined;
  }
}
