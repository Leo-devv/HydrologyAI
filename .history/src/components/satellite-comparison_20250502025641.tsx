"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { ZoomIn, ZoomOut } from "lucide-react"

interface SatelliteComparisonProps {
  beforeImage: string
  afterImage: string
}

export default function SatelliteComparison({ 
  beforeImage,
  afterImage
}: SatelliteComparisonProps) {
  const [zoomLevel, setZoomLevel] = useState(1)

  const zoomIn = () => setZoomLevel(Math.min(zoomLevel + 0.1, 2))
  const zoomOut = () => setZoomLevel(Math.max(zoomLevel - 0.1, 0.5))

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-2 gap-6 h-[450px]">
        {/* 2000 Baseline Image */}
        <div className="relative h-full w-full">
          <div className="relative h-full w-full overflow-hidden border rounded-md bg-slate-100">
            <img
              src={beforeImage}
              alt="Masuria in 2000"
              className="absolute inset-0 w-full h-full object-contain"
              style={{ transform: `scale(${zoomLevel})`, transformOrigin: 'center' }}
            />
            <div className="absolute top-2 left-2 bg-black/70 text-white px-3 py-1.5 rounded-md text-sm font-medium">
              2000 (Historical Baseline)
            </div>
          </div>
          <div className="absolute bottom-4 left-4 right-4 bg-black/70 backdrop-blur-sm rounded-lg p-4 text-sm text-white">
            <ul className="space-y-2 list-disc pl-4">
              <li>Lush Vegetation: Dense, continuous green forests</li>
              <li>High Water Levels: Full, expansive lakes</li>
              <li>Stable Climate Indicators: No major stress signs</li>
              <li>Minimal Land Fragmentation</li>
            </ul>
          </div>
        </div>

        {/* 2030 Prediction Image */}
        <div className="relative h-full w-full">
          <div className="relative h-full w-full overflow-hidden border rounded-md bg-slate-100">
            <img
              src={afterImage}
              alt="Masuria in 2030"
              className="absolute inset-0 w-full h-full object-contain"
              style={{ transform: `scale(${zoomLevel})`, transformOrigin: 'center' }}
            />
            <div className="absolute top-2 left-2 bg-purple-900/70 text-white px-3 py-1.5 rounded-md text-sm font-medium">
              2030 (AI Prediction)
            </div>
          </div>
          <div className="absolute bottom-4 left-4 right-4 bg-purple-900/70 backdrop-blur-sm rounded-lg p-4 text-sm text-white">
            <ul className="space-y-2 list-disc pl-4">
              <li>Reduced Vegetation: Shift to yellow-brown tones</li>
              <li>Shrunken Water Bodies: Contracted lake outlines</li>
              <li>Hydrological Stress: Fragmented water networks</li>
              <li>Increased Land Use Pressure</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Zoom Controls */}
      <div className="flex justify-end gap-2">
        <Button size="sm" variant="outline" onClick={zoomOut}>
          <ZoomOut className="h-4 w-4 mr-2" />
          Zoom Out
        </Button>
        <Button size="sm" variant="outline" onClick={zoomIn}>
          <ZoomIn className="h-4 w-4 mr-2" />
          Zoom In
        </Button>
      </div>

      <div className="text-sm text-center text-muted-foreground">
        AI Model trained on historical satellite data to predict environmental changes
      </div>
    </div>
  )
} 