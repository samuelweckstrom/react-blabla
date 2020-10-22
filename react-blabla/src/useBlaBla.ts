import { useEffect, useState, useMemo, useCallback } from 'react';

type useBlaBlaOptions = {
  pitch: number;
  rate: number;
  volume: number;
  voice: SpeechSynthesisVoice;
  lang: string;
};

type useBlaBlaParams = {
  sentence: string;
  options?: Partial<useBlaBlaOptions>;
};

const synthesis = window.speechSynthesis;
const Utterance = window.SpeechSynthesisUtterance;
const utterance = new Utterance();

export function useBlaBla(params: useBlaBlaParams) {
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const [isStart, setIsStart] = useState(false);
  const allWords = useMemo(() => params.sentence.split(' '), []);
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
    utterance.pitch = params.options?.pitch || 1;
    utterance.rate = params.options?.rate || 1;
    utterance.volume = params.options?.volume || 0.25;
    utterance.lang = params.options?.lang || 'en-US';
    utterance.voice =
      params.options?.voice || window.speechSynthesis.getVoices()[1];
  }, [params]);

  utterance.onstart = function () {
    setCurrentWordIndex(currentWordIndex + 1);
  };
  useEffect(() => {
    if (isStart) {
      sayNext();
    }
  }, [isStart, currentWordIndex]);

  const handleStart = useCallback(() => {
    setIsStart(true);
  }, []);

  const handlePause = useCallback(() => {
    synthesis.pause();
  }, []);
  const handleResume = useCallback(() => {
    synthesis.resume();
  }, []);
  const handleStop = useCallback(() => {
    synthesis.cancel();
    setIsStart(false);
    setCurrentWordIndex(0);
  }, []);

  return {
    start: handleStart,
    pause: handlePause,
    resume: handleResume,
    stop: handleStop,
    allWords,
    currentWord: allWords[currentWordIndex - 1],
    currentWordIndex,
  };
}
