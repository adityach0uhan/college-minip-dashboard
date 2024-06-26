'use client';
import * as React from 'react';
import { useState, useEffect } from 'react';
import { PieChart, pieArcLabelClasses } from '@mui/x-charts/PieChart';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import product2 from '../../data/json/output/output2.js';
import product3 from '../../data/json/output/output3.js';

const valueFormatter = (value) => value.toFixed(1);

const sizing = {
    margin: { right: 5 },
    width: 400,
    height: 400,
    legend: { hidden: true }
};

const getArcLabel = (params, TOTAL) => {
    const percent = params.value / TOTAL;
    return `${(percent * 100).toFixed(0)}%`;
};

export default function PieChartWithDailyData() {
    const [selectedMonth, setSelectedMonth] = useState(
        new Date().getMonth() + 1
    ); // Default to current month
    const [selectedDay, setSelectedDay] = useState(1); // Default day set to 1
    const [dailyDataProduct1, setDailyDataProduct1] = useState([]);
    const [dailyDataProduct2, setDailyDataProduct2] = useState([]);

    useEffect(() => {
        fetchDailyData(selectedMonth, selectedDay); // Fetch data initially for the default month and day
    }, []); // Empty dependency array to run once on component mount

    const monthChange = (event) => {
        const selectedMonth = event.target.value;
        setSelectedMonth(selectedMonth);
        setSelectedDay(1); // Reset day to 1
        fetchDailyData(selectedMonth, 1); // Fetch data for the newly selected month and day
    };

    const dayChange = (event) => {
        const selectedDay = event.target.value;
        setSelectedDay(selectedDay);
        fetchDailyData(selectedMonth, selectedDay); // Fetch data for the newly selected day
    };

    const fetchDailyData = (month, day) => {
        const year = new Date().getFullYear();
        const formattedMonth = month.toString().padStart(2, '0');
        const formattedDay = day.toString().padStart(2, '0');
        const datePrefix = `${year}-${formattedMonth}-${formattedDay}`;

        const dataProduct1 = product2.filter((item) =>
            item.ds.startsWith(datePrefix)
        );
        const dataProduct2 = product3.filter((item) =>
            item.ds.startsWith(datePrefix)
        );

        setDailyDataProduct1(dataProduct1);
        setDailyDataProduct2(dataProduct2);
    };

    const TOTAL1 =
        dailyDataProduct1.length > 0
            ? dailyDataProduct1
                  .map((item) => item.yhat)
                  .reduce((a, b) => a + b, 0)
            : 0;
    const TOTAL2 =
        dailyDataProduct2.length > 0
            ? dailyDataProduct2
                  .map((item) => item.yhat)
                  .reduce((a, b) => a + b, 0)
            : 0;

    const pieDataProduct1 = dailyDataProduct1.flatMap((item) => [
        {
            label: `${item.ds} (Prediction)`,
            value: item.yhat,
            color: '#0088FE'
        },
        {
            label: `${item.ds} (Lowest)`,
            value: item.yhat_lower,
            color: '#00C49F'
        },
        {
            label: `${item.ds} (Highest)`,
            value: item.yhat_upper,
            color: '#FFBB28'
        }
    ]);

    const pieDataProduct2 = dailyDataProduct2.flatMap((item) => [
        {
            label: `${item.ds} (Prediction)`,
            value: item.yhat,
            color: '#0088FE'
        },
        {
            label: `${item.ds} (Lowest)`,
            value: item.yhat_lower,
            color: '#00C49F'
        },
        {
            label: `${item.ds} (Highest)`,
            value: item.yhat_upper,
            color: '#FFBB28'
        }
    ]);

    return (
        <>
            <div className='w-full h-12 mt-7'>
                <div className='w-full flex gap-5'>
                    <FormControl fullWidth>
                        <InputLabel id='month-select-label'>Month</InputLabel>
                        <Select
                            labelId='month-select-label'
                            id='month-select'
                            value={selectedMonth}
                            label='Month'
                            onChange={monthChange}>
                            {Array.from({ length: 12 }, (_, i) => (
                                <MenuItem key={i + 1} value={i + 1}>
                                    {new Date(0, i).toLocaleString('default', {
                                        month: 'long'
                                    })}
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                    <FormControl fullWidth>
                        <InputLabel id='day-select-label'>Day</InputLabel>
                        <Select
                            labelId='day-select-label'
                            id='day-select'
                            value={selectedDay}
                            label='Day'
                            onChange={dayChange}>
                            {Array.from({ length: 31 }, (_, i) => (
                                <MenuItem key={i + 1} value={i + 1}>
                                    {i + 1}
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                </div>
            </div>
            <div className='mt-6 flex gap-1'>
                <h3>Product 1 Data</h3>
                {pieDataProduct1.length > 0 ? (
                    <PieChart
                        series={[
                            {
                                outerRadius: 80,
                                data: pieDataProduct1,
                                arcLabel: (params) =>
                                    getArcLabel(params, TOTAL1)
                            }
                        ]}
                        sx={{
                            [`& .${pieArcLabelClasses.root}`]: {
                                fill: 'white',
                                fontSize: 14
                            }
                        }}
                        {...sizing}
                    />
                ) : (
                    <div>
                        No data available for Product 1 on the selected date.
                    </div>
                )}
                <h3>Product 2 Data</h3>
                {pieDataProduct2.length > 0 ? (
                    <PieChart
                        series={[
                            {
                                outerRadius: 80,
                                data: pieDataProduct2,
                                arcLabel: (params) =>
                                    getArcLabel(params, TOTAL2)
                            }
                        ]}
                        sx={{
                            [`& .${pieArcLabelClasses.root}`]: {
                                fill: 'white',
                                fontSize: 14
                            }
                        }}
                        {...sizing}
                    />
                ) : (
                    <div>
                        No data available for Product 2 on the selected date.
                    </div>
                )}
            </div>
            <div className='mt-6'>
                <h3>Color Indicators</h3>
                <ul>
                    <li>
                        <span style={{ color: '#0088FE' }}>■</span> Prediction
                    </li>
                    <li>
                        <span style={{ color: '#00C49F' }}>■</span> Lowest
                        Probability
                    </li>
                    <li>
                        <span style={{ color: '#FFBB28' }}>■</span> Highest
                        Probability
                    </li>
                </ul>
            </div>
        </>
    );
}
