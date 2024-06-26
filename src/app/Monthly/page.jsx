'use client';
import * as React from 'react';
import { useState, useEffect } from 'react';
import { BarChart } from '@mui/x-charts/BarChart';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

import product1 from '../../data/json/output/output1.js';
import product2 from '../../data/json/output/output2.js';
import product3 from '../../data/json/output/output3.js';
import product4 from '../../data/json/output/output4.js';
import product5 from '../../data/json/output/output5.js';
import product6 from '../../data/json/output/output6.js';
import product7 from '../../data/json/output/output7.js';
import product8 from '../../data/json/output/output8.js';
import product9 from '../../data/json/output/output9.js';
import product10 from '../../data/json/output/output10.js';
import product11 from '../../data/json/output/output11.js';

const productsData = {
    Product1: product1,
    Product2: product2,
    Product3: product3,
    Product4: product4,
    Product5: product5,
    Product6: product6,
    Product7: product7,
    Product8: product8,
    Product9: product9,
    Product10: product10,
    Product11: product11
};

const valueFormatter = (value) => value.toFixed(1);

export default function Page() {
    const [selectedProduct, setSelectedProduct] = useState('Product1'); // Default product set to Product1
    const [month, setMonth] = useState(new Date().getMonth() + 1); // Default month set to current month (1-indexed)
    const [period, setPeriod] = useState('1-15'); // Default period set to first 15 days
    const [monthData, setMonthData] = useState([]);

    useEffect(() => {
        getData(month, period, selectedProduct); // Fetch data initially for the default month, period, and product
    }, []); // Empty dependency array to run once on component mount

    const productChange = (event) => {
        const selectedProduct = event.target.value;
        setSelectedProduct(selectedProduct);
        getData(month, period, selectedProduct); // Fetch data for the newly selected product
    };

    const monthChange = (event) => {
        const selectedMonth = event.target.value;
        setMonth(selectedMonth);
        setPeriod('1-15'); // Reset period to first 15 days of the selected month
        getData(selectedMonth, '1-15', selectedProduct); // Fetch data for the newly selected month and first period
    };

    const periodChange = (event) => {
        const selectedPeriod = event.target.value;
        setPeriod(selectedPeriod);
        getData(month, selectedPeriod, selectedProduct); // Fetch data for the newly selected period
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

    const getData = (selectedMonth, selectedPeriod, selectedProduct) => {
        const year = new Date().getFullYear();
        let startDay = 1;
        let endDay = 15;

        if (selectedPeriod === '16-30') {
            startDay = 16;
            endDay = 30;
        } else if (selectedPeriod === '1-15') {
            startDay = 1;
            endDay = 15;
        } else if (selectedPeriod === '16-end') {
            startDay = 16;
            endDay = new Date(year, selectedMonth, 0).getDate(); // Get the last day of the month
        }

        const startOfPeriod = new Date(year, selectedMonth - 1, startDay);
        const endOfPeriod = new Date(year, selectedMonth - 1, endDay + 1); // End date is exclusive

        const data = productsData[selectedProduct]
            .filter((item) => {
                const itemDate = new Date(item.ds);
                return itemDate >= startOfPeriod && itemDate < endOfPeriod;
            })
            .map((item) => ({
                ...item,
                ds: item.ds
            }));

        setMonthData(data);
    };

    return (
        <>
            <div className='w-full text-3xl'>Filters</div>
            <div className='w-full h-12 mt-7'>
                <div className='w-2/3 flex gap-5'>
                    <FormControl fullWidth>
                        <InputLabel id='products-select-label'>
                            Products
                        </InputLabel>
                        <Select
                            labelId='products-select-label'
                            id='products-select'
                            value={selectedProduct}
                            label='Products'
                            onChange={productChange}>
                            {Object.keys(productsData).map(
                                (productKey, index) => (
                                    <MenuItem key={index} value={productKey}>
                                        {productKey}
                                    </MenuItem>
                                )
                            )}
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
                        <InputLabel id='period-select-label'>Period</InputLabel>
                        <Select
                            labelId='period-select-label'
                            id='period-select'
                            value={period}
                            label='Period'
                            onChange={periodChange}>
                            <MenuItem value='1-15'>1-15</MenuItem>
                            <MenuItem value='16-30'>16-30</MenuItem>
                            <MenuItem value='16-end'>16-end</MenuItem>
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
