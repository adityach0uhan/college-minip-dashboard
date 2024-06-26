'use client';
import * as React from 'react';
import { useState, useEffect } from 'react';
import { BarChart } from '@mui/x-charts/BarChart';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import product2 from '../../data/json/output/output2.js';
import product3 from '../../data/json/output/output3.js';

const valueFormatter = (value) => value.toFixed(1);

const weeksInMonth = 4;

export default function Page() {
    const [products, setProducts] = useState('Product1'); // Default product set to Product1
    const [month, setMonth] = useState(new Date().getMonth() + 1); // Default month set to current month (1-indexed)
    const [week, setWeek] = useState(1); // Default week set to first week
    const [weekData, setWeekData] = useState([]);

    useEffect(() => {
        getData(month, week); // Fetch data initially for the default month and week
    }, []); // Empty dependency array to run once on component mount

    const productChange = (event) => {
        const selectedProduct = event.target.value;
        setProducts(selectedProduct);
        getData(month, week); // Fetch data for the newly selected product
    };

    const monthChange = (event) => {
        const selectedMonth = event.target.value;
        setMonth(selectedMonth);
        setWeek(1); // Reset week to first week of the selected month
        getData(selectedMonth, 1); // Fetch data for the newly selected month and first week
    };

    const weekChange = (event) => {
        const selectedWeek = event.target.value;
        setWeek(selectedWeek);
        getData(month, selectedWeek); // Fetch data for the newly selected week
    };

    const series = [
        {
            dataKey: 'yhat_lower',
            label: 'Lowest Probability',
            valueFormatter
        },
        {
            dataKey: 'yhat',
            label: 'Prediction',
            valueFormatter
        },
        {
            dataKey: 'yhat_upper',
            label: 'Highest Probability',
            valueFormatter
        }
    ];

    const getData = (selectedMonth, selectedWeek) => {
        const year = new Date().getFullYear();
        const startOfWeek = new Date(
            year,
            selectedMonth - 1,
            (selectedWeek - 1) * 7 + 1
        );
        const endOfWeek = new Date(year, selectedMonth - 1, selectedWeek * 7);

        let data = [];
        if (products === 'Product1') {
            data = product2
                .filter((item) => {
                    const itemDate = new Date(item.ds);
                    return itemDate >= startOfWeek && itemDate < endOfWeek;
                })
                .map((item) => ({
                    ...item,
                    ds: item.ds
                }));
        } else if (products === 'Product2') {
            data = product3
                .filter((item) => {
                    const itemDate = new Date(item.ds);
                    return itemDate >= startOfWeek && itemDate < endOfWeek;
                })
                .map((item) => ({
                    ...item,
                    ds: item.ds
                }));
        }

        setWeekData(data);
    };

    return (
        <>
            <div className='w-full text-3xl'>Filters </div>
            <div className='w-full h-12 mt-7 '>
                <div className='w-2/3 flex  gap-5'>
                    <FormControl fullWidth>
                        <InputLabel id='products-select-label'>
                            Products
                        </InputLabel>
                        <Select
                            labelId='products-select-label'
                            id='products-select'
                            value={products}
                            label='Products'
                            onChange={productChange}>
                            <MenuItem value='Product1'>Product 1</MenuItem>
                            <MenuItem value='Product2'>Product 2</MenuItem>
                        </Select>
                    </FormControl>
                    <FormControl fullWidth>
                        <InputLabel id='month-select-label'>Month</InputLabel>
                        <Select
                            labelId='month-select-label'
                            id='month-select'
                            value={month}
                            label='Month'
                            onChange={monthChange}>
                            <MenuItem value={1}>January</MenuItem>
                            <MenuItem value={2}>February</MenuItem>
                            <MenuItem value={3}>March</MenuItem>
                            <MenuItem value={4}>April</MenuItem>
                            <MenuItem value={5}>May</MenuItem>
                            <MenuItem value={6}>June</MenuItem>
                            <MenuItem value={7}>July</MenuItem>
                            <MenuItem value={8}>August</MenuItem>
                            <MenuItem value={9}>September</MenuItem>
                            <MenuItem value={10}>October</MenuItem>
                            <MenuItem value={11}>November</MenuItem>
                            <MenuItem value={12}>December</MenuItem>
                        </Select>
                    </FormControl>
                    <FormControl fullWidth>
                        <InputLabel id='week-select-label'>Week</InputLabel>
                        <Select
                            labelId='week-select-label'
                            id='week-select'
                            value={week}
                            label='Week'
                            onChange={weekChange}>
                            {[...Array(weeksInMonth).keys()].map((i) => (
                                <MenuItem key={i + 1} value={i + 1}>
                                    Week {i + 1}
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                </div>
            </div>
            <div className='mt-10'>
                <BarChart
                    dataset={weekData}
                    xAxis={[{ scaleType: 'band', dataKey: 'ds' }]}
                    series={series}
                    yAxis={[{ label: 'Value' }]}
                    width={1200}
                    height={400}
                />
            </div>
        </>
    );
}
