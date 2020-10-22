# React Bla-bla 🗣

[![TypeScript](https://badges.frapsoft.com/typescript/code/typescript.svg?v=101)](https://github.com/ellerbrock/typescript-badges/)

React component and hook for generating text-to-speech using Web Speech API. Features include controls and karaoke style current word highlighting.

[Demo](https://codesandbox.io/s/react-blabla-demo-ptnb3)

<br>

```
yarn add react-blabla
```
<br>

## Use hook
<br>

```
import { useBlaBla } from 'react-blabla'

...

const saySomething = useBlaBla({ sentence: 'Bla bla bla Bob Lowblah!' });

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
|`sentence: string`| Text for speech |
|`options?: object`| Options for speech, same as defined in the Web API |
|Options| 
||pitch: number||
||rate: number||
||volume: number||
||voice: SpeechSynthesisVoice||
||lang: string||


<br>
<br>

## Get all voices

A hook to get all voices, all voices by country code or a voice by name.

```
import { useGetVoices } from 'react-blabla'

const voices = getVoices()
```

| Param         |  |
| ------------- | ------------- |
|`sentence: string`| |
|`options?: object`| Options for speech, same as defined in the Web API |
||`pitch: number`||
||`rate: number`||
||`volume: number`||
||`voice: SpeechSynthesisVoice`||
||`lang: string`||


<br>
<br>

## Component

```
import { BlaBla } from 'react-blabla'

...

  return (
    <BlaBla
      showWords
      showCurrentWord
      sentence="Bla bla bla Bob Lowblah!"
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
  )
```

<br>

### Styling

The component version has default namespaced CSS classes with `react-blabla` for both controls and text highlighting, but you can also pass your own namespace with the `cssNamespace` prop. 

| className |
| ------------- |
|`react-blabla__wrapper`
|`react-blabla__controls`
|`react-blabla__controls-start`
|`react-blabla__controls-pause`
|`react-blabla__controls-stop`
|`react-blabla__words`
|`react-blabla__words-highlight`

<br>

### Props

| Param         |  |
| ------------- | ------------- |
|`sentence: string`||
|`cssNamespace?: string`||
|`showWords?: boolean`||
|`showCurrentWord?: boolean`||
|`disableStyles?: boolean`||
|`options?: object`| Options for speech, same as defined in the Web API |
||`pitch: number`||
||`rate: number`||
||`volume: number`||
||`voice: SpeechSynthesisVoice`||
||`lang: string`||
|`render?: ({}: BlaBlaRenderPropsType) => JSX.Element`| Render prop that passes following params|
||`start: () => void`||
||`pause: () => void`||
||`stop: () => void`||
||`allWords: string[]`||
||`currentWord: string`||
||`currentWordIndex: number`||

