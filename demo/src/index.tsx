import React from 'react';
import ReactDOM from 'react-dom';
import {
  useGetVoices,
  useBlaBla,
  BlaBla,
  BlaBlaRenderPropsType,
} from 'react-blabla';
import './styles.css';

const App = () => {
  const voices = useGetVoices({ language: 'en-GB' });
  const saySomething = useBlaBla({
    sentence: 'Bla bla bla!',
    options: { voice: voices[0] },
  });
  return (
    <>
      <div className="demo-container">
        <h1>React blabla!</h1>
        <h2>Component demo</h2>
        <BlaBla
          showWords
          showCurrentWord
          sentence="Bla bla bla!"
          render={({
            start,
            pause,
            stop,
            currentWord,
          }: BlaBlaRenderPropsType) => (
            <>
              <div className="controls">
                <button onClick={start}>Start</button>
                <button onClick={pause}>Pause</button>
                <button onClick={stop}>Stop</button>
              </div>
              <h1>{currentWord}</h1>
            </>
          )}
        />
      </div>
      <div className="demo-container">
        <h2>Hooks demo</h2>
        <div className="controls">
          <button onClick={saySomething.start}>Start</button>
          <button onClick={saySomething.pause}>Pause</button>
          <button onClick={saySomething.stop}>Stop</button>
        </div>
        <p>
          {saySomething.allWords.map((word: string, index: number) => (
            <span
              key={`${word}--${index}`}
              style={{
                color: index < saySomething.currentWordIndex ? 'blue' : '',
              }}
            >
              {`${word} `}
            </span>
          ))}
        </p>
      </div>
    </>
  );
};

ReactDOM.render(<App />, document.getElementById('root'));
