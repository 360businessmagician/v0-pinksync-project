import { Card, CardContent } from "@/components/ui/card"

export function LayerExplanation() {
  return (
    <Card className="overflow-hidden border-0 shadow-lg">
      <CardContent className="p-0">
        <div className="relative">
          {/* Digital Content Layer */}
          <div className="bg-gray-100 p-6 border-b">
            <h3 className="text-lg font-medium mb-2">Digital Content</h3>
            <div className="grid grid-cols-4 gap-2">
              <div className="h-8 bg-gray-300 rounded animate-pulse"></div>
              <div className="h-8 bg-gray-300 rounded animate-pulse"></div>
              <div className="h-8 bg-gray-300 rounded animate-pulse"></div>
              <div className="h-8 bg-gray-300 rounded animate-pulse"></div>
              <div className="h-8 col-span-3 bg-gray-300 rounded animate-pulse"></div>
              <div className="h-8 bg-gray-300 rounded animate-pulse"></div>
            </div>
          </div>

          {/* PinkySync Layer */}
          <div className="bg-pink-600 p-4 text-white text-center relative">
            <div className="absolute left-1/2 -top-3 transform -translate-x-1/2">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" className="text-pink-600">
                <path d="M12 2L2 12L12 22L22 12L12 2Z" fill="currentColor" />
              </svg>
            </div>
            <h2 className="text-xl font-bold">PinkSync Layer</h2>
            <p className="text-pink-100 text-sm">One unified accessibility transformer</p>

            <div className="grid grid-cols-3 gap-4 mt-4">
              <div className="bg-pink-500 p-2 rounded text-xs">Text Simplification</div>
              <div className="bg-pink-500 p-2 rounded text-xs">Video Transformation</div>
              <div className="bg-pink-500 p-2 rounded text-xs">Sign Language API</div>
            </div>
          </div>

          {/* User Experience Layer */}
          <div className="bg-purple-100 p-6">
            <h3 className="text-lg font-medium mb-2">Deaf User Experience</h3>
            <div className="grid grid-cols-2 gap-4">
              <div className="aspect-video bg-white rounded-lg shadow-sm flex items-center justify-center">
                <svg className="h-8 w-8 text-pink-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z"
                  />
                </svg>
              </div>
              <div className="aspect-video bg-white rounded-lg shadow-sm flex items-center justify-center">
                <svg className="h-8 w-8 text-pink-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z"
                  />
                </svg>
              </div>
            </div>
          </div>

          {/* Arrows */}
          <div className="absolute left-4 top-[30%] h-[40%] border-l-2 border-dashed border-gray-400 flex flex-col items-center justify-center">
            <svg className="h-6 w-6 text-gray-400 -ml-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
            </svg>
          </div>

          <div className="absolute right-4 top-[30%] h-[40%] border-l-2 border-dashed border-gray-400 flex flex-col items-center justify-center">
            <svg className="h-6 w-6 text-gray-400 -ml-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" />
            </svg>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
