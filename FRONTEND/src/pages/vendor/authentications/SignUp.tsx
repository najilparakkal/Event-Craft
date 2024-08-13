import { useNavigate } from 'react-router-dom'
import { Formik, Form } from 'formik';
import { validation } from '../../../utils/validations/validateSchema';
import { initialValue } from '../../../utils/validations/initialValue';
import { toast, Toaster } from 'react-hot-toast';
import { vendor } from '../../../utils/validations/initialValue';
import { GoogleAuth, signupVendor } from '../../../API/services/vendor/aurhSlice';
import { useDispatch } from 'react-redux';
import { useEffect, useRef } from 'react';
import { signInWithPopup } from 'firebase/auth';
import { auth, provider } from '../../../firebase/firebase';
import React from 'react';
import FOG from 'vanta/dist/vanta.fog.min';
import * as THREE from 'three';


const SignUp = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const vantaRef = useRef<HTMLDivElement>(null);
  const vantaEffect = useRef<any>(null);
  useEffect(() => {
    localStorage.removeItem('timer');

  }, [])
  const handleSubmit = async (values: vendor) => {
    try {
      await toast.promise(
        dispatch(signupVendor(values) as any).unwrap(),
        {
          loading: 'Registering user...',
          success: 'User registered successfully!',
          error: 'Email or Phone Number is already in use',
        }
      );
      navigate("/vendor/otp");
    } catch (err: any) {
      console.error(err);
      toast.error('An unexpected error occurred');
    }
  }

  const googleAuth = async () => {
    try {
      const result = await signInWithPopup(auth, provider)
      const user = result.user;
      console.log('Google user', user);

      dispatch(GoogleAuth({ email: user.email ?? "", name: user.displayName ?? "", uid: user.uid }) as any).then((response: any) => {        
        if (response.meta.requestStatus === 'fulfilled') {
          toast.success('User signed with Google');
          navigate('/vendor/services');
        }else {
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
        highlightColor: 0xffffff,
        midtoneColor: 0xffffff,
        lowlightColor: 0xe0e0f4,
        baseColor: 0xdbd2d2,
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
    <section ref={vantaRef} className="flex items-center justify-center min-h-screen bg-[#0593AB]" >
      <Toaster position="top-center" reverseOrder={false} />

      <div className="container mx-auto px-10 ">
        <div className="flex flex-col lg:flex-row lg:justify-between lg:items-center lg:space-x-8">

          <div className="lg:text-left lg:w-1/2 flex-1 lg:h-fit p-6">
            <h2 className="text-3xl text-black font-extrabold lg:text-3xl mb-2">Register Account</h2>

            <h1 className="text-2xl lg:text-3xl font-bold text-gray-600 mb-4">
              Start your journey by creating an account.
            </h1>


          </div>
          <div className="mt-8 lg:mt-0 lg:w-1/2">
            <div className=" p-10 rounded-lg border" >



              <Formik initialValues={initialValue} validationSchema={validation} onSubmit={handleSubmit}>
                {({ handleChange, values, touched, errors, isSubmitting }) => (
                  <Form >
                    <div className="flex items-center pl-6 mb-4 text-black ">

                      <input className="w-full pl-4 pr-6 py-3 text-sm placeholder-gray-900 bg-transparent border-b border-white focus:outline-none " type="text" placeholder="Enter Your Name.."
                        value={values.name}
                        onChange={handleChange}
                        id='name'
                      />

                    </div>
                    {touched.name && errors.name && <div className="text-red-500">{errors.name}</div>}

                    <div className="flex items-center pl-6 mb-4 text-black ">

                      <input className="w-full pl-4 pr-6 py-3 text-sm placeholder-gray-900 bg-transparent border-b border-white focus:outline-none " type="number" placeholder="Enter Your Phone Number"
                        id='phoneNum'
                        value={values.phoneNum}
                        onChange={handleChange}
                      />

                    </div>
                    {touched.phoneNum && errors.phoneNum && <div className="text-red-500">{errors.phoneNum}</div>}

                    <div className="flex items-center pl-6 mb-4 text-black ">

                      <input className="w-full pl-4 pr-6 py-3 text-sm placeholder-gray-900 bg-transparent border-b border-white focus:outline-none " type="email" placeholder="example@habib.me"
                        value={values.email}
                        onChange={handleChange}
                        id='email'
                      />

                    </div>
                    {touched.email && errors.email && <div className="text-red-500">{errors.email}</div>}

                    <div className="flex items-center pl-6 mb-7 ">

                      <input className="w-full pl-4 pr-6 py-3 text-sm placeholder-gray-900 bg-transparent border-b border-white focus:outline-none " type="password" placeholder="Password"
                        value={values.password}
                        onChange={handleChange} id='password'
                      />

                    </div>
                    {touched.password && errors.password && <div className="text-red-500">{errors.password}</div>}


                    <button
                      type='submit'
                      disabled={isSubmitting}
                      className="py-3 w-full bg-blue-500 hover:bg-gray-100 hover:text-black  text-black font-bold rounded-full transition duration-200">
                      Get started
                    </button>

                    <button
                      onClick={googleAuth}
                      type='button'
                      className="py-3 mt-3 w-full flex items-center justify-center bg-green-500 hover:bg-gray-900 text-black font-bold rounded-full transition duration-200">
                      <svg className="mr-2 w-4 h-4" aria-hidden="true" focusable="false" data-prefix="fab" data-icon="google" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 488 512">
                        <path fill="currentColor" d="M488 261.8C488 403.3 391.1 504 248 504 110.8 504 0 393.2 0 256S110.8 8 248 8c66.8 0 123 24.5 166.3 64.9l-67.5 64.9C258.5 52.6 94.3 116.6 94.3 256c0 86.5 69.1 156.6 153.7 156.6 98.2 0 135-70.4 140.8-106.9H248v-85.3h236.1c2.3 12.7 3.9 24.9 3.9 41.4z"></path>
                      </svg>
                      <span className="text-center">Sign up with Google</span>
                    </button>



                    <p className="text-sm font-light mt-6 text-gray-700 dark:text-gray-900">
                      Already have an account ? <a className="font-medium text-primary-600 hover:underline text-black dark:text-primary-500 cursor-pointer" onClick={() => navigate("/vendor/login")}>Login here</a>
                    </p>
                  </Form>
                )}
              </Formik>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default React.memo(SignUp);
