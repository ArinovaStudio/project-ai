"use client";

import React, { useEffect, useRef, useState } from "react";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { Send, Mic, MicOff } from "lucide-react";
import { startPCMStream } from "@/lib/pcm-recorder";

type InputAreaProps = {
  className?: string;
  onSend: (text: string) => void;
};

export default function InputArea({ className = "", onSend }: InputAreaProps) {
  const [value, setValue] = useState("");
  const [listening, setListening] = useState(false);

  // 🔑 REQUIRED REFS
  const wsRef = useRef<WebSocket | null>(null);
  const audioCtxRef = useRef<AudioContext | null>(null);
  const streamRef = useRef<MediaStream | null>(null);
  const processorRef = useRef<ScriptProcessorNode | null>(null);

  /* ---------------- MIC START ---------------- */

  const startMic = async () => {
    if (listening) return;

    // 1️⃣ WebSocket
    const ws = new WebSocket("ws://localhost:9000/stt");
    ws.binaryType = "arraybuffer";
    wsRef.current = ws;

    ws.onmessage = (e) => {
  if (typeof e.data === "string") {
    setValue(prev =>
      prev
        ? `${prev.trim()} ${e.data.trim()}`
        : e.data.trim()
    )
  }
}


    // 2️⃣ Start PCM stream
    const { ctx, stream, processor } = await startPCMStream((pcm) => {
      if (ws.readyState === WebSocket.OPEN) {
        ws.send(pcm.buffer);
      }
    });

    audioCtxRef.current = ctx;
    streamRef.current = stream;
    processorRef.current = processor;

    setListening(true);
  };

  /* ---------------- MIC STOP ---------------- */

  const stopMic = () => {
    processorRef.current?.disconnect();
    audioCtxRef.current?.close();
    streamRef.current?.getTracks().forEach((t) => t.stop());
    wsRef.current?.close();

    processorRef.current = null;
    audioCtxRef.current = null;
    streamRef.current = null;
    wsRef.current = null;

    setListening(false);
  };

  /* ---------------- SEND ---------------- */

  const handleSend = () => {
    if (!value.trim()) return;
    onSend(value.trim());
    setValue("");
    if (listening) stopMic();
  };

  /* ---------------- CLEANUP ---------------- */

  useEffect(() => {
    return () => stopMic();
  }, []);

  /* ---------------- UI ---------------- */

  return (
    <div className={`py-4 bg-background ${className}`}>
      <div className="max-w-4xl mx-auto">
        <div className="relative">
          <Input
            value={value}
            onChange={(e) => setValue(e.target.value)}
            placeholder="Type your message here..."
            onKeyDown={(e) => e.key === "Enter" && handleSend()}
            className="
              w-full bg-card border-border
              rounded-full py-7 pl-14 pr-16
            "
          />

          {/* 🎤 MIC BUTTON */}
          <Button
            type="button"
            size="icon"
            onClick={listening ? stopMic : startMic}
            className={`
              absolute left-2 top-1/2 -translate-y-1/2
              h-10 w-10 rounded-full border
              ${
                listening
                  ? "bg-red-500/15 border-red-500/40"
                  : "bg-background hover:bg-muted border-border"
              }
            `}
          >
            {listening ? (
              <MicOff className="h-4 w-4 text-red-500" />
            ) : (
              <Mic className="h-4 w-4 text-muted-foreground" />
            )}
          </Button>

          {/* ➤ SEND */}
          <Button
            size="icon"
            onClick={handleSend}
            className="
              absolute right-2 top-1/2 -translate-y-1/2
              h-10 w-10 rounded-full
              bg-primary text-primary-foreground
              hover:bg-primary/90
            "
          >
            <Send className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
}
