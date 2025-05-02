"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Brain, Cpu, BarChart2, Database } from "lucide-react"
import { Progress } from "@/components/ui/progress"

export default function AIModelInfo() {
  return (
    <Card className="h-[375.7px]">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <CardTitle>AI Model Performance</CardTitle>
          <div className="flex h-7 w-7 items-center justify-center rounded-full bg-blue-100">
            <Brain className="h-4 w-4 text-blue-600" />
          </div>
        </div>
        <CardDescription>Model trained on Masuria satellite imagery</CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="metrics" className="h-[250px]">
          <TabsList className="grid w-full grid-cols-2 bg-slate-100/80 rounded-lg p-1 gap-1">
            <TabsTrigger 
              value="metrics" 
              className="rounded-md data-[state=active]:bg-white data-[state=active]:text-slate-900 data-[state=active]:shadow-sm"
            >
              Metrics
            </TabsTrigger>
            <TabsTrigger 
              value="architecture"
              className="rounded-md data-[state=active]:bg-white data-[state=active]:text-slate-900 data-[state=active]:shadow-sm"
            >
              Architecture
            </TabsTrigger>
          </TabsList>
          <TabsContent value="metrics" className="pt-4 space-y-4">
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-2">
                  <BarChart2 className="h-4 w-4 text-blue-500" />
                  <span className="text-sm font-medium">Accuracy</span>
                </div>
                <span className="text-sm font-medium">96.2%</span>
              </div>
              <Progress value={96} className="h-2" />
            </div>

            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-2">
                  <BarChart2 className="h-4 w-4 text-blue-500" />
                  <span className="text-sm font-medium">Precision</span>
                </div>
                <span className="text-sm font-medium">94.8%</span>
              </div>
              <Progress value={95} className="h-2" />
            </div>

            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-2">
                  <BarChart2 className="h-4 w-4 text-blue-500" />
                  <span className="text-sm font-medium">Recall</span>
                </div>
                <span className="text-sm font-medium">93.5%</span>
              </div>
              <Progress value={93} className="h-2" />
            </div>

            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-2">
                  <BarChart2 className="h-4 w-4 text-blue-500" />
                  <span className="text-sm font-medium">F1 Score</span>
                </div>
                <span className="text-sm font-medium">94.1%</span>
              </div>
              <Progress value={94} className="h-2" />
            </div>
          </TabsContent>

          <TabsContent value="architecture" className="pt-4">
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <div className="flex h-7 w-7 items-center justify-center rounded-full bg-blue-100 mt-0.5">
                  <Cpu className="h-4 w-4 text-blue-600" />
                </div>
                <div>
                  <h4 className="text-sm font-medium mb-1">Model Architecture</h4>
                  <p className="text-sm text-slate-600">
                    U-Net architecture with ResNet50 backbone, optimized for water body segmentation
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="flex h-7 w-7 items-center justify-center rounded-full bg-blue-100 mt-0.5">
                  <Database className="h-4 w-4 text-blue-600" />
                </div>
                <div>
                  <h4 className="text-sm font-medium mb-1">Training Data</h4>
                  <p className="text-sm text-slate-600">
                    5,200+ satellite images of Masuria from 2015-2023, with manual annotations
                  </p>
                </div>
              </div>

              <div className="mt-4 pt-4 border-t border-slate-200">
                <p className="text-sm text-slate-600">
                  Our model was trained on Masuria satellite imagery, focusing on seasonal variations and weather conditions for robust water detection.
                </p>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  )
} 