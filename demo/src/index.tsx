import React from 'react';
import ReactDOM from 'react-dom';
import { useGetVoices, useBlabla } from 'react-blabla';
import './styles.css';

function App() {
  const voice: SpeechSynthesisVoice | SpeechSynthesisVoice[] = useGetVoices({
    name: 'Amelie',
  });
  const blabla = useBlabla({
    text:
      'Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum',
    options: { voice },
  });
  return (
    <>
      <div className="demo">
        <h1>Demo</h1>
        <div>
          <button onClick={blabla.start}>Start</button>
          <button onClick={blabla.pause}>Pause</button>
          <button onClick={blabla.stop}>Stop</button>
        </div>
        <p className="demo-text">
          {blabla.allWords.map((word: string, index: number) => (
            <span
              key={`${word}--${index}`}
              className={
                index === blabla.currentWordIndex
                  ? 'demo-word--current'
                  : index < blabla.currentWordIndex
                  ? 'demo-word--said'
                  : 'demo-word'
              }
            >
              {`${word} `}
            </span>
          ))}
        </p>
      </div>
    </>
  );
}

ReactDOM.render(<App />, document.getElementById('root'));
