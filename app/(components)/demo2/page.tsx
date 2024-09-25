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
  const playAudio = (audioRef:any) => {
    if (audioRef.current) {
      audioRef.current.play()
        .then(() => console.log("Reproduciendo..."))
        .catch((error:any) => console.error("Error al reproducir:", error))
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
    <div className="flex justify-space ">
      <Link className="mr-64" href="/">
        <button className="m-2 p-2 rounded-md bg-blue-700 text-white text-xs" > Home </button>
      </Link>
      <h1 className="mt-4 ml-64 font-bold text-lg">Reconocimiento desde Microfono</h1>
      <div className="mt-32 -ml-32 text-stone-400 font-lead tracking-wide">PENDIENTE</div>
    </div>
  );
}
