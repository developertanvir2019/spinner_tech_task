import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import img from '../download.jpeg'
const Navbar = () => {
    const [bill, setBill] = useState([])
    const sum = bill?.reduce((total, obj) => total + parseInt(obj.amount), 0);
    useEffect(() => {
        fetch('http://localhost:5000/billing-list')
            .then(res => res.json())
            .then(data => setBill(data?.allBillings))
    }, [])
    return (
        <div>
            <div className="navbar bg-gray-200 py-0">
                <div className="flex-1">
                    <a className='ml-5' href="/"> <img style={{ height: "65px" }} src={img} alt="" /></a>
                </div>
                <div className="flex-none mr-8">
                    <Link to={'/login'} className='btn btn-info'>LogIn</Link>
                    <p className='text-2xl font-bold text-orange-600'>Paid Total :{sum}</p>
                </div>
            </div>
        </div>
    );
};

export default Navbar;