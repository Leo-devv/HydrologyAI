"use client"

import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, Legend } from 'recharts';

const coverageData = [
  { date: '2020-01', value: 7800 },
  { date: '2021-01', value: 7700 },
  { date: '2022-01', value: 7600 },
  { date: '2023-01', value: 7500 },
  { date: '2024-01', value: 7400 },
  { date: '2025-01', value: 7300 },
];

const seasonalData = [
  {
    season: 'Winter',
    average: 7600,
    min: 7300,
    max: 7800,
    current: 7400,
  },
  {
    season: 'Spring',
    average: 7650,
    min: 7350,
    max: 7850,
    current: 7450,
  },
  {
    season: 'Summer',
    average: 7550,
    min: 7250,
    max: 7750,
    current: 7350,
  },
  {
    season: 'Autumn',
    average: 7500,
    min: 7200,
    max: 7700,
    current: 7300,
  },
];

interface WaterCoverageChartProps {
  activeTab?: 'coverage' | 'seasonal';
}

export default function WaterCoverageChart({ activeTab = 'coverage' }: WaterCoverageChartProps) {
  if (activeTab === 'seasonal') {
    return (
      <div className="w-full h-[200px]">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={seasonalData}
            margin={{
              top: 20,
              right: 5,
              left: 0,
              bottom: 5,
            }}
          >
            <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
            <XAxis
              dataKey="season"
              stroke="#6b7280"
              fontSize={12}
            />
            <YAxis
              domain={[300, 350]}
              stroke="#6b7280"
              fontSize={12}
              tickFormatter={(value) => `${value}km²`}
            />
            <Tooltip
              contentStyle={{
                backgroundColor: 'white',
                border: '1px solid #e5e7eb',
                borderRadius: '6px',
                padding: '8px',
              }}
              formatter={(value: number) => [`${value} km²`, 'Water Coverage']}
            />
            <Legend />
            <Bar dataKey="average" name="Historical Average" fill="#93c5fd" />
            <Bar dataKey="current" name="Current Year" fill="#2563eb" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    );
  }

  return (
    <div className="w-full h-[200px]">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart
          data={coverageData}
          margin={{
            top: 5,
            right: 5,
            left: 0,
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
          <XAxis
            dataKey="date"
            tickFormatter={(value) => {
              const date = new Date(value);
              return `${date.getFullYear().toString().slice(2)}/${(date.getMonth() + 1).toString().padStart(2, '0')}`;
            }}
            stroke="#6b7280"
            fontSize={12}
          />
          <YAxis
            domain={['dataMin - 5', 'dataMax + 5']}
            stroke="#6b7280"
            fontSize={12}
            tickFormatter={(value) => `${value}km²`}
          />
          <Tooltip
            contentStyle={{
              backgroundColor: 'white',
              border: '1px solid #e5e7eb',
              borderRadius: '6px',
              padding: '8px',
            }}
            formatter={(value: number) => [`${value} km²`, 'Water Coverage']}
            labelFormatter={(label) => {
              const date = new Date(label);
              return `${date.toLocaleString('default', { month: 'short' })} ${date.getFullYear()}`;
            }}
          />
          <Line
            type="monotone"
            dataKey="value"
            stroke="#2563eb"
            strokeWidth={2}
            dot={false}
            activeDot={{ r: 4, fill: '#2563eb' }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
} 