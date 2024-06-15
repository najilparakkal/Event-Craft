import React from 'react';
import happyCoupleWeddingDay from '../../../assets/user/wp.webp';
import { Formik, Form } from 'formik';
import { validation } from '../../../utils/validations/validateSchema';
import { initialValue } from '../../../utils/validations/initialValue';
import { toast, Toaster } from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import { signupUser } from '../../../API/services/user/authSlice';
import { useDispatch } from 'react-redux';

const Signup: React.FC = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch(); // Move useDispatch to the top level of the component

    const handleSubmit = async (values: any) => {
        try {
            await toast.promise(
                dispatch(signupUser(values)).unwrap(),
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

    return (
        <section className="bg-gray-50 dark:bg-gray-900 min-h-screen flex items-center justify-center">
            <Toaster position="top-center" reverseOrder={false} />
            <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0 w-full max-w-2xl">
                <div className="flex flex-col h-[80%] md:flex-row bg-white rounded-lg shadow dark:border dark:bg-gray-800 dark:border-gray-700 w-full">
                    <div
                        className="md:w-1/2 rounded-l-lg bg-cover bg-center"
                        style={{ backgroundImage: `url(${happyCoupleWeddingDay})` }}
                    ></div>
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
                                            className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
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
                                            className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
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
                                            className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
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
                                            className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                            value={values.password}
                                            onChange={handleChange}
                                        />
                                        {touched.password && errors.password && <div className="text-red-500">{errors.password}</div>}
                                    </div>
                                    <button
                                        type="submit"
                                        disabled={isSubmitting}
                                        className="w-full text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
                                    >
                                        Create an account
                                    </button>
                                    <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                                        Already have an account? <a  className="font-medium text-primary-600 hover:underline dark:text-primary-500" onClick={()=>navigate("/login")}>Login here</a>
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

export default Signup;
