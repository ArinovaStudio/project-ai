"use client"

import { useEffect, useRef, useState } from "react"

export function useSpeechToText() {
  const recognitionRef = useRef<any>(null)
  const [listening, setListening] = useState(false)
  const [text, setText] = useState("")
  const [supported, setSupported] = useState(true)

  useEffect(() => {
    const SpeechRecognition =
      (window as any).SpeechRecognition ||
      (window as any).webkitSpeechRecognition

    if (!SpeechRecognition) {
      setSupported(false)
      return
    }

    const recognition = new SpeechRecognition()
    recognition.lang = "en-US"
    recognition.interimResults = true
    recognition.continuous = false

    recognition.onresult = (event: any) => {
      let transcript = ""
      for (let i = event.resultIndex; i < event.results.length; i++) {
        transcript += event.results[i][0].transcript
      }
      setText(transcript)
    }

    recognition.onstart = () => setListening(true)
    recognition.onend = () => setListening(false)
    recognition.onerror = () => setListening(false)

    recognitionRef.current = recognition
  }, [])

  const start = () => recognitionRef.current?.start()
  const stop = () => recognitionRef.current?.stop()
  const reset = () => setText("")

  return {
    supported,
    listening,
    text,
    start,
    stop,
    reset,
  }
}
