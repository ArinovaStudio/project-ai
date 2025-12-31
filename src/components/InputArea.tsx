import React from 'react'
import { Input } from './ui/input'
import { Button } from './ui/button'
import { Send } from 'lucide-react'

export default function InputArea({ className = "" }) {
    return (
        <div className={`py-4 bg-background ${className}`}>
            <div className="max-w-4xl mx-auto flex gap-3 items-center">
                <Input
                    placeholder="Type your message here..."
                    className="flex-1 bg-card border-border rounded-full py-7 px-7"
                />
                <Button
                    size="icon"
                    className="bg-primary text-primary-foreground hover:bg-primary/90 w-13 h-13 cursor-pointer"
                ><Send />
                </Button>
            </div>
        </div>
    )
}
