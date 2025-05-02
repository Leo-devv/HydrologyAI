import { Link } from "react-router-dom"
import { Button } from "@/components/ui/button"
import { ArrowLeft, Droplets } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Brain, Database, LineChart, Microscope } from "lucide-react"

export default function About() {
  return (
    <main className="flex min-h-screen flex-col bg-slate-50">
      <header className="sticky top-0 z-50 w-full border-b bg-gradient-to-r from-blue-700 to-blue-900">
        <div className="container flex h-20 items-center px-4 sm:px-6">
          <Link to="/" className="flex items-center gap-3">
            <Droplets className="h-8 w-8 text-blue-100" />
            <h1 className="text-2xl font-black tracking-tight text-white font-serif">MASURIA HYDROWATCH</h1>
          </Link>
        </div>
      </header>

      <div className="container py-12">
        <div className="mb-8">
          <Link to="/">
            <Button variant="outline" size="sm">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Dashboard
            </Button>
          </Link>
        </div>

        <div className="max-w-4xl mx-auto space-y-8">
          <div className="space-y-4">
            <h1 className="text-4xl font-bold tracking-tight">About the Project</h1>
            <p className="text-lg text-muted-foreground">
              Understanding water level changes in Poland's Masuria Lake District through AI-powered analysis
            </p>
          </div>

          <Card>
            <CardHeader>
              <div className="flex items-center gap-2">
                <Microscope className="h-5 w-5 text-blue-600" />
                <CardTitle>Methodology Overview</CardTitle>
              </div>
              <CardDescription>Our approach to analyzing and predicting hydrological changes</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid gap-6 md:grid-cols-3">
                <div className="space-y-3">
                  <div className="flex items-center gap-2 text-blue-600">
                    <Brain className="h-5 w-5" />
                    <h3 className="font-semibold">AI Training</h3>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    We trained a machine learning model on a synthetic dataset of satellite-style images representing Masuria in 2000, current trends in 2025, and a predicted projection for 2030.
                  </p>
                </div>
                
                <div className="space-y-3">
                  <div className="flex items-center gap-2 text-blue-600">
                    <Database className="h-5 w-5" />
                    <h3 className="font-semibold">Data Generation</h3>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    These images were generated using AI to simulate hydrological conditions based on real-world drivers like drought frequency, reduced snowmelt, and land-use expansion.
                  </p>
                </div>

                <div className="space-y-3">
                  <div className="flex items-center gap-2 text-blue-600">
                    <LineChart className="h-5 w-5" />
                    <h3 className="font-semibold">Processing</h3>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    The process mimicked workflows used with Sentinel-2 and Landsat imagery, where preprocessing (segmentation, water surface detection) was followed by classification and future-state prediction using Python tools (NumPy, OpenCV, and scikit-learn).
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <LineChart className="h-5 w-5 text-blue-600" />
                Key Insights
              </CardTitle>
              <CardDescription>Timeline of observed and predicted changes</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div className="relative pl-6 border-l-2 border-blue-200 space-y-2">
                  <div className="absolute -left-2 top-0 w-4 h-4 rounded-full bg-blue-100 border-2 border-blue-500"></div>
                  <h3 className="font-semibold text-blue-700">2000 (Baseline)</h3>
                  <p className="text-sm text-muted-foreground">
                    Dense forests, consistent lake boundaries, and high water levels defined a healthy ecosystem.
                  </p>
                </div>

                <div className="relative pl-6 border-l-2 border-amber-200 space-y-2">
                  <div className="absolute -left-2 top-0 w-4 h-4 rounded-full bg-amber-100 border-2 border-amber-500"></div>
                  <h3 className="font-semibold text-amber-700">2025 (Current AI-Inferred Condition)</h3>
                  <p className="text-sm text-muted-foreground">
                    Notable water recession, vegetation stress, and fragmentation of the shoreline were visible, mirroring ongoing drought conditions.
                  </p>
                </div>

                <div className="relative pl-6 border-l-2 border-purple-200 space-y-2">
                  <div className="absolute -left-2 top-0 w-4 h-4 rounded-full bg-purple-100 border-2 border-purple-500"></div>
                  <h3 className="font-semibold text-purple-700">2030 (AI Projection)</h3>
                  <p className="text-sm text-muted-foreground">
                    Simulated further decline in water surface area, exposed lakebeds, and increased anthropogenic pressure via agricultural grid patterns.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </main>
  )
} 