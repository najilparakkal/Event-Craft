import React, { useEffect, useState } from 'react';
import { useAppSelector } from '../../../../costumeHooks/costum';
import { paidBills, payingBill, userBills } from '../../../../API/services/user/Services';
import { AnimatePresence, motion } from "framer-motion";
import easyinvoice from 'easyinvoice';
import toast from 'react-hot-toast';

interface BillItem {
    title: string;
    fullDetails: {
        item: string;
        amount: number;
    }[];
    bookingId: string;
    totalAmount: number;
    billingId: string;
}

interface HoverEffectProps {
    items: BillItem[];
    className?: string;
    onOpenDetails: (content: any) => void;
    onSubmitBill: (billingId: string, amount: number) => void;
    userName: string;
    phoneNumber: string;
}

interface CardProps {
    className?: string;
    children: React.ReactNode;
}

interface CardTitleProps {
    className?: string;
    children: React.ReactNode;
}

const Bills: React.FC = () => {
    const [datas, setDatas] = useState<BillItem[]>([]);
    const [selectedDetails, setSelectedDetails] = useState<any>(null);
    const { _id, name, phoneNum } = useAppSelector((state) => state.user.userDetails);
    const [isRazorpayLoaded, setIsRazorpayLoaded] = useState(false);
    useEffect(() => {
        userBills(_id+"")
            .then((data) => {
                const transformedData = data.map((bill: any) => ({
                    title: `Billing ID: ${bill.bookingId}`,
                    fullDetails: bill.items,
                    bookingId: bill.bookingId,
                    billingId: bill._id,
                    totalAmount: bill.items.reduce((total: number, item: any) => total + item.amount, 0), 
                }));
                setDatas(transformedData);
            })
            .catch((err: Error) => {
                console.log(err);
            });
    }, [_id]);
    useEffect(() => {
        const script = document.createElement('script');
        script.src = 'https://checkout.razorpay.com/v1/checkout.js';
        script.onload = () => setIsRazorpayLoaded(true);
        script.onerror = () => setIsRazorpayLoaded(false);
        document.body.appendChild(script);
    }, []);

    const handleSubmitBill = (billingId: string, amount: number) => {
        if (!isRazorpayLoaded) {
            alert('Razorpay SDK is still loading or failed to load. Please try again later.');
            return;
        }
        alert(billingId)
        const options = {
            key: import.meta.env.VITE_APP_RAZORPAY_KEYID,
            amount: amount * 100, 
            currency: 'INR',
            name: 'EVENT CRAFT',
            description: 'Test Payment',
            image: '/logo-no-background.png',
            notes: { address: 'Razorpay Corporate Office' },
            theme: { color: '#3399cc' },
            handler: async () => {
                try {
                    const res = await payingBill(billingId, amount);
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
                ondismiss: () => {
                    alert('Payment dismissed');
                },
            },
        };
        const rzp = new (window as any).Razorpay(options);
        rzp.open();
    };

    return (
        <div className="max-w-5xl mx-auto px-8">
            <HoverEffect
                items={datas}
                onOpenDetails={setSelectedDetails}
                onSubmitBill={handleSubmitBill}
                userName={name+""}
                phoneNumber={phoneNum+""}
            />
        </div>
    );
};

export default Bills;

export const HoverEffect: React.FC<HoverEffectProps> = ({
    items,
    className,
    onSubmitBill,
    userName,
    phoneNumber,
}) => {
    const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

    const handleDownloadPDF = async (item: BillItem) => {
        const invoiceData = {
            documentTitle: "EVENT BILL INVOICE",
            currency: "INR",
            taxNotation: "gst",
            marginTop: 25,
            marginRight: 25,
            marginLeft: 25,
            logo: "/black.png",
            sender: {
                company: "EVENT CRAFT",
                address: "Eranamkulam",
                zip: "12345",
                city: "Maradu",
                country: "India",
            },
            client: {
                company: userName,
                address: "User's Address",
                zip: "User's Zip",
                city: "User's City",
                country: "India",
                "phone number": phoneNumber,
            },
            invoiceNumber: item.bookingId,
            invoiceDate: new Date().toLocaleDateString(),
            products: item.fullDetails.map((detail) => ({
                description: detail.item,
                "tax-rate": 0,
                price: detail.amount,
            })),
            bottomNotice: "Thank you for choosing our event management services. If you have any questions, please contact us at support@eventcraft.com.",
        };

        const result = await easyinvoice.createInvoice(invoiceData);

        easyinvoice.download(`invoice_${item.bookingId}.pdf`, result.pdf);
    };

    return (
        <div className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 py-10 ${className}`}>
            {items.map((item, idx) => (
                <div
                    key={idx}
                    className="relative group block p-2 h-full w-full"
                    onMouseEnter={() => setHoveredIndex(idx)}
                    onMouseLeave={() => setHoveredIndex(null)}
                >
                    <AnimatePresence>
                        {hoveredIndex === idx && (
                            <motion.span
                                className="absolute inset-0 h-full w-full bg-neutral-200 dark:bg-slate-800/[0.8] block rounded-3xl"
                                layoutId="hoverBackground"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1, transition: { duration: 0.15 } }}
                                exit={{ opacity: 0, transition: { duration: 0.15, delay: 0.2 } }}
                            />
                        )}
                    </AnimatePresence>
                    <Card>
                        <div className="mb-2">
                            <CardTitle>{item.title}</CardTitle>
                        </div>
                        <div className="h-36 overflow-y-auto scrollNoDiv scrollbar-hidden">
                            <ul className="mt-4 space-y-2">
                                {item.fullDetails.map((detail, index) => (
                                    <li
                                        key={index}
                                        className="flex justify-between border-b border-white text-gray-400"
                                    >
                                        <span>{detail.item}</span>
                                        <span>₹{detail.amount}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                        <div className="flex mt-5 space-x-4 h-full">
                            <button
                                className="bg-blue-500 bottom-7 text-white px-2 py-2 rounded"
                                onClick={() => onSubmitBill(item.billingId, item.totalAmount)}
                            >
                                Pay ₹{item.totalAmount}
                            </button>
                            <button
                                className="bg-green-500 bottom-7 text-white px-2 py-2 rounded"
                                onClick={() => handleDownloadPDF(item)}
                            >
                                Download PDF
                            </button>
                        </div>
                    </Card>
                </div>
            ))}
        </div>
    );
};

export const Card: React.FC<CardProps> = ({
    className,
    children,
}) => {
    return (
        <div
            className={`rounded-2xl h-full w-full p-4 overflow-hidden bg-gray-100 border border-gray-300 group-hover:border-gray-400 relative z-20 ${className}`}
        >
            <div className="relative z-50">
                <div className="p-4">{children}</div>
            </div>
        </div>
    );
};

export const CardTitle: React.FC<CardTitleProps> = ({
    className,
    children,
}) => {
    return (
        <h4 className={`text-gray-900 font-bold tracking-wide mt-4 ${className}`}>
            {children}
        </h4>
    );
};
