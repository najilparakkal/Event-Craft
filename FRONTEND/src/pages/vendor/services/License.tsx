import React, { useState } from 'react';
import { Formik, Form, Field } from 'formik';
import { LisenseValidation } from '../../../utils/validations/validateSchema';
import { LicenseFormValues } from '../../../utils/validations/initialValue';
import { uploadRequest } from '../../../API/services/vendor/services';
import { useAppSelector } from '../../../costumeHooks/costum';
import { toast, Toaster } from 'react-hot-toast';
import { vendorLogout } from '../../../API/services/vendor/vendorAuthService';
import { useLocation, useNavigate } from 'react-router-dom';

const useQuery = () => {
    return new URLSearchParams(useLocation().search);
};

const License: React.FC = () => {

    const [error, setError] = useState("");
    const [selected, setSelected] = useState(false);
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [profileImage, setProfileImage] = useState<string | null>(null);
    const [profileImageError, setProfileImageError] = useState(false);
    const vendorDetails = useAppSelector((state) => state.vendor.vendorDetails);
    const navigate = useNavigate();
    const { _id, name, email, phoneNum } = vendorDetails;
    const query = useQuery();
    const servicess = query.getAll('services');
    console.log(servicess);

    const licenseInitialValues: LicenseFormValues = {
        applicantName: name || null,
        businessName: '',
        certificateExpirationDate: '',
        emailAddress: email || '',
        phoneNumber: phoneNum || '',
        phoneNumber2: '',
        upiIdOrPhoneNumber: '',
        accountNumber: '',
        servicesYouChose: servicess.join(', '),
        whatWillYouSell: '',
        licenseOrCertificates: [],
        profileImage: null,
    };

    const handleSubmit = async (values: LicenseFormValues) => {
        toast.promise(
            uploadRequest(values, _id + ""),
            {
                loading: 'Uploading...',
                success: 'Uploaded successfully!',
                error: 'Upload failed. Please try again.',
            }
        ).then(() => {
            setIsSubmitted(true);
        }).catch((error) => {
            console.error('Upload failed:', error);
        });
    };

    const logout = vendorLogout();

    const logoutHandler = () => {
        logout();
        navigate("/vendor/login");
    };

    return (
        <div
            className="min-h-screen flex flex-col items-center"
            style={{
                backgroundColor: '#0092AB',
                backgroundImage: 'url(/vendor/requestPage/pexels-alxs-919734.jpg)',
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                backgroundRepeat: 'no-repeat'
            }}
        >
            <Toaster position="top-center" reverseOrder={false} />

            <main className="flex flex-col items-center w-full">
                {isSubmitted ? (
                    <div className="flex items-center justify-center min-h-screen bg-transparent">
                        <div className="bg-gray p-8 mt-4 backdrop-blur-sm  rounded-lg shadow-lg w-full max-w-5xl text-center">
                            <h2 className="text-3xl font-bold text-white mb-4">Thank You for Sharing Your Details</h2>
                            <p className="text-gray-400 mb-6 font-bold">We will be in touch</p>
                            <button onClick={logoutHandler} className="px-4 py-2 bg-blue-600 text-white rounded-lg shadow hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50">
                                Logout
                            </button>
                        </div>
                    </div>

                ) : (
                    <Formik initialValues={licenseInitialValues} validationSchema={LisenseValidation} onSubmit={handleSubmit}>
                        {({ values, isSubmitting, errors, touched, setFieldValue }) => (
                            <Form className="p-8 mt-1 rounded-lg w-full bg-blue-20 backdrop-blur-sm  max-w-5xl space-y-3">
                                <div className="grid grid-cols-2 gap-4">
                                    <img src="/black.png" className="h-8 sm:h-8 mt-3 " alt="Event Planner Logo" />
                                    <div className="flex items-end justify-end">
                                        <label className="cursor-pointer">
                                            <input
                                                type="file"
                                                name="profileImage"
                                                onChange={(e) => {
                                                    if (e.target && e.target.files) {
                                                        const file = e.target.files[0];
                                                        setFieldValue('profileImage', file);
                                                        setProfileImage(URL.createObjectURL(file));
                                                        setSelected(true);
                                                        setProfileImageError(false);
                                                    }
                                                }}
                                                className="hidden"
                                            />

                                            {profileImage ? (
                                                <img src={profileImage} className={`h-24 w-24 rounded-full border ${profileImageError ? 'border-red-500' : 'border-gray-300'}`} alt="Profile" />
                                            ) : (
                                                <div className={`h-24 w-24 border ${profileImageError ? 'border-red-500 border-b-2' : 'border-white border-b-2'} rounded-full flex items-center justify-center`}>
                                                    <span className='text-gray-500'>Add profile</span>
                                                </div>
                                            )}
                                        </label>
                                    </div>

                                    <div>
                                        <label className="block mb-1 text-white font-bold">
                                            {errors.applicantName && touched.applicantName ? (
                                                <span className="text-red-500">{errors.applicantName}</span>
                                            ) : (
                                                'Applicant name:'
                                            )}
                                        </label>
                                        <Field
                                        autoComplete="off"
                                            type="text"
                                            name="applicantName"
                                            placeholder="JHON CENA"
                                            className={`w-full p-2 text-white bg-transparent border-b-2 ${errors.applicantName && touched.applicantName ? 'border-red-500' : 'border-white'} focus:outline-none`}
                                        />
                                    </div>

                                    <div>
                                        <label className="block mb-1 text-white font-bold">
                                            Business name:
                                        </label>
                                        <Field
                                         autoComplete="off"
                                            placeholder="####"
                                            type="text"
                                            name="businessName"
                                            className={`w-full p-2 text-white bg-transparent border-b-2 ${errors.businessName && touched.businessName ? 'border-red-500' : 'border-white'} focus:outline-none`}
                                        />
                                    </div>
                                </div>

                                <div className="grid grid-cols-1 lg:grid-cols-4 gap-4">
                                    <div>
                                        <label className="block mb-1 text-white font-bold">
                                            Certificate expiration date:
                                        </label>
                                        <Field
                                            type="date"
                                            name="certificateExpirationDate"
                                            className={`w-full p-2 text-white bg-transparent border-b-2 ${errors.certificateExpirationDate && touched.certificateExpirationDate ? 'border-red-500' : 'border-white'} focus:outline-none`}
                                        />
                                    </div>
                                    <div>
                                        <label className="block mb-1 text-white font-bold">
                                            Email address:
                                        </label>
                                        <Field
                                         autoComplete="off"
                                            type="email"
                                            name="emailAddress"
                                            className={`w-full p-2 text-white bg-transparent border-b-2 ${errors.emailAddress && touched.emailAddress ? 'border-red-500' : 'border-white'} focus:outline-none`}
                                        />
                                    </div>
                                    <div>
                                        <label className="block mb-1 text-white font-bold">
                                            Phone number:
                                        </label>
                                        <Field
                                         autoComplete="off"
                                            type="tel"
                                            name="phoneNumber"
                                            className={`w-full p-2 text-white bg-transparent border-b-2 ${errors.phoneNumber && touched.phoneNumber ? 'border-red-500' : 'border-white'} focus:outline-none`}
                                            placeholder="### ### ####"
                                        />
                                    </div>
                                    <div>
                                        <label className="block mb-1 text-white font-bold">
                                            Phone number 2:
                                        </label>
                                        <Field
                                         autoComplete="off"
                                            type="tel"
                                            name="phoneNumber2"
                                            className={`w-full p-2 text-white bg-transparent border-b-2 ${errors.phoneNumber2 && touched.phoneNumber2 ? 'border-red-500' : 'border-white'} focus:outline-none`}
                                            placeholder="### ### ####"
                                        />
                                    </div>
                                </div>

                                <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                                    <div>
                                        <label className="block mb-1 text-white font-bold">
                                            UPI ID or Verified Phone number:
                                        </label>
                                        <Field
                                         autoComplete="off"
                                            type="tel"
                                            name="upiIdOrPhoneNumber"
                                            className={`w-full p-2 text-white bg-transparent border-b-2 ${errors.upiIdOrPhoneNumber && touched.upiIdOrPhoneNumber ? 'border-red-500' : 'border-white'} focus:outline-none`}
                                            placeholder="### ### ####"
                                        />
                                    </div>

                                    <div>
                                        <label className="block mb-1 text-white font-bold">
                                            Account Number:
                                        </label>
                                        <Field
                                         autoComplete="off"
                                            type="tel"
                                            name="accountNumber"
                                            className={`w-full p-2 text-white bg-transparent border-b-2 ${errors.accountNumber && touched.accountNumber ? 'border-red-500' : 'border-white'} focus:outline-none`}
                                            placeholder="### ### ####"
                                        />
                                    </div>
                                </div>

                                <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                                    <div>
                                        <label className="block mb-1 text-white font-bold">
                                            Services You Chose:
                                        </label>
                                        <Field
                                            type="text"
                                            name="servicesYouChose"
                                            className="w-full p-2 text-white bg-transparent border-b-2 border-white focus:outline-none"
                                            readOnly
                                        />
                                    </div>
                                    <div>
                                        <label className="block mb-1 text-white font-bold">
                                            What will you sell?:
                                        </label>
                                        <Field
                                         autoComplete="off"
                                            type="text"
                                            name="whatWillYouSell"
                                            className={`w-full p-2 text-white bg-transparent border-b-2 ${errors.whatWillYouSell && touched.whatWillYouSell ? 'border-red-500' : 'border-white'} focus:outline-none`}
                                            placeholder="E.g. food, drinks, others"
                                        />
                                    </div>
                                </div>

                                <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
                                    {[...Array(3)].map((_, index) => (
                                        <div key={index}>
                                            <label className="block mb-1 text-white font-bold">
                                                {index === 0 && !values.licenseOrCertificates[0] && error ? (
                                                    <span className="text-red-500">{error}</span>
                                                ) : (
                                                    <>License or Certificate {index > 0 && <span className="text-gray-500">(Optional)</span>}</>
                                                )}
                                            </label>
                                            <input
                                                className='bg-gray-500 '
                                                onChange={(e) => {
                                                    if (e.target && e.target.files) {
                                                        const file = e.target.files[0];
                                                        setFieldValue(`licenseOrCertificates[${index}]`, file);
                                                        if (index === 0) {
                                                            setError("");
                                                        }
                                                    }
                                                }}
                                                type="file"
                                                name={`licenseOrCertificates[${index}]`}
                                            />
                                        </div>
                                    ))}
                                </div>

                                <div className="mt-4">
                                    <button onClick={() => {
                                        if (!selected) {
                                            setError("submit your license or any certificate");
                                            setProfileImageError(true);
                                        }
                                    }}
                                        type="submit"
                                        className="w-full py-3 bg-blue-500 text-white font-bold rounded transition duration-200 hover:bg-pink-400"
                                        disabled={isSubmitting}
                                    >
                                        {isSubmitting ? 'Submitting...' : 'SUBMIT'}
                                    </button>
                                </div>
                            </Form>
                        )}
                    </Formik>
                )}
            </main>
        </div>
    );
};

export default React.memo(License);
