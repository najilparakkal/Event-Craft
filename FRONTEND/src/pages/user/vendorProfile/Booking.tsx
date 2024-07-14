import React, { useEffect, useState } from 'react';
import { useFormik } from 'formik';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { bookingValidation } from '../../../utils/validations/validateSchema';
import { bookingInitialValue } from '../../../utils/validations/initialValue';
import { useAppSelector } from '../../../costumeHooks/costum';
import toast from 'react-hot-toast';
import { addBooking } from '../../../API/services/user/Services';

interface FormData {
    endingTime: string;
    clientName: string;
    email: string;
    phoneNumber: string;
    eventDate: Date | null;
    arrivalTime: string;
    guests: string;
    location: string;
    pincode: string;
    event: string;
}

interface BookingProps {
    vendorId: string;
}

declare global {
    interface Window {
        Razorpay: any;
    }
}

const Booking: React.FC<BookingProps> = ({ vendorId }) => {
    const { _id } = useAppSelector((state) => state.user.userDetails);
    const [isRazorpayLoaded, setIsRazorpayLoaded] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [formValues, setFormValues] = useState<FormData | null>(null);
    const [guest, setGuest] = useState<number | undefined>(0);
    useEffect(() => {
        const script = document.createElement('script');
        script.src = 'https://checkout.razorpay.com/v1/checkout.js';
        script.onload = () => setIsRazorpayLoaded(true);
        script.onerror = () => setIsRazorpayLoaded(false);
        document.body.appendChild(script);
    }, []);

    const formik = useFormik<FormData>({
        initialValues: bookingInitialValue,
        validationSchema: bookingValidation,
        onSubmit: (values) => {
            setFormValues(values);
            setIsModalOpen(true);
        },
    });

    const handleModalSubmit = async () => {
        if (!isRazorpayLoaded) {
            alert('Razorpay SDK is still loading or failed to load. Please try again later.');
            return;
        }
        const options = {
            key: import.meta.env.VITE_APP_REZORPAY_SECRET_KEY,
            amount: (Number(guest) * 10) * 100,
            currency: 'INR',
            name: 'AV Streams',
            description: 'Test Payment',
            image: 'https://s3.ap-south-1.amazonaws.com/assets.ynos.in/startup-logos/YNOS427860.jpg',
            notes: {
                address: 'Razorpay Corporate Office',
            },
            theme: {
                color: '#3399cc',
            },
            handler: async function () {
                try {
                    let amount = Number(guest) * 10                    
                    const res = await addBooking(formValues as any, _id + "", vendorId,amount);
                    if (res) {
                        toast.success("Vendor booked successfully");
                    } else {
                        toast.error("Failed to book vendor");
                    }
                } catch (error) {
                    toast.error("An error occurred during booking");
                }
            },
            modal: {
                ondismiss: function () {
                    alert('Payment dismissed');
                },
            },
        };
        const rzp = new window.Razorpay(options);
        rzp.open();
    };

    return (
        <>
            <form onSubmit={formik.handleSubmit} className="bg-white p-6 rounded-lg shadow-lg space-y-4">
                <div className="flex space-x-4">
                    <div className="flex-1">
                        <label className="block mb-1 text-sm font-medium">First Name</label>
                        <input
                            type="text"
                            name="clientName"
                            value={formik.values.clientName}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            className="w-full p-2 border rounded"
                        />
                        {formik.touched.clientName && formik.errors.clientName ? (
                            <div className="text-red-600">{formik.errors.clientName}</div>
                        ) : null}
                    </div>

                    <div className="flex-1">
                        <label className="block mb-1 text-sm font-medium">Email</label>
                        <input
                            type="email"
                            name="email"
                            value={formik.values.email}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            className="w-full p-2 border rounded"
                        />
                        {formik.touched.email && formik.errors.email ? (
                            <div className="text-red-600">{formik.errors.email}</div>
                        ) : null}
                    </div>
                    <div className="flex-1">
                        <label className="block mb-1 text-sm font-medium">Event Date</label>
                        <DatePicker
                            selected={formik.values.eventDate}
                            onChange={date => formik.setFieldValue('eventDate', date)}
                            minDate={new Date()}
                            className="w-full p-2 border rounded"
                            placeholderText="Select event date"
                        />
                        {formik.touched.eventDate && formik.errors.eventDate ? (
                            <div className="text-red-600">{formik.errors.eventDate}</div>
                        ) : null}
                    </div>
                </div>
                <div className="flex space-x-4">
                    <div className="flex-1">
                        <label className="block mb-1 text-sm font-medium">Phone Number</label>
                        <input
                            type="tel"
                            name="phoneNumber"
                            value={formik.values.phoneNumber}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            className="w-full p-2 border rounded"
                        />
                        {formik.touched.phoneNumber && formik.errors.phoneNumber ? (
                            <div className="text-red-600">{formik.errors.phoneNumber}</div>
                        ) : null}
                    </div>

                    <div className="flex-1">
                        <label className="block mb-1 text-sm font-medium">Arrival Time</label>
                        <input
                            type="time"
                            name="arrivalTime"
                            value={formik.values.arrivalTime}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            className="w-full p-2 border rounded"
                        />
                        {formik.touched.arrivalTime && formik.errors.arrivalTime ? (
                            <div className="text-red-600">{formik.errors.arrivalTime}</div>
                        ) : null}
                    </div>
                    <div className="flex-1">
                        <label className="block mb-1 text-sm font-medium">Ending Time</label>
                        <input
                            type="time"
                            name="endingTime"
                            value={formik.values.endingTime}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            className="w-full p-2 border rounded"
                        />
                        {formik.touched.endingTime && formik.errors.endingTime ? (
                            <div className="text-red-600">{formik.errors.endingTime}</div>
                        ) : null}
                    </div>
                    <div className="flex-1">
                        <label className="block mb-1 text-sm font-medium">Event</label>
                        <input
                            type="text"
                            name="event"
                            value={formik.values.event}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            className="w-full p-2 border rounded"
                        />
                        {formik.touched.event && formik.errors.event ? (
                            <div className="text-red-600">{formik.errors.event}</div>
                        ) : null}
                    </div>
                </div>
                <div className="flex space-x-4">
                    <div className="flex-1">
                        <label className="block mb-1 text-sm font-medium">Number of Guests</label>
                        <input
                            type="number"
                            name="guests"
                            value={formik.values.guests}
                            onChange={(e) => {
                                formik.handleChange(e);
                                setGuest(Number(e.target.value));
                            }}
                            onBlur={formik.handleBlur}
                            className="w-full p-2 border rounded"
                        />
                        {formik.touched.guests && formik.errors.guests ? (
                            <div className="text-red-600">{formik.errors.guests}</div>
                        ) : null}
                    </div>
                    <div className="flex-1">
                        <label className="block mb-1 text-sm font-medium">Location</label>
                        <input
                            type="text"
                            name="location"
                            value={formik.values.location}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            className="w-full p-2 border rounded"
                        />
                        {formik.touched.location && formik.errors.location ? (
                            <div className="text-red-600">{formik.errors.location}</div>
                        ) : null}
                    </div>
                    <div className="flex-1">
                        <label className="block mb-1 text-sm font-medium">Pincode</label>
                        <input
                            type="text"
                            name="pincode"
                            value={formik.values.pincode}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            className="w-full p-2 border rounded"
                        />
                        {formik.touched.pincode && formik.errors.pincode ? (
                            <div className="text-red-600">{formik.errors.pincode}</div>
                        ) : null}
                    </div>
                </div>
                <button
                    type="submit"
                    className="w-full p-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition duration-300"
                >
                    Submit
                </button>
            </form>
            {isModalOpen && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
                    <div className="bg-white p-8 rounded-lg shadow-lg max-w-2xl w-full">
                        <h2 className="text-xl font-bold mb-4">Confirm Booking</h2>
                        <div className="scrollNoDiv overflow-y-auto h-64 p-4 border-t border-b">
                            <h3 className="text-lg font-semibold mb-2">Terms and Conditions for Booking a Vendor</h3>
                            <p className="text-sm mb-2">Welcome to Event Craft. By booking a vendor through our site, you agree to comply with and be bound by the following terms and conditions. Please review them carefully before making any booking.</p>
                            <ol className="list-decimal list-inside space-y-2 text-sm">
                                <li><strong>Acceptance of Terms:</strong> By accessing and using our services, you agree to be bound by these terms and conditions. If you do not agree with any part of these terms, you must not use our services.</li>
                                <li><strong>Booking and Payment:</strong>
                                    <ul className="list-disc list-inside ml-4">
                                        <li>All bookings of vendors must be made exclusively through our site.</li>
                                        <li>Payments for vendor services must be completed through our site using the provided payment gateway.</li>
                                        <li>No hand payments or transactions outside of our site are allowed. Any payment made outside our site is not recognized and we will not be responsible for any disputes or issues arising from such transactions.</li>
                                    </ul>
                                </li>
                                <li><strong>Payment Methods:</strong>
                                    <ul className="list-disc list-inside ml-4">
                                        <li>We accept various payment methods through our secure payment gateway, including but not limited to credit/debit cards, net banking, and other online payment methods.</li>
                                        <li>All payments must be made in the currency specified on the site.</li>
                                    </ul>
                                </li>
                                <li><strong>Confirmation of Booking:</strong>
                                    <ul className="list-disc list-inside ml-4">
                                        <li>Once a booking is made and payment is completed, you will receive a confirmation email with the details of your booking.</li>
                                        <li>It is your responsibility to ensure that all details provided at the time of booking are accurate.</li>
                                    </ul>
                                </li>
                                <li><strong>Cancellation and Refund Policy:</strong>
                                    <ul className="list-disc list-inside ml-4">
                                        <li>Please refer to our Cancellation and Refund Policy for details on how to cancel a booking and the applicable refund procedures.</li>
                                        <li>All cancellations and refund requests must be processed through our site.</li>
                                    </ul>
                                </li>
                                <li><strong>Vendor Responsibilities:</strong>
                                    <ul className="list-disc list-inside ml-4">
                                        <li>Vendors listed on our site are responsible for providing the services as described.</li>
                                        <li>We do not endorse or guarantee the quality of the services provided by vendors.</li>
                                    </ul>
                                </li>
                                <li><strong>User Responsibilities:</strong>
                                    <ul className="list-disc list-inside ml-4">
                                        <li>Users are responsible for providing accurate and complete information at the time of booking.</li>
                                        <li>Users must comply with the terms and conditions set forth by the vendor for the services booked.</li>
                                    </ul>
                                </li>
                               
                                <li><strong>Amendments to Terms:</strong> We reserve the right to amend these terms and conditions at any time without prior notice. It is your responsibility to review these terms periodically for any updates or changes.</li>
                                <li><strong>Contact Information:</strong> For any questions or concerns regarding these terms and conditions, please contact us at najilparakkal@gmail.com.</li>
                            </ol>
                            <p className="text-sm mt-4">By proceeding with the booking, you acknowledge that you have read, understood, and agreed to be bound by these terms and conditions.</p>
                        </div>
                        <div className="mt-6 flex flex-col sm:flex-row justify-between items-center">
                            <h1 className='font-bold mb-4 sm:mb-0'>
                                You need to pay an advance payment of <span className='text-blue-500'>{Number(guest) * 10}</span> 
                            </h1>
                            <div className="flex space-x-4">
                                <button
                                    onClick={() => setIsModalOpen(false)}
                                    className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400 transition duration-300"
                                >
                                    Cancel
                                </button>
                                <button
                                    onClick={handleModalSubmit}
                                    className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition duration-300"
                                >
                                     Let's Pay
                                </button>
                            </div>
                        </div>
                    </div>
                </div>

            )}

        </>
    );
};

export default Booking;
