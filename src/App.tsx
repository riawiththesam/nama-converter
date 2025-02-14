import { ChangeEventHandler, useState } from 'react'
import './App.css'
import * as lindera from "lindera-js";

export function App() {
  const { converted, setText } = useNamaConvert()

  const onChangeHandler: ChangeEventHandler<HTMLTextAreaElement> = (ev) => {
    console.log(ev.target.value)
    setText(ev.target.value)
  }

  return (
    <>
      <div>
        <p>テキストを入力</p>
        <textarea onChange={onChangeHandler}></textarea>
      </div>
      <div style={{whiteSpace: 'pre-line'}}>{converted}</div>
    </>
  )
}

const namaYomiList = ['なま','いのち','うぶ','せい', 'ぜい','しょう','じょう','い','う','お','は','き','な']
const pattern = new RegExp(namaYomiList.join('|'), 'g');

function useNamaConvert() {
  const [converted, setConverted] = useState('')

  function setText(text: string) {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const tokens = Array.from(lindera.tokenize(text) as any) as Array<lindera.KuromojiJSToken>
    const reading = tokens.map((token) => {
      console.log(token)
      if (token.word_type == "UNKNOWN") {
        return token.surface_form
      }
      return kanaToHira(token.reading)
    }).join('')
    const replaced = reading.replace(pattern, "生")
    console.log(replaced)
    setConverted(replaced)
  }

  return {
    converted,
    setText,
  }
}

function kanaToHira(text: string) {
  return text.replace(/[\u30a1-\u30f6]/g, function(match) {
      const chr = match.charCodeAt(0) - 0x60;
      return String.fromCharCode(chr);
  });
}