import { useState, useEffect } from 'react';

type getVoicesParas = {
  language?: string;
  name?: string;
};

export function useGetVoices(
  params: getVoicesParas
): SpeechSynthesisVoice[] | SpeechSynthesisVoice {
  const [allVoices, setAllVoices] = useState<SpeechSynthesisVoice[]>([]);
  const [voicesByParam, setVoicesByParam] = useState<
    SpeechSynthesisVoice | SpeechSynthesisVoice[]
  >([]);
  window.speechSynthesis.onvoiceschanged = () => {
    const all = window.speechSynthesis.getVoices();
    setAllVoices(all);
  };

  useEffect(() => {
    if (allVoices.length) {
      if (params?.name) {
        const voiceByName = allVoices.find(
          (voice) => voice.name === params.name
        );
        if (!voiceByName) console.error('Incorrect name of voice!');
        setVoicesByParam(voiceByName || allVoices[0]);
      }
      if (params?.language) {
        const voicesByLanguage = allVoices.filter(
          (voice) => voice.lang === params.language
        );
        if (!voicesByLanguage.length) console.error('Incorrect language code!');
        setVoicesByParam(
          voicesByLanguage.length ? voicesByLanguage : allVoices[0]
        );
      }
    }
  }, [allVoices]);
  return voicesByParam;
}
