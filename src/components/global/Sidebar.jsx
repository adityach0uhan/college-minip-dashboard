import React from 'react';
import {
    Home,
    CalendarClock,
    CalendarDays,
    CalendarMinus2,
    LogOut
} from 'lucide-react';
import Link from 'next/link';

const Sidebar = () => {
    const data = [
        {
            route: '/',
            icon: <Home />,
            title: 'Home'
        },
        {
            route: '/Daily',
            icon: <CalendarDays />,
            title: 'Daily'
        },
        {
            route: '/Weekly',
            icon: <CalendarMinus2 />,
            title: 'Weekly'
        },
        {
            route: '/Monthly',
            icon: <CalendarClock />,
            title: 'Monthly'
        },
        {
            route: '/logout',
            icon: <LogOut />,
            title: 'Logout'
        }
    ];

    return (
        <div className='w-48 h-full sticky bg-white text-black p-2 '>
            <div className='text-2xl text-center'>Sales Prediction</div>
            <ul className='w-full h-96 mt-10 flex items-start  gap-5 justify-center flex-col'>
                {data.map((item, index) => {
                    return (
                        <li key={index} className='w-full h-10 flex justify-start items-center pl-2 rounded-lg hover:bg-blue-300 p-2 '>
                            <Link
                                className='flex w-full h-full items-center gap-5'
                                href={item.route}>
                                {item.icon} {item.title}
                            </Link>
                        </li>
                    );
                })}
            </ul>
        </div>
    );
};

export default Sidebar;
