"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Label } from "@/components/ui/label"
import { Progress } from "@/components/ui/progress"
import { VideoIcon, FileText, Upload, Loader2, Download } from "lucide-react"
import { useToast } from "@/components/ui/use-toast"
import { pinkSyncAPI, type TransformRequest } from "@/lib/pinksync-api"

export function TransformTool() {
  const [text, setText] = useState("")
  const [isTransforming, setIsTransforming] = useState(false)
  const [transformProgress, setTransformProgress] = useState(0)
  const [videoData, setVideoData] = useState<any>(null)
  const [signLanguage, setSignLanguage] = useState<TransformRequest["signLanguage"]>("asl")
  const [outputFormat, setOutputFormat] = useState<"mp4" | "gif" | "webm">("mp4")
  const [quality, setQuality] = useState<"low" | "medium" | "high">("medium")
  const { toast } = useToast()

  const handleTransform = async () => {
    if (!text.trim()) {
      toast({
        title: "Text required",
        description: "Please enter some text to transform",
        variant: "destructive",
      })
      return
    }

    setIsTransforming(true)
    setTransformProgress(0)
    setVideoData(null)

    try {
      // Start transformation
      const transformRequest: TransformRequest = {
        text: text.trim(),
        signLanguage,
        outputFormat,
        quality,
      }

      // Simulate progress updates
      const progressInterval = setInterval(() => {
        setTransformProgress((prev) => {
          if (prev >= 90) {
            clearInterval(progressInterval)
            return 90
          }
          return prev + 10
        })
      }, 500)

      const response = await pinkSyncAPI.transformText(transformRequest)

      clearInterval(progressInterval)
      setTransformProgress(100)

      if (response.success && response.data) {
        setVideoData(response.data)
        toast({
          title: "Transformation complete",
          description: "Your content has been transformed successfully",
        })
      } else {
        throw new Error(response.error || "Transformation failed")
      }
    } catch (error) {
      console.error("Transform error:", error)
      toast({
        title: "Transformation failed",
        description: error instanceof Error ? error.message : "An error occurred while transforming your content",
        variant: "destructive",
      })
    } finally {
      setIsTransforming(false)
      setTimeout(() => setTransformProgress(0), 2000)
    }
  }

  const handleDownload = (format: string) => {
    if (videoData?.videoUrl) {
      // Create download link
      const link = document.createElement("a")
      link.href = videoData.videoUrl
      link.download = `pinksync-video.${format}`
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)
    }
  }

  return (
    <div className="grid gap-6 lg:grid-cols-2">
      <div>
        <Tabs defaultValue="text" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="text" className="flex items-center">
              <FileText className="mr-2 h-4 w-4" />
              Text Input
            </TabsTrigger>
            <TabsTrigger value="upload" className="flex items-center">
              <Upload className="mr-2 h-4 w-4" />
              Upload File
            </TabsTrigger>
          </TabsList>

          <TabsContent value="text" className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="text-input">Enter text to transform</Label>
              <Textarea
                id="text-input"
                placeholder="Enter text to transform into sign language video..."
                className="min-h-[200px]"
                value={text}
                onChange={(e) => setText(e.target.value)}
              />
              <p className="text-xs text-muted-foreground">{text.length}/5000 characters</p>
            </div>
          </TabsContent>

          <TabsContent value="upload" className="space-y-4">
            <div className="border-2 border-dashed rounded-lg p-8 text-center">
              <Upload className="h-10 w-10 text-muted-foreground mx-auto mb-4" />
              <p className="text-muted-foreground mb-2">Drag and drop your file here, or click to browse</p>
              <p className="text-xs text-muted-foreground">Supports PDF, DOCX, TXT (max 10MB)</p>
              <Button variant="outline" className="mt-4">
                Browse Files
              </Button>
            </div>
          </TabsContent>
        </Tabs>

        <div className="mt-6 space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="sign-language">Sign Language</Label>
              <Select value={signLanguage} onValueChange={(value: any) => setSignLanguage(value)}>
                <SelectTrigger id="sign-language">
                  <SelectValue placeholder="Select sign language" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="asl">American Sign Language (ASL)</SelectItem>
                  <SelectItem value="bsl">British Sign Language (BSL)</SelectItem>
                  <SelectItem value="auslan">Auslan (Australian Sign Language)</SelectItem>
                  <SelectItem value="lsf">French Sign Language (LSF)</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="output-format">Output Format</Label>
              <Select value={outputFormat} onValueChange={(value: any) => setOutputFormat(value)}>
                <SelectTrigger id="output-format">
                  <SelectValue placeholder="Select format" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="mp4">MP4 Video</SelectItem>
                  <SelectItem value="gif">Animated GIF</SelectItem>
                  <SelectItem value="webm">WebM Video</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="quality">Video Quality</Label>
            <Select value={quality} onValueChange={(value: any) => setQuality(value)}>
              <SelectTrigger id="quality">
                <SelectValue placeholder="Select quality" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="low">Low (480p) - Faster processing</SelectItem>
                <SelectItem value="medium">Medium (720p) - Balanced</SelectItem>
                <SelectItem value="high">High (1080p) - Best quality</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {isTransforming && (
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>Processing...</span>
                <span>{transformProgress}%</span>
              </div>
              <Progress value={transformProgress} className="w-full" />
            </div>
          )}

          <Button
            onClick={handleTransform}
            disabled={isTransforming || !text.trim()}
            className="w-full bg-pink-600 hover:bg-pink-700"
          >
            {isTransforming ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Transforming...
              </>
            ) : (
              <>
                <VideoIcon className="mr-2 h-4 w-4" />
                Transform to Video
              </>
            )}
          </Button>
        </div>
      </div>

      <div>
        <Card className="h-full">
          <CardContent className="p-6">
            <div className="aspect-video bg-gray-100 rounded-lg flex items-center justify-center mb-4">
              {videoData ? (
                <div className="w-full h-full relative">
                  <video className="w-full h-full object-cover rounded-lg" poster={videoData.thumbnailUrl} controls>
                    <source src={videoData.videoUrl} type={`video/${videoData.format}`} />
                    Your browser does not support the video tag.
                  </video>
                </div>
              ) : (
                <div className="text-center p-6">
                  <VideoIcon className="h-12 w-12 mx-auto mb-3 text-muted-foreground" />
                  <h3 className="font-medium mb-2">Video Preview</h3>
                  <p className="text-sm text-muted-foreground">Your transformed video will appear here</p>
                </div>
              )}
            </div>

            {videoData && (
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <span className="font-medium">Duration:</span> {videoData.duration}s
                  </div>
                  <div>
                    <span className="font-medium">Format:</span> {videoData.format.toUpperCase()}
                  </div>
                  <div>
                    <span className="font-medium">Language:</span> {signLanguage.toUpperCase()}
                  </div>
                  <div>
                    <span className="font-medium">Quality:</span> {quality}
                  </div>
                </div>

                <div className="pt-4 border-t">
                  <h4 className="text-sm font-medium mb-3">Download Options</h4>
                  <div className="flex flex-wrap gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleDownload("mp4")}
                      className="flex items-center"
                    >
                      <Download className="mr-1 h-3 w-3" />
                      MP4
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleDownload("gif")}
                      className="flex items-center"
                    >
                      <Download className="mr-1 h-3 w-3" />
                      GIF
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleDownload("webm")}
                      className="flex items-center"
                    >
                      <Download className="mr-1 h-3 w-3" />
                      WebM
                    </Button>
                  </div>
                </div>

                <div className="pt-4 border-t">
                  <h4 className="text-sm font-medium mb-2">Share Video</h4>
                  <div className="flex space-x-2">
                    <Button variant="outline" size="sm">
                      Copy Link
                    </Button>
                    <Button variant="outline" size="sm">
                      Email
                    </Button>
                  </div>
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
