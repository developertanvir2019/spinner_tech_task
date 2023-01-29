import React from 'react';
import img from '../download.jpeg'
const Navbar = () => {
    return (
        <div>
            <div className="navbar bg-gray-200 py-0">
                <div className="flex-1">
                    <a className='ml-5' href="/"> <img style={{ height: "65px" }} src={img} alt="" /></a>
                </div>
                <div className="flex-none mr-8">
                    <p className='text-2xl font-bold text-orange-600'>Paid Total : 0</p>
                </div>
            </div>
        </div>
    );
};

export default Navbar;