import { useState, useEffect } from 'react';
import OtpInput from 'react-otp-input';
import { verifyOtp, resendOtp } from '../../../API/services/user/userAuthService'; // Assuming you have a function for resending OTP
import { toast, Toaster } from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

const Otp: React.FC = () => {
    const email = localStorage.email;
    const navigate = useNavigate();
    const [otp, setOtp] = useState('');
    const time = Number(localStorage.getItem('currentTime') ?? 60);
    const [timer, setTimer] = useState<number>(time);
    const [inputVisible, setInputVisible] = useState(true);
    let timerInterval: NodeJS.Timeout;

    useEffect(() => {
        // Timer interval
        timerInterval = setInterval(() => {
            setTimer((prevTimer) => {
                if (prevTimer === 0) {
                    clearInterval(timerInterval);
                    setInputVisible(false);
                    return 0;
                }
                localStorage.setItem('currentTime', (prevTimer - 1).toString());
                return prevTimer - 1;
            });
        }, 1000);

        return () => {
            clearInterval(timerInterval);
        };
    }, []);

    const handleResend = async () => {
        try {
            localStorage.removeItem('currentTime');

            await resendOtp(email);
            toast.success('OTP resent successfully!');
            clearInterval(timerInterval);
            setTimer(60);
            setInputVisible(true);

            timerInterval = setInterval(() => {
                setTimer((prevTimer) => {
                    if (prevTimer === 0) {
                        clearInterval(timerInterval);
                        setInputVisible(false);
                        return 0;
                    }
                    localStorage.setItem('currentTime', (prevTimer - 1).toString());
                    return prevTimer - 1;
                });
            }, 1000);
        } catch (error) {
            console.error('Error while resending OTP:', error);
            toast.error('Failed to resend OTP. Please try again later.');
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const loadingToastId = toast.loading('Verifying OTP...');
        try {
            const verified = await verifyOtp(otp);
            if (verified) {
                toast.success('OTP verified successfully!', {
                    id: loadingToastId,
                });
                navigate('/home');
            } else {
                toast.error('Invalid OTP. Please try again.', {
                    id: loadingToastId,
                });
            }
        } catch (err: any) {
            console.error(err);
            if (err.message === 'User email not found') {
                toast.error('User email not found. Please log in again.', {
                    id: loadingToastId,
                });
            } else if (err.message === 'Network Error') {
                toast.error('Network error. Please check your internet connection.', {
                    id: loadingToastId,
                });
            } else if (err.response && err.response.status === 500) {
                toast.error('Server error. Please try again later.', {
                    id: loadingToastId,
                });
            } else {
                toast.error('An unexpected error occurred. Please try again.', {
                    id: loadingToastId,
                });
            }
        }
    };

    return (
        <div className="relative flex min-h-screen flex-col justify-center overflow-hidden bg-gray-50 py-12">
            <Toaster position="top-center" reverseOrder={false} />
            <div className="relative bg-white px-6 pt-10 pb-9 shadow-xl mx-auto w-full max-w-lg rounded-2xl">
                <div className="mx-auto flex w-full max-w-md flex-col space-y-16">
                    <div className="flex flex-col items-center justify-center text-center space-y-2">
                        <div className="font-semibold text-3xl">
                            <p>Email Verification</p>
                        </div>
                        <div className="flex flex-row text-sm font-medium text-gray-400">
                            <p>We have sent a code to your email {email}</p>
                        </div>
                    </div>

                    <div>
                        <form onSubmit={handleSubmit}>
                            <div className="flex flex-col space-y-16">
                                {inputVisible && (
                                    <div className="flex flex-row items-center justify-center mx-auto w-full max-w-xs">
                                        <OtpInput
                                            value={otp}
                                            onChange={setOtp}
                                            numInputs={4}
                                            renderInput={(props) => <input {...props} />}
                                            renderSeparator={<span className="bg-reg-700"></span>}
                                            inputStyle={{
                                                width: '3rem',
                                                height: '3rem',
                                                margin: '0 0.5rem',
                                                fontSize: '2rem',
                                                borderRadius: 4,
                                                border: '1px solid black',
                                            }}
                                        />
                                    </div>
                                )}

                                <div className="flex flex-col space-y-5">
                                    <div>
                                        <button
                                            className="flex flex-row items-center justify-center text-center w-full border rounded-xl outline-none py-5 bg-blue-700 border-none text-white text-sm shadow-sm"
                                            type="submit"
                                        >
                                            Verify Account
                                        </button>
                                    </div>

                                    <div className="flex flex-row items-center justify-center text-center text-sm font-medium space-x-1 text-gray-500">
                                        {timer === 0 ? (
                                            <p>
                                                Didn't receive code?{' '}
                                                <button
                                                    className="text-blue-600 underline"
                                                    onClick={handleResend}
                                                >
                                                    Resend
                                                </button>
                                            </p>
                                        ) : (
                                            <p>Resend OTP in {timer} seconds</p>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Otp;
