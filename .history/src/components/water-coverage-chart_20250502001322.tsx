"use client"

import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, Legend } from 'recharts';

const coverageData = [
  { date: '2018-01', value: 337 },
  { date: '2018-04', value: 340 },
  { date: '2018-07', value: 335 },
  { date: '2018-10', value: 332 },
  { date: '2019-01', value: 330 },
  { date: '2019-04', value: 333 },
  { date: '2019-07', value: 328 },
  { date: '2019-10', value: 325 },
  { date: '2020-01', value: 323 },
  { date: '2020-04', value: 326 },
  { date: '2020-07', value: 322 },
  { date: '2020-10', value: 320 },
  { date: '2021-01', value: 318 },
  { date: '2021-04', value: 321 },
  { date: '2021-07', value: 317 },
  { date: '2021-10', value: 315 },
  { date: '2022-01', value: 313 },
  { date: '2022-04', value: 316 },
  { date: '2022-07', value: 312 },
  { date: '2022-10', value: 310 },
  { date: '2023-01', value: 308 },
  { date: '2023-04', value: 311 },
  { date: '2023-07', value: 309 },
];

const seasonalData = [
  {
    season: 'Winter',
    average: 320,
    min: 308,
    max: 337,
    current: 308,
  },
  {
    season: 'Spring',
    average: 327,
    min: 311,
    max: 340,
    current: 311,
  },
  {
    season: 'Summer',
    average: 323,
    min: 309,
    max: 335,
    current: 309,
  },
  {
    season: 'Autumn',
    average: 320,
    min: 310,
    max: 332,
    current: 310,
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