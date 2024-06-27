import React from 'react';
import Button from '@mui/material/Button';
import { CalendarDays, CalendarClock, CalendarMinus2 } from 'lucide-react';
import Link from 'next/link';
const page = () => {
    const data = [
        {
            icon: <CalendarDays />,
            title: 'Daily Data',
            route: '/Daily',
            buttonData: 'View Daily Data'
        },
        {
            icon: <CalendarMinus2 />,
            title: 'Weekly Data',
            route: '/Weekly',
            buttonData: 'View Weekly Data'
        },
        {
            icon: <CalendarClock />,
            title: 'Monthly Data',
            route: '/Monthly',
            buttonData: 'View Monthly Data'
        }
    ];

    return (
        <>
            <div className='flex flex-wrap items-center justify-evenly p-4 gap-2 min-w-full min-h-full '>
                {data.map((item, index) => {
                    return (
                        <div
                            key={index}
                            className='w-60 rounded-2xl h-36 bg-green-200 flex flex-col items-center justify-around '>
                            <div className='text-xl items-center flex gap-4 justify-around'>
                                <div>{item.icon}</div>
                                <div>{item.title}</div>
                            </div>
                            <Link href={item.route}>
                                <Button
                                    className='w-full h-full'
                                    variant='outlined'>
                                    {item.buttonData}
                                </Button>
                            </Link>
                        </div>
                    );
                })}
            </div>
        </>
    );
};

export default page;
