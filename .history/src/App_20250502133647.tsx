import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom"
import { useState } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import { Slider } from "@/components/ui/slider"
import { Download, Info, MapPin, CalendarIcon, Droplets, AlertTriangle, Leaf, Home, ChevronDown, Fish, ChevronUp } from "lucide-react"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { format } from "date-fns"
import { cn } from "@/lib/utils"
import SatelliteComparison from './components/satellite-comparison'
import WaterCoverageChart from "@/components/water-coverage-chart"
import EnvironmentalImpact from "@/components/environmental-impact"
import MapView from "@/components/map-view"
import { Badge } from "@/components/ui/badge"
import About from "@/pages/About"
import PredictionCalculator from "@/components/prediction-calculator"
import AIModelInfo from "@/components/ai-model-info"
import { jsPDF } from 'jspdf'

function Dashboard() {
  const [date, setDate] = useState<Date>(new Date(2023, 7, 15))
  const [compareDate, setCompareDate] = useState<Date>(new Date(2018, 7, 15))
  const [sliderValue, setSliderValue] = useState<number[]>([50])
  const [activeChartTab, setActiveChartTab] = useState<'coverage' | 'seasonal'>('coverage')
  const [openSections, setOpenSections] = useState({
    ecosystem: true,
    tourism: false,
    water: false,
    wildlife: false
  })

  const toggleSection = (section: 'ecosystem' | 'tourism' | 'water' | 'wildlife') => {
    setOpenSections(prev => ({
      ...prev,
      [section]: !prev[section]
    }))
  }

  // Image paths for satellite comparison
  const image2000 = "/images/2000-masuri.png"
  const image2030 = "/images/2030 projection.png"

  const generatePDF = () => {
    const doc = new jsPDF();
    const pageWidth = doc.internal.pageSize.getWidth();
    const pageHeight = doc.internal.pageSize.getHeight();
    const margin = 20;
    const contentWidth = pageWidth - (margin * 2);
    
    // Helper functions
    const addSectionHeader = (text: string, y: number) => {
      doc.setFillColor(0, 51, 102);
      doc.rect(0, y - 6, pageWidth, 12, 'F');
      doc.setTextColor(255, 255, 255);
      doc.setFontSize(14);
      doc.text(text, margin, y);
      return y + 20;
    };

    const addSubHeader = (text: string, y: number) => {
      doc.setTextColor(0, 51, 102);
      doc.setFontSize(12);
      doc.setFont(undefined, 'bold');
      doc.text(text, margin, y);
      doc.setFont(undefined, 'normal');
      return y + 12;
    };

    const addParagraph = (text: string, y: number, indent: number = 0) => {
      doc.setTextColor(60, 60, 60);
      doc.setFontSize(10);
      const lines = doc.splitTextToSize(text, contentWidth - indent);
      doc.text(lines, margin + indent, y);
      return y + (lines.length * 6) + 8;
    };

    // Header
    doc.setFillColor(0, 51, 102);
    doc.rect(0, 0, pageWidth, 40, 'F');
    doc.setTextColor(255, 255, 255);
    doc.setFontSize(24);
    doc.text('Masuria Lake District', margin, 25);
    doc.setFontSize(16);
    doc.text('Environmental Change Analysis Report', margin, 35);

    // Report metadata
    doc.setTextColor(100, 100, 100);
    doc.setFontSize(10);
    doc.text(`Generated: ${new Date().toLocaleDateString()} ${new Date().toLocaleTimeString()}`, pageWidth - margin, 50, { align: 'right' });
    doc.text('Report ID: MAL-' + Math.random().toString(36).substr(2, 9).toUpperCase(), pageWidth - margin, 55, { align: 'right' });

    let yPos = 70;

    // Executive Summary
    yPos = addSectionHeader('Executive Summary', yPos);
    yPos = addParagraph(`This comprehensive analysis examines the environmental changes in the Masuria Lake District between 2000 and 2030, utilizing advanced AI modeling and satellite imagery analysis. The report highlights significant changes in vegetation, water bodies, and climate patterns, providing insights into future environmental trends and their implications.`, yPos);

    // Historical Baseline (2000)
    yPos = addSectionHeader('Historical Baseline (2000)', yPos + 10);
    
    const baseline = [
      { title: 'Lush Vegetation', desc: 'Dense, continuous green forests and fertile farmland dominated the region.' },
      { title: 'High Water Levels', desc: 'Lakes appeared full and expansive with smooth, consistent shorelines.' },
      { title: 'Stable Climate Indicators', desc: 'No major signs of hydrological stress or extreme weather.' },
      { title: 'Minimal Land Fragmentation', desc: 'Agricultural plots and roads were visible but less intrusive.' },
      { title: 'Cloud Coverage', desc: 'Mild and scattered clouds suggest stable meteorological activity.' }
    ];

    baseline.forEach(item => {
      if (yPos > pageHeight - 40) {
        doc.addPage();
        yPos = 20;
      }
      yPos = addSubHeader(item.title, yPos);
      yPos = addParagraph(item.desc, yPos, 10);
    });

    // AI Model Predictions
    yPos = addSectionHeader('AI Model Predictions (2030)', yPos + 10);
    
    const predictions2030 = [
      { title: 'Reduced Vegetation Density', desc: 'Noticeable shift from lush green to patchier, yellow-brown tones.' },
      { title: 'Shrunken Water Bodies', desc: 'Lakes exhibit contracted outlines and exposed lakebed margins.' },
      { title: 'Hydrological Stress', desc: 'Water networks are fragmented, suggesting lower groundwater and rainfall.' },
      { title: 'Increased Land Use Pressure', desc: 'More grid-like, structured fields suggest intensified farming or land conversion.' },
      { title: 'Heavier Cloud Cover & Shadows', desc: 'Possibly indicating atmospheric changes tied to altered climate behavior.' }
    ];

    predictions2030.forEach(item => {
      if (yPos > pageHeight - 40) {
        doc.addPage();
        yPos = 20;
      }
      yPos = addSubHeader(item.title, yPos);
      yPos = addParagraph(item.desc, yPos, 10);
    });

    // Key Findings
    if (yPos > pageHeight - 100) {
      doc.addPage();
      yPos = 20;
    }
    yPos = addSectionHeader('Key Findings & Implications', yPos + 10);

    const findings = [
      {
        title: 'Water Resource Management',
        desc: 'Without intervention, Masuria could lose up to 25% of its surface water by 2050, significantly impacting tourism, agriculture, and local ecosystems.'
      },
      {
        title: 'Biodiversity Impact',
        desc: 'Changing water levels will alter habitats for numerous species, with potential local extinctions of water-dependent flora and fauna.'
      },
      {
        title: 'Economic Considerations',
        desc: 'Tourism revenue could decrease by 15-30% if water recreation opportunities diminish due to reduced lake sizes and water quality issues.'
      },
      {
        title: 'Mitigation Strategies',
        desc: 'Implementing water conservation measures and sustainable land use policies could reduce projected water loss by up to 60%.'
      }
    ];

    findings.forEach(finding => {
      if (yPos > pageHeight - 50) {
        doc.addPage();
        yPos = 20;
      }
      yPos = addSubHeader(finding.title, yPos);
      yPos = addParagraph(finding.desc, yPos, 10);
    });

    // AI Model Information
    if (yPos > pageHeight - 80) {
      doc.addPage();
      yPos = 20;
    }
    yPos = addSectionHeader('AI Model Methodology', yPos + 10);
    yPos = addParagraph('These predictions were generated by an AI model trained to simulate regional climate evolution. The comparison reflects a plausible future state if current drought trends and land use expansion continue unmitigated in the Masuria region. The model utilizes extensive historical data, satellite imagery, and advanced machine learning algorithms to provide accurate environmental change predictions.', yPos);

    // Recommendations
    if (yPos > pageHeight - 100) {
      doc.addPage();
      yPos = 20;
    }
    yPos = addSectionHeader('Recommended Actions', yPos + 10);
    const recommendations = [
      'Implement immediate water conservation measures across the region',
      'Develop sustainable tourism practices to minimize environmental impact',
      'Establish protected zones around critical water bodies and habitats',
      'Create a regional monitoring system for water levels and quality',
      'Engage local communities in conservation efforts and awareness programs'
    ];

    recommendations.forEach(rec => {
      if (yPos > pageHeight - 20) {
        doc.addPage();
        yPos = 20;
      }
      yPos = addParagraph('• ' + rec, yPos, 5);
    });

    // Footer on all pages
    const pageCount = doc.internal.getNumberOfPages();
    for(let i = 1; i <= pageCount; i++) {
      doc.setPage(i);
      doc.setFillColor(0, 51, 102);
      doc.rect(0, pageHeight - 20, pageWidth, 20, 'F');
      doc.setTextColor(255, 255, 255);
      doc.setFontSize(8);
      doc.text('Generated by Masuria Lake District AI Analysis System | Confidential Report', pageWidth/2, pageHeight - 10, { align: 'center' });
      doc.text(`Page ${i}/${pageCount}`, pageWidth - 20, pageHeight - 10);
    }

    // Save the PDF
    doc.save('masuria-environmental-analysis-report.pdf');
  };

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
            <Button size="sm" className="bg-emerald-600 hover:bg-emerald-700 text-white" onClick={generatePDF}>
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
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle>Environmental Impact</CardTitle>
                    <CardDescription>AI-generated insights on detected changes in Masuria</CardDescription>
                  </div>
                  <div className="h-8 w-8 rounded-full bg-amber-50 border border-amber-200 flex items-center justify-center">
                    <AlertTriangle className="h-4 w-4 text-amber-500" />
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="space-y-4">
                    <div 
                      className="flex items-center justify-between cursor-pointer"
                      onClick={() => toggleSection('ecosystem')}
                    >
                      <div className="flex items-center gap-2">
                        <Leaf className="h-5 w-5 text-emerald-500" />
                        <h3 className="font-medium">Ecosystem Impact</h3>
                      </div>
                      {openSections.ecosystem ? (
                        <ChevronUp className="h-4 w-4 text-slate-400" />
                      ) : (
                        <ChevronDown className="h-4 w-4 text-slate-400" />
                      )}
                    </div>
                    {openSections.ecosystem && (
                      <div className="pl-7">
                        <p className="text-sm text-slate-600 mb-3">
                          The 8.2% reduction in water coverage over the past 5 years has implications for Masuria's ecosystems:
                        </p>
                        <ul className="space-y-2 text-sm text-slate-600">
                          <li>• Reduced habitat for native fish species</li>
                          <li>• Changes in shoreline vegetation patterns</li>
                          <li>• Altered migration patterns for water birds</li>
                        </ul>
                        <div className="mt-3">
                          <span className="text-sm font-medium text-amber-600">Risk Level: Moderate</span>
                        </div>
                      </div>
                    )}
                  </div>

                  <div className="border-t pt-4">
                    <div 
                      className="flex items-center justify-between cursor-pointer"
                      onClick={() => toggleSection('tourism')}
                    >
                      <div className="flex items-center gap-2">
                        <Home className="h-5 w-5 text-blue-500" />
                        <h3 className="font-medium">Tourism Impact</h3>
                      </div>
                      {openSections.tourism ? (
                        <ChevronUp className="h-4 w-4 text-slate-400" />
                      ) : (
                        <ChevronDown className="h-4 w-4 text-slate-400" />
                      )}
                    </div>
                    {openSections.tourism && (
                      <div className="pl-7 mt-4">
                        <p className="text-sm text-slate-600 mb-3">
                          Potential effects on Masuria's tourism industry:
                        </p>
                        <ul className="space-y-2 text-sm text-slate-600">
                          <li>• Reduced water access at some popular beaches</li>
                          <li>• Changes to sailing routes between lakes</li>
                          <li>• Potential economic impact on local businesses</li>
                        </ul>
                        <div className="mt-3">
                          <span className="text-sm font-medium text-amber-600">Risk Level: Moderate</span>
                        </div>
                      </div>
                    )}
                  </div>

                  <div className="border-t pt-4">
                    <div 
                      className="flex items-center justify-between cursor-pointer"
                      onClick={() => toggleSection('water')}
                    >
                      <div className="flex items-center gap-2">
                        <Droplets className="h-5 w-5 text-blue-500" />
                        <h3 className="font-medium">Water Resources</h3>
                      </div>
                      {openSections.water ? (
                        <ChevronUp className="h-4 w-4 text-slate-400" />
                      ) : (
                        <ChevronDown className="h-4 w-4 text-slate-400" />
                      )}
                    </div>
                    {openSections.water && (
                      <div className="pl-7 mt-4">
                        <p className="text-sm text-slate-600 mb-3">
                          Water availability analysis for the Masuria region:
                        </p>
                        <ul className="space-y-2 text-sm text-slate-600">
                          <li>• Groundwater levels showing 5-7% decline</li>
                          <li>• Increased seasonal fluctuations in lake levels</li>
                          <li>• Potential challenges for local water management</li>
                        </ul>
                        <div className="mt-3">
                          <span className="text-sm font-medium text-amber-600">Risk Level: Moderate</span>
                        </div>
                      </div>
                    )}
                  </div>

                  <div className="border-t pt-4">
                    <div 
                      className="flex items-center justify-between cursor-pointer"
                      onClick={() => toggleSection('wildlife')}
                    >
                      <div className="flex items-center gap-2">
                        <Fish className="h-5 w-5 text-blue-500" />
                        <h3 className="font-medium">Wildlife Impact</h3>
                      </div>
                      {openSections.wildlife ? (
                        <ChevronUp className="h-4 w-4 text-slate-400" />
                      ) : (
                        <ChevronDown className="h-4 w-4 text-slate-400" />
                      )}
                    </div>
                    {openSections.wildlife && (
                      <div className="pl-7 mt-4">
                        <p className="text-sm text-slate-600 mb-3">
                          Effects on Masuria's wildlife populations:
                        </p>
                        <ul className="space-y-2 text-sm text-slate-600">
                          <li>• Changes in fish spawning areas</li>
                          <li>• Altered habitats for amphibians</li>
                          <li>• Potential stress on protected species</li>
                        </ul>
                        <div className="mt-3">
                          <span className="text-sm font-medium text-amber-600">Risk Level: Moderate</span>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>

            <AIModelInfo />
          </div>
        </div>
      </div>

      <PredictionCalculator />

      <footer className="py-8 bg-blue-900 text-white">
        <div className="container px-4 sm:px-6">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center gap-3 mb-4 md:mb-0">
              <Droplets className="h-6 w-6 text-blue-300" />
              <span className="text-lg font-bold">Masuria HydroWatch</span>
            </div>
            <div className="flex gap-6">
              <Link to="/about" className="text-blue-200 hover:text-white text-sm">About</Link>
              <a href="#" className="text-blue-200 hover:text-white text-sm">Documentation</a>
              <a href="#" className="text-blue-200 hover:text-white text-sm">Contact</a>
              <a href="#" className="text-blue-200 hover:text-white text-sm">Privacy</a>
            </div>
          </div>
          <div className="mt-6 pt-6 border-t border-blue-800 flex flex-col md:flex-row justify-between items-center">
            <p className="text-sm text-blue-300 mb-4 md:mb-0">© 2025 Masuria HydroWatch. All rights reserved.</p>
            <div className="flex gap-4">
              {/* ... social media icons ... */}
            </div>
          </div>
        </div>
      </footer>
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