import React from 'react'
import { MdStars } from "react-icons/md";
import { FiSearch } from "react-icons/fi";

function Navbar() {
    return (
        <div className='h-[7vh] shadow-md flex items-center w-full'>
            <div className='flex items-center pt-2.5 pl-4 gap-x-1 w-[30%]'>
                <div>
                    <MdStars className='h-6 w-6' color='rgba(226,61,255,0.7)'/>
                </div>
                <div>
                    <p>Review<span className='bg-clip-text text-transparent bg-gradient-to-r from-pink-500 to-violet-500'>&</span><span className='font-bold text-[#000]'>RATE</span></p>
                </div>
            </div>
            <div className='flex items-center w-full gap-x-8'>
                <div className='relative pl-96 w-[60%]'>
                    <input type='text' placeholder='Search...' className='border rounded-md p-1 w-full' />
                    <FiSearch className='absolute top-[30%] right-2 translate-y-0' color='rgba(226,61,255,0.7)' />
                </div>
                <div className='flex items-center gap-x-4 w-[10%]'>
                    <div>
                        <h1>Sign Up</h1>
                    </div>
                    <div>
                        <h1>Login</h1>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Navbar
