import React from 'react'
import { Formik, Form, ErrorMessage } from 'formik';
import { toast, Toaster } from 'react-hot-toast';
import { loginValidation } from '../../../utils/validations/validateSchema';
import { useNavigate } from 'react-router-dom';
import { adminLogin } from '../../../API/services/admin/adminAuthServices';

const Login: React.FC = () => {
  const initialValue: { email: string; password: string } = {
    email: '',
    password: '',
  };

  const navigate = useNavigate()
  const handleSubmit = async (values: { email: string; password: string }) => {
    try {
      const result = await adminLogin(values);

      if (result) {
        toast.success('Login successful');
        navigate("/admin/Dashboard")
      } else {
        toast.error('Invalid admin');

      }

    } catch (error) {
      toast.error('An error occurred during login');
    }
  };
  return (
    <div className="bg-yellow-400 h-screen overflow-hidden flex flex-col items-center justify-center">
      <Toaster position="top-center" reverseOrder={false} />

      <h1 className="font-semibold text-3xl mb-8">WELCOME HOME</h1>
      <div className="bg-white lg:w-3/12 md:w-7/12 w-8/12 shadow-3xl rounded-xl relative p-8">
        <div className="bg-gray-800 shadow shadow-gray-200 absolute left-1/2 transform -translate-x-1/2 -translate-y-1/2 rounded-full p-4 md:p-8">
          <svg width="32" height="32" viewBox="0 0 24 24" fill="#FFF">
            <path d="M0 3v18h24v-18h-24zm6.623 7.929l-4.623 5.712v-9.458l4.623 3.746zm-4.141-5.929h19.035l-9.517 7.713-9.518-7.713zm5.694 7.188l3.824 3.099 3.83-3.104 5.612 6.817h-18.779l5.513-6.812zm9.208-1.264l4.616-3.741v9.348l-4.616-5.607z" />
          </svg>
        </div>

        <Formik initialValues={initialValue} validationSchema={loginValidation} onSubmit={handleSubmit}>
          {({ handleChange, values, isSubmitting }) => (
            <Form className="pt-20">
              <div className="flex items-center text-lg md:mb-2 relative">
                <svg className="absolute ml-1" width="24" viewBox="0 0 24 24">
                  <path d="M20.822 18.096c-3.439-.794-6.64-1.49-5.09-4.418 4.72-8.912 1.251-13.678-3.732-13.678-5.082 0-8.464 4.949-3.732 13.678 1.597 2.945-1.725 3.641-5.09 4.418-3.073.71-3.188 2.236-3.178 4.904l.004 1h23.99l.004-.969c.012-2.688-.092-4.222-3.176-4.935z" />
                </svg>
                <input  id="email" value={values.email} onChange={handleChange} className="bg-gray-200 rounded pl-12 py-2 md:py-1 focus:outline-none w-full" placeholder="email" />
              </div>
              <ErrorMessage name="email" component="div" className="text-red-500 text-sm mt-1 ml-6" />

              <div className="flex items-center text-lg mb-6 md:mb-2 relative">
                <svg className="absolute ml-1" viewBox="0 0 24 24" width="24">
                  <path d="m18.75 9h-.75v-3c0-3.309-2.691-6-6-6s-6 2.691-6 6v3h-.75c-1.24 0-2.25 1.009-2.25 2.25v10.5c0 1.241 1.01 2.25 2.25 2.25h13.5c1.24 0 2.25-1.009 2.25-2.25v-10.5c0-1.241-1.01-2.25-2.25-2.25zm-10.75-3c0-2.206 1.794-4 4-4s4 1.794 4 4v3h-8zm5 10.722v2.278c0 .552-.447 1-1 1s-1-.448-1-1v-2.278c-.595-.347-1-.985-1-1.722 0-1.103.897-2 2-2s2 .897 2 2c0 .737-.405 1.375-1 1.722z" />
                </svg>
                <input type="password" value={values.password} onChange={handleChange} id="password" className="bg-gray-200 rounded pl-12 py-2 md:py-2 focus:outline-none w-full" placeholder="Password" />
              </div>
              <ErrorMessage name="password" component="div" className="text-red-500 text-sm mt-1 ml-6" />

              <div className="flex justify-center">
                <button disabled={isSubmitting}
                  type="submit" className="bg-gradient-to-b from-gray-700 to-gray-900 font-medium md:p-2 text-white uppercase w-1/2 rounded">                      {isSubmitting ? 'Signing in...' : 'Sign in'}
                </button>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  )
}

export default Login
