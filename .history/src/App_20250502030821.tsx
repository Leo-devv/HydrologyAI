import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom"
import { useState } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import { Slider } from "@/components/ui/slider"
import { Download, Info, MapPin, CalendarIcon, Droplets } from "lucide-react"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { format } from "date-fns"
import { cn } from "@/lib/utils"
import SatelliteComparison from './components/satellite-comparison'
import WaterCoverageChart from "@/components/water-coverage-chart"
import EnvironmentalImpact from "@/components/environmental-impact"
import MapView from "@/components/map-view"
import { Badge } from "@/components/ui/badge"
import About from "@/pages/About"

function Dashboard() {
  const [date, setDate] = useState<Date>(new Date(2023, 7, 15))
  const [compareDate, setCompareDate] = useState<Date>(new Date(2018, 7, 15))
  const [sliderValue, setSliderValue] = useState<number[]>([50])
  const [activeChartTab, setActiveChartTab] = useState<'coverage' | 'seasonal'>('coverage')

  // Image paths for satellite comparison
  const image2000 = "/images/2000-masuri.png"
  const image2030 = "/images/2030 projection.png"

  return (
    <main className="flex min-h-screen flex-col bg-slate-50">
      <header className="sticky top-0 z-50 w-full border-b bg-gradient-to-r from-blue-700 to-blue-900">
        <div className="container flex h-20 items-center px-4 sm:px-6">
          <Link to="/" className="flex items-center gap-3">
            <Droplets className="h-8 w-8 text-blue-100" />
            <h1 className="text-2xl font-black tracking-tight text-white font-serif">MASURIA HYDROWATCH</h1>
          </Link>
          <div className="ml-auto flex items-center gap-4">
            <Link to="/about">
              <Button variant="ghost" size="sm" className="hidden md:flex text-white hover:bg-blue-800">
                <Info className="mr-2 h-4 w-4" />
                About Project
              </Button>
            </Link>
            <Button size="sm" className="bg-emerald-600 hover:bg-emerald-700 text-white">
              <Download className="mr-2 h-4 w-4" />
              Export Analysis Report
            </Button>
          </div>
        </div>
      </header>

      <div className="container px-4 py-6 sm:px-6">
        <div className="mb-6">
          <h2 className="text-3xl font-bold tracking-tight">Masuria Lakes Hydrological Analysis</h2>
          <p className="text-muted-foreground mt-2">
            Monitoring water level changes in Poland's Masuria Lake District using AI-powered satellite imagery analysis
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-6">
          <div className="md:col-span-4 space-y-6">
            <Card>
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <CardTitle>Historical vs. Projected Water Coverage</CardTitle>
                  <Badge variant="outline" className="bg-blue-50">
                    <MapPin className="h-3 w-3 mr-1" />
                    Masuria Lake District, Poland
                  </Badge>
                </div>
                <CardDescription>AI-powered analysis of water body changes from 2000 to projected 2030</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex flex-col gap-4">
                  <div className="flex items-center justify-between">
                    <div className="grid grid-cols-2 gap-8">
                      <div className="flex flex-col items-center p-3 rounded-lg bg-gradient-to-r from-blue-50 to-blue-100 border border-blue-200 shadow-sm">
                        <div className="flex items-center gap-2 mb-1">
                          <span className="w-2 h-2 rounded-full bg-blue-500 animate-pulse"></span>
                          <span className="text-sm font-semibold text-blue-700">Current State Analysis</span>
                        </div>
                        <span className="text-xs text-blue-600/80">Satellite Data from 2000</span>
                      </div>
                      <div className="flex flex-col items-center p-3 rounded-lg bg-gradient-to-r from-purple-50 to-purple-100 border border-purple-200 shadow-sm">
                        <div className="flex items-center gap-2 mb-1">
                          <span className="w-2 h-2 rounded-full bg-purple-500 animate-pulse"></span>
                          <span className="text-sm font-semibold text-purple-700">Future Prediction</span>
                        </div>
                        <span className="text-xs text-purple-600/80">AI Model Forecast 2030</span>
                      </div>
                    </div>
                  </div>

                  <SatelliteComparison
                    beforeImage={image2000}
                    afterImage={image2030}
                  />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Analysis & Prediction</CardTitle>
                <CardDescription>Interactive visualization of water level changes and future projections</CardDescription>
              </CardHeader>
              <CardContent>
                <MapView date={date} compareDate={compareDate} />
              </CardContent>
            </Card>
          </div>

          <div className="md:col-span-2 space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Water Coverage Analysis</CardTitle>
                <CardDescription>Statistical summary of detected changes</CardDescription>
              </CardHeader>
              <CardContent>
                <Tabs defaultValue="coverage" onValueChange={(value) => setActiveChartTab(value as 'coverage' | 'seasonal')}>
                  <TabsList className="grid w-full grid-cols-2">
                    <TabsTrigger value="coverage">Coverage</TabsTrigger>
                    <TabsTrigger value="seasonal">Seasonal</TabsTrigger>
                  </TabsList>
                  <TabsContent value="coverage" className="pt-4">
                    <WaterCoverageChart activeTab="coverage" />
                    <div className="mt-4 space-y-2">
                      <div className="flex justify-between">
                        <span className="text-sm text-muted-foreground">Current Coverage:</span>
                        <span className="text-sm font-medium">309.5 km²</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm text-muted-foreground">Change (5 Years):</span>
                        <span className="text-sm font-medium text-red-500">-8.2%</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm text-muted-foreground">Model Confidence:</span>
                        <span className="text-sm font-medium">96%</span>
                      </div>
                    </div>
                  </TabsContent>
                  <TabsContent value="seasonal" className="pt-4">
                    <WaterCoverageChart activeTab="seasonal" />
                    <div className="mt-4 space-y-2">
                      <div className="flex justify-between">
                        <span className="text-sm text-muted-foreground">Seasonal Variation:</span>
                        <span className="text-sm font-medium">±5.2%</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm text-muted-foreground">Peak Season:</span>
                        <span className="text-sm font-medium">Spring</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm text-muted-foreground">Low Season:</span>
                        <span className="text-sm font-medium">Autumn</span>
                      </div>
                    </div>
                  </TabsContent>
                </Tabs>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Environmental Impact Assessment</CardTitle>
                <CardDescription>Comprehensive analysis of ecological and socioeconomic impacts</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid gap-6 md:grid-cols-2">
                  <div className="space-y-4">
                    <div className="flex items-center gap-2">
                      <div className="h-2 w-2 rounded-full bg-red-500"></div>
                      <h3 className="font-semibold">Environmental Vulnerabilities</h3>
                    </div>
                    <div className="space-y-3 text-sm">
                      <div className="p-3 bg-red-50 rounded-md border border-red-100">
                        <span className="font-medium text-red-900">Hydrological Impact</span>
                        <p className="mt-1 text-red-700">Significant reduction in water table levels affecting interconnected lake systems and groundwater reserves</p>
                      </div>
                      <div className="p-3 bg-red-50 rounded-md border border-red-100">
                        <span className="font-medium text-red-900">Ecosystem Degradation</span>
                        <p className="mt-1 text-red-700">Loss of critical wetland habitats and disruption of aquatic species' breeding grounds</p>
                      </div>
                      <div className="p-3 bg-red-50 rounded-md border border-red-100">
                        <span className="font-medium text-red-900">Socioeconomic Pressure</span>
                        <p className="mt-1 text-red-700">Declining water resources affecting local agriculture, tourism, and recreational activities</p>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div className="flex items-center gap-2">
                      <div className="h-2 w-2 rounded-full bg-emerald-500"></div>
                      <h3 className="font-semibold">Conservation Initiatives</h3>
                    </div>
                    <div className="space-y-3 text-sm">
                      <div className="p-3 bg-emerald-50 rounded-md border border-emerald-100">
                        <span className="font-medium text-emerald-900">Water Management</span>
                        <p className="mt-1 text-emerald-700">Implementation of advanced water conservation systems and sustainable usage policies</p>
                      </div>
                      <div className="p-3 bg-emerald-50 rounded-md border border-emerald-100">
                        <span className="font-medium text-emerald-900">Ecosystem Restoration</span>
                        <p className="mt-1 text-emerald-700">Comprehensive habitat rehabilitation programs focusing on native species and natural water retention</p>
                      </div>
                      <div className="p-3 bg-emerald-50 rounded-md border border-emerald-100">
                        <span className="font-medium text-emerald-900">Community Engagement</span>
                        <p className="mt-1 text-emerald-700">Collaborative initiatives with local stakeholders for sustainable resource management</p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="mt-6 border-t pt-6">
                  <div className="flex items-center gap-2 mb-4">
                    <div className="h-2 w-2 rounded-full bg-blue-500"></div>
                    <h3 className="font-semibold">Monitoring & Assessment Framework</h3>
                  </div>
                  <div className="grid gap-4 md:grid-cols-3">
                    <div className="p-3 bg-blue-50 rounded-md border border-blue-100">
                      <span className="text-sm font-medium text-blue-900">Satellite Surveillance</span>
                      <p className="mt-1 text-sm text-blue-700">High-resolution imagery analysis for real-time monitoring of water bodies</p>
                    </div>
                    <div className="p-3 bg-blue-50 rounded-md border border-blue-100">
                      <span className="text-sm font-medium text-blue-900">AI-Powered Analytics</span>
                      <p className="mt-1 text-sm text-blue-700">Machine learning models for predictive analysis and trend identification</p>
                    </div>
                    <div className="p-3 bg-blue-50 rounded-md border border-blue-100">
                      <span className="text-sm font-medium text-blue-900">Impact Evaluation</span>
                      <p className="mt-1 text-sm text-blue-700">Regular assessment of conservation efforts and adaptation strategies</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </main>
  )
}

interface DatePickerProps {
  date: Date
  setDate: (date: Date) => void
}

function DatePickerWithPresets({ date, setDate }: DatePickerProps) {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          className={cn("w-[180px] justify-start text-left font-normal", !date && "text-muted-foreground")}
        >
          <CalendarIcon className="mr-2 h-4 w-4" />
          {date ? format(date, "PPP") : <span>Pick a date</span>}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0">
        <Calendar mode="single" selected={date} onSelect={(date) => date && setDate(date)} initialFocus />
      </PopoverContent>
    </Popover>
  )
}

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/about" element={<About />} />
      </Routes>
    </Router>
  )
} 