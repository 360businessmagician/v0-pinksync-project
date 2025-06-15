import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export function AccessibilityTransformer() {
  return (
    <Card>
      <CardHeader className="bg-pink-50">
        <CardTitle className="text-center text-pink-600">How PinkySync Transforms Accessibility</CardTitle>
      </CardHeader>
      <CardContent className="p-6">
        <Tabs defaultValue="before-after">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="before-after">Before & After</TabsTrigger>
            <TabsTrigger value="features">Key Features</TabsTrigger>
            <TabsTrigger value="platforms">Platforms</TabsTrigger>
          </TabsList>

          <TabsContent value="before-after" className="pt-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div className="bg-gray-100 p-4 rounded-lg">
                  <h3 className="font-medium text-gray-900 mb-2">Without PinkySync</h3>
                  <ul className="space-y-2 text-sm">
                    <li className="flex items-start">
                      <svg
                        className="h-5 w-5 text-red-500 mr-2 mt-0.5"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                      </svg>
                      <span>Multiple accessibility tools needed</span>
                    </li>
                    <li className="flex items-start">
                      <svg
                        className="h-5 w-5 text-red-500 mr-2 mt-0.5"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                      </svg>
                      <span>Complex text remains difficult to understand</span>
                    </li>
                    <li className="flex items-start">
                      <svg
                        className="h-5 w-5 text-red-500 mr-2 mt-0.5"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                      </svg>
                      <span>Inconsistent experience across platforms</span>
                    </li>
                    <li className="flex items-start">
                      <svg
                        className="h-5 w-5 text-red-500 mr-2 mt-0.5"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                      </svg>
                      <span>No offline accessibility support</span>
                    </li>
                  </ul>
                </div>

                <div className="bg-gray-200 p-4 rounded-lg">
                  <div className="h-24 flex items-center justify-center">
                    <svg className="h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <div className="bg-pink-100 p-4 rounded-lg">
                  <h3 className="font-medium text-pink-900 mb-2">With PinkySync</h3>
                  <ul className="space-y-2 text-sm">
                    <li className="flex items-start">
                      <svg
                        className="h-5 w-5 text-green-500 mr-2 mt-0.5"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      <span>One unified accessibility layer</span>
                    </li>
                    <li className="flex items-start">
                      <svg
                        className="h-5 w-5 text-green-500 mr-2 mt-0.5"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      <span>Complex text converted to sign language videos</span>
                    </li>
                    <li className="flex items-start">
                      <svg
                        className="h-5 w-5 text-green-500 mr-2 mt-0.5"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      <span>Consistent experience everywhere</span>
                    </li>
                    <li className="flex items-start">
                      <svg
                        className="h-5 w-5 text-green-500 mr-2 mt-0.5"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      <span>Works offline and in-person</span>
                    </li>
                  </ul>
                </div>

                <div className="bg-pink-200 p-4 rounded-lg">
                  <div className="h-24 flex items-center justify-center">
                    <div className="relative">
                      <svg className="h-12 w-12 text-pink-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z"
                        />
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                        />
                      </svg>
                      <div className="absolute -top-1 -right-1 h-4 w-4 bg-pink-600 rounded-full animate-ping"></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="features" className="pt-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-pink-50 p-4 rounded-lg text-center">
                <div className="h-12 w-12 bg-pink-100 rounded-full flex items-center justify-center mx-auto mb-3">
                  <svg className="h-6 w-6 text-pink-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z"
                    />
                  </svg>
                </div>
                <h3 className="font-medium">Text Simplification</h3>
                <p className="text-sm text-gray-600 mt-2">Transforms complex text into easy-to-understand formats</p>
              </div>

              <div className="bg-pink-50 p-4 rounded-lg text-center">
                <div className="h-12 w-12 bg-pink-100 rounded-full flex items-center justify-center mx-auto mb-3">
                  <svg className="h-6 w-6 text-pink-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z"
                    />
                  </svg>
                </div>
                <h3 className="font-medium">Video Transformation</h3>
                <p className="text-sm text-gray-600 mt-2">Converts content into sign language videos</p>
              </div>

              <div className="bg-pink-50 p-4 rounded-lg text-center">
                <div className="h-12 w-12 bg-pink-100 rounded-full flex items-center justify-center mx-auto mb-3">
                  <svg className="h-6 w-6 text-pink-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z"
                    />
                  </svg>
                </div>
                <h3 className="font-medium">Cross-Platform</h3>
                <p className="text-sm text-gray-600 mt-2">Works consistently across all digital environments</p>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="platforms" className="pt-6">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="border rounded-lg p-3 text-center">
                <svg
                  className="h-8 w-8 mx-auto mb-2 text-pink-500"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9"
                  />
                </svg>
                <h3 className="text-sm font-medium">Web</h3>
              </div>

              <div className="border rounded-lg p-3 text-center">
                <svg
                  className="h-8 w-8 mx-auto mb-2 text-pink-500"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z"
                  />
                </svg>
                <h3 className="text-sm font-medium">Mobile</h3>
              </div>

              <div className="border rounded-lg p-3 text-center">
                <svg
                  className="h-8 w-8 mx-auto mb-2 text-pink-500"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                  />
                </svg>
                <h3 className="text-sm font-medium">Desktop</h3>
              </div>

              <div className="border rounded-lg p-3 text-center">
                <svg
                  className="h-8 w-8 mx-auto mb-2 text-pink-500"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                  />
                </svg>
                <h3 className="text-sm font-medium">In-Person</h3>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  )
}
