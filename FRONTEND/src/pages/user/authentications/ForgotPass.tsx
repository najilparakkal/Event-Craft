import { useState, useEffect, useRef } from 'react';
import OtpInput from 'react-otp-input';
import { forgotVerifyOtp, resendOtp, validEmail, changePassword } from '../../../API/services/user/userAuthService';
import { toast, Toaster } from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import { emailForgot, passwordForgot } from '../../../utils/validations/validateSchema';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import FOG from 'vanta/dist/vanta.fog.min';
import * as THREE from 'three';
const ForgotPass: React.FC = () => {
    const vantaRef = useRef<HTMLDivElement>(null);
    const vantaEffect = useRef<any>(null);
    const navigate = useNavigate();
    const [email, setEmail] = useState("")
    const [otp, setOtp] = useState('');
    const [timer, setTimer] = useState<number>(() => {
        const savedTimer = localStorage.getItem('timer');
        return savedTimer ? parseInt(savedTimer, 10) : 60;
    });
    const [inputVisible, setInputVisible] = useState<boolean>(true);

    const [step, setStep] = useState<number>(() => {
        const savedStep = localStorage.getItem('step');
        return savedStep ? parseInt(savedStep, 10) : 1;
    });

    const initialValue = {
        email: '',
    };

    const handleEmailSubmit = async (values: { email: string }) => {
        const response = await validEmail(values.email);
        setEmail(values.email)
        if (response) {
            localStorage.removeItem('timer');
            console.log(response);
            toast.success("Email verified");
            setStep(2);
            localStorage.setItem('step', '2');
        } else {
            toast.error('Invalid email. Please try again.');
        }
    };

    useEffect(() => {
        if (timer > 0) {
            startTimer();
        }

        return () => {
            clearInterval(timerInterval);
        };
    }, [timer]);

    let timerInterval: NodeJS.Timeout;

    const startTimer = () => {
        timerInterval = setInterval(() => {
            setTimer((prevTimer) => {
                const newTimer = prevTimer - 1;
                if (newTimer <= 0) {
                    clearInterval(timerInterval);
                    setInputVisible(false);
                    localStorage.removeItem('timer');
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
            const verified = await forgotVerifyOtp(otp);
            if (verified) {
                toast.success('OTP verified successfully!', {
                    id: loadingToastId,
                });
                setStep(3);
                localStorage.setItem('step', '3');
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
                highlightColor: 0x1a1a18,
                midtoneColor: 0x9a2727,
                lowlightColor: 0x0,
                baseColor: 0x0,
                blurFactor: 0.90,
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

    interface FormValues {
        password: string;
    }

    const initialValuePass: FormValues = {
        password: '',
    };
    useEffect(() => {
        setStep(1);
        localStorage.setItem('step', '1');
    }, []);
    const handlePassSubmit = async (values: FormValues) => {
        await changePassword(values.password)
        localStorage.removeItem('step');
        localStorage.removeItem('timer');
        localStorage.removeItem('inputVisible');
        toast.success('Password reset successful!');
        navigate('/login');
    };

    return (
        <div ref={vantaRef} className="relative flex min-h-screen flex-col justify-center overflow-hidden bg-gray-50 py-12" style={{ backgroundColor: '#1F2136' }}>
            <Toaster position="top-center" reverseOrder={false} />

            {step === 1 ? (
                <div className="relative  px-6 pt-10 pb-9 shadow-xl mx-auto w-full max-w-lg rounded-2xl"
                    style={{ boxShadow: '0 0 9px 1px rgba(225, 225, 225, 0.9)' }}>


                    <div className="mx-auto flex w-full max-w-md flex-col space-y-16">
                        <div className="flex flex-col items-center justify-center text-gray-50 text-center space-y-2">
                            <div className="font-semibold text-3xl">
                                <p>Email Verification</p>
                            </div>
                            <div className="flex flex-row text-sm font-medium text-gray-400">
                                <p>Enter your email</p>
                            </div>
                        </div>
                        <div>
                            <Formik initialValues={initialValue} validationSchema={emailForgot} onSubmit={handleEmailSubmit}>
                                {({ handleChange, values, touched, errors, isSubmitting }) => (
                                    <Form>
                                        <div className="flex flex-col space-y-5">
                                            <div>
                                                <Field
                                                    type="email"
                                                    name="email"
                                                    id="email"
                                                    placeholder="Enter your email"
                                                    className="bg-transparent border-b-2 border-white text-white sm:text-sm focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                                                    value={values.email}
                                                    onChange={handleChange}
                                                />
                                                {touched.email && errors.email && <div className="text-red-500">{errors.email}</div>}
                                            </div>
                                            <div>
                                                <button
                                                    className="flex flex-row items-center justify-center text-center w-full border rounded-xl outline-none py-5 bg-gray-900  border-none text-white text-m shadow-sm"
                                                    type="submit"
                                                    disabled={isSubmitting}
                                                >
                                                    Next
                                                </button>
                                            </div>
                                        </div>
                                    </Form>
                                )}
                            </Formik>
                        </div>
                    </div>
                </div>
            ) : step === 2 ? (
                <div className="relative  px-6 pt-10 pb-9 shadow-xl mx-auto w-full max-w-lg rounded-2xl"

                    style={{ boxShadow: '0 0 9px 1px rgba(225, 225, 225, 0.9)' }}>

                    <div className="mx-auto flex w-full max-w-md flex-col space-y-16">
                        <div className="flex flex-col items-center justify-center text-center space-y-2">
                            <div className="font-semibold text-3xl">
                                <p>OTP Verification</p>
                            </div>
                            <div className="flex flex-row text-sm font-medium text-gray-400">
                                <p>We have sent a OTP in to your {email} </p>
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
                                                className="flex flex-row items-center justify-center text-center w-full border rounded-xl outline-none py-5 bg-gray-900 border-none text-white text-sm shadow-sm"
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
                                                        type='button'
                                                        className="text-black underline"
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
            ) : (
                <div className="relative  px-6 pt-10 pb-9 shadow-xl mx-auto w-full max-w-lg rounded-2xl"

                    style={{ boxShadow: '0 0 9px 1px rgba(225, 225, 225, 0.9)' }}>

                    <div className="mx-auto flex w-full max-w-md flex-col space-y-16">
                        <div className="flex flex-col items-center justify-center text-center space-y-2">
                            <div className="font-semibold text-3xl text-white">
                                <p>New Password</p>
                            </div>
                            <div className="flex flex-row text-sm font-medium text-gray-400">
                                <p>Enter your new password</p>
                            </div>
                        </div>
                        <div>
                            <Formik initialValues={initialValuePass} validationSchema={passwordForgot} onSubmit={handlePassSubmit}>
                                {({ isSubmitting }) => (
                                    <Form>
                                        <div className="flex flex-col space-y-5">
                                            <div>
                                                <Field
                                                    type="password"
                                                    name="password"
                                                    placeholder="Enter your password"
                                                    className="bg-transparent border-b-2 border-white text-white sm:text-sm focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                                                />
                                                <ErrorMessage name="password" component="div" className="text-red-500" />
                                            </div>
                                            <div>
                                                <button
                                                    className="flex flex-row items-center justify-center text-center w-full border rounded-xl outline-none py-5 bg-gray-900 border-none text-white text-m shadow-sm"
                                                    type="submit"
                                                    disabled={isSubmitting}
                                                >
                                                    Next
                                                </button>
                                            </div>
                                        </div>
                                    </Form>
                                )}
                            </Formik>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ForgotPass;
