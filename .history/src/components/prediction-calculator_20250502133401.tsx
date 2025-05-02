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
    
    // Helper functions
    const addSectionHeader = (text: string, y: number) => {
      doc.setFillColor(0, 51, 102);
      doc.rect(0, y - 6, pageWidth, 12, 'F');
      doc.setTextColor(255, 255, 255);
      doc.setFontSize(14);
      doc.text(text, 10, y);
      return y + 15; // Return next Y position
    };

    const addSubHeader = (text: string, y: number) => {
      doc.setTextColor(0, 51, 102);
      doc.setFontSize(12);
      doc.setFont(undefined, 'bold');
      doc.text(text, 10, y);
      doc.setFont(undefined, 'normal');
      return y + 7;
    };

    const addParagraph = (text: string, y: number, indent: number = 0) => {
      doc.setTextColor(60, 60, 60);
      doc.setFontSize(10);
      const lines = doc.splitTextToSize(text, pageWidth - 20 - indent);
      doc.text(lines, 10 + indent, y);
      return y + (lines.length * 5) + 5;
    };

    // Header
    doc.setFillColor(0, 51, 102);
    doc.rect(0, 0, pageWidth, 40, 'F');
    doc.setTextColor(255, 255, 255);
    doc.setFontSize(24);
    doc.text('Masuria Lake District', 10, 20);
    doc.setFontSize(16);
    doc.text('Environmental Change Analysis Report', 10, 30);

    // Report metadata
    doc.setTextColor(100, 100, 100);
    doc.setFontSize(10);
    doc.text(`Generated: ${new Date().toLocaleDateString()} ${new Date().toLocaleTimeString()}`, pageWidth - 15, 50, { align: 'right' });
    doc.text('Report ID: MAL-' + Math.random().toString(36).substr(2, 9).toUpperCase(), pageWidth - 15, 55, { align: 'right' });

    let yPos = 70;

    // Executive Summary
    yPos = addSectionHeader('Executive Summary', yPos);
    yPos = addParagraph(`This comprehensive analysis examines the environmental changes in the Masuria Lake District between 2000 and ${year}, utilizing advanced AI modeling and satellite imagery analysis. The report highlights significant changes in vegetation, water bodies, and climate patterns, providing insights into future environmental trends and their implications.`, yPos);

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
      yPos = addSubHeader(item.title, yPos);
      yPos = addParagraph(item.desc, yPos, 10);
    });

    // AI Model Predictions - Start on same page if space available
    if (yPos < pageHeight - 120) {
      yPos = addSectionHeader('AI Model Predictions (2030)', yPos + 10);
    } else {
      yPos = addSectionHeader('AI Model Predictions (2030)', 20);
    }
    
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

    // Current Analysis Results
    if (prediction) {
      if (yPos > pageHeight - 100) {
        doc.addPage();
        yPos = 20;
      }
      yPos = addSectionHeader('Current Analysis Results', yPos + 10);
      
      const metrics = [
        ['Metric', 'Current Value', 'Trend', 'Impact Level'],
        ['Water Level', `${prediction.waterLevel} km²`, '▼ Declining', 'High'],
        ['Temperature', `${prediction.temperature}°C`, '▲ Increasing', 'Moderate'],
        ['Precipitation', `${prediction.precipitation} mm`, '▼ Declining', 'High'],
        ['Vegetation Index', prediction.vegetationIndex.toFixed(2), '▼ Declining', 'Severe']
      ];

      metrics.forEach((row, i) => {
        if (yPos > pageHeight - 40) {
          doc.addPage();
          yPos = 20;
        }
        const isHeader = i === 0;
        if (isHeader) {
          doc.setFillColor(240, 240, 240);
          doc.rect(10, yPos - 5, pageWidth - 20, 8, 'F');
          doc.setFont(undefined, 'bold');
        } else {
          doc.setFont(undefined, 'normal');
        }
        doc.setFontSize(10);
        doc.setTextColor(0, 0, 0);
        doc.text(row[0], 15, yPos);
        doc.text(row[1], 70, yPos);
        doc.text(row[2], 120, yPos);
        doc.text(row[3], 160, yPos);
        yPos += 8;
      });

      yPos += 10;
      yPos = addParagraph(prediction.description, yPos);
    }

    // Key Findings - Start on new page
    doc.addPage();
    yPos = 20;
    yPos = addSectionHeader('Key Findings & Implications', yPos);

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
      if (yPos > pageHeight - 40) {
        doc.addPage();
        yPos = 20;
      }
      yPos = addSubHeader(finding.title, yPos + 5);
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
      'Engage local communities in conservation efforts and awareness programs',
      'Develop climate-resilient infrastructure and water management systems'
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