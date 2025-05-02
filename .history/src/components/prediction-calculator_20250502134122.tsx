"use client"

import type React from "react"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { BarChart, Calendar, Droplet, Thermometer, Wind, Leaf, AlertTriangle, LineChart, Download } from "lucide-react"
import { Progress } from "@/components/ui/progress"
import { jsPDF } from 'jspdf';
import { cn } from "@/lib/utils"

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
    const margin = 20;
    const contentWidth = pageWidth - (margin * 2);
    
    // Helper functions
    const addSectionHeader = (text: string, y: number) => {
      doc.setFillColor(0, 51, 102);
      doc.rect(0, y - 6, pageWidth, 12, 'F');
      doc.setTextColor(255, 255, 255);
      doc.setFontSize(14);
      doc.text(text, margin, y);
      return y + 20; // Increased spacing after header
    };

    const addSubHeader = (text: string, y: number) => {
      doc.setTextColor(0, 51, 102);
      doc.setFontSize(12);
      doc.setFont(undefined, 'bold');
      doc.text(text, margin, y);
      doc.setFont(undefined, 'normal');
      return y + 12; // Increased spacing after subheader
    };

    const addParagraph = (text: string, y: number, indent: number = 0) => {
      doc.setTextColor(60, 60, 60);
      doc.setFontSize(10);
      const lines = doc.splitTextToSize(text, contentWidth - indent);
      doc.text(lines, margin + indent, y);
      return y + (lines.length * 6) + 8; // Adjusted line spacing
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

    // Current Analysis Results
    if (prediction) {
      doc.addPage();
      yPos = 20;
      yPos = addSectionHeader('Current Analysis Results', yPos);
      
      // Create metrics table
      const metrics = [
        ['Metric', 'Current Value', 'Trend', 'Impact Level'],
        ['Water Level', `${prediction.waterLevel} km²`, '▼ Declining', 'High'],
        ['Temperature', `${prediction.temperature}°C`, '▲ Increasing', 'Moderate'],
        ['Precipitation', `${prediction.precipitation} mm`, '▼ Declining', 'High'],
        ['Vegetation Index', prediction.vegetationIndex.toFixed(2), '▼ Declining', 'Severe']
      ];

      const colWidths = [45, 40, 35, 35];
      const startX = margin;
      
      metrics.forEach((row, rowIndex) => {
        let x = startX;
        const isHeader = rowIndex === 0;
        
        if (isHeader) {
          doc.setFillColor(240, 240, 240);
          doc.rect(margin - 2, yPos - 5, contentWidth + 4, 10, 'F');
          doc.setFont(undefined, 'bold');
        } else {
          doc.setFont(undefined, 'normal');
        }
        
        doc.setFontSize(10);
        doc.setTextColor(0, 0, 0);
        
        row.forEach((cell, colIndex) => {
          doc.text(cell, x, yPos);
          x += colWidths[colIndex];
        });
        
        yPos += 12;
      });

      yPos += 5;
      yPos = addParagraph(prediction.description, yPos);
    }

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
    <section className="relative py-16 overflow-hidden">
      {/* Background gradient effect */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-white to-emerald-50 opacity-70"></div>
      <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-10"></div>
      
      <div className="relative container px-4 sm:px-6 mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-slate-900 mb-4">
            Water Future Predictor
          </h2>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto">
            Explore the future of Masuria's water ecosystem through our advanced AI prediction model
          </p>
        </div>

        <div className="grid gap-8 lg:grid-cols-2">
          {/* Left Column - Input and Parameters */}
          <div className="space-y-6">
            <div className="backdrop-blur-xl bg-white/70 p-8 rounded-2xl shadow-lg border border-white/20">
              <h3 className="text-2xl font-semibold text-slate-800 mb-6">Prediction Parameters</h3>

              <div className="space-y-6">
                <div className="space-y-3">
                  <Label htmlFor="year" className="text-base">Target Year (2025-2050)</Label>
                  <div className="flex gap-4">
                    <Input
                      id="year"
                      type="number"
                      min={currentYear}
                      max={2050}
                      value={year}
                      onChange={handleYearChange}
                      className="flex-1 text-lg h-12 rounded-xl border-slate-200 focus:ring-2 focus:ring-blue-500"
                    />
                    <Button
                      onClick={calculatePrediction}
                      disabled={isCalculating || !year}
                      className={cn(
                        "h-12 px-6 rounded-xl font-medium transition-all duration-300",
                        isCalculating 
                          ? "bg-slate-100 text-slate-400"
                          : "bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white shadow-lg hover:shadow-xl hover:scale-105"
                      )}
                    >
                      {isCalculating ? (
                        <div className="flex items-center gap-2">
                          <div className="animate-spin h-4 w-4 border-2 border-white/30 border-t-white rounded-full"></div>
                          Processing...
                        </div>
                      ) : (
                        "Generate Prediction"
                      )}
                    </Button>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <Card className="backdrop-blur-xl bg-white/50 border-white/20">
                    <CardContent className="p-4">
                      <div className="flex items-center gap-3 mb-2">
                        <div className="p-2 rounded-lg bg-blue-100">
                          <Calendar className="h-5 w-5 text-blue-600" />
                        </div>
                        <span className="font-medium text-slate-800">Historical Data</span>
                      </div>
                      <p className="text-sm text-slate-600">
                        Analysis based on data from year 2000 onwards
                      </p>
                    </CardContent>
                  </Card>

                  <Card className="backdrop-blur-xl bg-white/50 border-white/20">
                    <CardContent className="p-4">
                      <div className="flex items-center gap-3 mb-2">
                        <div className="p-2 rounded-lg bg-emerald-100">
                          <BarChart className="h-5 w-5 text-emerald-600" />
                        </div>
                        <span className="font-medium text-slate-800">AI Model</span>
                      </div>
                      <p className="text-sm text-slate-600">
                        96% accuracy on historical predictions
                      </p>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </div>

            {prediction && (
              <div className="backdrop-blur-xl bg-white/70 p-8 rounded-2xl shadow-lg border border-white/20 animate-fadeIn">
                <div className="flex justify-between items-center mb-6">
                  <h3 className="text-2xl font-semibold text-slate-800">Prediction Results</h3>
                  <div className="flex items-center gap-2">
                    <div className={cn(
                      "px-3 py-1 rounded-full text-sm font-medium",
                      prediction.confidence >= 90 
                        ? "bg-emerald-100 text-emerald-700" 
                        : prediction.confidence >= 75 
                        ? "bg-yellow-100 text-yellow-700"
                        : "bg-red-100 text-red-700"
                    )}>
                      {prediction.confidence}% Confidence
                    </div>
                  </div>
                </div>

                <p className="text-slate-600 mb-8 leading-relaxed">{prediction.description}</p>

                <div className="space-y-6">
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <div className="flex items-center gap-3">
                        <div className="p-2 rounded-lg bg-blue-100">
                          <Droplet className="h-5 w-5 text-blue-600" />
                        </div>
                        <span className="font-medium text-slate-800">Water Level</span>
                      </div>
                      <span className="text-lg font-semibold text-blue-600">{prediction.waterLevel} km²</span>
                    </div>
                    <div className="relative h-3 rounded-full bg-blue-100 overflow-hidden">
                      <div 
                        className="absolute inset-y-0 left-0 bg-gradient-to-r from-blue-500 to-blue-600 rounded-full transition-all duration-1000"
                        style={{ width: `${(prediction.waterLevel / 8000) * 100}%` }}
                      />
                    </div>
                  </div>

                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <div className="flex items-center gap-3">
                        <div className="p-2 rounded-lg bg-amber-100">
                          <Thermometer className="h-5 w-5 text-amber-600" />
                        </div>
                        <span className="font-medium text-slate-800">Temperature</span>
                      </div>
                      <span className="text-lg font-semibold text-amber-600">{prediction.temperature}°C</span>
                    </div>
                    <div className="relative h-3 rounded-full bg-amber-100 overflow-hidden">
                      <div 
                        className="absolute inset-y-0 left-0 bg-gradient-to-r from-amber-500 to-amber-600 rounded-full transition-all duration-1000"
                        style={{ width: `${(prediction.temperature / 15) * 100}%` }}
                      />
                    </div>
                  </div>

                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <div className="flex items-center gap-3">
                        <div className="p-2 rounded-lg bg-cyan-100">
                          <Wind className="h-5 w-5 text-cyan-600" />
                        </div>
                        <span className="font-medium text-slate-800">Precipitation</span>
                      </div>
                      <span className="text-lg font-semibold text-cyan-600">{prediction.precipitation} mm</span>
                    </div>
                    <div className="relative h-3 rounded-full bg-cyan-100 overflow-hidden">
                      <div 
                        className="absolute inset-y-0 left-0 bg-gradient-to-r from-cyan-500 to-cyan-600 rounded-full transition-all duration-1000"
                        style={{ width: `${(prediction.precipitation / 800) * 100}%` }}
                      />
                    </div>
                  </div>

                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <div className="flex items-center gap-3">
                        <div className="p-2 rounded-lg bg-emerald-100">
                          <Leaf className="h-5 w-5 text-emerald-600" />
                        </div>
                        <span className="font-medium text-slate-800">Vegetation Index</span>
                      </div>
                      <span className="text-lg font-semibold text-emerald-600">{prediction.vegetationIndex.toFixed(2)}</span>
                    </div>
                    <div className="relative h-3 rounded-full bg-emerald-100 overflow-hidden">
                      <div 
                        className="absolute inset-y-0 left-0 bg-gradient-to-r from-emerald-500 to-emerald-600 rounded-full transition-all duration-1000"
                        style={{ width: `${(prediction.vegetationIndex / 1) * 100}%` }}
                      />
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Right Column - Insights and Comparison */}
          <div>
            <div className="backdrop-blur-xl bg-white/70 p-8 rounded-2xl shadow-lg border border-white/20">
              <Tabs defaultValue="comparison">
                <TabsList className="grid w-full grid-cols-2 mb-8 p-1 bg-slate-100 rounded-lg gap-1">
                  <TabsTrigger 
                    value="comparison"
                    className="rounded-md py-2.5 data-[state=active]:bg-white data-[state=active]:shadow-sm"
                  >
                    Historical Comparison
                  </TabsTrigger>
                  <TabsTrigger 
                    value="insights"
                    className="rounded-md py-2.5 data-[state=active]:bg-white data-[state=active]:shadow-sm"
                  >
                    AI Insights
                  </TabsTrigger>
                </TabsList>

                <TabsContent value="comparison" className="space-y-8">
                  <div className="space-y-6">
                    <h3 className="text-xl font-semibold text-slate-800">Masuria in 2000</h3>
                    <div className="grid gap-4">
                      {[
                        { icon: "🌳", color: "bg-emerald-100", title: "Lush Vegetation", desc: "Dense forests and fertile farmland" },
                        { icon: "💧", color: "bg-blue-100", title: "High Water Levels", desc: "Full lakes with consistent shorelines" },
                        { icon: "🌤", color: "bg-amber-100", title: "Stable Climate", desc: "No major hydrological stress" },
                        { icon: "🏞", color: "bg-purple-100", title: "Natural Landscape", desc: "Minimal land fragmentation" }
                      ].map((item, i) => (
                        <div key={i} className={cn("p-4 rounded-xl flex items-start gap-4", item.color)}>
                          <span className="text-2xl">{item.icon}</span>
                          <div>
                            <h4 className="font-medium text-slate-800">{item.title}</h4>
                            <p className="text-sm text-slate-600">{item.desc}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="space-y-6">
                    <h3 className="text-xl font-semibold text-slate-800">Predicted Changes</h3>
                    <div className="grid gap-4">
                      {[
                        { icon: "🍂", color: "bg-yellow-100", title: "Vegetation Changes", desc: "Shift to yellow-brown tones" },
                        { icon: "🏖", color: "bg-orange-100", title: "Exposed Shorelines", desc: "Contracted lake boundaries" },
                        { icon: "⚠️", color: "bg-red-100", title: "Water Stress", desc: "Fragmented water networks" },
                        { icon: "🏗", color: "bg-slate-100", title: "Land Use Changes", desc: "Increased development pressure" }
                      ].map((item, i) => (
                        <div key={i} className={cn("p-4 rounded-xl flex items-start gap-4", item.color)}>
                          <span className="text-2xl">{item.icon}</span>
                          <div>
                            <h4 className="font-medium text-slate-800">{item.title}</h4>
                            <p className="text-sm text-slate-600">{item.desc}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </TabsContent>

                <TabsContent value="insights" className="space-y-8">
                  <div className="p-6 bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl border border-blue-200">
                    <h3 className="text-lg font-semibold text-blue-800 mb-3">AI Model Insight</h3>
                    <p className="text-blue-700 leading-relaxed">
                      Our predictions are generated using advanced machine learning models trained on 20+ years of 
                      satellite imagery and environmental data. The model simulates regional climate evolution based 
                      on current trends and historical patterns.
                    </p>
                  </div>

                  <div className="space-y-6">
                    <h3 className="text-xl font-semibold text-slate-800">Key Findings</h3>
                    <div className="grid gap-4">
                      <div className="p-6 rounded-xl bg-gradient-to-br from-slate-50 to-slate-100 border border-slate-200">
                        <div className="flex items-center gap-3 mb-3">
                          <div className="p-2 rounded-lg bg-red-100">
                            <AlertTriangle className="h-5 w-5 text-red-600" />
                          </div>
                          <h4 className="font-medium text-slate-800">Water Resource Risk</h4>
                        </div>
                        <p className="text-sm text-slate-600 leading-relaxed">
                          Without intervention, Masuria could lose up to 25% of its surface water by 2050, 
                          significantly impacting tourism, agriculture, and local ecosystems.
                        </p>
                      </div>

                      <div className="p-6 rounded-xl bg-gradient-to-br from-slate-50 to-slate-100 border border-slate-200">
                        <div className="flex items-center gap-3 mb-3">
                          <div className="p-2 rounded-lg bg-amber-100">
                            <Leaf className="h-5 w-5 text-amber-600" />
                          </div>
                          <h4 className="font-medium text-slate-800">Biodiversity Impact</h4>
                        </div>
                        <p className="text-sm text-slate-600 leading-relaxed">
                          Changing water levels will alter habitats for numerous species, with potential local 
                          extinctions of water-dependent flora and fauna.
                        </p>
                      </div>

                      <div className="p-6 rounded-xl bg-gradient-to-br from-slate-50 to-slate-100 border border-slate-200">
                        <div className="flex items-center gap-3 mb-3">
                          <div className="p-2 rounded-lg bg-blue-100">
                            <LineChart className="h-5 w-5 text-blue-600" />
                          </div>
                          <h4 className="font-medium text-slate-800">Economic Impact</h4>
                        </div>
                        <p className="text-sm text-slate-600 leading-relaxed">
                          Tourism revenue could decrease by 15-30% if water recreation opportunities diminish due to 
                          reduced lake sizes and water quality issues.
                        </p>
                      </div>
                    </div>
                  </div>

                  <Button
                    onClick={generatePDF}
                    className="w-full h-12 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white rounded-xl font-medium shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
                  >
                    <Download className="mr-2 h-5 w-5" />
                    Download Full Analysis Report
                  </Button>
                </TabsContent>
              </Tabs>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
} 