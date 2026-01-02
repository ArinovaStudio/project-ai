"use client";

import React, { useState } from "react";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { Send } from "lucide-react";

type InputAreaProps = {
  className?: string;
  onSend: (text: string) => void;
};

export default function InputArea({ className = "", onSend }: InputAreaProps) {
  const [value, setValue] = useState("");

  const handleSend = () => {
    if (!value.trim()) return;
    onSend(value.trim());
    setValue("");
  };

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
      </div>
    </div>
  );
}
