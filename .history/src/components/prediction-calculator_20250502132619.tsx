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
import { jsPDF } from 'jspdf';

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

  const generatePDF = () => {
    const doc = new jsPDF();
    const pageWidth = doc.internal.pageSize.getWidth();
    const pageHeight = doc.internal.pageSize.getHeight();
    
    // Helper function for section headers
    const addSectionHeader = (text: string, y: number) => {
      doc.setFillColor(0, 51, 102);
      doc.rect(0, y - 6, pageWidth, 12, 'F');
      doc.setTextColor(255, 255, 255);
      doc.setFontSize(14);
      doc.text(text, 10, y);
    };

    // Header with logo placeholder
    doc.setFillColor(0, 51, 102);
    doc.rect(0, 0, pageWidth, 40, 'F');
    doc.setTextColor(255, 255, 255);
    doc.setFontSize(24);
    doc.text('Masuria Lake District', 10, 20);
    doc.setFontSize(16);
    doc.text('AI-Powered Environmental Analysis Report', 10, 30);

    // Report metadata
    doc.setTextColor(100, 100, 100);
    doc.setFontSize(10);
    doc.text(`Generated: ${new Date().toLocaleDateString()} ${new Date().toLocaleTimeString()}`, pageWidth - 15, 50, { align: 'right' });
    doc.text('Report ID: MAL-' + Math.random().toString(36).substr(2, 9).toUpperCase(), pageWidth - 15, 55, { align: 'right' });

    // Executive Summary
    addSectionHeader('Executive Summary', 70);
    doc.setTextColor(0, 0, 0);
    doc.setFontSize(11);
    const summary = `This report presents an AI-driven analysis of environmental changes in the Masuria Lake District, focusing on water body dynamics, vegetation patterns, and climate indicators. The analysis combines historical satellite data with advanced predictive modeling to forecast environmental conditions for the year ${year}.`;
    const summaryLines = doc.splitTextToSize(summary, pageWidth - 20);
    doc.text(summaryLines, 10, 85);

    // Prediction Results
    addSectionHeader('Prediction Results', 115);
    doc.setFontSize(12);
    doc.setTextColor(0, 0, 0);

    if (prediction) {
      // Create a table-like structure for metrics
      const metrics = [
        ['Metric', 'Value', 'Trend', 'Confidence'],
        ['Water Level', `${prediction.waterLevel} km²`, '▼ Declining', `${prediction.confidence}%`],
        ['Temperature', `${prediction.temperature}°C`, '▲ Increasing', '92%'],
        ['Precipitation', `${prediction.precipitation} mm`, '▼ Declining', '89%'],
        ['Vegetation Index', prediction.vegetationIndex.toFixed(2), '▼ Declining', '87%']
      ];

      let y = 130;
      metrics.forEach((row, i) => {
        const isHeader = i === 0;
        if (isHeader) {
          doc.setFillColor(240, 240, 240);
          doc.rect(10, y - 5, pageWidth - 20, 8, 'F');
          doc.setFont(undefined, 'bold');
        } else {
          doc.setFont(undefined, 'normal');
        }
        doc.text(row[0], 15, y);
        doc.text(row[1], 70, y);
        doc.text(row[2], 120, y);
        doc.text(row[3], 170, y);
        y += 10;
      });

      // Model Description
      y += 10;
      doc.setFontSize(11);
      const modelDesc = doc.splitTextToSize(prediction.description, pageWidth - 20);
      doc.text(modelDesc, 10, y);
    }

    // Environmental Impact Analysis
    addSectionHeader('Environmental Impact Analysis', 190);
    
    // Impact Categories with detailed analysis
    const impacts = [
      {
        title: 'Ecosystem Impact',
        details: [
          'Reduced habitat for native fish species affecting biodiversity',
          'Changes in shoreline vegetation patterns indicating stress',
          'Altered migration patterns for water birds',
          'Potential loss of wetland ecosystems'
        ]
      },
      {
        title: 'Tourism & Economic Impact',
        details: [
          'Reduced water access at popular beaches affecting tourism',
          'Changes to sailing routes between lakes',
          'Potential 15-30% decrease in tourism revenue',
          'Impact on local businesses and employment'
        ]
      },
      {
        title: 'Water Resources',
        details: [
          'Groundwater levels showing 5-7% decline',
          'Increased seasonal fluctuations in lake levels',
          'Changes in water quality and temperature',
          'Challenges for local water management'
        ]
      }
    ];

    let y = 205;
    impacts.forEach(impact => {
      doc.setFontSize(12);
      doc.setFont(undefined, 'bold');
      doc.text(impact.title, 10, y);
      doc.setFont(undefined, 'normal');
      doc.setFontSize(10);
      y += 8;
      impact.details.forEach(detail => {
        doc.text('• ' + detail, 15, y);
        y += 6;
      });
      y += 5;
    });

    // Recommendations
    addSectionHeader('Recommendations', y + 10);
    y += 25;
    doc.setFontSize(10);
    const recommendations = [
      'Implement comprehensive water conservation measures',
      'Develop sustainable tourism practices',
      'Establish protected zones for critical habitats',
      'Monitor and maintain minimum water levels',
      'Engage local communities in conservation efforts'
    ];
    recommendations.forEach(rec => {
      doc.text('• ' + rec, 15, y);
      y += 6;
    });

    // Footer
    doc.setFillColor(0, 51, 102);
    doc.rect(0, pageHeight - 20, pageWidth, 20, 'F');
    doc.setTextColor(255, 255, 255);
    doc.setFontSize(8);
    doc.text('Generated by Masuria Lake District AI Analysis System | Confidential Report', pageWidth/2, pageHeight - 10, { align: 'center' });
    doc.text('Page 1/1', pageWidth - 20, pageHeight - 10);

    // Save the PDF
    doc.save('masuria-environmental-analysis-report.pdf');
      doc.text(`Year: ${year}`, 20, 65);
      doc.text(`Water Level: ${prediction.waterLevel} km²`, 20, 75);
      doc.text(`Temperature: ${prediction.temperature}°C`, 20, 85);
      doc.text(`Precipitation: ${prediction.precipitation} mm`, 20, 95);
      doc.text(`Vegetation Index: ${prediction.vegetationIndex}`, 20, 105);
      doc.text(`Confidence: ${prediction.confidence}%`, 20, 115);
      
      // Description with word wrap
      doc.setFontSize(11);
      const splitDescription = doc.splitTextToSize(prediction.description, pageWidth - 40);
      doc.text(splitDescription, 20, 130);
    }
    
    // Environmental Impact Section
    doc.setFontSize(16);
    doc.text('Environmental Impact Analysis', 20, 160);
    
    doc.setFontSize(12);
    doc.text('Ecosystem Impact:', 20, 175);
    doc.setFontSize(11);
    doc.text('• Reduced habitat for native fish species', 25, 185);
    doc.text('• Changes in shoreline vegetation patterns', 25, 195);
    doc.text('• Altered migration patterns for water birds', 25, 205);
    
    doc.text('Tourism Impact:', 20, 220);
    doc.text('• Reduced water access at some popular beaches', 25, 230);
    doc.text('• Changes to sailing routes between lakes', 25, 240);
    doc.text('• Potential economic impact on local businesses', 25, 250);
    
    // Footer
    doc.setFontSize(10);
    doc.setTextColor(100, 100, 100);
    doc.text('Generated by Masuria Lake District AI Analysis System', pageWidth/2, 280, { align: 'center' });
    
    // Save the PDF
    doc.save('masuria-ai-analysis-report.pdf');
  };

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
                      onClick={generatePDF}
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