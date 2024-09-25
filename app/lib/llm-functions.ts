'use server'
import { AssemblyAI } from 'assemblyai'
import path from 'path'
import { recognizedText } from "@/app/types/apptypes"


export  const  identifyRecordedVoice  = async (selectedOption:string): Promise<recognizedText[]> => {
    
  const client = new AssemblyAI({
        apiKey: process.env.LLM_MODEL_API || ''
      })

  const recognizedText:recognizedText[] = []

    try {
        // Lee el archivo de audio
        console.log('environement:', process.env.NODE_ENV)
        let audioFilePath
        if (process.env.NODE_ENV==='production') 
           audioFilePath = `/${selectedOption}`
          else
           audioFilePath = path.join(process.cwd(), 'public', selectedOption)
        console.log('input file to process: ', audioFilePath)

        // Prepara los parámetros para AssemblyAI
        const params = {
          audio: audioFilePath,
          entity_detection: true,
          language_code: 'es'
        };
  

        const run = async () => {
          const transcript = await client.transcripts.transcribe(params)
          if (transcript.status === 'error') {
            console.error('error de transcripcion:', transcript.error)
            return 
          }
        
          for (const entity of transcript.entities!) {
            console.log(`Timestamp: ${entity.start} - ${entity.end}\n`)
            console.log(entity.entity_type)
            console.log(entity.text)
            recognizedText.push({
              type: entity.entity_type,
              text: entity.text,
            })
          }

  } 
    console.log('por ejecutar run')
    await run()
    console.log('por regresar recognizedText', recognizedText)
    return recognizedText

    } catch (error) {
    console.error('Error al procesar el archivo de audio:', error);
    
    throw error;
    }
      
}