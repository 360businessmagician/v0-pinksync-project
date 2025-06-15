"use client"

import { useState, useEffect } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Play, Pause } from "lucide-react"

interface VideoPreviewProps {
  title: string
  description?: string
}

export function VideoPreview({ title, description }: VideoPreviewProps) {
  const [isPlaying, setIsPlaying] = useState(false)

  // This would be replaced with actual video player functionality
  useEffect(() => {
    let timer: NodeJS.Timeout
    if (isPlaying) {
      timer = setTimeout(() => {
        setIsPlaying(false)
      }, 5000)
    }
    return () => clearTimeout(timer)
  }, [isPlaying])

  return (
    <Card className="overflow-hidden">
      <div className="relative aspect-video bg-gray-100">
        <div className="absolute inset-0 flex items-center justify-center">
          {!isPlaying ? (
            <div className="flex flex-col items-center cursor-pointer" onClick={() => setIsPlaying(true)}>
              <div className="h-16 w-16 rounded-full bg-pink-600/90 flex items-center justify-center">
                <Play className="h-8 w-8 text-white ml-1" />
              </div>
              <span className="mt-2 text-sm font-medium">Watch Sign Language Preview</span>
            </div>
          ) : (
            <div className="w-full h-full flex flex-col items-center justify-center bg-gray-800/10">
              <div className="animate-pulse">
                <HandMetal className="h-16 w-16 text-pink-600" />
              </div>
              <div
                className="absolute bottom-4 right-4 h-10 w-10 rounded-full bg-gray-800/70 flex items-center justify-center cursor-pointer"
                onClick={() => setIsPlaying(false)}
              >
                <Pause className="h-5 w-5 text-white" />
              </div>
            </div>
          )}
        </div>
      </div>
      <CardContent className="p-3">
        <h3 className="font-medium text-sm">{title}</h3>
        {description && <p className="text-xs text-gray-500">{description}</p>}
      </CardContent>
    </Card>
  )
}

function HandMetal({ className }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <path d="M18 12.5V10a2 2 0 0 0-2-2v0a2 2 0 0 0-2 2v1.4" />
      <path d="M14 11V9a2 2 0 1 0-4 0v2" />
      <path d="M10 10.5V5a2 2 0 1 0-4 0v9" />
      <path d="m7 15-1.76-1.76a2 2 0 0 0-2.83 2.82l3.6 3.6C7.5 21.14 9.2 22 12 22h2a8 8 0 0 0 8-8V7a2 2 0 1 0-4 0v5" />
    </svg>
  )
}
