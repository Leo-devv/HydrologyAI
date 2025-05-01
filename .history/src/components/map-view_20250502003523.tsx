"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Layers, MapPin, ZoomIn, ZoomOut, Droplets, Mountain, Beaker } from "lucide-react"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Checkbox } from "@/components/ui/checkbox"

interface MapViewProps {
  date: Date
  compareDate: Date
}

export default function MapView({ date, compareDate }: MapViewProps) {
  const [activeLayer, setActiveLayer] = useState("satellite")
  const [mapLoaded, setMapLoaded] = useState(false)
  const [zoom, setZoom] = useState(1)
  const [layers, setLayers] = useState({
    satellite: true,
    terrain: false,
    grid: true,
  })

  const handleZoom = (direction: 'in' | 'out') => {
    setZoom(prev => {
      const newZoom = direction === 'in' ? prev + 0.2 : prev - 0.2
      return Math.min(Math.max(newZoom, 0.5), 2) // Limit zoom between 0.5 and 2
    })
  }

  const toggleLayer = (layer: keyof typeof layers) => {
    setLayers(prev => ({ ...prev, [layer]: !prev[layer] }))
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Popover>
            <PopoverTrigger asChild>
              <Button variant="outline" size="sm">
                <Layers className="mr-2 h-4 w-4" />
                Layers
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-48">
              <div className="space-y-2">
                <div className="flex items-center space-x-2">
                  <Checkbox 
                    id="satellite" 
                    checked={layers.satellite}
                    onCheckedChange={() => toggleLayer('satellite')}
                  />
                  <label htmlFor="satellite" className="text-sm font-medium">
                    Satellite View
                  </label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox 
                    id="terrain" 
                    checked={layers.terrain}
                    onCheckedChange={() => toggleLayer('terrain')}
                  />
                  <label htmlFor="terrain" className="text-sm font-medium">
                    Terrain
                  </label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox 
                    id="grid" 
                    checked={layers.grid}
                    onCheckedChange={() => toggleLayer('grid')}
                  />
                  <label htmlFor="grid" className="text-sm font-medium">
                    Grid Lines
                  </label>
                </div>
              </div>
            </PopoverContent>
          </Popover>
          
          <Tabs defaultValue="changes" className="w-[300px]">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="changes">
                <Droplets className="mr-2 h-4 w-4" />
                Changes
              </TabsTrigger>
              <TabsTrigger value="depth">
                <Mountain className="mr-2 h-4 w-4" />
                Depth
              </TabsTrigger>
              <TabsTrigger value="quality">
                <Beaker className="mr-2 h-4 w-4" />
                Quality
              </TabsTrigger>
            </TabsList>
          </Tabs>
        </div>
        <div className="flex items-center gap-2">
          <Button 
            variant="outline" 
            size="icon"
            onClick={() => handleZoom('out')}
            disabled={zoom <= 0.5}
          >
            <ZoomOut className="h-4 w-4" />
          </Button>
          <Button 
            variant="outline" 
            size="icon"
            onClick={() => handleZoom('in')}
            disabled={zoom >= 2}
          >
            <ZoomIn className="h-4 w-4" />
          </Button>
        </div>
      </div>

      <div className="relative h-[300px] w-full overflow-hidden border rounded-md bg-slate-100">
        {/* Map Background */}
        <div 
          className="absolute inset-0 bg-[#E8F4F8] transition-transform duration-200 ease-in-out"
          style={{ transform: `scale(${zoom})` }}
        >
          {/* Water bodies representation */}
          <div className="absolute inset-0">
            <div className="absolute w-1/3 h-1/4 top-1/4 left-1/4 bg-blue-500/20 rounded-full blur-md"></div>
            <div className="absolute w-1/4 h-1/3 top-1/3 right-1/4 bg-blue-500/20 rounded-full blur-md"></div>
            <div className="absolute w-1/4 h-1/4 bottom-1/4 left-1/3 bg-blue-500/20 rounded-full blur-md"></div>
          </div>
          
          {/* Grid overlay */}
          {layers.grid && (
            <div className="absolute inset-0" 
                 style={{
                   backgroundImage: 'linear-gradient(to right, #E5E7EB 1px, transparent 1px), linear-gradient(to bottom, #E5E7EB 1px, transparent 1px)',
                   backgroundSize: '20px 20px'
                 }}>
            </div>
          )}
        </div>

        {/* Map markers with updated data */}
        <div className="absolute top-1/3 left-1/4 transform -translate-x-1/2 -translate-y-1/2 transition-transform duration-200 ease-in-out hover:scale-110">
          <div className="relative group">
            <MapPin className="h-6 w-6 text-red-500 drop-shadow-md" />
            <div className="absolute top-7 left-1/2 transform -translate-x-1/2 bg-white px-2 py-1 rounded shadow-md text-xs whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity">
              -6.4% since 2020
            </div>
          </div>
        </div>

        <div className="absolute top-1/2 left-2/3 transform -translate-x-1/2 -translate-y-1/2 transition-transform duration-200 ease-in-out hover:scale-110">
          <div className="relative group">
            <MapPin className="h-6 w-6 text-amber-500 drop-shadow-md" />
            <div className="absolute top-7 left-1/2 transform -translate-x-1/2 bg-white px-2 py-1 rounded shadow-md text-xs whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity">
              -3.8% since 2020
            </div>
          </div>
        </div>

        <div className="absolute bottom-1/3 right-1/3 transform -translate-x-1/2 -translate-y-1/2 transition-transform duration-200 ease-in-out hover:scale-110">
          <div className="relative group">
            <MapPin className="h-6 w-6 text-red-500 drop-shadow-md" />
            <div className="absolute top-7 left-1/2 transform -translate-x-1/2 bg-white px-2 py-1 rounded shadow-md text-xs whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity">
              -5.1% since 2020
            </div>
          </div>
        </div>

        {/* Legend */}
        <div className="absolute bottom-4 left-4 bg-white p-2 rounded shadow-md">
          <div className="text-xs font-medium mb-1">Water Coverage Change</div>
          <div className="flex flex-col gap-1">
            <div className="flex items-center gap-1">
              <div className="h-3 w-3 rounded-full bg-red-500"></div>
              <span className="text-xs">Major Decline (&gt;5%)</span>
            </div>
            <div className="flex items-center gap-1">
              <div className="h-3 w-3 rounded-full bg-amber-500"></div>
              <span className="text-xs">Moderate Decline (2-5%)</span>
            </div>
            <div className="flex items-center gap-1">
              <div className="h-3 w-3 rounded-full bg-green-500"></div>
              <span className="text-xs">Stable/Improved</span>
            </div>
          </div>
        </div>
      </div>

      <div className="text-center text-sm text-muted-foreground">
        Interactive map showing detected water changes across the Masuria Lake District (2020-2025)
      </div>
    </div>
  )
} 