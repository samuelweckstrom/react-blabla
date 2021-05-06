import { useState } from 'react';

type getVoicesParas = {
  language?: string;
  name?: string;
};

export function useGetVoices(
  params: getVoicesParas
): SpeechSynthesisVoice[] | SpeechSynthesisVoice {
  const [voices, setVoices] = useState<SpeechSynthesisVoice[]>([]);
  if (window?.speechSynthesis?.onvoiceschanged) {
    window.speechSynthesis.onvoiceschanged = () => {
      const allVoices = window.speechSynthesis.getVoices();
      setVoices(allVoices);
    };
  }
  if (params?.name && voices.length) {
    const voiceByName = voices.find((voice) => voice.name === params.name);
    if (!voiceByName) console.error('Incorrect name of voice!');
    return voiceByName || voices[0];
  }
  if (params?.language && voices.length) {
    const voicesByLanguage = voices.filter(
      (voice) => voice.lang === params.language
    );
    if (!voicesByLanguage.length) console.error('Incorrect language code!');
    return voicesByLanguage.length ? voicesByLanguage : voices[0];
  }
  return voices;
}
