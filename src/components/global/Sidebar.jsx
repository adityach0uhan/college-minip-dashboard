import React from "react";
import {
    Home,
    CalendarClock,
    CalendarDays,
    CalendarMinus2,
    LogOut
} from 'lucide-react';
import Link from "next/link";

const Sidebar = () => {
  return (
      <div className='w-48 h-full sticky  bg-white text-black p-2 '>
          <div className='text-3xl'>Sales Prediction</div>
          <ul className='w-full h-96    mt-10 flex items-start  gap-5 justify-center flex-col'>
              <li className='w-full h-10 flex justify-start items-center pl-2 rounded-lg hover:bg-blue-300 p-2 '>
                  <Link
                      className='flex w-full h-full items-center gap-5'
                      href='/'>
                      <Home />
                      Home
                  </Link>
              </li>
              <li className='w-full h-10 flex justify-start items-center pl-2 rounded-lg hover:bg-blue-300 p-2 '>
                  <Link
                      className='flex w-full h-full items-center gap-5'
                      href='/Daily'>
                      <CalendarDays />
                      Daily
                  </Link>
              </li>
              <li className='w-full h-10 flex justify-start items-center  pl-2 rounded-lg hover:bg-blue-300 p-2 '>
                  <Link
                      className='flex w-full h-full items-center gap-5'
                      href='/Monthly'>
                      <CalendarClock />
                      Monthly
                  </Link>
              </li>
              <li className='w-full h-10 flex justify-start items-center pl-2 rounded-lg hover:bg-blue-300 p-2 '>
                  <Link
                      className='flex w-full h-full items-center gap-5'
                      href='/Weekly'>
                      <CalendarMinus2 />
                      Weekly
                  </Link>
              </li>{' '}
              <li className='w-full h-10 flex justify-start items-center pl-2 rounded-lg hover:bg-blue-300 p-2 '>
                  <Link
                      className='flex w-full h-full items-center gap-5'
                      href=''>
                      <LogOut />
                      Logout
                  </Link>
              </li>
          </ul>
      </div>
  );
};

export default Sidebar;
