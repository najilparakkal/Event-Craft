import React, { useState, useEffect } from 'react';
import { billRequest } from '../../../../API/services/vendor/services';
import toast, { Toaster } from 'react-hot-toast';

interface BillingProps {
    isOpen: boolean;
    onClose: () => void;
    bookingId: string;
}

const Billing: React.FC<BillingProps> = ({ isOpen, onClose, bookingId }) => {
    const [fields, setFields] = useState([{ item: '', amount: '' }]);
    const [totalAmount, setTotalAmount] = useState(0);
    const [errors, setErrors] = useState<{ item: string; amount: string }[]>([{ item: '', amount: '' }]);

    useEffect(() => {
        if (!isOpen) {
            setFields([{ item: '', amount: '' }]);
            setTotalAmount(0);
            setErrors([{ item: '', amount: '' }]);
        }
    }, [isOpen]);

    const handleAddField = () => {
        setFields([...fields, { item: '', amount: '' }]);
        setErrors([...errors, { item: '', amount: '' }]);
    };

    const handleRemoveField = (index: number) => {
        const updatedFields = fields.filter((_, idx) => idx !== index);
        const updatedErrors = errors.filter((_, idx) => idx !== index);
        const total = updatedFields.reduce((sum, currentField) => {
            return sum + (parseFloat(currentField.amount) || 0);
        }, 0);
        setTotalAmount(total);
        setFields(updatedFields);
        setErrors(updatedErrors);
    };

    const handleFieldChange = (index: number, field: string, value: string) => {
        const updatedFields = [...fields];
        const updatedErrors = [...errors];
        updatedFields[index][field] = value;

        if (field === 'amount') {
            if (isNaN(Number(value))) {
                updatedErrors[index][field] = 'Amount must be a number';
            } else {
                updatedErrors[index][field] = '';
            }

            const total = updatedFields.reduce((sum, currentField) => {
                return sum + (parseFloat(currentField.amount) || 0);
            }, 0);
            setTotalAmount(total);
        } else if (field === 'item') {
            updatedErrors[index][field] = value ? '' : 'Item is required';
        }

        setFields(updatedFields);
        setErrors(updatedErrors);
    };

    const validateFields = () => {
        const updatedErrors = fields.map(field => ({
            item: field.item ? '' : 'Item is required',
            amount: isNaN(Number(field.amount)) ? 'Amount must be a number' : ''
        }));
        setErrors(updatedErrors);

        return updatedErrors.every(error => error.item === '' && error.amount === '');
    };

    const handleSubmit = async () => {
        if (validateFields()) {
            const update = await billRequest(fields, bookingId, totalAmount);
            if (update) {
                onClose();
                toast.success('Items added successfully');
            } else {
                onClose();
                toast.error('Failed to Bill please check the status');
            }
        }
    };

    if (!isOpen) return null;

    return (
        <div className="p-4">
            <Toaster position="top-center" reverseOrder={false} />
            <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50">
                <div className="bg-gray-300 p-6 rounded-md w-11/12 max-w-lg relative">
                    <span className="absolute top-2 right-4 text-2xl cursor-pointer" onClick={onClose}>&times;</span>
                    <h2 className="text-lg font-semibold mb-4">Add Items</h2>
                    <div className="flex mb-2">
                        <span className="flex-1 text-white">Item</span>
                        <span className="flex-1 text-white">Amount</span>
                    </div>
                    {fields.map((field, index) => (
                        <div key={index} className="flex items-center mb-2">
                            <div className="flex-2 flex flex-col mr-2">
                                <input
                                    type="text"
                                    value={field.item}
                                    onChange={(e) => handleFieldChange(index, 'item', e.target.value)}
                                    className="p-2 border border-gray-400 bg-gray-500 text-white rounded"
                                />
                                {errors[index].item && <span className="text-red-500 text-sm">{errors[index].item}</span>}
                            </div>
                            <div className="flex-2 flex flex-col">
                                <input
                                    type="number"
                                    value={field.amount}
                                    onChange={(e) => handleFieldChange(index, 'amount', e.target.value)}
                                    className="p-2 border border-gray-400 bg-gray-500 text-white rounded"
                                />
                                {errors[index].amount && <span className="text-red-500 text-sm">{errors[index].amount}</span>}
                            </div>
                            {index > 0 && (
                                <button
                                    onClick={() => handleRemoveField(index)}
                                    className="ml-2 px-2 py-1 bg-red-500 text-white rounded h-10 flex items-center justify-center"
                                >
                                    -
                                </button>
                            )}
                            <button
                                onClick={handleAddField}
                                className="ml-2 px-2 py-1 bg-gray-500 text-white rounded h-10 flex items-center justify-center"
                            >
                                +
                            </button>
                        </div>
                    ))}
                    <div className="flex justify-center mt-4 w-full">
                        <button className="px-4 py-2 bg-gray-500 text-white rounded mr-2">
                            Total: {totalAmount}
                        </button>
                        <button onClick={handleSubmit} className="px-4 py-2 bg-gray-500 text-white rounded">
                            Submit
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Billing;
