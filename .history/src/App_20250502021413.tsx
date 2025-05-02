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
import SatelliteComparison from "@/components/satellite-comparison"
import WaterCoverageChart from "@/components/water-coverage-chart"
import EnvironmentalImpact from "@/components/environmental-impact"
import MapView from "@/components/map-view"
import { Badge } from "@/components/ui/badge"
import About from "@/pages/About"

// Import satellite images
const beforeImage = "/2000-masuri.png"
const afterImage = "/2030-projection.png"

function Dashboard() {
  const [date, setDate] = useState<Date>(new Date(2023, 7, 15))
  const [compareDate, setCompareDate] = useState<Date>(new Date(2018, 7, 15))
  const [sliderValue, setSliderValue] = useState<number[]>([50])
  const [activeChartTab, setActiveChartTab] = useState<'coverage' | 'seasonal'>('coverage')

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
                  <CardTitle>Satellite Imagery Comparison</CardTitle>
                  <Badge variant="outline" className="bg-blue-50">
                    <MapPin className="h-3 w-3 mr-1" />
                    Masuria Lake District, Poland
                  </Badge>
                </div>
                <CardDescription>Compare satellite imagery before and after to visualize water changes</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex flex-col gap-4">
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <div className="flex items-center gap-6">
                      <div className="flex flex-col">
                        <span className="text-sm font-medium">Before:</span>
                        <span className="text-sm text-muted-foreground">Early 2000s</span>
                      </div>
                      <div className="flex flex-col">
                        <span className="text-sm font-medium">After:</span>
                        <span className="text-sm text-muted-foreground">Projected 2030</span>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-sm text-muted-foreground">Overlay Opacity:</span>
                      <Slider
                        className="w-[120px]"
                        value={sliderValue}
                        onValueChange={setSliderValue}
                        max={100}
                        step={1}
                      />
                    </div>
                  </div>

                  <SatelliteComparison
                    overlayOpacity={sliderValue[0] / 100}
                    beforeImage={beforeImage}
                    afterImage={afterImage}
                  />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Interactive Map View</CardTitle>
                <CardDescription>Explore detected changes with geospatial context</CardDescription>
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

            <EnvironmentalImpact />
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