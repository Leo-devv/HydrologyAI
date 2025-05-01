"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Droplets, ArrowUpDown, Waves, Gauge, ChevronUp, ChevronDown, AlertTriangle, CheckCircle2, Brain, Satellite, SplitSquareHorizontal, Layers } from "lucide-react"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"
import { Slider } from "@/components/ui/slider"

interface WaterAnalyticsProps {}

export default function WaterAnalyticsView({}: WaterAnalyticsProps) {
  const [activeView, setActiveView] = useState("levels")
  const [comparisonMode, setComparisonMode] = useState<'slider' | 'sideBySide' | 'overlay'>('slider')
  const [overlayOpacity, setOverlayOpacity] = useState(50)
  
  // Water level data
  const currentLevel = 7300 // 2025 level
  const maxLevel = 7400    // Adjusted max level
  const minLevel = 7000    // Minimum scale for predictions
  const percentageFull = ((currentLevel - minLevel) / (maxLevel - minLevel)) * 100
  
  // Current and AI predicted data
  const yearData = [
    { year: 2025, level: 7300, change: "Current", type: "current" },
    { year: 2026, level: 7200, change: "-1.4%", type: "prediction" },
    { year: 2027, level: 7100, change: "-2.7%", type: "prediction" },
    { year: 2028, level: 7050, change: "-3.4%", type: "prediction" },
  ]

  // Satellite analysis data
  const satelliteAnalysis = {
    location: "Masuria Lake District",
    dates: {
      before: "August 15th, 2018",
      after: "August 15th, 2023"
    },
    keyFindings: [
      { title: "Shoreline Changes", detail: "2.1km reduction in shoreline perimeter", status: "warning" },
      { title: "Vegetation Cover", detail: "15% decrease in aquatic vegetation", status: "alert" },
      { title: "Water Clarity", detail: "Improved visibility in central zones", status: "good" }
    ]
  }

  // Reduced to three key seasons for better visibility
  const seasonalTrends = [
    { season: "Spring", change: "+2.3%", status: "increase" },
    { season: "Summer", change: "-1.8%", status: "decrease" },
    { season: "Winter", change: "-2.4%", status: "decrease" },
  ]

  // Focused on three most important metrics
  const qualityMetrics = [
    { name: "Oxygen Levels", value: 92, status: "good", trend: "improving" },
    { name: "pH Balance", value: 72, status: "warning", trend: "declining" },
    { name: "Temperature", value: 88, status: "good", trend: "stable" },
  ]

  const renderSatelliteComparison = () => {
    if (comparisonMode === 'slider') {
      return (
        <div className="relative h-full w-full overflow-hidden rounded-lg">
          {/* Before Image (Base) */}
          <div className="absolute inset-0 bg-gradient-to-br from-blue-600 to-blue-900">
            <div className="absolute inset-0 bg-white/10 mix-blend-overlay" />
          </div>
          
          {/* After Image (Overlay) */}
          <div 
            className="absolute inset-0 bg-gradient-to-br from-blue-400 to-blue-700"
            style={{ 
              clipPath: `inset(0 ${100 - overlayOpacity}% 0 0)`,
              transition: 'clip-path 0.3s ease-out'
            }}
          >
            <div className="absolute inset-0 bg-white/20 mix-blend-overlay" />
          </div>

          {/* Slider Line */}
          <div 
            className="absolute inset-y-0 w-1 bg-white shadow-lg cursor-ew-resize"
            style={{ left: `${overlayOpacity}%` }}
          >
            <div className="absolute top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2 w-8 h-8 bg-white rounded-full shadow-lg flex items-center justify-center">
              <ChevronDown className="h-4 w-4 text-blue-600 rotate-[-90deg]" />
            </div>
          </div>

          {/* Date Labels */}
          <div className="absolute bottom-0 left-0 right-0 p-6 flex justify-between text-white text-sm font-medium">
            <span>{satelliteAnalysis.dates.before}</span>
            <span>{satelliteAnalysis.dates.after}</span>
          </div>
        </div>
      )
    }

    if (comparisonMode === 'sideBySide') {
      return (
        <div className="grid grid-cols-2 h-full gap-2">
          <div className="relative rounded-lg overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-blue-600 to-blue-900">
              <div className="absolute inset-0 bg-white/10 mix-blend-overlay" />
            </div>
            <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/60 to-transparent">
              <span className="text-white text-sm">{satelliteAnalysis.dates.before}</span>
            </div>
          </div>
          <div className="relative rounded-lg overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-blue-400 to-blue-700">
              <div className="absolute inset-0 bg-white/20 mix-blend-overlay" />
            </div>
            <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/60 to-transparent">
              <span className="text-white text-sm">{satelliteAnalysis.dates.after}</span>
            </div>
          </div>
        </div>
      )
    }

    return (
      <div className="relative h-full w-full overflow-hidden rounded-lg">
        {/* Base Image */}
        <div className="absolute inset-0 bg-gradient-to-br from-blue-600 to-blue-900">
          <div className="absolute inset-0 bg-white/10 mix-blend-overlay" />
        </div>
        
        {/* Overlay Image */}
        <div 
          className="absolute inset-0 bg-gradient-to-br from-blue-400 to-blue-700"
          style={{ opacity: overlayOpacity / 100 }}
        >
          <div className="absolute inset-0 bg-white/20 mix-blend-overlay" />
        </div>

        {/* Date Labels */}
        <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black/60 to-transparent">
          <div className="flex justify-between items-center">
            <span className="text-white text-sm">{satelliteAnalysis.dates.before}</span>
            <span className="text-white text-sm">Opacity: {overlayOpacity}%</span>
            <span className="text-white text-sm">{satelliteAnalysis.dates.after}</span>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2 w-full">
          <Tabs defaultValue="levels" className="w-full" onValueChange={setActiveView}>
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="levels">
                <Waves className="mr-2 h-4 w-4" />
                Levels
              </TabsTrigger>
              <TabsTrigger value="satellite">
                <Satellite className="mr-2 h-4 w-4" />
                Satellite
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

            <TabsContent value="levels" className="mt-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="relative h-[400px] w-full overflow-hidden rounded-lg bg-gradient-to-br from-blue-50 via-white to-blue-50 border perspective">
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
                          {[7400, 7300, 7200, 7100, 7000].map((level) => (
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
                <div className="relative h-[400px] w-full overflow-hidden rounded-lg bg-white border p-6">
                  <div className="text-base font-medium text-gray-600 mb-8">Water Level Timeline</div>
                  <div className="space-y-8">
                    {yearData.map((data) => (
                      <div key={data.year} className="flex items-center gap-6">
                        <div className="w-16 text-base font-medium">{data.year}</div>
                        <div className="flex-1 h-10 bg-blue-50 rounded-full overflow-hidden">
                          <div 
                            className={`h-full rounded-full transition-all duration-500 ${
                              data.type === 'prediction' ? 'bg-purple-500' : 'bg-blue-500'
                            }`}
                            style={{ 
                              width: `${((data.level - minLevel) / (maxLevel - minLevel)) * 100}%`,
                              opacity: data.year === 2025 ? 1 : 0.6 
                            }}
                          />
                        </div>
                        <div className="w-24 flex items-center gap-2">
                          {data.type === 'prediction' && <Brain className="h-4 w-4 text-purple-500" />}
                          <span className={`text-base ${
                            data.type === 'current' ? "text-blue-600" :
                            data.type === 'prediction' ? "text-purple-600" : "text-red-500"
                          }`}>
                            {data.change}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="satellite" className="mt-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="relative h-[400px] w-full overflow-hidden rounded-lg bg-white border p-4">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-semibold text-gray-800">Masuria Lake District</h3>
                    <div className="flex items-center gap-2">
                      <Button
                        variant="ghost"
                        size="sm"
                        className={`p-2 ${comparisonMode === 'slider' ? 'bg-blue-50 text-blue-600' : ''}`}
                        onClick={() => setComparisonMode('slider')}
                      >
                        <ChevronDown className="h-4 w-4 rotate-[-90deg]" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        className={`p-2 ${comparisonMode === 'sideBySide' ? 'bg-blue-50 text-blue-600' : ''}`}
                        onClick={() => setComparisonMode('sideBySide')}
                      >
                        <SplitSquareHorizontal className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        className={`p-2 ${comparisonMode === 'overlay' ? 'bg-blue-50 text-blue-600' : ''}`}
                        onClick={() => setComparisonMode('overlay')}
                      >
                        <Layers className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>

                  <div className="h-[calc(100%-4rem)]">
                    {renderSatelliteComparison()}
                  </div>

                  {comparisonMode === 'overlay' && (
                    <div className="absolute bottom-4 left-4 right-4">
                      <Slider
                        value={[overlayOpacity]}
                        onValueChange={(value) => setOverlayOpacity(value[0])}
                        max={100}
                        step={1}
                        className="w-full"
                      />
                    </div>
                  )}
                </div>

                <div className="relative h-[400px] w-full overflow-hidden rounded-lg bg-white border p-6">
                  <div className="text-base font-medium text-gray-600 mb-8">Satellite Analysis</div>
                  <div className="space-y-8">
                    {satelliteAnalysis.keyFindings.map((finding, index) => (
                      <div key={index} className={`p-4 rounded-lg ${
                        finding.status === 'good' ? 'bg-green-50' :
                        finding.status === 'warning' ? 'bg-amber-50' : 'bg-red-50'
                      }`}>
                        <div className="flex items-center gap-3 mb-2">
                          {finding.status === 'good' ? (
                            <CheckCircle2 className="h-5 w-5 text-green-500" />
                          ) : finding.status === 'warning' ? (
                            <AlertTriangle className="h-5 w-5 text-amber-500" />
                          ) : (
                            <AlertTriangle className="h-5 w-5 text-red-500" />
                          )}
                          <h4 className={`font-medium ${
                            finding.status === 'good' ? 'text-green-700' :
                            finding.status === 'warning' ? 'text-amber-700' : 'text-red-700'
                          }`}>
                            {finding.title}
                          </h4>
                        </div>
                        <p className={`text-sm ${
                          finding.status === 'good' ? 'text-green-600' :
                          finding.status === 'warning' ? 'text-amber-600' : 'text-red-600'
                        }`}>
                          {finding.detail}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="trends" className="mt-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Seasonal Changes */}
                <div className="relative h-[400px] w-full overflow-hidden rounded-lg bg-white border p-6">
                  <div className="text-base font-medium text-gray-600 mb-8">Seasonal Variations</div>
                  <div className="space-y-12">
                    {seasonalTrends.map((season) => (
                      <div key={season.season} className="relative">
                        <div className="flex justify-between mb-3">
                          <span className="text-base font-medium">{season.season}</span>
                          <span className={`text-base font-medium ${
                            season.status === 'increase' ? 'text-green-600' : 'text-red-500'
                          }`}>
                            {season.change}
                          </span>
                        </div>
                        <div className="h-4 bg-blue-100 rounded-full overflow-hidden">
                          <div 
                            className={`h-full rounded-full transition-all duration-500 ${
                              season.status === 'increase' ? 'bg-green-500' : 'bg-red-500'
                            }`}
                            style={{ 
                              width: `${Math.abs(parseFloat(season.change))*20}%`,
                              opacity: 0.7 
                            }}
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Key Indicators */}
                <div className="relative h-[400px] w-full overflow-hidden rounded-lg bg-white border p-6">
                  <div className="text-base font-medium text-gray-600 mb-8">Key Indicators</div>
                  <div className="space-y-8">
                    <div className="bg-red-50 p-4 rounded-lg">
                      <div className="flex items-center gap-3 text-red-700 mb-3">
                        <AlertTriangle className="h-5 w-5" />
                        <span className="font-medium text-base">Critical Period</span>
                      </div>
                      <p className="text-base text-red-600">July-September decline pattern</p>
                    </div>
                    <div className="bg-blue-50 p-4 rounded-lg">
                      <div className="flex items-center gap-3 text-blue-700 mb-3">
                        <Droplets className="h-5 w-5" />
                        <span className="font-medium text-base">Annual Change</span>
                      </div>
                      <p className="text-base text-blue-600">Yearly decline: ~100 km²</p>
                    </div>
                  </div>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="quality" className="mt-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Quality Metrics */}
                <div className="relative h-[400px] w-full overflow-hidden rounded-lg bg-white border p-6">
                  <div className="text-base font-medium text-gray-600 mb-8">Water Quality Metrics</div>
                  <div className="space-y-12">
                    {qualityMetrics.map((metric) => (
                      <div key={metric.name} className="relative">
                        <div className="flex justify-between mb-3">
                          <span className="text-base font-medium">{metric.name}</span>
                          <div className="flex items-center gap-3">
                            <span className={`text-base font-medium ${
                              metric.status === 'good' ? 'text-green-600' : 'text-amber-600'
                            }`}>
                              {metric.value}%
                            </span>
                            {metric.status === 'good' ? (
                              <CheckCircle2 className="h-5 w-5 text-green-500" />
                            ) : (
                              <AlertTriangle className="h-5 w-5 text-amber-500" />
                            )}
                          </div>
                        </div>
                        <div className="h-4 bg-gray-100 rounded-full overflow-hidden">
                          <div 
                            className={`h-full rounded-full transition-all duration-500 ${
                              metric.status === 'good' ? 'bg-green-500' : 'bg-amber-500'
                            }`}
                            style={{ width: `${metric.value}%`, opacity: 0.7 }}
                          />
                        </div>
                        <div className="mt-2 flex items-center gap-2">
                          <span className={`text-sm ${
                            metric.trend === 'improving' ? 'text-green-600' : 
                            metric.trend === 'declining' ? 'text-red-500' : 'text-blue-600'
                          }`}>
                            {metric.trend === 'improving' ? '↑' : 
                             metric.trend === 'declining' ? '↓' : '→'} 
                            {metric.trend}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Quality Impact Analysis */}
                <div className="relative h-[400px] w-full overflow-hidden rounded-lg bg-white border p-6">
                  <div className="text-base font-medium text-gray-600 mb-8">Quality Impact Analysis</div>
                  <div className="space-y-8">
                    <div className="bg-green-50 p-4 rounded-lg">
                      <div className="flex items-center gap-3 text-green-700 mb-3">
                        <CheckCircle2 className="h-5 w-5" />
                        <span className="font-medium text-base">Good Indicators</span>
                      </div>
                      <ul className="text-base text-green-600 list-disc pl-6 space-y-3">
                        <li>High oxygen saturation</li>
                        <li>Stable temperature</li>
                      </ul>
                    </div>
                    <div className="bg-amber-50 p-4 rounded-lg">
                      <div className="flex items-center gap-3 text-amber-700 mb-3">
                        <AlertTriangle className="h-5 w-5" />
                        <span className="font-medium text-base">Watch Points</span>
                      </div>
                      <ul className="text-base text-amber-600 list-disc pl-6 space-y-3">
                        <li>pH level variations</li>
                        <li>Seasonal changes</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>

      {/* Status Bar */}
      <div className="flex items-center justify-between px-6 py-3 bg-white rounded-lg shadow-sm">
        <div className="flex items-center gap-3">
          <Droplets className="h-5 w-5 text-blue-500" />
          <span className="text-base font-medium">Current Level (2025):</span>
          <div className="flex items-center gap-2">
            <span className="text-base text-blue-600">7,300 km²</span>
          </div>
        </div>
        <div className="flex items-center gap-2 text-base">
          <Brain className="h-4 w-4 text-purple-500" />
          <span className="text-purple-600">AI Model: -3.4% by 2028</span>
        </div>
      </div>
    </div>
  )
} 