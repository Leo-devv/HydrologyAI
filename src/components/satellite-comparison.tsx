"use client"

import { useState } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Eye, EyeOff, ZoomIn, ZoomOut, Maximize2 } from "lucide-react"
import { format } from "date-fns"

interface SatelliteComparisonProps {
  beforeDate: Date
  afterDate: Date
  overlayOpacity: number
}

export default function SatelliteComparison({ beforeDate, afterDate, overlayOpacity }: SatelliteComparisonProps) {
  const [showOverlay, setShowOverlay] = useState(true)
  const [zoomLevel, setZoomLevel] = useState(1)
  const [activeTab, setActiveTab] = useState("slider")

  // Format dates for display
  const beforeDateStr = format(beforeDate, "MMM d, yyyy")
  const afterDateStr = format(afterDate, "MMM d, yyyy")

  const zoomIn = () => setZoomLevel(Math.min(zoomLevel + 0.1, 2))
  const zoomOut = () => setZoomLevel(Math.max(zoomLevel - 0.1, 0.5))

  return (
    <div className="space-y-4">
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="slider">Slider Comparison</TabsTrigger>
          <TabsTrigger value="sideBySide">Side by Side</TabsTrigger>
          <TabsTrigger value="overlay">Overlay View</TabsTrigger>
        </TabsList>

        <TabsContent value="slider" className="pt-4">
          <div className="relative h-[400px] w-full overflow-hidden border rounded-md bg-slate-100">
            <div className="relative h-full w-full" style={{ transform: `scale(${zoomLevel})` }}>
              {/* Before image (full width) */}
              <div
                className="absolute inset-0 bg-cover bg-center"
                style={{
                  backgroundImage: `url('https://eoimages.gsfc.nasa.gov/images/imagerecords/148000/148636/poland_oli_2018229.jpg')`,
                }}
              ></div>

              {/* After image (partial width based on slider) */}
              <div
                className="absolute inset-0 bg-cover bg-center"
                style={{
                  backgroundImage: `url('https://eoimages.gsfc.nasa.gov/images/imagerecords/148000/148636/poland_oli_2023229.jpg')`,
                  width: `${overlayOpacity * 100}%`,
                  borderRight: "3px solid white",
                }}
              ></div>

              {/* AI detection overlay */}
              {showOverlay && (
                <div
                  className="absolute inset-0 bg-cover bg-center pointer-events-none"
                  style={{
                    backgroundImage: `url('https://i.imgur.com/JZLfMap.png')`,
                    width: `${overlayOpacity * 100}%`,
                    opacity: 0.6,
                    mixBlendMode: "multiply",
                  }}
                ></div>
              )}

              {/* Date labels */}
              <div className="absolute top-4 left-4 bg-black/70 text-white px-2 py-1 rounded text-sm">
                {beforeDateStr}
              </div>
              <div className="absolute top-4 right-4 bg-black/70 text-white px-2 py-1 rounded text-sm">
                {afterDateStr}
              </div>
            </div>

            {/* Controls */}
            <div className="absolute bottom-4 right-4 flex gap-2">
              <Button size="icon" variant="secondary" onClick={() => setShowOverlay(!showOverlay)}>
                {showOverlay ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
              </Button>
              <Button size="icon" variant="secondary" onClick={zoomOut}>
                <ZoomOut className="h-4 w-4" />
              </Button>
              <Button size="icon" variant="secondary" onClick={zoomIn}>
                <ZoomIn className="h-4 w-4" />
              </Button>
              <Button size="icon" variant="secondary">
                <Maximize2 className="h-4 w-4" />
              </Button>
            </div>
          </div>
          <div className="text-center text-sm text-muted-foreground mt-2">
            Drag the slider to compare before and after imagery
          </div>
        </TabsContent>

        <TabsContent value="sideBySide" className="pt-4">
          <div className="grid grid-cols-2 gap-2 h-[400px]">
            <div className="relative h-full w-full overflow-hidden border rounded-md bg-slate-100">
              <div
                className="h-full w-full bg-cover bg-center"
                style={{
                  backgroundImage: `url('https://eoimages.gsfc.nasa.gov/images/imagerecords/148000/148636/poland_oli_2018229.jpg')`,
                  transform: `scale(${zoomLevel})`,
                }}
              ></div>
              {showOverlay && (
                <div
                  className="absolute inset-0 bg-cover bg-center pointer-events-none"
                  style={{
                    backgroundImage: `url('https://i.imgur.com/8KYaHdz.png')`,
                    opacity: 0.6,
                    mixBlendMode: "multiply",
                    transform: `scale(${zoomLevel})`,
                  }}
                ></div>
              )}
              <div className="absolute top-2 left-2 bg-black/70 text-white px-2 py-1 rounded text-sm">
                {beforeDateStr}
              </div>
            </div>

            <div className="relative h-full w-full overflow-hidden border rounded-md bg-slate-100">
              <div
                className="h-full w-full bg-cover bg-center"
                style={{
                  backgroundImage: `url('https://eoimages.gsfc.nasa.gov/images/imagerecords/148000/148636/poland_oli_2023229.jpg')`,
                  transform: `scale(${zoomLevel})`,
                }}
              ></div>
              {showOverlay && (
                <div
                  className="absolute inset-0 bg-cover bg-center pointer-events-none"
                  style={{
                    backgroundImage: `url('https://i.imgur.com/JZLfMap.png')`,
                    opacity: 0.6,
                    mixBlendMode: "multiply",
                    transform: `scale(${zoomLevel})`,
                  }}
                ></div>
              )}
              <div className="absolute top-2 left-2 bg-black/70 text-white px-2 py-1 rounded text-sm">
                {afterDateStr}
              </div>
            </div>
          </div>

          {/* Controls */}
          <div className="flex justify-end gap-2 mt-2">
            <Button size="sm" variant="outline" onClick={() => setShowOverlay(!showOverlay)}>
              {showOverlay ? <EyeOff className="h-4 w-4 mr-2" /> : <Eye className="h-4 w-4 mr-2" />}
              {showOverlay ? "Hide" : "Show"} AI Detection
            </Button>
            <Button size="icon" variant="outline" onClick={zoomOut}>
              <ZoomOut className="h-4 w-4" />
            </Button>
            <Button size="icon" variant="outline" onClick={zoomIn}>
              <ZoomIn className="h-4 w-4" />
            </Button>
          </div>
        </TabsContent>

        <TabsContent value="overlay" className="pt-4">
          <div className="relative h-[400px] w-full overflow-hidden border rounded-md bg-slate-100">
            <div className="relative h-full w-full" style={{ transform: `scale(${zoomLevel})` }}>
              {/* Base image */}
              <div
                className="absolute inset-0 bg-cover bg-center"
                style={{
                  backgroundImage: `url('https://eoimages.gsfc.nasa.gov/images/imagerecords/148000/148636/poland_oli_2023229.jpg')`,
                }}
              ></div>

              {/* AI detection overlay */}
              {showOverlay && (
                <div
                  className="absolute inset-0 bg-cover bg-center pointer-events-none"
                  style={{
                    backgroundImage: `url('https://i.imgur.com/JZLfMap.png')`,
                    opacity: overlayOpacity,
                    mixBlendMode: "multiply",
                  }}
                ></div>
              )}

              {/* Date label */}
              <div className="absolute top-4 left-4 bg-black/70 text-white px-2 py-1 rounded text-sm">
                {afterDateStr}
              </div>
            </div>

            {/* Controls */}
            <div className="absolute bottom-4 right-4 flex gap-2">
              <Button size="icon" variant="secondary" onClick={() => setShowOverlay(!showOverlay)}>
                {showOverlay ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
              </Button>
              <Button size="icon" variant="secondary" onClick={zoomOut}>
                <ZoomOut className="h-4 w-4" />
              </Button>
              <Button size="icon" variant="secondary" onClick={zoomIn}>
                <ZoomIn className="h-4 w-4" />
              </Button>
              <Button size="icon" variant="secondary">
                <Maximize2 className="h-4 w-4" />
              </Button>
            </div>
          </div>
          <div className="text-center text-sm text-muted-foreground mt-2">
            View with AI-detected water changes highlighted
          </div>
        </TabsContent>
      </Tabs>

      <div className="flex items-center justify-between text-sm">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-1">
            <div className="h-3 w-3 rounded-full bg-blue-500"></div>
            <span>Water (2023)</span>
          </div>
          <div className="flex items-center gap-1">
            <div className="h-3 w-3 rounded-full bg-red-500"></div>
            <span>Water Loss</span>
          </div>
          <div className="flex items-center gap-1">
            <div className="h-3 w-3 rounded-full bg-green-500"></div>
            <span>New Water</span>
          </div>
        </div>
        <div className="text-muted-foreground">AI Detection Confidence: 96%</div>
      </div>
    </div>
  )
} 