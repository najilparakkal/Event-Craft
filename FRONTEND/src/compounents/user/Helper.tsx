import React, { useState } from 'react'
import toast from 'react-hot-toast';
import { submitHelp } from '../../API/services/user/Services';

interface prop {
    _id: string | null
}

const Helper: React.FC<prop> = ({ _id }) => {
    const [needs, setNeeds] = useState('');
    const [mobileNumber, setMobileNumber] = useState('');


    const handleSubmit = async () => {
        if (!_id) {
            toast.error('You are not logged in');
            return;
        }
        if (needs.length === 0 || mobileNumber.length === 0) {
            toast.error('Please fill all the fields');
            return;
        } else {

            const submiting = await submitHelp(_id + "", needs, mobileNumber)

            if (submiting) {
                toast.success('Help request submitted successfully');

            } else {
                toast.error('Failed to submit help request');
            }
            setNeeds("")
            setMobileNumber("")
        }
    };
    return (
        <div className="mt-10 p-8">
            <h2 className="text-2xl text-gray-500 mb-2">Didn't Get Your Vendor .?</h2>
            <p className="mb-6 text-gray-500">Our executives will call you to understand your requirements to find suitable vendors</p>
            <div className="flex space-x-4">
                <input
                    type="text"
                    placeholder="Enter Your Needs"
                    className="px-2 py-1 border-b-2 border-gray-300 bg-transparent text-white placeholder-gray-500 w-full"
                    value={needs}
                    onChange={(e) => setNeeds(e.target.value)}
                />
                <input
                    type="text"
                    placeholder="Enter Mobile Number"
                    className="px-2 py-1 border-b-2 border-gray-300 bg-transparent text-white placeholder-gray-500 w-full"
                    value={mobileNumber}
                    onChange={(e) => setMobileNumber(e.target.value)}
                />

                <button className="bg-blue-600 text-white px-6 py-2 rounded-md" onClick={handleSubmit}>
                    Submit
                </button>
            </div>
        </div>
    )
}

export default React.memo(Helper)
