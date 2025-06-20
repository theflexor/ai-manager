'use client';

import {
  Bar,
  BarChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';

// Mock data for the chart
const data = [
  {
    name: 'Jan',
    total: 180,
  },
  {
    name: 'Feb',
    total: 200,
  },
  {
    name: 'Mar',
    total: 220,
  },
  {
    name: 'Apr',
    total: 240,
  },
  {
    name: 'May',
    total: 249,
  },
  {
    name: 'Jun',
    total: 249,
  },
];

export function SubscriptionsSummary() {
  return (
    <ResponsiveContainer width="100%" height={250}>
      <BarChart data={data}>
        <XAxis
          dataKey="name"
          stroke="#888888"
          fontSize={12}
          tickLine={false}
          axisLine={false}
        />
        <YAxis
          stroke="#888888"
          fontSize={12}
          tickLine={false}
          axisLine={false}
          tickFormatter={(value) => `$${value}`}
        />
        <Tooltip
          formatter={(value: number) => [`$${value}`, 'Monthly Spending']}
          cursor={{ fill: 'rgba(0, 0, 0, 0.1)' }}
        />
        <Bar
          dataKey="total"
          fill="currentColor"
          radius={[4, 4, 0, 0]}
          className="fill-primary"
        />
      </BarChart>
    </ResponsiveContainer>
  );
}

