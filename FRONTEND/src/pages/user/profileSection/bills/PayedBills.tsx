import React, { useEffect, useState } from 'react';
import { useAppSelector } from '../../../../costumeHooks/costum';
import { AnimatePresence, motion } from "framer-motion";
import easyinvoice from 'easyinvoice';
import { paidBills } from '../../../../API/services/user/Services';

interface BillItem {
    title: string;
    fullDetails: {
        item: string;
        amount: number;
    }[];
    bookingId: string;
    totalAmount: number;
    billingId: string;
    eventDate: string; // Date of the event
    vendorInfo: {
        vendorName: string;
        vendorEmail: string;
        vendorPhone: string;
    };
    advancePayment: number; // Advance payment
    bookedDate: string; // Date when the booking was made
}

interface HoverEffectProps {
    items: BillItem[];
    className?: string;
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

const PayedBills = () => {
    const [datas, setDatas] = useState<BillItem[]>([]);
    const { _id, userName, phoneNum } = useAppSelector((state) => state.user.userDetails);

    useEffect(() => {
        paidBills(_id + "")
            .then((data) => {
                console.log(data); // Debug log for fetched data
                const transformedData = data.billingData.map((bill: any) => ({
                    title: `Billing ID: ${bill._id}`,
                    fullDetails: bill.items,
                    bookingId: bill.bookingId._id,
                    billingId: bill._id,
                    totalAmount: bill.totalAmount,
                    eventDate: bill.bookingId.eventDate,
                    advancePayment: bill.bookingId.advance,
                    bookedDate: bill.bookingId.createdAt,
                    vendorInfo: {
                        vendorName: data.vendors[0].vendorName,
                        vendorEmail: data.vendors[0].email,
                        vendorPhone: data.vendors[0].phoneNum,
                    }
                }));
                setDatas(transformedData);
            })
            .catch((err: Error) => {
                console.log(err);
            });
    }, [_id]);
    
    return (
        <div className="max-w-5xl mx-auto px-8">
            <HoverEffect
                items={datas}
                userName={userName}
                phoneNumber={phoneNum}
            />
        </div>
    );
}

export default PayedBills;

export const HoverEffect: React.FC<HoverEffectProps> = ({
    items,
    className,
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
            logo: "/black.png", // Ensure the correct path to your logo
            sender: {
                company: "EVENT CRAFT",
                address: "Eranamkulam",
                zip: "12345",
                city: "Maradu",
                country: "India",
            },
            client: {
                company: userName,
                address: "User's Address", // Replace with actual user address if available
                zip: "User's Zip", // Replace with actual user zip if available
                city: "User's City", // Replace with actual user city if available
                country: "India",
                phone: phoneNumber,
            },
            invoiceNumber: item.billingId,
            invoiceDate: new Date().toLocaleDateString(),
            products: item.fullDetails.map((detail) => ({
                description: detail.item,
                "tax-rate": 0,
                price: detail.amount,
            })),
            bottomNotice: "Thank you for choosing our event management services. If you have any questions, please contact us at support@eventcraft.com.",
            additionalText: `
                Vendor Details:
                Name: ${item.vendorInfo.vendorName}
                Email: ${item.vendorInfo.vendorEmail}
                Phone: ${item.vendorInfo.vendorPhone}
    
                Event Details:
                Booked Date: ${new Date(item.bookedDate).toLocaleDateString()}
                Event Date: ${new Date(item.eventDate).toLocaleDateString()}
                Advance Payment: ₹${item.advancePayment}
                Total Amount Paid: ₹${item.totalAmount}
            `,
        };
    
        const result = await easyinvoice.createInvoice(invoiceData);
        easyinvoice.download(`invoice_${item.billingId}.pdf`, result.pdf);
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
