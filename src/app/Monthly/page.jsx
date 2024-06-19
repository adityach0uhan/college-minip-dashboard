"use client";
import * as React from "react";
import { BarChart } from "@mui/x-charts/BarChart";
import sample from "@/data/sample";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";

const valueFormatter = (value) => value.toFixed(1); // Format the value to two decimal places

export default function Page() {
  const [products, setProducts] = React.useState("");
  const [month, setMonth] = React.useState("2024-06");
  const [monthData, setMonthData] = React.useState([]);

  const productChange = (event) => {
    setProducts(event.target.value);
  };

  const monthChange = (event) => {
    const selectedMonth = event.target.value;
    setMonth(selectedMonth);
    getData(`2024-0${selectedMonth}`);
  };

  const series = [
    { dataKey: "yhat_lower", label: "Lowest Probability", valueFormatter },
    { dataKey: "yhat", label: "Prediction", valueFormatter },
    { dataKey: "yhat_upper", label: "Highest Probability", valueFormatter },
  ];

  const getData = (month) => {
    const data = sample
      .filter((item) => item.ds.startsWith(month ))
      .map((item) => ({
        ...item,
        ds: item.ds,
      }));
    setMonthData(data);
  };
  React.useEffect(() => {
    setMonth("2024-06")
  },[])

  return (
    <>
      <div className="w-full h-12 mt-7 ">
        <div className="w-1/3 flex gap-5">
          <FormControl fullWidth>
            <InputLabel id="demo-simple-select-label">Products</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={products}
              label="Products"
              onChange={productChange}
            >
              <MenuItem value={10}>Grocery</MenuItem>
              <MenuItem value={20}>Dairy</MenuItem>
              <MenuItem value={30}>Thirty</MenuItem>
            </Select>
          </FormControl>
          <FormControl fullWidth>
            <InputLabel id="demo-simple-select-label">Month</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={month}
              label="Months"
              onChange={monthChange}
            >
              <MenuItem value={1}>Jan</MenuItem>
              <MenuItem value={2}>Feb</MenuItem>
              <MenuItem value={3}>Mar</MenuItem>
              <MenuItem value={4}>Apr</MenuItem>
              <MenuItem value={5}>May</MenuItem>
              <MenuItem value={6}>June</MenuItem>
              <MenuItem value={7}>July</MenuItem>
              <MenuItem value={8}>Aug</MenuItem>
              <MenuItem value={9}>Sep</MenuItem>
              <MenuItem value={10}>Oct</MenuItem>
              <MenuItem value={11}>Nov</MenuItem>
              <MenuItem value={12}>Dec</MenuItem>
            </Select>
          </FormControl>
        </div>
      </div>
      <div className="mt-6">
        <BarChart
          dataset={monthData}
          xAxis={[{ scaleType: "band", dataKey: "ds" }]}
          series={series}
          yAxis={[{ label: "Value" }]}
          width={1200}
          height={400}
        />
      </div>
    </>
  );
}
