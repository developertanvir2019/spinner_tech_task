import React from 'react';
import { toast } from 'react-hot-toast';
import { FaFacebook, FaGithub, FaGoogle } from 'react-icons/fa';
import { Link, useNavigate } from 'react-router-dom';

const Signup = () => {
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        const form = e.target;
        const email = form.email.value;
        const password = form.password.value;
        try {
            const response = await fetch('https://power-hack-server-ten.vercel.app/registration', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email, password }),
            });

            if (!response.ok) {
                throw new Error(await response.text());
            }

            toast.success('User registered successfully');
            navigate('/')
        } catch (error) {
            toast.error(error.message);
        }
    }

    return (
        <div className="max-w-sm mx-auto my-6">
            <div className="card card-compact w-96 bg-base-100 shadow-xl">
                <h2 className="text-3xl font-semibold text-center text-cyan-600 pb-5">please Registration </h2>
                <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                    <input required name='name' type="text" placeholder="Enter your full name" className="input input-bordered w-full " />
                    <input required name='email' type="email" placeholder="Enter your Email address" className="input input-bordered w-full " />
                    <input required name="password" type="password" placeholder="Enter your password" className="input input-bordered w-full" />
                    <input className='btn btn-info w-full ' type="submit" value='registration' />
                </form>
                <h3 className="py-3">Already have an account? <Link className='text-cyan-500 font-bold' to='/login'>Login</Link></h3>
                <div>
                    <h5 className="text-center font-semibold">Or signup using</h5>
                    <div className='flex justify-center text-3xl py-2 text-cyan-500'>
                        <FaGoogle></FaGoogle>
                        <FaFacebook className='mx-3'></FaFacebook>
                        <FaGithub></FaGithub>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Signup;