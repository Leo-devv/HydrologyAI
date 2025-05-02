"use client"

import type React from "react"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { BarChart, Calendar, Droplet, Thermometer, Wind } from "lucide-react"
import { Progress } from "@/components/ui/progress"

// Sample prediction data
const predictions = {
  2025: {
    waterLevel: 7300,
    temperature: 9.8,
    precipitation: 650,
    vegetationIndex: 0.68,
    description:
      "Slight decrease in water levels with minor shoreline changes. Vegetation remains relatively stable with small patches of stress visible in satellite imagery.",
    confidence: 92,
  },
  2030: {
    waterLevel: 7100,
    temperature: 10.4,
    precipitation: 620,
    vegetationIndex: 0.62,
    description:
      "Noticeable reduction in water bodies with exposed lakebed margins. Vegetation shows patchy distribution with increased yellow-brown tones indicating stress.",
    confidence: 87,
  },
  2035: {
    waterLevel: 6850,
    temperature: 10.9,
    precipitation: 590,
    vegetationIndex: 0.58,
    description:
      "Significant contraction of lake boundaries with fragmented water networks. Vegetation density reduced with visible signs of hydrological stress across the region.",
    confidence: 81,
  },
  2040: {
    waterLevel: 6600,
    temperature: 11.5,
    precipitation: 560,
    vegetationIndex: 0.53,
    description:
      "Severe reduction in water coverage with major changes to shorelines. Vegetation shows clear transition to drought-resistant species with extensive brown patches.",
    confidence: 76,
  },
  2045: {
    waterLevel: 6300,
    temperature: 12.1,
    precipitation: 530,
    vegetationIndex: 0.48,
    description:
      "Critical water level reduction with some smaller lakes potentially seasonal. Vegetation significantly altered with dominant drought-adapted species.",
    confidence: 70,
  },
  2050: {
    waterLevel: 6000,
    temperature: 12.8,
    precipitation: 500,
    vegetationIndex: 0.42,
    description:
      "Extreme changes to water bodies with permanent alteration of the landscape. Vegetation completely transformed with natural forest areas significantly reduced.",
    confidence: 65,
  },
}

