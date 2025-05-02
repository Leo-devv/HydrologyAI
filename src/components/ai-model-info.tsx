"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Brain, Cpu, BarChart2, Database } from "lucide-react"
import { Progress } from "@/components/ui/progress"

export default function AIModelInfo() {
  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle>AI Model Performance</CardTitle>
          <div className="flex h-6 w-6 items-center justify-center rounded-full bg-blue-100">
            <Brain className="h-4 w-4 text-blue-600" />
          </div>
        </div>
        <CardDescription>Our custom CNN model trained on Masuria satellite imagery</CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="metrics">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="metrics">Metrics</TabsTrigger>
            <TabsTrigger value="architecture">Architecture</TabsTrigger>
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
            <div className="space-y-3">
              <div className="flex items-start gap-3">
                <Cpu className="h-5 w-5 text-blue-500 mt-0.5" />
                <div>
                  <h4 className="text-sm font-medium">Model Architecture</h4>
                  <p className="text-xs text-muted-foreground">
                    U-Net architecture with ResNet50 backbone, optimized for water body segmentation
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Database className="h-5 w-5 text-blue-500 mt-0.5" />
                <div>
                  <h4 className="text-sm font-medium">Training Data</h4>
                  <p className="text-xs text-muted-foreground">
                    5,200+ satellite images of Masuria from 2015-2023, with manual annotations
                  </p>
                </div>
              </div>

              <div className="border-t pt-3 mt-3">
                <p className="text-xs text-muted-foreground">
                  Our model was trained on a specialized dataset of Masuria satellite imagery, with particular focus on
                  seasonal variations and different weather conditions to ensure robust water detection across all
                  scenarios.
                </p>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  )
} 