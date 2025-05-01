"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Droplets, ArrowUpDown, Waves, Gauge, ChevronUp, ChevronDown } from "lucide-react"
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
  const minLevel = 7200    // Minimum scale
  const percentageFull = ((currentLevel - minLevel) / (maxLevel - minLevel)) * 100
  
  // Year data for comparison
  const yearData = [
    { year: 2020, level: 7800, change: "Baseline" },
    { year: 2021, level: 7700, change: "-1.3%" },
    { year: 2022, level: 7600, change: "-2.6%" },
    { year: 2023, level: 7500, change: "-3.8%" },
    { year: 2024, level: 7400, change: "-5.1%" },
    { year: 2025, level: 7300, change: "-6.4%" },
  ]

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

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* 3D Water Tank */}
        <div className="relative h-[300px] w-full overflow-hidden rounded-lg bg-gradient-to-br from-blue-50 via-white to-blue-50 border perspective">
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="relative w-48 h-64 transform-style-3d rotate-y-[-20deg] rotate-x-[10deg]">
              {/* Tank Container */}
              <div className="absolute inset-0 bg-blue-900/10 border-2 border-blue-200 rounded-lg transform-3d">
                {/* Front Face */}
                <div className="absolute inset-0 border-2 border-blue-200 rounded-lg bg-blue-900/5 backdrop-blur-sm">
                  {/* Water Fill Animation */}
                  <div 
                    className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-blue-500/30 to-blue-300/30 backdrop-blur-sm transition-all duration-1000 ease-in-out"
                    style={{ height: `${percentageFull}%` }}
                  >
                    <div className="absolute inset-0 animate-wave1 opacity-50"
                         style={{
                           backgroundImage: 'linear-gradient(to right, transparent 0%, rgba(255,255,255,0.4) 50%, transparent 100%)',
                           backgroundSize: '200% 100%'
                         }}
                    />
                  </div>
                  
                  {/* Level Marker */}
                  <div className="absolute left-0 right-0 h-0.5 bg-blue-600 transition-all duration-1000"
                       style={{ bottom: `${percentageFull}%` }}>
                    <div className="absolute right-0 transform translate-x-2 -translate-y-2 text-xs font-medium text-blue-600">
                      {currentLevel} km²
                    </div>
                  </div>
                </div>
                
                {/* Side Face */}
                <div className="absolute top-0 bottom-0 right-0 w-8 bg-blue-900/5 transform-3d rotate-y-[90deg] origin-right"></div>
                
                {/* Scale Lines */}
                <div className="absolute inset-y-4 left-2 flex flex-col justify-between">
                  {[7800, 7600, 7400, 7200].map((level) => (
                    <div key={level} className="flex items-center gap-1">
                      <div className="w-2 h-0.5 bg-blue-300"></div>
                      <span className="text-[10px] text-blue-600">{level}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Year Comparison */}
        <div className="relative h-[300px] w-full overflow-hidden rounded-lg bg-white border p-4">
          <div className="text-sm font-medium text-gray-600 mb-3">Historical Comparison</div>
          <div className="space-y-3">
            {yearData.map((data) => (
              <div key={data.year} className="flex items-center gap-4">
                <div className="w-12 text-sm font-medium">{data.year}</div>
                <div className="flex-1 h-8 bg-blue-50 rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-blue-500 rounded-full transition-all duration-500"
                    style={{ 
                      width: `${((data.level - minLevel) / (maxLevel - minLevel)) * 100}%`,
                      opacity: data.year === 2024 ? 1 : 0.6 
                    }}
                  />
                </div>
                <div className="w-16 text-sm text-right">
                  {data.change === "Baseline" ? (
                    <span className="text-blue-600">{data.change}</span>
                  ) : (
                    <span className="text-red-500">{data.change}</span>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Status Bar */}
      <div className="flex items-center justify-between px-4 py-2 bg-white rounded-lg shadow-sm">
        <div className="flex items-center gap-2">
          <Droplets className="h-5 w-5 text-blue-500" />
          <span className="text-sm font-medium">Current Status:</span>
          <div className="flex items-center gap-1">
            <ChevronDown className="h-4 w-4 text-red-500" />
            <span className="text-sm text-red-500">Declining</span>
          </div>
        </div>
        <div className="text-sm text-gray-500">
          Projected 2025: 7,300 km²
        </div>
      </div>
    </div>
  )
} 