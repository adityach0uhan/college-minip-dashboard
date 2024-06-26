'use client';
import * as React from 'react';
import { useState, useEffect } from 'react';
import { PieChart, pieArcLabelClasses } from '@mui/x-charts/PieChart';
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
    const [dailyData, setDailyData] = useState({});

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

        const dailyData = {};
        Object.keys(productsData).forEach((key) => {
            dailyData[key] = productsData[key].filter((item) =>
                item.ds.startsWith(datePrefix)
            );
        });

        setDailyData(dailyData);
    };

   const renderPieCharts = () => {
       return Object.keys(dailyData).map((key, index) => {
           const data = dailyData[key];

           const pieData = data.flatMap((item) => {
               const total = item.yhat + item.yhat_lower + item.yhat_upper;
               return [
                   {
                       label: 'Prediction',
                       value: (item.yhat / total) * 100,
                       color: '#0088FE'
                   },
                   {
                       label: 'Lowest',
                       value: (item.yhat_lower / total) * 100,
                       color: '#00C49F'
                   },
                   {
                       label: 'Highest',
                       value: (item.yhat_upper / total) * 100,
                       color: '#FFBB28'
                   }
               ];
           });

           return (
               <div
                   key={index}
                   className='flex mt-5 items-center justify-center w-44 flex-col h-44'>
                   <h3 className='m-0 p-0 w-full text-center h-1/4'>{`Product ${
                       key.split('Product')[1]
                   }`}</h3>
                   {pieData.length > 0 ? (
                       <PieChart
                           className='h-3/4 p-0 m-0'
                           series={[
                               {
                                   outerRadius: 200,
                                   data: pieData,
                                   arcLabel: (params) =>
                                       `${params.value.toFixed(1)}%`
                               }
                           ]}
                           sx={{
                               [`& .${pieArcLabelClasses.root}`]: {
                                   fill: 'black',
                                   fontSize: 32
                               }
                           }}
                           {...sizing}
                       />
                   ) : (
                       <div>{`No data available for Product ${
                           key.split('Product')[1]
                       } on the selected date.`}</div>
                   )}
               </div>
           );
       });
   };


    return (
        <>
            <div className='w-full h-12 m-3'>
                <div className='w-1/2 flex gap-5'>
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
            <div className=''>
                <ul className='flex gap-7 mt-2'>
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
            <div className=' flex-wrap gap-3 flex '>{renderPieCharts()}</div>
        </>
    );
}
