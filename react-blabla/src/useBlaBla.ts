import { useEffect, useState, useMemo, useCallback } from 'react';

type useBlablaOptions = {
  pitch: number;
  rate: number;
  volume: number;
  voice: SpeechSynthesisVoice;
  lang: string;
};

type useBlablaParams = {
  sentence: string;
  options?: Partial<useBlablaOptions>;
};

type useBlablaValues = {
  start: () => void;
  pause: () => void;
  stop: () => void;
  allWords: string[];
  currentWord: string;
  currentWordIndex: number;
};

const synthesis = window?.speechSynthesis || {};
const Utterance = window?.SpeechSynthesisUtterance || {};
const utterance = new Utterance();

export function useBlabla(params: useBlablaParams): useBlablaValues {
  const [currentWordIndex, setCurrentWordIndex] = useState<number>(0);
  const [isStart, setIsStart] = useState<boolean>(false);
  const [isPaused, setIsPaused] = useState<boolean>(false);
  const allWords: string[] = useMemo(() => params.sentence.split(' '), []);
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
    if (params.options?.voice?.name) {
      utterance.voice =
        params.options?.voice || window?.speechSynthesis?.getVoices()[0];
    }
  }, [params]);

  utterance.onstart = function () {
    setCurrentWordIndex(currentWordIndex + 1);
  };

  useEffect(() => {
    if (isStart) {
      sayNext();
    }
  }, [isStart, currentWordIndex]);

  useEffect(() => {
    synthesis.cancel();
  }, []);

  const stop = useCallback(() => {
    synthesis.cancel();
    setIsStart(false);
    setCurrentWordIndex(0);
  }, []);

  const start = () => {
    setIsStart(true);
  };

  const pause = () => {
    if (isPaused) {
      sayNext();
    } else {
      synthesis.cancel();
    }
    setIsPaused(!isPaused);
  };

  return {
    start,
    pause,
    stop,
    allWords,
    currentWord: allWords[currentWordIndex - 1],
    currentWordIndex: Math.max(currentWordIndex - 1, 0),
  };
}
