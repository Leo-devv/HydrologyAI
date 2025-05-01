"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Droplets, ArrowUpDown, Waves, Gauge } from "lucide-react"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"

interface WaterLevelProps {
  date: Date
  compareDate: Date
}

export default function WaterLevelView({ date, compareDate }: WaterLevelProps) {
  const [activeView, setActiveView] = useState("levels")
  
  // Water level data
  const currentLevel = 7400 // 2024 level
  const maxLevel = 7800    // 2020 level
  const percentageFull = (currentLevel / maxLevel) * 100
  
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Tabs defaultValue="levels" className="w-[300px]" onValueChange={setActiveView}>
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="levels">
                <Waves className="mr-2 h-4 w-4" />
                Levels
              </TabsTrigger>
              <TabsTrigger value="trends">
                <ArrowUpDown className="mr-2 h-4 w-4" />
                Trends
              </TabsTrigger>
              <TabsTrigger value="quality">
                <Gauge className="mr-2 h-4 w-4" />
                Quality
              </TabsTrigger>
            </TabsList>
          </Tabs>
        </div>
      </div>

      <div className="relative h-[300px] w-full overflow-hidden rounded-lg bg-gradient-to-b from-blue-50 to-blue-100 border">
        {/* Water Level Visualization */}
        <div className="absolute bottom-0 left-0 right-0 bg-blue-500/20" style={{ height: `${percentageFull}%` }}>
          {/* Animated Waves */}
          <div className="absolute inset-0 opacity-50">
            <div className="absolute inset-0 animate-wave1" 
                 style={{
                   backgroundImage: 'linear-gradient(to right, transparent 0%, rgba(255,255,255,0.3) 50%, transparent 100%)',
                   backgroundSize: '200% 100%',
                 }}
            />
            <div className="absolute inset-0 animate-wave2"
                 style={{
                   backgroundImage: 'linear-gradient(to right, transparent 0%, rgba(255,255,255,0.2) 50%, transparent 100%)',
                   backgroundSize: '200% 100%',
                   animationDelay: '-2s'
                 }}
            />
          </div>
        </div>

        {/* Level Indicators */}
        <div className="absolute inset-y-0 right-4 w-12 bg-white/50 backdrop-blur-sm rounded-t-lg">
          <div className="h-full flex flex-col justify-between p-2">
            <div className="text-xs text-blue-800">7800 km²</div>
            <div className="text-xs text-blue-800">7600 km²</div>
            <div className="text-xs text-blue-800">7400 km²</div>
            <div className="text-xs text-blue-800">7200 km²</div>
          </div>
        </div>

        {/* Current Level Marker */}
        <div className="absolute left-4 right-16 transition-all duration-500"
             style={{ bottom: `${percentageFull}%` }}>
          <div className="relative flex items-center">
            <div className="h-0.5 w-full bg-blue-600"></div>
            <div className="absolute right-0 transform translate-x-4 bg-blue-600 text-white px-2 py-1 rounded text-sm">
              {currentLevel} km²
            </div>
          </div>
        </div>

        {/* Data Cards */}
        <div className="absolute top-4 left-4 space-y-2">
          <div className="bg-white/90 backdrop-blur-sm p-3 rounded-lg shadow-sm">
            <div className="text-sm font-medium text-gray-600">Current Coverage</div>
            <div className="text-2xl font-bold text-blue-600">{currentLevel} km²</div>
            <div className="text-xs text-red-500">-5.1% since 2020</div>
          </div>
          
          <div className="bg-white/90 backdrop-blur-sm p-3 rounded-lg shadow-sm">
            <div className="text-sm font-medium text-gray-600">Annual Change</div>
            <div className="text-2xl font-bold text-blue-600">-100 km²</div>
            <div className="text-xs text-gray-500">Average per year</div>
          </div>
        </div>
      </div>

      {/* Status Bar */}
      <div className="flex items-center justify-between px-4 py-2 bg-white rounded-lg shadow-sm">
        <div className="flex items-center gap-2">
          <Droplets className="h-5 w-5 text-blue-500" />
          <span className="text-sm font-medium">Water Coverage Status:</span>
          <span className="text-sm text-amber-600">Moderate Decline</span>
        </div>
        <div className="text-sm text-gray-500">
          Last updated: {date.toLocaleDateString()}
        </div>
      </div>
    </div>
  )
} 