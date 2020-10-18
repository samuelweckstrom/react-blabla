import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { useSaySomething } from '../useSaySomething';
import { MockSpeechSynthesis } from './mocks';

const testParams = { sentence: 'hello there' };

function TestComponent() {
  const saySomething = useSaySomething(testParams);

  return (
    <div className="demo-container">
      <h2>Hooks demo</h2>
      <div className="controls">
        <button data-testid="start-button" onClick={saySomething.start}>
          Start
        </button>
        <button data-testid="pause-button" onClick={saySomething.pause}>
          Pause
        </button>
        <button data-testid="stop-button" onClick={saySomething.stop}>
          Stop
        </button>
      </div>
      <p>
        {saySomething.allWords.map((word, index) => (
          <span
            key={`${word}--${index}`}
            style={{
              color: index < saySomething.currentWordIndex ? 'blue' : '',
            }}
            data-testid="all-words-word"
          >
            {`${word} `}
          </span>
        ))}
      </p>
      <p data-testid="current-word">{saySomething.currentWord}</p>
      <p data-testid="current-word-index">{saySomething.currentWordIndex}</p>
    </div>
  );
}

describe('useSaySomething', () => {
  beforeEach(() => {
    require('./setup');
    require('./mocks').MockSpeechSynthesisUtterance();
  });
  it('should render initial state', () => {
    render(<TestComponent />);
    screen.getByTestId('start-button');
    screen.getByTestId('pause-button');
    screen.getByTestId('stop-button');
    const currentWord = screen.getByTestId('current-word');
    const currentWordIndex = screen.getByTestId('current-word-index');
    const firstWordFromSentence = testParams.sentence.split(' ')[0];
    expect(currentWord).toEqual(firstWordFromSentence);
    expect(currentWordIndex).toEqual(0);
  });
  xit('should start utterance', () => {
    render(<TestComponent />);
    const startButton = screen.getByTestId('start-button');
    userEvent.click(startButton);
    const currentWord = screen.getByTestId('current-word');
    const currentWordIndex = screen.getByTestId('current-word-index');
    const firstWordFromSentence = testParams.sentence.split(' ')[0];
    expect(currentWord).toEqual(firstWordFromSentence);
    expect(currentWordIndex).toEqual(0);
  });
  xit('should pause utterance', () => {
    render(<TestComponent />);
    const startButton = screen.getByTestId('start-button');
    const pauseButton = screen.getByTestId('pause-button');
    userEvent.click(startButton);
    userEvent.click(pauseButton);
    const currentWord = screen.getByTestId('current-word');
    const currentWordIndex = screen.getByTestId('current-word-index');
    const firstWordFromSentence = testParams.sentence.split(' ')[0];
    expect(currentWord).toEqual(firstWordFromSentence);
    expect(currentWordIndex).toEqual(0);
  });
  xit('should stop utterance', () => {
    render(<TestComponent />);
    const startButton = screen.getByTestId('start-button');
    const pauseButton = screen.getByTestId('pause-button');
    userEvent.click(startButton);
    userEvent.click(pauseButton);
    const currentWord = screen.getByTestId('current-word');
    const currentWordIndex = screen.getByTestId('current-word-index');
    const firstWordFromSentence = testParams.sentence.split(' ')[0];
    expect(currentWord).toEqual(firstWordFromSentence);
    expect(currentWordIndex).toEqual(0);
  });
});