export default function PredictionCalculator() {
  const [year, setYear] = useState<string>("2030")
  const [prediction, setPrediction] = useState<any>(null)
  const [isCalculating, setIsCalculating] = useState<boolean>(false)
  const currentYear = new Date().getFullYear()

  const handleYearChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    if (value === "" || (Number.parseInt(value) >= currentYear && Number.parseInt(value) <= 2050)) {
      setYear(value)
    }
  }

  const calculatePrediction = () => {
    setIsCalculating(true)

    // Simulate calculation time
    setTimeout(() => {
      const yearInt = Number.parseInt(year)

      // Find the closest year in our predictions
      const availableYears = Object.keys(predictions).map((y) => Number.parseInt(y))
      const closestYear = availableYears.reduce((prev, curr) => {
        return Math.abs(curr - yearInt) < Math.abs(prev - yearInt) ? curr : prev
      })

      setPrediction(predictions[closestYear as keyof typeof predictions])
      setIsCalculating(false)
    }, 1500)
  }

  return (
    <section className="py-12 bg-gradient-to-b from-white to-blue-50">
      <div className="container px-4 sm:px-6">
        <div className="text-center mb-10">
          <h2 className="text-3xl font-bold tracking-tight mb-2">Water Future Predictor</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Use our AI model to predict future water levels and environmental conditions in the Masuria Lake District
          </p>
        </div>

        <div className="grid gap-8 lg:grid-cols-2">
          <div className="space-y-6">
            <div className="bg-white p-6 rounded-xl shadow-sm border">
              <h3 className="text-xl font-semibold mb-4">Prediction Parameters</h3>

              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="year">Select Year (2025-2050)</Label>
                  <div className="flex gap-3">
                    <Input
                      id="year"
                      type="number"
                      min={currentYear}
                      max={2050}
                      value={year}
                      onChange={handleYearChange}
                      className="w-full"
                    />
                    <Button
                      onClick={calculatePrediction}
                      disabled={isCalculating || !year}
                      className="bg-blue-600 hover:bg-blue-700 text-white"
                    >
                      {isCalculating ? "Calculating..." : "Predict"}
                    </Button>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4 pt-2">
                  <Card>
                    <CardContent className="p-4">
                      <div className="flex items-center gap-2 mb-2">
                        <Calendar className="h-4 w-4 text-blue-600" />
                        <span className="text-sm font-medium">Historical Baseline</span>
                      </div>
                      <p className="text-sm text-muted-foreground">
                        Year 2000 data is used as our reference point for all predictions.
                      </p>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardContent className="p-4">
                      <div className="flex items-center gap-2 mb-2">
                        <BarChart className="h-4 w-4 text-blue-600" />
                        <span className="text-sm font-medium">Model Accuracy</span>
                      </div>
                      <p className="text-sm text-muted-foreground">
                        Predictions are based on 20+ years of satellite data analysis.
                      </p>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </div>

            {prediction && (
              <div className="bg-white p-6 rounded-xl shadow-sm border">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-xl font-semibold">Prediction Results</h3>
                  <div className="flex items-center gap-2">
                    <span className="text-sm text-muted-foreground">Confidence:</span>
                    <span className="text-sm font-medium">{prediction.confidence}%</span>
                  </div>
                </div>

                <p className="text-sm text-muted-foreground mb-6">{prediction.description}</p>

                <div className="space-y-4">
                  <div className="space-y-2">
                    <div className="flex justify-between items-center">
                      <div className="flex items-center gap-2">
                        <Droplet className="h-4 w-4 text-blue-600" />
                        <span className="text-sm font-medium">Water Level (hectares)</span>
                      </div>
                      <span className="text-sm font-medium">{prediction.waterLevel}</span>
                    </div>
                    <Progress value={(prediction.waterLevel / 8000) * 100} className="h-2" />
                  </div>

                  <div className="space-y-2">
                    <div className="flex justify-between items-center">
                      <div className="flex items-center gap-2">
                        <Thermometer className="h-4 w-4 text-red-500" />
                        <span className="text-sm font-medium">Avg. Temperature (°C)</span>
                      </div>
                      <span className="text-sm font-medium">{prediction.temperature}</span>
                    </div>
                    <Progress value={(prediction.temperature / 15) * 100} className="h-2 bg-red-100">
                      <div
                        className="h-full bg-red-500 transition-all"
                        style={{ width: `${(prediction.temperature / 15) * 100}%` }}
                      />
                    </Progress>
                  </div>

                  <div className="space-y-2">
                    <div className="flex justify-between items-center">
                      <div className="flex items-center gap-2">
                        <Wind className="h-4 w-4 text-cyan-600" />
                        <span className="text-sm font-medium">Annual Precipitation (mm)</span>
                      </div>
                      <span className="text-sm font-medium">{prediction.precipitation}</span>
                    </div>
                    <Progress value={(prediction.precipitation / 800) * 100} className="h-2 bg-cyan-100">
                      <div
                        className="h-full bg-cyan-500 transition-all"
                        style={{ width: `${(prediction.precipitation / 800) * 100}%` }}
                      />
                    </Progress>
                  </div>

                  <div className="space-y-2">
                    <div className="flex justify-between items-center">
                      <div className="flex items-center gap-2">
                        <div className="h-4 w-4 bg-green-500 rounded-full"></div>
                        <span className="text-sm font-medium">Vegetation Index (NDVI)</span>
                      </div>
                      <span className="text-sm font-medium">{prediction.vegetationIndex.toFixed(2)}</span>
                    </div>
                    <Progress value={(prediction.vegetationIndex / 1) * 100} className="h-2 bg-green-100">
                      <div
                        className="h-full bg-green-500 transition-all"
                        style={{ width: `${(prediction.vegetationIndex / 1) * 100}%` }}
                      />
                    </Progress>
                  </div>
                </div>
              </div>
            )}
          </div>

          <div className="bg-white p-6 rounded-xl shadow-sm border">
            <Tabs defaultValue="comparison">
              <TabsList className="grid w-full grid-cols-2 mb-6">
                <TabsTrigger value="comparison">Historical Comparison</TabsTrigger>
                <TabsTrigger value="insights">AI Insights</TabsTrigger>
              </TabsList>

              <TabsContent value="comparison" className="space-y-6">
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold">Masuria in 2000 (Historical Baseline)</h3>
                  <ul className="space-y-3">
                    <li className="flex gap-3">
                      <div className="flex-shrink-0 h-5 w-5 rounded-full bg-green-500 mt-0.5"></div>
                      <p className="text-sm">
                        <span className="font-medium">Lush Vegetation:</span> Dense, continuous green forests and
                        fertile farmland dominated the region.
                      </p>
                    </li>
                    <li className="flex gap-3">
                      <div className="flex-shrink-0 h-5 w-5 rounded-full bg-blue-500 mt-0.5"></div>
                      <p className="text-sm">
                        <span className="font-medium">High Water Levels:</span> Lakes appeared full and expansive with
                        smooth, consistent shorelines.
                      </p>
                    </li>
                    <li className="flex gap-3">
                      <div className="flex-shrink-0 h-5 w-5 rounded-full bg-cyan-500 mt-0.5"></div>
                      <p className="text-sm">
                        <span className="font-medium">Stable Climate Indicators:</span> No major signs of hydrological
                        stress or extreme weather.
                      </p>
                    </li>
                    <li className="flex gap-3">
                      <div className="flex-shrink-0 h-5 w-5 rounded-full bg-amber-500 mt-0.5"></div>
                      <p className="text-sm">
                        <span className="font-medium">Minimal Land Fragmentation:</span> Agricultural plots and roads
                        were visible but less intrusive.
                      </p>
                    </li>
                    <li className="flex gap-3">
                      <div className="flex-shrink-0 h-5 w-5 rounded-full bg-gray-500 mt-0.5"></div>
                      <p className="text-sm">
                        <span className="font-medium">Cloud Coverage:</span> Mild and scattered clouds suggest stable
                        meteorological activity.
                      </p>
                    </li>
                  </ul>
                </div>

                <div className="space-y-4">
                  <h3 className="text-lg font-semibold">Masuria in 2030 (AI Model Prediction)</h3>
                  <ul className="space-y-3">
                    <li className="flex gap-3">
                      <div className="flex-shrink-0 h-5 w-5 rounded-full bg-yellow-500 mt-0.5"></div>
                      <p className="text-sm">
                        <span className="font-medium">Reduced Vegetation Density:</span> Noticeable shift from lush
                        green to patchier, yellow-brown tones.
                      </p>
                    </li>
                    <li className="flex gap-3">
                      <div className="flex-shrink-0 h-5 w-5 rounded-full bg-blue-300 mt-0.5"></div>
                      <p className="text-sm">
                        <span className="font-medium">Shrunken Water Bodies:</span> Lakes exhibit contracted outlines
                        and exposed lakebed margins.
                      </p>
                    </li>
                    <li className="flex gap-3">
                      <div className="flex-shrink-0 h-5 w-5 rounded-full bg-red-500 mt-0.5"></div>
                      <p className="text-sm">
                        <span className="font-medium">Hydrological Stress Evident:</span> Water networks are fragmented,
                        suggesting lower groundwater and rainfall.
                      </p>
                    </li>
                    <li className="flex gap-3">
                      <div className="flex-shrink-0 h-5 w-5 rounded-full bg-amber-700 mt-0.5"></div>
                      <p className="text-sm">
                        <span className="font-medium">Increased Land Use Pressure:</span> More grid-like, structured
                        fields suggest intensified farming or land conversion.
                      </p>
                    </li>
                    <li className="flex gap-3">
                      <div className="flex-shrink-0 h-5 w-5 rounded-full bg-gray-700 mt-0.5"></div>
                      <p className="text-sm">
                        <span className="font-medium">Heavier Cloud Cover & Shadows:</span> Possibly indicating
                        atmospheric changes tied to altered climate behavior.
                      </p>
                    </li>
                  </ul>
                </div>
              </TabsContent>

              <TabsContent value="insights">
                <div className="space-y-6">
                  <div className="p-4 bg-blue-50 rounded-lg border border-blue-100">
                    <h3 className="text-md font-semibold mb-2 text-blue-800">AI Model Insight</h3>
                    <p className="text-sm text-blue-700">
                      These predictions were generated by an AI model trained to simulate regional climate evolution.
                      The comparison reflects a plausible future state if current drought trends and land use expansion
                      continue unmitigated in the Masuria region.
                    </p>
                  </div>

                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold">Key Findings</h3>
                    <div className="grid gap-4 sm:grid-cols-2">
                      <div className="p-4 bg-white rounded-lg border">
                        <h4 className="text-sm font-medium mb-2">Water Resource Management</h4>
                        <p className="text-xs text-muted-foreground">
                          Without intervention, Masuria could lose up to 25% of its surface water by 2050, significantly
                          impacting tourism, agriculture, and local ecosystems.
                        </p>
                      </div>

                      <div className="p-4 bg-white rounded-lg border">
                        <h4 className="text-sm font-medium mb-2">Biodiversity Impact</h4>
                        <p className="text-xs text-muted-foreground">
                          Changing water levels will alter habitats for numerous species, with potential local
                          extinctions of water-dependent flora and fauna.
                        </p>
                      </div>

                      <div className="p-4 bg-white rounded-lg border">
                        <h4 className="text-sm font-medium mb-2">Economic Considerations</h4>
                        <p className="text-xs text-muted-foreground">
                          Tourism revenue could decrease by 15-30% if water recreation opportunities diminish due to
                          reduced lake sizes and water quality issues.
                        </p>
                      </div>

                      <div className="p-4 bg-white rounded-lg border">
                        <h4 className="text-sm font-medium mb-2">Mitigation Strategies</h4>
                        <p className="text-xs text-muted-foreground">
                          Implementing water conservation measures and sustainable land use policies could reduce
                          projected water loss by up to 60%.
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="pt-4">
                    <Button
                      className="w-full bg-blue-600 hover:bg-blue-700 text-white"
                      onClick={() => {
                        // Create a fake download for demo purposes
                        const link = document.createElement("a")
                        link.href =
                          "data:application/pdf;base64,JVBERi0xLjMKJcTl8uXrp/Og0MTGCjQgMCBvYmoKPDwgL0xlbmd0aCA1IDAgUiAvRmlsdGVyIC9GbGF0ZURlY29kZSA+PgpzdHJlYW0KeAFLy0gtSgQABYwBLAplbmRzdHJlYW0KZW5kb2JqCjUgMCBvYmoKMTgKZW5kb2JqCjIgMCBvYmoKPDwgL1R5cGUgL1BhZ2UgL1BhcmVudCAzIDAgUiAvUmVzb3VyY2VzIDYgMCBSIC9Db250ZW50cyA0IDAgUiAvTWVkaWFCb3ggWzAgMCA2MTIgNzkyXQo+PgplbmRvYmoKNiAwIG9iago8PCAvUHJvY1NldCBbIC9QREYgL1RleHQgXSAvQ29sb3JTcGFjZSA8PCAvQ3MxIDcgMCBSID4+IC9Gb250IDw8IC9UVDIgOSAwIFIKPj4gPj4KZW5kb2JqCjEwIDAgb2JqCjw8IC9MZW5ndGggMTEgMCBSIC9OIDMgL0FsdGVybmF0ZSAvRGV2aWNlUkdCIC9GaWx0ZXIgL0ZsYXRlRGVjb2RlID4+CnN0cmVhbQp4AZ2Wd1RT2RaHz703vdASIiAl9Bp6CSDSO0gVBFGJSYBQAoaEJnZEBUYUESlWZFTAAUeHImNFFAuDgmLXCfIQUMbBUURF5d2MawnvrTXz3pr9x1nf2ee319ln733XugBQ/IIEwnRYAYA0oVgU7uvBXBITy8T3AhgQAQ5YAcDhZmYER/hEAtT8vT2ZmahIxrP27i6AZLvbLL9QJnPW/3+RIjdDJAYACkXVNjx+JhflApRTs8UZMv8EyvSVKTKGMTIWoQmirCLjxK9s9qfmK7vJmJcm5KEaWc4ZvDSejLtQ3pol4aOMBKFcmCXgZ6N8B2W9VEmaAOX3KNPT+JxMADAUmV/M5yahbIkyRRQZ7onyAgAIlMQ5vHIOi/k5aJ4AeKZn5IoEiUliphHXmGnl5YTBgW+U/8HkKXStrqCAJEFrK6vLi+Wfl5eDLwXQL39ktEqNu5HhlxKVzZ1MlxXW2PDlKlWUUVNNrSZPVzUNtZrQRdlWa5ql1kGN0qqm1iGnmrpyrv5Uk2/7ntXq/+c/6G+LZK7QGAWY1DF4IFLdLLnT2bhZhJLUTuw15UVR5tFGJnQd1Uym1NqFUTtw6+4qNNMXUXFQ0RbJ1KwK9LRA8DSRFtvLkHnnJTLptYnn1/DKMP31Cj+VKlM6BO0D/iilyugAr3yJepXyJhPBRr9JzrGgDu8sYR2sJsSXWRn3hGJnq8jjq9+7r3NQn0eumrBuTtFdKs07r+3lpWqIX+S5yYnP8jXvUq7vPeDrNWLaJ6rSZWmZ9jSGr2qj3Hj6TWTVv+8X7T6yutcJDR1FnqLN9Dt1jdi+e0OP3v0q5TKyY8U+VRdJqvs+9vkNP9Xb7OIjuDq3TNSYbVe3Tk3fJ/7UP5xP9ziIW7hxrs0A9HKXbwLXx4+LR/fxXfZx9QlY0BmWyCAmYQk8q5GEYdbMYQEMSUmMQ7GxRLIYD4vxG/vrRuQedgPgEMB9PvlQMqLkaRZ4AuBUeFYDXA9PXl4OdEXsbQoAI5jvo59/Fp+/dn30K+CvM5M/SFX0XT7ZvMBLDrCLY8wNl1/gWQvgOJ+dP4E/e3KBvwCczL5MQHBXAAAAACV0RVh0ZGF0ZTpjcmVhdGUAMjAyMy0wNS0wMlQxNTowODo1OCswMDowMDzr2J4AAAAldEVYdGRhdGU6bW9kaWZ5ADIwMjMtMDUtMDJUMTU6MDg6NTgrMDA6MDBNtmAiAAAAAElFTkSuQmCC"
                        link.download = "masuria_ai_analysis.pdf"
                        document.body.appendChild(link)
                        link.click()
                        document.body.removeChild(link)
                      }}
                    >
                      Download Full AI Analysis Report
                    </Button>
                  </div>
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>
    </section>
  )
} 