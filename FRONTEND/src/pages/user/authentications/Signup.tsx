import React, { useEffect } from 'react';
import { Formik, Form } from 'formik';
import { validation } from '../../../utils/validations/validateSchema';
import { initialValue } from '../../../utils/validations/initialValue';
import { toast, Toaster } from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import { signupUser, GoogleAuth } from '../../../API/services/user/authSlice';
import { useDispatch } from 'react-redux';
import { auth, signInWithPopup, provider } from '../../../firebase/firebase';
import { useAppSelector } from '../../../costumeHooks/costum';

const Signup: React.FC = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const vendorDetails = useAppSelector((state) => state.user.jwt);
    useEffect(() => {
        if (vendorDetails) navigate("/home")
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

    return (
        <section className="min-h-screen flex items-center justify-center bg-black" >
            <Toaster position="top-center" reverseOrder={false} />
            <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0 w-full max-w-6xl">
                <div className="flex flex-col md:flex-row rounded-lg shadow w-full " style={{ backgroundColor: '#1F2136' }}>
                    <div className="md:w-1/2 flex flex-col justify-center p-8 rounded-md text-white rounded-l-lg ">
                        <img
                            src="/user/pexels-fauxels-3183153.jpg"
                            className="w-full h-full object-cover rounded-md"
                        />
                    </div>
                    <div className="w-full md:w-1/2 p-6 space-y-4 md:space-y-6 sm:p-8">
                        <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                            Create your Account
                        </h1>
                        <Formik initialValues={initialValue} validationSchema={validation} onSubmit={handleSubmit}>
                            {({ handleChange, values, touched, errors, isSubmitting }) => (
                                <Form className="space-y-4 md:space-y-5">
                                    <div>
                                        <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
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
                                        <label htmlFor="name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
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
                                        <label htmlFor="phoneNum" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
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
                                        <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
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
                                            className="w-full sm:w-auto text-white bg-blue-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
                                            style={{ minWidth: '150px' }}
                                        >
                                            Create account
                                        </button>
                                        <button
                                            onClick={googleAuth}
                                            type="button"
                                            className="w-full sm:w-auto text-black bg-[#ffffff] hover:bg-[#4285F4]/90 focus:ring-4 focus:outline-none focus:ring-[#4285F4]/50 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center justify-between"
                                            style={{ minWidth: '150px' }}
                                        >
                                            <svg className=" w-5 h-7 mr-2" aria-hidden="true" focusable="false" data-prefix="fab" data-icon="google" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 488 512">
                                                <path fill="currentColor" d="M488 261.8C488 403.3 391.1 504 248 504 110.8 504 0 393.2 0 256S110.8 8 248 8c66.8 0 123 24.5 166.3 64.9l-67.5 64.9C258.5 52.6 94.3 116.6 94.3 256c0 86.5 69.1 156.6 153.7 156.6 98.2 0 135-70.4 140.8-106.9H248v-85.3h236.1c2.3 12.7 3.9 24.9 3.9 41.4z"></path>
                                            </svg>
                                            SIGNUP WITH GOOGLE
                                        </button>
                                    </div>

                                    <p className="text-sm font-light text-gray-500 dark:text-gray-400 ">
                                        Already have an account? <a className="font-medium text-primary-600 hover:underline dark:text-primary-500 cursor-pointer" onClick={() => navigate("/login")}>Login here</a>
                                    </p>
                                </Form>
                            )}
                        </Formik>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default React.memo(Signup);
