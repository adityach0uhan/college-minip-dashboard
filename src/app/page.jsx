import React from 'react';
import Link from 'next/link';
import { Button } from '@mui/material';
import { SendIcon } from 'lucide-react';
const page = () => {
    return (
        <>
            <div className=' w-full h-96 flex gap-4 justify-center flex-wrap '>
                <div className='w-80 h-1/2 mt-10 bg-yellow-50'>
                    <div class='cursor-pointer transition-all duration-500 hover:translate-y-2 w-full h-full bg-neutral-50 rounded-lg shadow-xl flex flex-row items-center justify-evenly gap-8 px-4'>
                        <img height={70} width={70} src='/weeks.svg' alt='' />
                        <div>
                            <div class='font-bold mb-3 text-purple-300'>
                                Daily
                            </div>
                            <div class='line-clamp-3 '>
                                <div>View Daily Product Data</div>
                                <br />
                                <Button variant='contained'>
                                    <Link
                                        className='w-full items-center justify-around h-full flex gap-2'
                                        href='/Monthly'>
                                        Daily Data <SendIcon />
                                    </Link>
                                </Button>
                            </div>
                        </div>
                    </div>
                </div>
                <div className='w-80 h-1/2 mt-10 bg-yellow-50'>
                    <div class='cursor-pointer transition-all duration-500 hover:translate-y-2 w-full h-full bg-neutral-50 rounded-lg shadow-xl flex flex-row items-center justify-evenly gap-8 px-4'>
                        <img height={70} width={70} src='/weeks.svg' alt='' />
                        <div>
                            <div class='font-bold mb-3 text-purple-300'>
                                Weekly
                            </div>
                            <div class='line-clamp-3 '>
                                <div>View Weekly Product Data</div>
                                <br />
                                <Button variant='contained'>
                                    <Link
                                        className='w-full items-center justify-around h-full flex gap-2'
                                        href='/Monthly'>
                                        Weekly Data <SendIcon />
                                    </Link>
                                </Button>
                            </div>
                        </div>
                    </div>
                </div>
                <div className='w-80 h-1/2 mt-10 bg-yellow-50'>
                    <div class='cursor-pointer transition-all duration-500 hover:translate-y-2 w-full h-full bg-neutral-50 rounded-lg shadow-xl flex flex-row items-center justify-evenly gap-8 px-4'>
                        <img height={70} width={70} src='/weeks.svg' alt='' />
                        <div>
                            <div class='font-bold mb-3 text-purple-300'>
                                Weekly
                            </div>
                            <div class='line-clamp-3 '>
                                <div>View Monthly Product </div>
                                <br />
                                <Button variant='contained'>
                                    <Link
                                        className='w-full items-center justify-around h-full flex gap-2'
                                        href='/Monthly'>
                                        Monthly Data <SendIcon />
                                    </Link>
                                </Button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default page;
