"use client"

import {
  Chart,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  Line,
  LinearScale,
  TimeScale,
} from "@/components/ui/chart"

const data = [
  { date: new Date("2018-01-01"), value: 337 },
  { date: new Date("2018-04-01"), value: 340 },
  { date: new Date("2018-07-01"), value: 335 },
  { date: new Date("2018-10-01"), value: 332 },
  { date: new Date("2019-01-01"), value: 330 },
  { date: new Date("2019-04-01"), value: 333 },
  { date: new Date("2019-07-01"), value: 328 },
  { date: new Date("2019-10-01"), value: 325 },
  { date: new Date("2020-01-01"), value: 323 },
  { date: new Date("2020-04-01"), value: 326 },
  { date: new Date("2020-07-01"), value: 322 },
  { date: new Date("2020-10-01"), value: 320 },
  { date: new Date("2021-01-01"), value: 318 },
  { date: new Date("2021-04-01"), value: 321 },
  { date: new Date("2021-07-01"), value: 317 },
  { date: new Date("2021-10-01"), value: 315 },
  { date: new Date("2022-01-01"), value: 313 },
  { date: new Date("2022-04-01"), value: 316 },
  { date: new Date("2022-07-01"), value: 312 },
  { date: new Date("2022-10-01"), value: 310 },
  { date: new Date("2023-01-01"), value: 308 },
  { date: new Date("2023-04-01"), value: 311 },
  { date: new Date("2023-07-01"), value: 309 },
]

export default function WaterCoverageChart() {
  return (
    <ChartContainer className="h-[200px]">
      <Chart x={TimeScale} y={LinearScale}>
        <Line data={data} xKey="date" yKey="value" stroke="#2563eb" strokeWidth={2} />
        <ChartTooltip>
          <ChartTooltipContent
            content={({ datum }) => {
              const date = datum?.date ? new Date(datum.date) : new Date()
              const formattedDate = date.toLocaleDateString("en-US", {
                month: "short",
                year: "numeric",
              })
              const value = datum?.value ?? 0

              return (
                <div className="p-2">
                  <div className="text-xs text-muted-foreground">{formattedDate}</div>
                  <div className="text-sm font-medium">{value} km²</div>
                </div>
              )
            }}
          />
        </ChartTooltip>
      </Chart>
    </ChartContainer>
  )
} 