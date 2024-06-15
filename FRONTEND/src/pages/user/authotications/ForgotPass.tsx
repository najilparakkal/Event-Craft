import { useState, useEffect } from 'react';
import OtpInput from 'react-otp-input';
import { forgotVerifyOtp, resendOtp, validEmail,changePassword } from '../../../API/services/user/userAuthService';
import { toast, Toaster } from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import { emailForgot, passwordForgot } from '../../../utils/validations/validateSchema';
import { Formik, Form, Field, ErrorMessage } from 'formik';

const ForgotPass: React.FC = () => {
    const navigate = useNavigate();

    const [otp, setOtp] = useState('');
    const [timer, setTimer] = useState<number>(() => {
        const savedTimer = localStorage.getItem('timer');
        return savedTimer ? parseInt(savedTimer, 10) : 60;
    });
    const [inputVisible, setInputVisible] = useState<boolean>(true);

    // Retrieve the current step from localStorage
    const [step, setStep] = useState<number>(() => {
        const savedStep = localStorage.getItem('step');
        return savedStep ? parseInt(savedStep, 10) : 1;
    });

    const initialValue = {
        email: '',
    };

    const handleEmailSubmit = async (values: { email: string }) => {
        const response = await validEmail(values.email);
        if (response) {
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
            await resendOtp();
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

    interface FormValues {
        password: string;
    }

    const initialValuePass: FormValues = {
        password: '',
    };

    const handlePassSubmit = async (values: FormValues) => {
        await changePassword(values.password)
        localStorage.removeItem('step');
        localStorage.removeItem('timer');
        localStorage.removeItem('inputVisible');
        toast.success('Password reset successful!');
        // navigate('/login');
    };

    return (
        <div className="relative flex min-h-screen flex-col justify-center overflow-hidden bg-gray-50 py-12">
            <Toaster position="top-center" reverseOrder={false} />

            {step === 1 ? (
                <div className="relative bg-white px-6 pt-10 pb-9 shadow-xl mx-auto w-full max-w-lg rounded-2xl">
                    <div className="mx-auto flex w-full max-w-md flex-col space-y-16">
                        <div className="flex flex-col items-center justify-center text-center space-y-2">
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
                                                    className="w-full px-4 py-3 bg-gray-200 focus:bg-gray-100 border border-gray-200 rounded-lg focus:outline-none focus:border-purple-400"
                                                    value={values.email}
                                                    onChange={handleChange}
                                                />
                                                {touched.email && errors.email && <div className="text-red-500">{errors.email}</div>}
                                            </div>
                                            <div>
                                                <button
                                                    className="flex flex-row items-center justify-center text-center w-full border rounded-xl outline-none py-5 bg-blue-700 border-none text-white text-sm shadow-sm"
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
                <div className="relative bg-white px-6 pt-10 pb-9 shadow-xl mx-auto w-full max-w-lg rounded-2xl">
                    <div className="mx-auto flex w-full max-w-md flex-col space-y-16">
                        <div className="flex flex-col items-center justify-center text-center space-y-2">
                            <div className="font-semibold text-3xl">
                                <p>Email Verification</p>
                            </div>
                            <div className="flex flex-row text-sm font-medium text-gray-400">
                                <p>We have sent a code to your email </p>
                            </div>
                        </div>
                        <div>
                            <form onSubmit={handleSubmit}>
                                <div className="flex flex-col space-y-16">
                                    {inputVisible && ( // Only show inputs if inputVisible is true
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
            ) : (
                <div className="relative bg-white px-6 pt-10 pb-9 shadow-xl mx-auto w-full max-w-lg rounded-2xl">
                    <div className="mx-auto flex w-full max-w-md flex-col space-y-16">
                        <div className="flex flex-col items-center justify-center text-center space-y-2">
                            <div className="font-semibold text-3xl">
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
                                                    className="w-full px-4 py-3 bg-gray-200 focus:bg-gray-100 border border-gray-200 rounded-lg focus:outline-none focus:border-purple-400"
                                                />
                                                <ErrorMessage name="password" component="div" className="text-red-500" />
                                            </div>
                                            <div>
                                                <button
                                                    className="flex flex-row items-center justify-center text-center w-full border rounded-xl outline-none py-5 bg-blue-700 border-none text-white text-sm shadow-sm"
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
