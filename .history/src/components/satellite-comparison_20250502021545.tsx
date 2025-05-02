"use client"

import { useState } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Eye, EyeOff, ZoomIn, ZoomOut, Maximize2 } from "lucide-react"
import { format } from "date-fns"

interface SatelliteComparisonProps {
  overlayOpacity: number
  beforeImage: string
  afterImage: string
}

export default function SatelliteComparison({ 
  overlayOpacity,
  beforeImage,
  afterImage
}: SatelliteComparisonProps) {
  const [showOverlay, setShowOverlay] = useState(true)
  const [zoomLevel, setZoomLevel] = useState(1)
  const [activeTab, setActiveTab] = useState("slider")

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

        <TabsContent value="slider">
          <div className="relative h-[400px] w-full overflow-hidden border rounded-md bg-slate-100">
            <div className="relative h-full w-full" style={{ transform: `scale(${zoomLevel})`, transformOrigin: 'center' }}>
              {/* Before image (full width) */}
              <div
                className="absolute inset-0 bg-center"
                style={{
                  backgroundImage: `url(${beforeImage})`,
                  backgroundSize: 'cover',
                  backgroundPosition: 'center',
                  backgroundColor: '#f1f5f9'
                }}
              />

              {/* After image (partial width based on slider) */}
              <div
                className="absolute inset-0 bg-center"
                style={{
                  backgroundImage: `url(${afterImage})`,
                  backgroundSize: 'cover',
                  backgroundPosition: 'center',
                  backgroundColor: '#f1f5f9',
                  width: `${overlayOpacity * 100}%`,
                  borderRight: "3px solid white",
                }}
              />

              {/* Date labels */}
              <div className="absolute top-4 left-4 bg-black/70 text-white px-2 py-1 rounded text-sm">
                Early 2000s
              </div>
              <div className="absolute top-4 right-4 bg-black/70 text-white px-2 py-1 rounded text-sm">
                Projected 2030
              </div>
            </div>

            {/* Controls */}
            <div className="absolute bottom-4 right-4 flex gap-2">
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

        <TabsContent value="sideBySide">
          <div className="grid grid-cols-2 gap-2 h-[400px]">
            <div className="relative h-full w-full overflow-hidden border rounded-md bg-slate-100">
              <div
                className="absolute inset-0 bg-center"
                style={{
                  backgroundImage: `url(${beforeImage})`,
                  backgroundSize: 'cover',
                  backgroundPosition: 'center',
                  backgroundColor: '#f1f5f9',
                  transform: `scale(${zoomLevel})`,
                  transformOrigin: 'center'
                }}
              />
              <div className="absolute top-2 left-2 bg-black/70 text-white px-2 py-1 rounded text-sm">
                Early 2000s
              </div>
            </div>

            <div className="relative h-full w-full overflow-hidden border rounded-md bg-slate-100">
              <div
                className="absolute inset-0 bg-center"
                style={{
                  backgroundImage: `url(${afterImage})`,
                  backgroundSize: 'cover',
                  backgroundPosition: 'center',
                  backgroundColor: '#f1f5f9',
                  transform: `scale(${zoomLevel})`,
                  transformOrigin: 'center'
                }}
              />
              <div className="absolute top-2 left-2 bg-black/70 text-white px-2 py-1 rounded text-sm">
                Projected 2030
              </div>
            </div>
          </div>

          {/* Controls */}
          <div className="flex justify-end gap-2 mt-2">
            <Button size="icon" variant="outline" onClick={zoomOut}>
              <ZoomOut className="h-4 w-4" />
            </Button>
            <Button size="icon" variant="outline" onClick={zoomIn}>
              <ZoomIn className="h-4 w-4" />
            </Button>
          </div>
        </TabsContent>

        <TabsContent value="overlay">
          <div className="relative h-[400px] w-full overflow-hidden border rounded-md bg-slate-100">
            <div className="relative h-full w-full" style={{ transform: `scale(${zoomLevel})`, transformOrigin: 'center' }}>
              {/* Base image */}
              <div
                className="absolute inset-0 bg-center"
                style={{
                  backgroundImage: `url(${beforeImage})`,
                  backgroundSize: 'cover',
                  backgroundPosition: 'center',
                  backgroundColor: '#f1f5f9'
                }}
              />

              {/* Overlay image */}
              <div
                className="absolute inset-0 bg-center"
                style={{
                  backgroundImage: `url(${afterImage})`,
                  backgroundSize: 'cover',
                  backgroundPosition: 'center',
                  backgroundColor: '#f1f5f9',
                  opacity: overlayOpacity,
                }}
              />

              {/* Date label */}
              <div className="absolute top-4 left-4 bg-black/70 text-white px-2 py-1 rounded text-sm">
                Early 2000s → Projected 2030
              </div>
            </div>

            {/* Controls */}
            <div className="absolute bottom-4 right-4 flex gap-2">
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
            View with opacity-based comparison
          </div>
        </TabsContent>
      </Tabs>

      <div className="flex items-center justify-between text-sm">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-1">
            <div className="h-3 w-3 rounded-full bg-blue-500"></div>
            <span>Current Water</span>
          </div>
          <div className="flex items-center gap-1">
            <div className="h-3 w-3 rounded-full bg-red-500"></div>
            <span>Projected Loss</span>
          </div>
        </div>
        <div className="text-muted-foreground">AI Prediction Confidence: 96%</div>
      </div>
    </div>
  )
} 