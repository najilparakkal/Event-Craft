import React, { useState } from 'react';
import { Formik, Form, ErrorMessage, Field } from 'formik';
import { toast, Toaster } from 'react-hot-toast';
import { loginValidation } from '../../../utils/validations/validateSchema';
import { useNavigate } from 'react-router-dom';
import { adminLogin } from '../../../API/services/admin/adminAuthServices';

const Login: React.FC = () => {
  const [showModal, setShowModal] = useState(false);
  const initialValue: { email: string; password: string } = {
    email: '',
    password: '',
  };

  const navigate = useNavigate();

  const handleSubmit = async (values: { email: string; password: string }) => {
    try {
      const result = await adminLogin(values);

      if (result) {
        toast.success('Login successful');
        navigate("/admin/Dashboard");
      } else {
        toast.error('Invalid admin');
      }

    } catch (error) {
      toast.error('An error occurred during login');
    }
  };

  return (
    <div className="bg-[#292F45] h-screen overflow-hidden flex flex-col items-center justify-center">
      <Toaster position="top-center" reverseOrder={false} />
      <h1 className="font-semibold text-3xl mb-8">WELCOME HOME</h1>

      <button
        className="block text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        onClick={() => setShowModal(true)}
      >
        Let's Login
      </button>

      {showModal && (
        <div id="authentication-modal" className="fixed transform transition-transform duration-900 top-0 right-0 left-0 z-50 flex justify-center items-center w-full h-full bg-black bg-opacity-50">
          <div className="relative p-4 w-full max-w-md max-h-full transform transition-transform duration-900">
            <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
              <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600">
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                  Sign in to your platform
                </h3>
                <button
                  type="button"
                  className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
                  onClick={() => setShowModal(false)}
                >
                  <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6" />
                  </svg>
                  <span className="sr-only">Close modal</span>
                </button>
              </div>

              <div className="p-4 md:p-5">
                <Formik initialValues={initialValue} validationSchema={loginValidation} onSubmit={handleSubmit}>
                  {({ handleChange, values, errors, touched, isSubmitting }) => (
                    <Form className="space-y-4">
                      <div>
                        <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your email</label>
                        <Field
                          type="email"
                          name="email"
                          id="email"
                          className={`bg-gray-50 border text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white ${errors.email && touched.email ? 'border-red-500' : 'border-gray-300'}`}
                          placeholder="name@company.com"
                          onChange={handleChange}
                          value={values.email}
                        />
                        <ErrorMessage name="email" component="div" className="text-red-500 text-sm mt-1" />
                      </div>

                      <div>
                        <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your password</label>
                        <Field
                          type="password"
                          name="password"
                          id="password"
                          placeholder="••••••••"
                          className={`bg-gray-50 border text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white ${errors.password && touched.password ? 'border-red-500' : 'border-gray-300'}`}
                          onChange={handleChange}
                          value={values.password}
                        />
                        <ErrorMessage name="password" component="div" className="text-red-500 text-sm mt-1" />
                      </div>

                      <button type="submit" className="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                        {isSubmitting ? 'Signing in...' : 'Login to your account'}
                      </button>
                    </Form>
                  )}
                </Formik>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Login;
