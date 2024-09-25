"use client"
import Link from "next/link"
import { useRef, useState } from "react"
import { identifyRecordedVoice } from "@/app/lib/llm-functions"
import { recognizedText } from "@/app/types/apptypes"
import Loading from "@/app/(components)/ui/loading"


export default function Home() {
  const [chosen, setChosen] = useState<string>('')
  const [recogParams, setRecogParams] = useState<recognizedText[]>([])
  const [isLoading, setIsLoading] = useState(false);

  const audioRef1 = useRef<HTMLAudioElement | null>(null)
  const audioRef2 = useRef<HTMLAudioElement | null>(null)
  const audioRef3 = useRef<HTMLAudioElement | null>(null)

  // Utilitites func.
  const playAudio = (audioRef:React.RefObject<HTMLAudioElement>) => {
    if (audioRef.current) {
      audioRef.current.play()
        .then(() => console.log("Reproduciendo..."))
        .catch((error) => console.error("Error al reproducir:", error))
    }
  }

  // Handlers func **************************************

  const handleMsgSelections = (id:string) => {
    switch (id) {
      case ('1'):
        setChosen('demo1.mp3')
        break
      case ('2'):
        setChosen('demo2.mp3')
        break
        case ('3'):
          setChosen('demo3.mp3')
        break
    }
  }

  const handleEntityIdentification = async () => {
    if (!chosen) {
      alert('Seleccione una grabación')
      return
    }
    setIsLoading(true);
    try {
    const result=await identifyRecordedVoice(chosen)
    console.log('Recibido:', result)
    if (result.length > 0)  setRecogParams(result)
    } finally {
        setIsLoading(false)
    }
  }

  return (
    <div className="flex justify-start ">
      <Link className="mr-64" href="/">
        <button className="m-2 p-2 rounded-md bg-blue-700 text-white text-xs" > Home </button>
      </Link>
    <div className="mt-8 grid grid-rows-[10px_2fr_10px_40px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
       {isLoading && <Loading />}
      <ul className="space-y-4">
      <h1 className="ml-32 font-bold text-lg">Reco Voz grabada (AssemblyAI API)</h1>
          <li className="pt-16 flex space-x-4">
              <button className="audio-button" onClick={()=> playAudio(audioRef1)}>Reproducir</button>              
            <span className={`w-[30rem] ${chosen==='demo1.mp3' ? 'font-bold' : null}`} onClick={()=>handleMsgSelections('1')}>
              Demo 1: Enviar 100 pesos a la cuenta Filemon34
              <audio className="audio-button" ref={audioRef1} src='demo1.mp3' preload="auto" />
              </span>
          </li>
          <li className="flex space-x-4 ">
              <button className="audio-button" onClick={()=> playAudio(audioRef2)}>Reproducir</button>
              <span className={`w-[30rem] ${chosen==='demo2.mp3'? 'font-bold' : null}`} onClick={()=>handleMsgSelections('2')}>
              Demo 2: Transferir 150 pesos a la cuenta de Bernardina.base.eth
              <audio className="audio-button" ref={audioRef2} src='demo2.mp3' preload="auto" />
              </span>
          </li>
          <li className="flex space-x-4">
              <button className="audio-button" onClick={()=> playAudio(audioRef3)}>Reproducir</button>              
            <span className={`w-[30rem] ${chosen==='demo3.mp3'? 'font-bold' : null}`} onClick={()=>handleMsgSelections('3')}>
              Demo 3: Pasar mil pesos a la cuenta numero 55 25 30 11
              <audio className="audio-button" ref={audioRef3} src='demo3.mp3' preload="auto" />
              </span>
          </li>
      </ul>
      <button className="feature-button" onClick={handleEntityIdentification}>Reconoce Msg de Voz</button>
      { Boolean(recogParams.length) && 
        <div className="w-[20rem] border border-blue-300 rounded-xl">
          {recogParams.map( param => <p key={param.type} className="p-8 text-sm">{param.type}:{param.text}</p> )}
      </div>
      }
    </div>
    </div>
  );
}
