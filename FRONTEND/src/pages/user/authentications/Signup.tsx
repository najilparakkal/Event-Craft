import React, { useEffect, useRef } from 'react';
import { Formik, Form } from 'formik';
import { validation } from '../../../utils/validations/validateSchema';
import { initialValue } from '../../../utils/validations/initialValue';
import { toast, Toaster } from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import { signupUser, GoogleAuth } from '../../../API/services/user/authSlice';
import { useDispatch } from 'react-redux';
import { auth, signInWithPopup, provider } from '../../../firebase/firebase';
import FOG from 'vanta/dist/vanta.fog.min';
import * as THREE from 'three';

const Signup: React.FC = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const vantaRef = useRef<HTMLDivElement>(null);
    const vantaEffect = useRef<any>(null);
    useEffect(() => {
        localStorage.removeItem('timer');
    }, [])
    const handleSubmit = async (values: any) => {
        try {
            await toast.promise(
                dispatch(signupUser(values) as any).unwrap(),
                {
                    loading: 'Registering user...',
                    success: 'User registered successfully!',
                    error: 'Email or Phone Number is already in use',
                }
            );
            navigate("/otp");
        } catch (err: any) {
            console.error(err);
            toast.error('An unexpected error occurred');
        }
    };

    const googleAuth = async () => {
        try {
            const result = await signInWithPopup(auth, provider)
            const user = result.user;
            console.log('Google user', user);

            dispatch(GoogleAuth({ email: user.email ?? "", name: user.displayName ?? "", uid: user.uid }) as any).then((response: any) => {
                if (response.meta.requestStatus === 'fulfilled') {
                    toast.success('User signed up with Google');
                    navigate('/home');
                } else {
                    toast.error('User already exists');
                }
            });
        } catch (error) {
            console.error('Error during Google signup:', error);
            toast.error('Google signup failed');
        }
    }

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


    return (
        <section ref={vantaRef} className="min-h-screen flex items-center justify-center bg-black">
        <Toaster position="top-center" reverseOrder={false} />
        <div className="flex flex-col md:flex-row items-center justify-center px-6 py-8 mx-auto max-w-6xl w-full">
            <div className="flex flex-col md:flex-row w-full  rounded-lg shadow-lg overflow-hidden">
                <div className="w-full md:w-1/2 p-6 border rounded-lg md:p-8 space-y-6">
                    
                    <Formik initialValues={initialValue} validationSchema={validation} onSubmit={handleSubmit}>
                        {({ handleChange, values, touched, errors, isSubmitting }) => (
                            <Form className="space-y-6">
                                <div>
                                    <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-300">
                                        Your email
                                    </label>
                                    <input
                                        type="email"
                                        name="email"
                                        id="email"
                                        className="bg-transparent border-b-2 border-white text-white sm:text-sm focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                                        placeholder="name@company.com"
                                        value={values.email}
                                        onChange={handleChange}
                                    />
                                    {touched.email && errors.email && <div className="text-red-500">{errors.email}</div>}
                                </div>
                                <div>
                                    <label htmlFor="name" className="block mb-2 text-sm font-medium text-gray-300">
                                        Full Name
                                    </label>
                                    <input
                                        type="text"
                                        name="name"
                                        id="name"
                                        className="bg-transparent border-b-2 border-white text-white sm:text-sm focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                                        placeholder="e.g. Bonnie Green"
                                        value={values.name}
                                        onChange={handleChange}
                                    />
                                    {touched.name && errors.name && <div className="text-red-500">{errors.name}</div>}
                                </div>
                                <div>
                                    <label htmlFor="phoneNum" className="block mb-2 text-sm font-medium text-gray-300">
                                        Phone Number
                                    </label>
                                    <input
                                        type="text"
                                        name="phoneNum"
                                        id="phoneNum"
                                        className="bg-transparent border-b-2 border-white text-white sm:text-sm focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                                        placeholder="1234567890"
                                        value={values.phoneNum}
                                        onChange={handleChange}
                                    />
                                    {touched.phoneNum && errors.phoneNum && <div className="text-red-500">{errors.phoneNum}</div>}
                                </div>
                                <div>
                                    <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-300">
                                        Password
                                    </label>
                                    <input
                                        type="password"
                                        name="password"
                                        id="password"
                                        placeholder="••••••••"
                                        className="bg-transparent border-b-2 border-white text-white sm:text-sm focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                                        value={values.password}
                                        onChange={handleChange}
                                    />
                                    {touched.password && errors.password && <div className="text-red-500">{errors.password}</div>}
                                </div>
                                <div className="flex flex-col sm:flex-row justify-center gap-4">
                                    <button
                                        type="submit"
                                        disabled={isSubmitting}
                                        className="w-full sm:w-auto text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-500 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
                                    >
                                        Create account
                                    </button>
                                    <button
                                        onClick={googleAuth}
                                        type="button"
                                        className="w-full sm:w-auto text-black bg-white hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-blue-500 font-medium rounded-lg text-sm px-5 py-2.5 text-center flex items-center justify-center gap-2"
                                    >
                                        <svg className="w-5 h-5" aria-hidden="true" focusable="false" data-prefix="fab" data-icon="google" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 488 512">
                                            <path fill="currentColor" d="M488 261.8C488 403.3 391.1 504 248 504 110.8 504 0 393.2 0 256S110.8 8 248 8c66.8 0 123 24.5 166.3 64.9l-67.5 64.9C258.5 52.6 94.3 116.6 94.3 256c0 86.5 69.1 156.6 153.7 156.6 98.2 0 135-70.4 140.8-106.9H248v-85.3h236.1c2.3 12.7 3.9 24.9 3.9 41.4z"></path>
                                        </svg>
                                        Signup with Google
                                    </button>
                                </div>
                                <p className="text-sm font-light text-gray-500">
                                    Already have an account? <a className="font-medium text-blue-600 hover:underline cursor-pointer" onClick={() => navigate("/login")}>Login here</a>
                                </p>
                            </Form>
                        )}
                    </Formik>
                </div>
                <div className="hidden md:flex md:w-1/2 flex-col justify-center items-center p-8  text-white relative">
                        <img src="/logo-no-background.png" className="w-70 h-auto" alt="Event Craft Logo" />
                        <button
                            onClick={() => navigate("/")}
                            className="mt-4 bottom-4 text-white bg-black hover:bg-blue-700 focus:ring-4  focus:outline-none focus:ring-blue-500 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
                        >
                            GO BACK
                        </button>
                    </div>
            </div>
        </div>
    </section>
    );
};

export default React.memo(Signup);
