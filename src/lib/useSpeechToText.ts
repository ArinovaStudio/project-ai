"use client"

import { useEffect, useRef, useState } from "react"

export function useSpeechToText() {
  const recognitionRef = useRef<any>(null)
  const isRunningRef = useRef(false)

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
    recognition.continuous = true // ✅ FIX

    recognition.onstart = () => {
      isRunningRef.current = true
      setListening(true)
    }

    recognition.onend = () => {
      isRunningRef.current = false
      setListening(false)
    }

    recognition.onerror = () => {
      isRunningRef.current = false
      setListening(false)
    }

    recognition.onresult = (event: any) => {
      let transcript = ""
      for (let i = event.resultIndex; i < event.results.length; i++) {
        transcript += event.results[i][0].transcript
      }
      setText(transcript)
    }

    recognitionRef.current = recognition

    return () => {
      recognition.stop()
    }
  }, [])

  const start = () => {
    if (!recognitionRef.current || isRunningRef.current) return
    recognitionRef.current.start()
  }

  const stop = () => {
    if (!recognitionRef.current || !isRunningRef.current) return
    recognitionRef.current.stop()
  }

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
