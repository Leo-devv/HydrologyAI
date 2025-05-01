"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Layers, MapPin, ZoomIn, ZoomOut } from "lucide-react"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"

interface MapViewProps {
  date: Date
  compareDate: Date
}

export default function MapView({ date, compareDate }: MapViewProps) {
  const [activeLayer, setActiveLayer] = useState("satellite")

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm">
            <Layers className="mr-2 h-4 w-4" />
            Layers
          </Button>
          <Tabs defaultValue="changes" className="w-[300px]">
            <TabsList>
              <TabsTrigger value="changes">Water Changes</TabsTrigger>
              <TabsTrigger value="depth">Depth Analysis</TabsTrigger>
              <TabsTrigger value="quality">Water Quality</TabsTrigger>
            </TabsList>
          </Tabs>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="icon">
            <ZoomOut className="h-4 w-4" />
          </Button>
          <Button variant="outline" size="icon">
            <ZoomIn className="h-4 w-4" />
          </Button>
        </div>
      </div>

      <div className="relative h-[300px] w-full overflow-hidden border rounded-md bg-slate-100">
        {/* Map of Masuria */}
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: `url('https://upload.wikimedia.org/wikipedia/commons/thumb/e/e9/Masuria_map.png/800px-Masuria_map.png')`,
          }}
        ></div>

        {/* Map markers */}
        <div className="absolute top-1/3 left-1/4 transform -translate-x-1/2 -translate-y-1/2">
          <div className="relative">
            <MapPin className="h-6 w-6 text-red-500" />
            <div className="absolute top-7 left-1/2 transform -translate-x-1/2 bg-white px-2 py-1 rounded shadow-md text-xs whitespace-nowrap">
              -12.3% change
            </div>
          </div>
        </div>

        <div className="absolute top-1/2 left-2/3 transform -translate-x-1/2 -translate-y-1/2">
          <div className="relative">
            <MapPin className="h-6 w-6 text-amber-500" />
            <div className="absolute top-7 left-1/2 transform -translate-x-1/2 bg-white px-2 py-1 rounded shadow-md text-xs whitespace-nowrap">
              -7.8% change
            </div>
          </div>
        </div>

        <div className="absolute bottom-1/3 right-1/3 transform -translate-x-1/2 -translate-y-1/2">
          <div className="relative">
            <MapPin className="h-6 w-6 text-green-500" />
            <div className="absolute top-7 left-1/2 transform -translate-x-1/2 bg-white px-2 py-1 rounded shadow-md text-xs whitespace-nowrap">
              +2.5% change
            </div>
          </div>
        </div>

        {/* Legend */}
        <div className="absolute bottom-4 left-4 bg-white p-2 rounded shadow-md">
          <div className="text-xs font-medium mb-1">Water Change</div>
          <div className="flex flex-col gap-1">
            <div className="flex items-center gap-1">
              <div className="h-3 w-3 rounded-full bg-red-500"></div>
              <span className="text-xs">Significant Loss</span>
            </div>
            <div className="flex items-center gap-1">
              <div className="h-3 w-3 rounded-full bg-amber-500"></div>
              <span className="text-xs">Moderate Loss</span>
            </div>
            <div className="flex items-center gap-1">
              <div className="h-3 w-3 rounded-full bg-green-500"></div>
              <span className="text-xs">Gain</span>
            </div>
          </div>
        </div>
      </div>

      <div className="text-center text-sm text-muted-foreground">
        Interactive map showing detected water changes across the Masuria Lake District
      </div>
    </div>
  )
} 