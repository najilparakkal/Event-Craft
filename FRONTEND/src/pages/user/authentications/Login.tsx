import React from 'react';
import { toast, Toaster } from 'react-hot-toast';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { loginValidation } from '../../../utils/validations/validateSchema';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { loginUser, GoogleLogin } from '../../../API/services/user/authSlice';
import { auth, signInWithPopup, provider } from '../../../firebase/firebase';

const Login: React.FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = async (values: { email: string; password: string }) => {
    try {
      const resultAction = await dispatch(loginUser(values) as any);

      if (loginUser.fulfilled.match(resultAction)) {
        toast.success('Login successful');
        navigate('/home');
      } else {
        if (resultAction.payload) {
          toast.error(resultAction.payload as string);
        } else {
          toast.error('Invalid user');
        }
      }
    } catch (error) {
      console.error('Error during login:', error);
      toast.error('Login failed');
    }
  };

  const initialValue: { email: string; password: string } = {
    email: '',
    password: '',
  };

  const googleAuth = async () => {
    try {
      const result = await signInWithPopup(auth, provider);
      const user = result.user;

      await dispatch(GoogleLogin({ email: user.email, name: user.displayName, uid: user.uid }) as any).then((response: any) => {
        if (response.meta.requestStatus === 'fulfilled') {
          toast.success('User signed up with Google');
          navigate('/home');
        } else {
          toast.error('User Not Found');
        }
      });
    } catch (error) {
      console.error('Error during Google signup:', error);
      toast.error('Google signup failed');
    }
  };

  return (
    <div className="absolute top-0 left-0 bottom-0 leading-5 h-full w-full overflow-hidden" style={{ backgroundColor: '#1F2136' }}>
      <Toaster position="top-center" reverseOrder={false} />
      <div className="relative min-h-screen sm:flex sm:flex-row justify-center bg-transparent rounded-3xl shadow-xl">
        <div className="flex-col flex self-center lg:px-1 mr-10 sm:max-w-4xl xl:max-w-md z-10">
          <div className="self-start hidden lg:flex flex-col text-gray-300 items-center">
            <img src="src/assets/logo-no-background.png" className="w-60 h-auto mt-10" alt="Event Craft Logo" />
            <p className="pr-3 text-sm opacity-75 mt-10 text-white">
              Event Craft simplifies event planning with intuitive tools for scheduling, budgeting, and coordination. From weddings to corporate events, manage every detail seamlessly with our expert resources and customizable templates.
            </p>
          </div>
        </div>
        <div className="flex justify-center self-center z-10">
          <div className="p-12 bg-gray-900 mx-auto rounded-3xl w-96">
            <Formik initialValues={initialValue} validationSchema={loginValidation} onSubmit={handleSubmit}>
              {({ handleChange, values, handleSubmit, isSubmitting }) => (
                <Form onSubmit={handleSubmit} className="space-y-6">
                  <div>
                    <Field
                      className="bg-transparent border-b-2 border-white text-white sm:text-sm focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                      name="email"
                      placeholder="Email"
                      value={values.email}
                      onChange={handleChange}
                    />
                    <ErrorMessage name="email" component="div" className="text-red-500" />
                  </div>
                  <div className="relative">
                    <Field
                      placeholder="Password"
                      type="password"
                      name="password"
                      className="bg-transparent border-b-2 border-white text-white sm:text-sm focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                      value={values.password}
                      onChange={handleChange}
                    />
                    <ErrorMessage name="password" component="div" className="text-red-500" />
                  </div>

                  <div>
                    <button
                      type="submit"
                      className="w-full flex justify-center  hover:bg-white text-gray-100 hover:text-black p-3 rounded-lg tracking-wide font-semibold cursor-pointer transition ease-in duration-500"
                      disabled={isSubmitting}
                    >
                      {isSubmitting ? 'Signing in...' : 'Sign in'}
                    </button>
                    <div className="px-6 sm:px-0 max-w-sm mt-4">
                      <button
                        onClick={googleAuth}
                        type="button"
                        className="flex items-center justify-center w-full bg-white hover:bg-[#1F2136]/90 hover:text-gray-100 focus:ring-4 focus:outline-none focus:ring-[#4285F4]/50 font-medium rounded-lg text-sm px-5 py-2.5 text-black transition duration-300 ease-in-out"
                      >
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
                        Sign up with Google
                      </button>
                    </div>

                  </div>

                  <div className="text-sm ml-auto text-center">
                    <a onClick={() => navigate("/forgot")} className="text-white hover:text-purple-600">Forgot your password?</a>
                  </div>
                  <p className="text-gray-400 text-center">Don't have an account? <a href="#" className="text-sm text-white hover:text-purple-600 ml-1" onClick={() => navigate("/signup")}>Sign Up</a></p>
                </Form>
              )}
            </Formik>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
