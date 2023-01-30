import React from 'react';
import { toast } from 'react-hot-toast';
import { FaFacebook, FaGithub, FaGoogle } from 'react-icons/fa';
import { Link, useLocation, useNavigate } from 'react-router-dom';

const Login = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const from = location?.state?.from?.pathname || '/';

    const handleSubmit = async (e) => {
        e.preventDefault();
        const form = e.target;
        const email = form.email.value;
        const password = form.password.value;
        try {
            const response = await fetch('http://localhost:5000/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ email, password })
            });

            if (!response.ok) {
                throw new Error(await response.json().error);
            }

            const { token } = await response.json();
            toast.success('log in success');
            navigate('/')
            return token;
        } catch (error) {
            toast.error("wrong email or password");
            throw error;
        }


    }
    return (
        <div className="max-w-sm sm:w-full mx-auto my-6">
            <div className="card card-compact w-96 bg-base-100 shadow-xl">
                <h2 className="text-4xl font-semibold text-center pb-5 text-cyan-600">Please Log In</h2>
                <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                    <input required name='email' type="email" placeholder="Enter your Email address" className="input input-bordered w-full " />
                    <input required name="password" type="password" placeholder="Enter your password" className="input input-bordered w-full" />
                    <input className='btn btn-info w-full ' type="submit" value='Login' />
                </form>
                <h3 className="py-3">Don't have an account? <Link className='text-cyan-500 font-bold' to='/registration '>registration </Link></h3>
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

export default Login;