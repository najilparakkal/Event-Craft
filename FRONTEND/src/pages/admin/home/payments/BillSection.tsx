import { useEffect, useState } from "react";
import { bills, readBill } from "../../../../API/services/admin/Dashboard";
import { AnimatePresence, motion } from "framer-motion";

export function BillSection() {
    const [datas, setDatas] = useState([]);
    const [selectedDetails, setSelectedDetails] = useState<any>(null);

    useEffect(() => {
        bills()
            .then((data) => {
                const transformedData = data.map((bill: any) => ({
                    title: `Billing ID: ${bill._id}`,
                    fullDetails: bill.items,
                    billingId: bill._id,
                }));
                setDatas(transformedData);
            })
            .catch((err: Error) => {
                console.log(err);
            });
    }, []);
    const handleSubmitBill = async (billingId: string) => {
        try {
            await readBill(billingId);
            setDatas((prevDatas) => prevDatas.filter((bill: any) => bill._id !== billingId));
        } catch (err) {
            console.error("Error submitting the bill:", err);
        }
    };
    
    return (
        <div className="max-w-5xl mx-auto px-8">
            <HoverEffect items={datas} onOpenDetails={setSelectedDetails} onSubmitBill={handleSubmitBill} />
            {selectedDetails && (
                <div className="p-4 border border-gray-200 rounded-lg bg-white shadow-lg">
                    <h2 className="text-xl font-bold mb-4">Billing Details</h2>
                    <pre>{JSON.stringify(selectedDetails, null, 2)}</pre>
                    <button
                        onClick={() => setSelectedDetails(null)}
                        className="mt-4 px-4 py-2 bg-gray-500 text-white rounded"
                    >
                        Close
                    </button>
                </div>
            )}
        </div>
    );
}

export const HoverEffect = ({
    items,
    className,
        onSubmitBill,
}: {
    items: {
        title: string;
        fullDetails: any;
        billingId: string;
    }[];
    className?: string;
    onOpenDetails: (content: any) => void;
    onSubmitBill: (billingId: string) => void;
}) => {
    let [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

    return (
        <div className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 py-10 ${className}`}>
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
                        <div className="h-36  overflow-y-auto scrollNoDiv scrollbar-hidden ">
                            <ul className="mt-4 space-y-2">
                                {item.fullDetails.map((detail: any, index: number) => (
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
                                onClick={() => onSubmitBill(item.billingId)}
                            >
                                Submit Bill
                            </button>
                        </div>
                    </Card>
                </div>
            ))}
        </div>
    );
};

export const Card = ({
    className,
    children,
}: {
    className?: string;
    children: React.ReactNode;
}) => {
    return (
        <div
            className={`rounded-2xl h-full w-full p-4 overflow-hidden bg-[#292F45]  border border-transparent  group-hover:border-slate-700 relative z-20 ${className}`}
        >
            <div className="relative z-50">
                <div className="p-4">{children}</div>
            </div>
        </div>
    );
};

export const CardTitle = ({
    className,
    children,
}: {
    className?: string;
    children: React.ReactNode;
}) => {
    return (
        <h4 className={`text-zinc-100 font-bold tracking-wide mt-4 ${className}`}>
            {children}
        </h4>
    );
};
