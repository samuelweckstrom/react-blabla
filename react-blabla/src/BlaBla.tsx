import React, { useEffect, useState, useMemo, useCallback } from 'react';

const DEFAULTS = {
  NAMESPACE: 'react-blabla',
} as const;

export type BlaBlaRenderPropsType = {
  start: () => void;
  pause: () => void;
  stop: () => void;
  allWords: string[];
  currentWord: string;
  currentWordIndex: number;
};

export type BlaBlaOptionsType = {
  pitch: number;
  rate: number;
  volume: number;
  voice: SpeechSynthesisVoice;
  lang: string;
};

type BlaBlaProps = {
  sentence: string;
  options?: BlaBlaOptionsType;
  render?: ({}: BlaBlaRenderPropsType) => JSX.Element;
  cssNamespace?: string;
  showWords?: boolean;
  showCurrentWord?: boolean;
  disableStyles?: boolean;
};

const synthesis = window.speechSynthesis;
const utterance = new SpeechSynthesisUtterance();

export function BlaBla(props: BlaBlaProps): JSX.Element {
  const namespace = props.cssNamespace || DEFAULTS.NAMESPACE;
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const [isStart, setIsStart] = useState(false);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    utterance.pitch = props.options?.pitch || 1;
    utterance.rate = props.options?.rate || 1;
    utterance.volume = props.options?.volume || 0.25;
    utterance.lang = props.options?.lang || 'en-US';
    utterance.voice =
      props.options?.voice || window.speechSynthesis.getVoices()[1];
  }, []);

  utterance.onstart = function () {
    setCurrentWordIndex(currentWordIndex + 1);
  };
  const allWords = useMemo(() => props.sentence.split(' '), []);

  const sayNext = useCallback(() => {
    if (currentWordIndex === allWords.length + 1) {
      synthesis.cancel();
      setIsStart(false);
      setCurrentWordIndex(0);
      return;
    }
    utterance.text = allWords[currentWordIndex];
    synthesis.speak(utterance);
  }, [currentWordIndex, utterance]);

  useEffect(() => {
    if (isStart) sayNext();
  }, [isStart, currentWordIndex]);
  const handleStart = useCallback(() => {
    setIsStart(true);
  }, []);

  const handlePause = useCallback(() => {
    if (isPaused) {
      synthesis.resume();
      setIsPaused(!isPaused);
    } else {
      synthesis.pause();
      setIsPaused(!isPaused);
    }
  }, []);

  const handleStop = useCallback(() => {
    synthesis.cancel();
    setIsStart(false);
    setCurrentWordIndex(0);
  }, []);

  if (props.render) {
    return props.render({
      start: handleStart,
      pause: handlePause,
      stop: handleStop,
      allWords,
      currentWord: allWords[currentWordIndex - 1],
      currentWordIndex,
    });
  }

  return (
    <>
      {!props.disableStyles && (
        <style>
          {`
          .${namespace}__wrapper {
            display: -webkit-box;
            display: -ms-flexbox;
            display: flex;
            -webkit-box-orient: vertical;
            -webkit-box-direction: normal;
                -ms-flex-flow: column nowrap;
                    flex-flow: column nowrap;
          }
          .${namespace}__controls {
            display: -webkit-box;
            display: -ms-flexbox;
            display: flex;
            -webkit-box-orient: horizontal;
            -webkit-box-direction: normal;
                -ms-flex-flow: row nowrap;
                    flex-flow: row nowrap;
            -webkit-box-pack: justify;
                -ms-flex-pack: justify;
                    justify-content: space-between;
            width: 15rem;
          }
          .${namespace}__controls-start {
            border: 1px solid #000;
            background-color: #fff;
            padding: 1rem;
            border-radius: 0.5rem;
          }
          .${namespace}__controls-pause {
            border: 1px solid #000;
            background-color: #fff;
            padding: 1rem;
            border-radius: 0.5rem;
          }
          .${namespace}__controls-stop {
            border: 1px solid #000;
            background-color: #fff;
            padding: 1rem;
            border-radius: 0.5rem;
          }
          .${namespace}__words {
            width: 100%;
          }
          .${namespace}__words-highlight {
            color: #000;
          }
          .${namespace}__words-highlight--highlighted {
            color: #00f;
          }
        `}
        </style>
      )}
      <div className={`${namespace}__wrapper`}>
        {!props.render && (
          <div className={`${namespace}__controls`}>
            <button
              className={`${namespace}__controls-start`}
              onClick={handleStart}
            >
              Start
            </button>
            <button
              className={`${namespace}__controls-pause`}
              onClick={handlePause}
            >
              Pause
            </button>
            <button
              className={`${namespace}__controls-stop`}
              onClick={handleStop}
            >
              Stop
            </button>
          </div>
        )}
        {props.showWords && (
          <p className={`${namespace}__words`}>
            {allWords.map((word, index) => (
              <span
                key={`${word}--${index}`}
                className={`${namespace}__words-highlight ${
                  index < currentWordIndex
                    ? `${namespace}__words-highlight--highlighted`
                    : ''
                }`}
              >
                {`${word}  `}
              </span>
            ))}
          </p>
        )}
        {props.showCurrentWord && <div>{allWords[currentWordIndex - 1]}</div>}
      </div>
    </>
  );
}
