import { useState, useEffect, useRef } from 'react';
import OtpInput from 'react-otp-input';
import { toast, Toaster } from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import { useAppSelector } from '../../../costumeHooks/costum';
import { verifyOtp, resendOtp } from '../../../API/services/vendor/vendorAuthService';
import React from 'react';
import FOG from 'vanta/dist/vanta.fog.min';
import * as THREE from 'three';
const Otp: React.FC = () => {
    const vendorDetails = useAppSelector((state) => state.vendor.vendorDetails);
    const { email } = vendorDetails;

    const navigate = useNavigate();
    const [otp, setOtp] = useState('');
    const vantaRef = useRef<HTMLDivElement>(null);
    const vantaEffect = useRef<any>(null);
    const [timer, setTimer] = useState<number>(() => {
        const savedTimer = localStorage.getItem('timer');
        return savedTimer ? parseInt(savedTimer, 10) : 60;
    });
    const [inputVisible, setInputVisible] = useState<boolean>(true);
    let timerInterval: NodeJS.Timeout;

    useEffect(() => {
        if (timer > 0) {
            startTimer();
        }

        return () => {
            clearInterval(timerInterval);
        };
    }, []);

    const startTimer = () => {
        timerInterval = setInterval(() => {
            setTimer((prevTimer) => {
                const newTimer = prevTimer - 1;
                if (newTimer === -1) { localStorage.removeItem('timer'); }

                if (newTimer <= 0) {
                    clearInterval(timerInterval);
                    setInputVisible(false);
                    localStorage.setItem('inputVisible', JSON.stringify(false));
                } else {
                    localStorage.setItem('timer', newTimer.toString());
                }
                return newTimer;
            });
        }, 1000);
    };

    const handleResend = async () => {
        try {
            await resendOtp(email);
            toast.success('OTP resent successfully!');
            clearInterval(timerInterval);
            setTimer(60);
            localStorage.setItem('timer', '60');
            setInputVisible(true);
            localStorage.setItem('inputVisible', JSON.stringify(true));
            startTimer();
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
                navigate('/vendor/services');
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
    useEffect(() => {
        if (vantaRef.current && !vantaEffect.current) {
            vantaEffect.current = FOG({
                el: vantaRef.current,
                THREE,
                mouseControls: true,
                touchControls: true,
                gyroControls: false,
                minHeight: 200.00,
                minWidth: 200.00,
                highlightColor: 0x4c4a45,
                midtoneColor: 0xffffff,
                lowlightColor: 0xd9d9d9,
                baseColor: 0xf9f6f6,
                speed: 5.00,
                zoom: 1.40

            });
        }

        return () => {
            if (vantaEffect.current) {
                vantaEffect.current.destroy();
                vantaEffect.current = null;
            }
        };
    }, []);
    useEffect(() => {
        console.log('inputVisible:', inputVisible);
    }, [inputVisible]);

    return (
        <div ref={vantaRef} className="relative flex min-h-screen flex-col justify-center overflow-hidden py-12 bg-[#0593AB]">
            <Toaster position="top-center" reverseOrder={false} />
            <div className="relative   px-6 pt-10 pb-9 shadow-xl mx-auto w-full max-w-lg rounded-2xl" style={{ boxShadow: '0 0 9px 1px rgba(225, 225, 225, 0.9)' }}>
                <div className="mx-auto flex w-full max-w-md flex-col space-y-16">
                    <div className="flex flex-col items-center justify-center text-center space-y-2">
                        <div className="font-semibold text-3xl">
                            <p>Email Verification</p>
                        </div>
                        <div className="flex flex-row text-sm font-medium text-gray-900">
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

                                    <div className="flex flex-row items-center justify-center text-center text-sm font-medium space-x-1 text-gray-800">
                                        {timer === 0 ? (
                                            <p>
                                                Didn't receive code?{' '}
                                                <button
                                                    type='button'
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

export default React.memo(Otp);
