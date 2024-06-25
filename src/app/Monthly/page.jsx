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

export default function Page() {
    const [products, setProducts] = useState('Product1'); // Default product set to Product1
    const [month, setMonth] = useState(new Date().getMonth() + 1); // Default month set to current month (1-indexed)
    const [monthData, setMonthData] = useState([]);

    useEffect(() => {
        getData(month); // Fetch data initially for the default month
    }, []); // Empty dependency array to run once on component mount

    const productChange = (event) => {
        const selectedProduct = event.target.value;
        setProducts(selectedProduct);
    };

    const monthChange = (event) => {
        let selectedMonth = event.target.value;
        setMonth(selectedMonth);
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

    useEffect(() => {
        getData(month); // Fetch data whenever month changes
    }, [month]); // Depend on month state change

    const getData = (selectedMonth) => {
        let data = [];
        if (products === 'Product1') {
            data = product2
                .filter((item) =>
                    item.ds.startsWith(
                        `2024-${selectedMonth.toString().padStart(2, '0')}`
                    )
                )
                .map((item) => ({
                    ...item,
                    ds: item.ds
                }));
        } else if (products === 'Product2') {
            data = product3
                .filter((item) =>
                    item.ds.startsWith(
                        `2024-${selectedMonth.toString().padStart(2, '0')}`
                    )
                )
                .map((item) => ({
                    ...item,
                    ds: item.ds
                }));
        }

        setMonthData(data);
    };

    return (
        <>
            <div className='w-full h-12 mt-7 '>
                <div className='w-1/3 flex gap-5'>
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
                </div>
            </div>
            <div className='mt-6'>
                <BarChart
                    dataset={monthData}
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
