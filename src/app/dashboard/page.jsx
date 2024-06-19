"use client"
import * as React from "react";
import { BarChart } from "@mui/x-charts/BarChart";
import { axisClasses } from "@mui/x-charts/ChartsAxis";
import sample from "@/data/sample";


const valueFormatter = (value) => value.toFixed(2); // Format the value to two decimal places

export default function BarsDataset() {
  // Transform sample data into series format
  const series = [
    { dataKey: "yhat_lower", label: "Lowest Probability", valueFormatter },
    { dataKey: "yhat", label: "Prediction", valueFormatter },
    { dataKey: "yhat_upper", label: "Highest Probability", valueFormatter },
  ];

  // Transform sample data into the format required by the chart
  const chartDataset = sample.map((data) => ({
    ...data,
    ds: data.ds, // This ensures 'ds' remains as it is in sample
  }));

  return (
    <BarChart
      dataset={chartDataset}
      xAxis={[{ scaleType: "band", dataKey: "ds" }]}
      series={series}
      yAxis={[{ label: "Value" }]} // Adjust yAxis label as per your data
      width={800} // Adjust chart width as needed
      height={400} // Adjust chart height as needed
      sx={{
        [`.${axisClasses.left} .${axisClasses.label}`]: {
          transform: "translate(-20px, 0)",
        },
      }}
    />
  );
}
