"use client";
import * as React from "react";
import { BarChart } from "@mui/x-charts/BarChart";
import { useState, useEffect } from "react";
import sample from "@/data/sample";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";
const valueFormatter = (value) => value.toFixed(1); // Format the value to two decimal places

export default function Home() {
   const [products, setProducts] = useState('');

  const handleChange = (event) => {
    setProducts(event.target.value );
  };
  const series = [
    { dataKey: "yhat_lower", label: "Lowest Probability", valueFormatter },
    { dataKey: "yhat", label: "Prediction", valueFormatter },
    { dataKey: "yhat_upper", label: "Highest Probability", valueFormatter },
  ];

  const chartDataset = sample.map((data) => ({
    ...data,
    ds: data.ds, 
  }));

  return (
    <>
      <div className="w-full h-12 ">
        <div className="w-28">
          
        <FormControl fullWidth>
          <InputLabel id="demo-simple-select-label">Products</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={products}
            label="Products"
            onChange={handleChange}
            >
            <MenuItem value={10}>Grocery</MenuItem>
            <MenuItem value={20}>Dairy</MenuItem>
            <MenuItem value={30}>Thirty</MenuItem>
          </Select>
        </FormControl>
            </div>
      </div>

      <BarChart
        dataset={chartDataset}
        xAxis={[{ scaleType: "band", dataKey: "ds" }]}
        series={series}
        yAxis={[{ label: "Value" }]}
        width={1200}
        height={400}
      />
    </>
  );
}
