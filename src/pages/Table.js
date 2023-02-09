import React, { useEffect, useState } from 'react';
import './Table.css'
import { toast } from 'react-hot-toast';
import { Link } from 'react-router-dom';

const Table = () => {
    const [allbilling, setAllBilling] = useState([])
    const [refresh, setrefresh] = useState(false)
    const [page, setPage] = useState(0)
    const [count, setCount] = useState(0)
    const size = 10;
    const totalPages = Math.ceil(count / size)
    const handleSubmit = e => {
        e.preventDefault()
        const billingInfo = {
            name: e.target.name.value,
            email: e.target.email.value,
            phone: e.target.phone.value,
            amount: e.target.amount.value,
        }
        e.target.reset();
        fetch('https://power-hack-server-ten.vercel.app/add-billing', {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(billingInfo)
        })
            .then(res => res.json())
            .then(data => {
                if (data.acknowledged) {
                    toast.success('Bill added successfully')
                    setrefresh(!refresh)
                }
            })
            .catch(err => toast.error(err?.message))
    }


    // get billing list
    useEffect(() => {
        const url = `https://power-hack-server-ten.vercel.app/billing-list?page=${page}&size=${size}`;
        fetch(url)
            .then(res => res.json())
            .then(data => {
                setAllBilling(data?.allBillings);
                setCount(data?.count)
            }
            )
    }, [refresh, page, size])

    //delete the data
    const handleDelete = (id) => {
        fetch(`https://power-hack-server-ten.vercel.app/delete-billing/${id}`, {
            method: "DELETE"
        })
            .then(res => res.json())
            .then(data => {
                setrefresh(!refresh);
                toast.success("Successfully deleted");
            })
            .catch(err => console.error(err.message));
    };



    return (
        <div>
            <header>
                <div className='lg:mx-16 mt-8 mb-5'>
                    <div className="navbar bg-gray-300 p-3 rounded">
                        <div className="flex-1">
                            <p className="tex-2xl font-semibold mr-7">Billings</p>
                            <div className="form-control">
                                <input type="text" placeholder="Search" className="input input-bordered input-info w-full max-w-xs" />
                            </div>
                        </div>
                        <div className="flex-none gap-2">
                            <label htmlFor="my-modal-6" className="btn btn-info text-white font-bold">Add new Bill</label>
                        </div>
                    </div>
                    {/* Put this part before </body> tag */}
                    <input type="checkbox" id="my-modal-6" className="modal-toggle" />
                    <div className="modal modal-bottom sm:modal-middle">
                        <div className="modal-box">
                            <div className="modal-action">
                                <label htmlFor="my-modal-6" className="btn" >X</label>
                            </div>
                            <h3 className="font-bold text-lg text-info py-4">Fill the form for Billing</h3>
                            <form onSubmit={handleSubmit} className='grid grid-cols-1 gap-4'>
                                <input required name='name' type="text" placeholder="Enter your full name" className="input input-bordered w-full " />
                                <input required name='email' type="email" placeholder="Enter your Email address" className="input input-bordered w-full " />
                                <input required name='phone' type="text" placeholder="Enter your Phone number" className="input input-bordered w-full " />
                                <input required name="amount" type="number" placeholder="payable amount" className="input input-bordered w-full" />

                                <input className='btn btn-info w-full ' type="submit" value='Submit' />

                            </form>

                        </div>
                    </div>

                </div>
            </header>



            <section className='lg:mx-16 my-7'>
                <div className="tablee overflow-x-auto">
                    <table className="table w-full">
                        <thead>
                            <tr>
                                <th>Billing Id</th>
                                <th>Full Name</th>
                                <th>Email</th>
                                <th>Phone</th>
                                <th>Paid Amount</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                allbilling?.map(data =>
                                    <tr key={data?._id}>
                                        <th>{data?._id}</th>
                                        <td>{data?.name}</td>
                                        <td>{data?.email}</td>
                                        <td>{data?.phone}</td>
                                        <td>{data?.amount}</td>
                                        <td>
                                            <Link to={`/edit/${data?._id}`}><button className="text-white btn-info btn-xs mr-2">Edit</button></Link>

                                            <button onClick={() => handleDelete(data?._id)} className="text-white btn-info btn-xs">Delete</button>
                                        </td>
                                    </tr>
                                )
                            }

                        </tbody>
                    </table>
                    <div className="pagination py-5">
                        <p className='text-xl py-2'>Current page {page + 1}</p>
                        {
                            [...Array(totalPages).keys()].map(number => <button onClick={() => setPage(number)} className='text-white btn-info btn-xs mx-2' key={number}>{number + 1}</button>)
                        }
                    </div>
                </div>

            </section>

        </div>
    );
};

export default Table;