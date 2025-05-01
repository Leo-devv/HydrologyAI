"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { AlertTriangle, Leaf, Fish, Home, Droplet } from "lucide-react"

export default function EnvironmentalImpact() {
  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle>Environmental Impact</CardTitle>
          <div className="flex h-6 w-6 items-center justify-center rounded-full bg-amber-100">
            <AlertTriangle className="h-4 w-4 text-amber-600" />
          </div>
        </div>
        <CardDescription>AI-generated insights on detected changes in Masuria</CardDescription>
      </CardHeader>
      <CardContent>
        <Accordion type="single" collapsible className="w-full">
          <AccordionItem value="ecosystem">
            <AccordionTrigger className="flex items-center">
              <div className="flex items-center">
                <Leaf className="mr-2 h-4 w-4 text-green-600" />
                <span>Ecosystem Impact</span>
              </div>
            </AccordionTrigger>
            <AccordionContent>
              <div className="space-y-2 text-sm">
                <p>
                  The 8.2% reduction in water coverage over the past 5 years has implications for Masuria's ecosystems:
                </p>
                <ul className="list-disc pl-5 space-y-1">
                  <li>Reduced habitat for native fish species</li>
                  <li>Changes in shoreline vegetation patterns</li>
                  <li>Altered migration patterns for water birds</li>
                </ul>
                <p className="text-amber-600 font-medium">Risk Level: Moderate</p>
              </div>
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="flood">
            <AccordionTrigger>
              <div className="flex items-center">
                <Home className="mr-2 h-4 w-4 text-blue-600" />
                <span>Tourism Impact</span>
              </div>
            </AccordionTrigger>
            <AccordionContent>
              <div className="space-y-2 text-sm">
                <p>Potential effects on Masuria's tourism industry:</p>
                <ul className="list-disc pl-5 space-y-1">
                  <li>Reduced water access at some popular beaches</li>
                  <li>Changes to sailing routes between lakes</li>
                  <li>Potential economic impact on local businesses</li>
                </ul>
                <p className="text-amber-600 font-medium">Risk Level: Moderate</p>
              </div>
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="scarcity">
            <AccordionTrigger>
              <div className="flex items-center">
                <Droplet className="mr-2 h-4 w-4 text-red-600" />
                <span>Water Resources</span>
              </div>
            </AccordionTrigger>
            <AccordionContent>
              <div className="space-y-2 text-sm">
                <p>Water availability analysis for the Masuria region:</p>
                <ul className="list-disc pl-5 space-y-1">
                  <li>Groundwater levels showing 5-7% decline</li>
                  <li>Increased seasonal fluctuations in lake levels</li>
                  <li>Potential challenges for local water management</li>
                </ul>
                <p className="text-amber-600 font-medium">Risk Level: Moderate</p>
              </div>
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="wildlife">
            <AccordionTrigger>
              <div className="flex items-center">
                <Fish className="mr-2 h-4 w-4 text-cyan-600" />
                <span>Wildlife Impact</span>
              </div>
            </AccordionTrigger>
            <AccordionContent>
              <div className="space-y-2 text-sm">
                <p>Effects on Masuria's wildlife populations:</p>
                <ul className="list-disc pl-5 space-y-1">
                  <li>Changes in fish spawning areas</li>
                  <li>Altered habitats for amphibians</li>
                  <li>Potential stress on protected species</li>
                </ul>
                <p className="text-amber-600 font-medium">Risk Level: Moderate</p>
              </div>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </CardContent>
    </Card>
  )
} 