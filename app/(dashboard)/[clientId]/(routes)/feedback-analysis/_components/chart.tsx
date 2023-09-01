"use client";
import React from "react";
import { PieChart, Pie, Cell, Legend, Tooltip } from "recharts";

interface ChartProps {
  positiveAnalyze: number;
  neutralAnalyze: number;
  negativeAnalyze: number;
}

const Chart: React.FC<ChartProps> = ({
  positiveAnalyze,
  neutralAnalyze,
  negativeAnalyze,
}) => {
  const data = [
    { name: "Positive", value: positiveAnalyze },
    { name: "Neutral", value: neutralAnalyze },
    { name: "Negative", value: negativeAnalyze },
  ];

  const COLORS = ["#818cf8", "#22c55e", "#9f1239"];

  return (
    <PieChart width={400} height={400}>
      <Pie
        data={data}
        cx={200}
        cy={200}
        innerRadius={60}
        outerRadius={80}
        fill="#8884d8"
        dataKey="value"
      >
        {data.map((entry, index) => (
          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
        ))}
      </Pie>
      <Legend />
      <Tooltip />
    </PieChart>
  );
};

export default Chart;
