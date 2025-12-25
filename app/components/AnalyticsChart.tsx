"use client";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

export default function AnalyticsChart({ data }: { data: any[] }) {
  return (
    <div className="h-64 w-full bg-white p-4">
      <h3 className="text-sm font-semibold text-gray-500 mb-4 uppercase">
        Aylık Harcama Analizi
      </h3>
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={data}>
          <CartesianGrid strokeDasharray="3 3" vertical={false} />
          <XAxis
            dataKey="name"
            fontSize={12}
            tickLine={false}
            axisLine={false}
          />
          <YAxis fontSize={12} tickLine={false} axisLine={false} />
          <Tooltip
            cursor={{ fill: "#f3f4f6" }}
            contentStyle={{ borderRadius: "8px", border: "none" }}
          />
          <Bar
            dataKey="price"
            fill="#4f46e5"
            radius={[4, 4, 0, 0]}
            barSize={40}
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
