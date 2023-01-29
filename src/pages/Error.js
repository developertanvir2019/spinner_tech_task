import React from 'react';
import { Link } from 'react-router-dom';
const Error = () => {
    return (
        <div style={{ height: '100vh', width: '100%' }} className='bg-info'>
            <div>
                <img className='lg:w-1/4 mx-auto pt-8' src="https://img.freepik.com/free-vector/oops-404-error-with-broken-robot-concept-illustration_114360-1932.jpg?w=740&t=st=1669327300~exp=1669327900~hmac=f325de599023aa072c89d08299fd4f6862dbd62cbb410f2d445a36785bb13624" alt="" />
                <h3 className='text-red-500 font-bold my-3 text-3xl'>page is not found</h3>
                <Link to={'/'} className='btn btn-secondary'> Go to home</Link>
            </div>
        </div>
    );
};

export default Error;

