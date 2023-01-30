import React, { useEffect, useState } from 'react';
import { toast } from 'react-hot-toast';
import { useNavigate, useParams } from 'react-router-dom';

const Update = () => {
    const [data, setData] = useState({})
    console.log(data);
    const { id } = useParams();
    const navigate = useNavigate()
    useEffect(() => {
        fetch(`http://localhost:5000/edit/${id}`)
            .then(res => res.json())
            .then(data => setData(data[0]))
    }, [id])
    const handleUpdate = e => {
        e.preventDefault();
        const billingInfo = {
            name: e.target.name.value,
            email: e.target.email.value,
            phone: e.target.phone.value,
            amount: e.target.amount.value,
        }
        fetch(`http://localhost:5000/update-billing/${id}`, {
            method: 'PUT',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(billingInfo)
        })
            .then(res => res.json())
            .then(data => {
                if (data.modifiedCount > 0) {
                    toast.success('updated successfully')
                    navigate('/')
                }
            })
    }
    return (
        <div>
            <div className="max-w-sm mx-auto mt-5">
                <div className="card card-compact w-96 bg-base-100 shadow-xl">
                    <form onSubmit={handleUpdate} className='grid grid-cols-1 gap-4'>
                        <input required defaultValue={data?.name} name='name' type="text" placeholder="Enter your full name" className="input input-bordered w-full " />
                        <input required defaultValue={data?.email} name='email' type="email" placeholder="Enter your Email address" className="input input-bordered w-full " />
                        <input required defaultValue={data?.phone} name='phone' type="text" placeholder="Enter your Phone number" className="input input-bordered w-full " />
                        <input required defaultValue={data?.amount} name="amount" type="number" placeholder="payable amount" className="input input-bordered w-full" />
                        <input className='btn btn-info w-full ' type="submit" value='Update' />
                    </form>
                </div>
            </div>




        </div>
    );
};

export default Update;