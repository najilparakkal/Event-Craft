import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast, Toaster } from 'react-hot-toast';
import { Formik, Form, ErrorMessage } from 'formik';
import { loginValidation } from '../../../utils/validations/validateSchema';
import { GoogleLogin, vendorLogin } from '../../../API/services/vendor/aurhSlice';
import { useDispatch } from 'react-redux';
import { signInWithPopup } from 'firebase/auth';
import { auth, provider } from '../../../firebase/firebase';

const Login: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const initialValue: { email: string; password: string } = {
    email: '',
    password: '',
  };

  const handleSubmit = async (values: { email: string; password: string }) => {
    try {
      const resultAction = await dispatch(vendorLogin(values) as any);

      if (vendorLogin.fulfilled.match(resultAction) && resultAction.payload.isVendor) {
        toast.success('Login successful');
        navigate('/vendor/home');
      } else if (vendorLogin.fulfilled.match(resultAction)) {
        toast.success('Login successful');
        navigate('/vendor/services');
      } else {
        if (resultAction.payload) {
          console.log(resultAction);

          switch (resultAction.payload) {
            case 'vendor Not Found':
              toast.error('vendor not found');
              break;
            case 'Password is not correct':
              toast.error('Password is not correct');
              break;
            default:
              toast.error(resultAction.payload as string);
          }
        } else {
          toast.error('Invalid vendor');
        }
      }
    } catch (error) {
      toast.error('An error occurred during login');
    }
  };
  const googleAuth = async () => {
    try {
      const result = await signInWithPopup(auth, provider)
      const vendor = result.user;
      console.log('Google vendor', vendor);

      await dispatch(GoogleLogin({ email: vendor.email, name: vendor.displayName, uid: vendor.uid }) as any).then((response: any) => {
        if (response.meta.requestStatus === 'fulfilled' && response.payload.isVendor) {

          toast.success('vendor signed  with Google');
          navigate('/vendor/home');
        } else if (response.meta.requestStatus === 'fulfilled') {
          toast.success('vendor signed  with Google');
          navigate('/vendor/services');
        } else {
          toast.error('vendor Not Found');
        }
      });
    } catch (error) {
      console.error('Error during Google signup:', error);
      toast.error('Google signup failed');
    }

  }
  return (
    <section className="flex items-center justify-center min-h-screen bg-[#0593AB]" >
      <Toaster position="top-center" reverseOrder={false} />

      <div className="container mx-auto px-10">
        <div className="flex flex-col lg:flex-row lg:justify-between lg:items-center lg:space-x-8">
          <div className="mt-8 lg:mt-0 lg:w-1/2">
            <div className=" p-10 rounded-lg bg-[#FEDC54]">
              <h2 className="text-xl font-bold mb-6 text-white">Login Account</h2>

              <Formik
                initialValues={initialValue}
                validationSchema={loginValidation}

                onSubmit={handleSubmit}
              >
                {({ handleChange, values, isSubmitting }) => (
                  <Form>
                    <div className="mb-4">
                      <div className="flex items-center pl-6 text-white">

                        <input
                          name="email"
                          placeholder="Email"
                          value={values.email}
                          onChange={handleChange}
                          className="w-full pl-4 pr-6 py-3 text-sm placeholder-gray-900 bg-transparent border-b border-white focus:outline-none " />
                      </div>
                      <ErrorMessage name="email" component="div" className="text-red-500 text-sm mt-1 ml-6" />
                    </div>
                    <div className="mb-7">
                      <div className="flex items-center pl-6 text-white">

                        <input
                          type="password"
                          name="password"
                          value={values.password}
                          onChange={handleChange}
                          className="w-full pl-4 pr-6 py-3 text-sm placeholder-gray-900 bg-transparent border-b border-white focus:outline-none " placeholder="Password"
                        />
                      </div>
                      <ErrorMessage name="password" component="div" className="text-red-500 text-sm mt-1 ml-6" />
                    </div>

                    <button
                      disabled={isSubmitting}
                      type="submit"
                      className="py-3 w-full bg-blue-500 hover:bg-gray-100 hover:text-black  text-white font-bold rounded-full transition duration-200">

                      {isSubmitting ? 'Signing in...' : 'Sign in'}
                    </button>

                    <button
                      type='button'
                      onClick={googleAuth}
                      className="py-3 mt-3 w-full flex items-center justify-center bg-green-500 hover:bg-gray-900 text-white font-bold rounded-full transition duration-200">
                      <svg
                        className="mr-2 w-4 h-4"
                        aria-hidden="true"
                        focusable="false"
                        data-prefix="fab"
                        data-icon="google"
                        role="img"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 488 512"
                      >
                        <path
                          fill="currentColor"
                          d="M488 261.8C488 403.3 391.1 504 248 504 110.8 504 0 393.2 0 256S110.8 8 248 8c66.8 0 123 24.5 166.3 64.9l-67.5 64.9C258.5 52.6 94.3 116.6 94.3 256c0 86.5 69.1 156.6 153.7 156.6 98.2 0 135-70.4 140.8-106.9H248v-85.3h236.1c2.3 12.7 3.9 24.9 3.9 41.4z"
                        ></path>
                      </svg>
                      <span className="text-center">Login with Google</span>
                    </button>

                    <div className="flex justify-center mt-4">
                      <a
                        onClick={() => navigate('/vendor/forgot')}
                        className="text-white-700 hover:text-gray-100 cursor-pointer"
                      >
                        Forgot your password?
                      </a>
                    </div>

                    <p className="text-sm font-light mt-6 text-gray-500 dark:text-gray-400 text-center">
                      Already have an account?{' '}
                      <a className="font-medium text-primary-600 hover:underline hover:text-gray-100 dark:text-primary-500 cursor-pointer" onClick={() => navigate("/vendor/signup")}>Register here</a>
                    </p>
                  </Form>
                )}
              </Formik>
            </div>
          </div>
          <div className="text-center lg:text-left lg:w-1/2">
            <h2 className="text-3xl text-white font-extrabold lg:text-3xl mb-2">WELCOM BACK</h2>
            <h1 className="text-2xl lg:text-3xl font-bold text-black mb-4">
              continue your journey by   loging <br /> account.
            </h1>

          </div>
        </div>
      </div>
    </section>
  );
};

export default React.memo(Login);
