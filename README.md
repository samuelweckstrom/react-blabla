# React Blabla 🗣

[![TypeScript](https://badges.frapsoft.com/typescript/code/typescript.svg?v=101)](https://github.com/ellerbrock/typescript-badges/)

[Demo](https://codesandbox.io/s/react-blabla-demo-ptnb3)


React hook for generating text-to-speech using the [Web Speech API](https://developer.mozilla.org/en-US/docs/Web/API/Web_Speech_API). Features include play, pause and stop controls, as well as karaoke style current word highlighting. Check out the demo!


<br>

```
yarn add react-blabla
```
<br>

## How to
<br>

```
import { useBlabla } from 'react-blabla'

...

const saySomething = useBlabla({ text: 'Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum' });

return (
  <>
    <button onClick={saySomething.start}>Start</button>
    <button onClick={saySomething.pause}>Pause</button>
    <button onClick={saySomething.stop}>Stop</button>
  </>
)
```

<br>

| Param         | Example |
| ------------- | ------------- |
|`text: string`| Text for speech |
|`options?: object`| Options for speech, same as defined in the Web API | 
||pitch: number||
||rate: number||
||volume: number||
||voice: SpeechSynthesisVoice||


<br>

## Get all voices

A hook to get all voices, or one by country code or name. Returns array if multiple matches to query, like language code, or single voice if name param is passed. If no param passed will return all voices available in browser.

```
import { useGetVoices } from 'react-blabla'

const voices = getVoices() 
// const voiceByName = getVoices({ name: 'Amelie' })
// const voicesByLanguage = getVoices({ language: 'en-US' })
```

| Param         |  |
| ------------- | ------------- |
|`options?: object`||
||language?: string|
||name?: string|
