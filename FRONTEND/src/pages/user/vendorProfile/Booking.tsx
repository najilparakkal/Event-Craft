import React, { useEffect, useState } from 'react';
import { useFormik } from 'formik';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { bookingValidation } from '../../../utils/validations/validateSchema';
import { bookingInitialValue } from '../../../utils/validations/initialValue';
import { useAppSelector } from '../../../costumeHooks/costum';
import toast from 'react-hot-toast';
import { addBooking, vendorAbsend } from '../../../API/services/user/Services';

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
    const [absentDates, setAbsentDates] = useState<[]>([]);
    const [amount, setAmount] = useState<number>(1)
    useEffect(() => {
        vendorAbsend(vendorId)
            .then((data) => {
                setAbsentDates(data.map((dateStr: string) => new Date(dateStr)));
            })
            .catch((err) => {
                console.log(err);
            });
      
    }, [vendorId]);
    useEffect(()=>{
        const script = document.createElement('script');
        script.src = 'https://checkout.razorpay.com/v1/checkout.js';
        script.onload = () => setIsRazorpayLoaded(true);
        script.onerror = () => setIsRazorpayLoaded(false);
        document.body.appendChild(script);
    },[])
    const formik = useFormik<FormData>({
        initialValues: bookingInitialValue,
        validationSchema: bookingValidation,
        onSubmit: (values) => {
            setFormValues(values);
            if (guest) setAmount(guest * 7)

            setIsModalOpen(true);
        },
    });

    const handleModalSubmit = async () => {
        if (!isRazorpayLoaded) {
            toast.error('Razorpay SDK is still loading or failed to load. Please try again later.');
            return;
        }

        const options = {
            key: import.meta.env.VITE_APP_RAZORPAY_KEYID,
            amount: ((amount * 10) * 10),
            currency: 'INR',
            name: 'EVENT CRAFT',
            description: 'Test Payment',
            image: '/logo-no-background.png',
            notes: { address: 'Razorpay Corporate Office' },
            theme: { color: '#3399cc'},

            handler: async function (response: any) {
                try {
                    if (amount) {
                        const paymentDetails = {
                            paymentId: response.razorpay_payment_id,
                        };                       
                        const res = await addBooking(formValues as any, _id + "", vendorId, amount, paymentDetails);
                        if (res) {
                            toast.success("Vendor booked successfully");
                            formik.resetForm();
                            setIsModalOpen(false);
                        } else {
                            toast.error("Failed to book vendor");
                        }
                    }

                } catch (error) {
                    toast.error("An error occurred during booking");
                }
            },
            modal: {
                ondismiss: function () {
                    toast.error('Payment dismissed');
                },
            },
        };
        const rzp = new window.Razorpay(options);
        rzp.open();
    };

    const dayClassName = (date: Date) => {
        return absentDates.some((absentDate:Date) => absentDate.getTime() === date.getTime())
            ? 'react-datepicker__day--highlighted-custom-absent-date'
            : '';
    };


    const handleDateChange = (date: Date | null) => {
        if (date) {
            const normalizeDate = (d: Date) => new Date(d.getFullYear(), d.getMonth(), d.getDate());

            if (absentDates.some(absentDate => normalizeDate(absentDate).getTime() === normalizeDate(date).getTime())) {
                toast.error("Vendor is busy", {
                    icon: '❌',
                    style: {
                        backgroundColor: 'red',
                        color: 'white',
                    },
                });
                return;
            }
        }
        formik.setFieldValue('eventDate', date);
    };

    return (
        <>
         <form onSubmit={formik.handleSubmit} className="bg-transparent p-6 rounded-lg mt-10 shadow-lg space-y-4 max-w-full">
    <h1 className="text-white font-bold text-center text-lg md:text-xl">Booking</h1>
    <div className="flex flex-wrap space-y-4 md:space-y-0 md:space-x-4">
        <div className="flex-1 min-w-[250px]">
            <label className="block mb-1 text-sm font-medium text-gray-600">First Name</label>
            <input
                type="text"
                name="clientName"
                value={formik.values.clientName}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                className="w-full p-2 border-b-2 border-gray-300 focus:outline-none focus:border-blue-500 bg-transparent text-gray-600"
            />
            {formik.touched.clientName && formik.errors.clientName ? (
                <div className="text-red-600">{formik.errors.clientName}</div>
            ) : null}
        </div>

        <div className="flex-1 min-w-[250px]">
            <label className="block mb-1 text-sm font-medium text-gray-600">Email</label>
            <input
                type="email"
                name="email"
                value={formik.values.email}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                className="w-full p-2 border-b-2 border-gray-300 focus:outline-none focus:border-blue-500 bg-transparent text-gray-600"
            />
            {formik.touched.email && formik.errors.email ? (
                <div className="text-red-600">{formik.errors.email}</div>
            ) : null}
        </div>

        <div className="flex-1 min-w-[250px]">
            <label className="block mb-1 text-sm font-medium text-gray-600">Event Date</label>
            <DatePicker
                selected={formik.values.eventDate}
                onChange={handleDateChange}
                minDate={new Date()}
                highlightDates={absentDates}
                filterDate={date => !absentDates.some((absentDate: Date) => absentDate.getTime() === date.getTime())}
                dayClassName={dayClassName}
                className="w-full p-2 border-b-2 border-gray-300 focus:outline-none focus:border-blue-500 bg-transparent text-gray-600"
                placeholderText="Select event date"
            />
            {formik.touched.eventDate && formik.errors.eventDate ? (
                <div className="text-red-600">{formik.errors.eventDate}</div>
            ) : null}
        </div>
    </div>

    <div className="flex flex-wrap space-y-4 md:space-y-0 md:space-x-4">
        <div className="flex-1 min-w-[250px]">
            <label className="block mb-1 text-sm font-medium text-gray-600">Phone Number</label>
            <input
                type="tel"
                name="phoneNumber"
                value={formik.values.phoneNumber}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                className="w-full p-2 border-b-2 border-gray-300 focus:outline-none focus:border-blue-500 bg-transparent text-gray-600"
            />
            {formik.touched.phoneNumber && formik.errors.phoneNumber ? (
                <div className="text-red-600">{formik.errors.phoneNumber}</div>
            ) : null}
        </div>

        <div className="flex-1 min-w-[250px]">
            <label className="block mb-1 text-sm font-medium text-gray-600">Arrival Time</label>
            <input
                type="time"
                name="arrivalTime"
                value={formik.values.arrivalTime}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                className="w-full p-2 border-b-2 border-gray-300 focus:outline-none focus:border-blue-500 bg-transparent text-gray-600"
            />
            {formik.touched.arrivalTime && formik.errors.arrivalTime ? (
                <div className="text-red-600">{formik.errors.arrivalTime}</div>
            ) : null}
        </div>

        <div className="flex-1 min-w-[250px]">
            <label className="block mb-1 text-sm font-medium text-gray-600">Ending Time</label>
            <input
                type="time"
                name="endingTime"
                value={formik.values.endingTime}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                className="w-full p-2 border-b-2 border-gray-300 focus:outline-none focus:border-blue-500 bg-transparent text-gray-600"
            />
            {formik.touched.endingTime && formik.errors.endingTime ? (
                <div className="text-red-600">{formik.errors.endingTime}</div>
            ) : null}
        </div>
    </div>

    <div className="flex flex-wrap space-y-4 md:space-y-0 md:space-x-4">
        <div className="flex-1 min-w-[250px]">
            <label className="block mb-1 text-sm font-medium text-gray-600">Event</label>
            <input
                type="text"
                name="event"
                value={formik.values.event}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                className="w-full p-2 border-b-2 border-gray-300 focus:outline-none focus:border-blue-500 bg-transparent text-gray-600"
            />
            {formik.touched.event && formik.errors.event ? (
                <div className="text-red-600">{formik.errors.event}</div>
            ) : null}
        </div>

        <div className="flex-1 min-w-[250px]">
            <label className="block mb-1 text-sm font-medium text-gray-600">Guests</label>
            <input
                type="number"
                name="guests"
                value={formik.values.guests}
                onChange={(e) => {
                    formik.handleChange(e);
                    setGuest(Number(e.target.value));
                }}
                onBlur={formik.handleBlur}
                className="w-full p-2 border-b-2 border-gray-300 focus:outline-none focus:border-blue-500 bg-transparent text-gray-600"
            />
            {formik.touched.guests && formik.errors.guests ? (
                <div className="text-red-600">{formik.errors.guests}</div>
            ) : null}
        </div>

        <div className="flex-1 min-w-[250px]">
            <label className="block mb-1 text-sm font-medium text-gray-600">Location</label>
            <input
                type="text"
                name="location"
                value={formik.values.location}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                className="w-full p-2 border-b-2 border-gray-300 focus:outline-none focus:border-blue-500 bg-transparent text-gray-600"
            />
            {formik.touched.location && formik.errors.location ? (
                <div className="text-red-600">{formik.errors.location}</div>
            ) : null}
        </div>
    </div>

    <div className="flex flex-wrap space-y-4 md:space-y-0 md:space-x-4">
        <div className="flex-1 min-w-[250px]">
            <label className="block mb-1 text-sm font-medium text-gray-600">Pincode</label>
            <input
                type="text"
                name="pincode"
                value={formik.values.pincode}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                className="w-full p-2 border-b-2 border-gray-300 focus:outline-none focus:border-blue-500 bg-transparent text-gray-600"
            />
            {formik.touched.pincode && formik.errors.pincode ? (
                <div className="text-red-600">{formik.errors.pincode}</div>
            ) : null}
        </div>
    </div>

    <div className="flex justify-center">
        <button
            type="submit"
            className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
        >
            Book Vendor
        </button>
    </div>
</form>

            {isModalOpen && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
                    <div className="bg-white p-6 rounded-lg">
                        <h2 className="text-lg font-bold mb-4">Confirm Payment</h2>
                        <p className="mb-4">Are you sure you want to proceed with the payment?</p>
                        <p className="mb-4 text-sm text-gray-700">
                            <strong>Terms and Conditions:</strong>
                            <ul className="list-disc list-inside">
                                <li>All payments must be made through this site.</li>
                                <li>If you cancel the booking within 3 days, you will receive a full refund.</li>
                                <li>If you cancel after 3 days, you will receive 70% of the total amount paid.</li>
                                <li>The event date cannot be changed once the payment is confirmed.</li>
                                <li>In case of any discrepancies, please contact our support team within 24 hours of booking.</li>
                                <li>Refunds will be processed within 7-10 business days.</li>
                                <li>By confirming this payment, you agree to our <a href="/terms" className="text-blue-500 underline">terms and conditions</a>.</li>
                            </ul>
                        </p>
                        <div className="flex justify-between items-center">
                            <p className="text-lg font-semibold">Advance Amount: {amount}</p>
                            <div className="flex">
                                <button
                                    onClick={() => setIsModalOpen(false)}
                                    className="bg-gray-500 text-white px-4 py-2 rounded-lg hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-opacity-50 mr-2"
                                >
                                    Cancel
                                </button>
                                <button
                                    onClick={handleModalSubmit}
                                    className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
                                >
                                    Confirm
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}

        </>
    );
};

export default React.memo(Booking);
