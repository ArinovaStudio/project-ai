"use client";

import React, { useState } from "react";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { Send, Mic, MicOff } from "lucide-react";
import { useSpeechToText } from "@/lib/useSpeechToText"

type InputAreaProps = {
  className?: string;
  onSend: (text: string) => void;
};

export default function InputArea({ className = "", onSend }: InputAreaProps) {
  const [value, setValue] = useState("");

  const {
    supported,
    listening,
    text,
    start,
    stop,
  } = useSpeechToText()

  const handleSend = () => {
    if (!value.trim()) return;
    onSend(value.trim());
    setValue("");
  };


  if (!supported) {
    return <p>Speech recognition not supported</p>
  }

  return (
    <div className={`py-4 bg-background ${className}`}>
      <div className="max-w-4xl mx-auto flex gap-3 items-center">
        <Input
          value={value}
          onChange={(e) => setValue(e.target.value)}
          placeholder="Type your message here..."
          className="flex-1 bg-card border-border rounded-full py-7 px-7"
          onKeyDown={(e) => e.key === "Enter" && handleSend()}
        />

        <Button
          size="icon"
          onClick={handleSend}
          className="bg-primary text-primary-foreground hover:bg-primary/90 w-13 h-13 cursor-pointer"
        >
          <Send />
        </Button>

        <div className="flex gap-2 items-center">
          <button
            onClick={listening ? stop : start}
            className="p-2 rounded-full border"
          >
            {listening ? <MicOff /> : <Mic />}
          </button>

          <input
            value={text}
            readOnly
            placeholder="Speak…"
            className="flex-1 border px-3 py-2 rounded-md"
          />
        </div>
      </div>
    </div>
  );
}
