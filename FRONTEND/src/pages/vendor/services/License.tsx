import React, { useState } from 'react';
import { Formik, Form, Field } from 'formik';
import { LisenseValidation } from '../../../utils/validations/validateSchema';
import { LicenseFormValues, licenseInitialValues } from '../../../utils/validations/initialValue';
import { uploadRequest } from '../../../API/services/vendor/services';
import { useAppSelector } from '../../../costumeHooks/costum';
import { toast,Toaster } from 'react-hot-toast';

const License: React.FC = () => {
    const [error, setError] = useState("");
    const [selected] = useState(false);
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [profileImage, setProfileImage] = useState<string | null>(null);
    const vendorDetails = useAppSelector((state) => state.vendor.vendorDetails);
    const { _id } = vendorDetails;
    
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

    return (
        <div className="min-h-screen flex flex-col items-center bg-gray-200" style={{ background: '#CFCAC9' }}>
                        <Toaster position="top-center" reverseOrder={false} />

            <main className="flex flex-col items-center w-full">
                {isSubmitted ? (
                    <div className="bg-white p-8 mt-4 rounded-lg shadow-md w-full max-w-5xl text-center">
                        <h2 className="text-2xl font-bold">Thank you</h2>
                    </div>
                ) : (
                    <Formik initialValues={licenseInitialValues} validationSchema={LisenseValidation} onSubmit={handleSubmit}>
                        {({ values, isSubmitting, errors, touched, setFieldValue }) => (
                            <Form className="bg-white p-8 mt-1 rounded-lg shadow-md w-full max-w-5xl space-y-3">
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
                                                        setProfileImage(URL.createObjectURL(file)); // Set the selected image
                                                    }
                                                }}
                                                className="hidden"
                                            />
                                            {profileImage ? (
                                                <img src={profileImage} className="h-24 w-24 rounded-full border border-gray-300" alt="Profile" />
                                            ) : (
                                                <div className="h-24 w-24 rounded-full border border-gray-300 flex items-center justify-center">
                                                    <span>Add profile</span>
                                                </div>
                                            )}
                                        </label>

                                    </div>
                                    <div >
                                        <label className="block mb-1">
                                            {errors.applicantName && touched.applicantName ? (
                                                <span className="text-red-500">{errors.applicantName}</span>
                                            ) : (
                                                'Applicant name:'
                                            )}
                                        </label>
                                        <Field
                                            type="text"
                                            name="applicantName"
                                            placeholder="First"
                                            className={`w-full p-2 border rounded ${errors.applicantName && touched.applicantName ? 'border-red-500' : 'border-gray-300'}`}
                                        />
                                    </div>
                                    <div>
                                        <label className="block mb-1">
                                            {errors.businessName && touched.businessName ? (
                                                <span className="text-red-500">{errors.businessName}</span>
                                            ) : (
                                                'Business name:'
                                            )}
                                        </label>
                                        <Field
                                            type="text"
                                            name="businessName"
                                            className={`w-full p-2 border rounded ${errors.businessName && touched.businessName ? 'border-red-500' : 'border-gray-300'}`}
                                        />
                                    </div>
                                </div>

                                <div className="grid grid-cols-1 lg:grid-cols-4 gap-4">
                                    <div>
                                        <label className="block mb-1">
                                            {errors.certificateExpirationDate && touched.certificateExpirationDate ? (
                                                <span className="text-red-500">{errors.certificateExpirationDate}</span>
                                            ) : (
                                                'Certificate expiration date:'
                                            )}
                                        </label>
                                        <Field
                                            type="date"
                                            name="certificateExpirationDate"
                                            className={`w-full p-2 border rounded ${errors.certificateExpirationDate && touched.certificateExpirationDate ? 'border-red-500' : 'border-gray-300'}`}
                                        />
                                    </div>
                                    <div>
                                        <label className="block mb-1">
                                            {errors.emailAddress && touched.emailAddress ? (
                                                <span className="text-red-500">{errors.emailAddress}</span>
                                            ) : (
                                                'Email address:'
                                            )}
                                        </label>
                                        <Field
                                            type="email"
                                            name="emailAddress"
                                            className={`w-full p-2 border rounded ${errors.emailAddress && touched.emailAddress ? 'border-red-500' : 'border-gray-300'}`}
                                        />
                                    </div>
                                    <div>
                                        <label className="block mb-1">
                                            {errors.phoneNumber && touched.phoneNumber ? (
                                                <span className="text-red-500">{errors.phoneNumber}</span>
                                            ) : (
                                                'Phone number:'
                                            )}
                                        </label>
                                        <Field
                                            type="tel"
                                            name="phoneNumber"
                                            className={`w-full p-2 border rounded ${errors.phoneNumber && touched.phoneNumber ? 'border-red-500' : 'border-gray-300'}`}
                                            placeholder="### ### ####"
                                        />
                                    </div>
                                    <div>
                                        <label className="block mb-1">
                                            {errors.phoneNumber2 && touched.phoneNumber2 ? (
                                                <span className="text-red-500">{errors.phoneNumber2}</span>
                                            ) : (
                                                'Phone number 2:'
                                            )}
                                        </label>
                                        <Field
                                            type="tel"
                                            name="phoneNumber2"
                                            className={`w-full p-2 border rounded ${errors.phoneNumber2 && touched.phoneNumber2 ? 'border-red-500' : 'border-gray-300'}`}
                                            placeholder="### ### ####"
                                        />
                                    </div>
                                </div>

                                <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                                    <div>
                                        <label className="block mb-1">
                                            {errors.upiIdOrPhoneNumber && touched.upiIdOrPhoneNumber ? (
                                                <span className="text-red-500">{errors.upiIdOrPhoneNumber}</span>
                                            ) : (
                                                'UPI ID or Verified Phone number:'
                                            )}
                                        </label>
                                        <Field
                                            type="tel"
                                            name="upiIdOrPhoneNumber"
                                            className={`w-full p-2 border rounded ${errors.upiIdOrPhoneNumber && touched.upiIdOrPhoneNumber ? 'border-red-500' : 'border-gray-300'}`}
                                            placeholder="### ### ####"
                                        />
                                    </div>

                                    <div>
                                        <label className="block mb-1">
                                            {errors.accountNumber && touched.accountNumber ? (
                                                <span className="text-red-500">{errors.accountNumber}</span>
                                            ) : (
                                                'Account Number:'
                                            )}
                                        </label>
                                        <Field
                                            type="tel"
                                            name="accountNumber"
                                            className={`w-full p-2 border rounded ${errors.accountNumber && touched.accountNumber ? 'border-red-500' : 'border-gray-300'}`}
                                            placeholder="### ### ####"
                                        />
                                    </div>
                                </div>

                                <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                                    <div>
                                        <label className="block mb-1">
                                            {errors.servicesYouChose && touched.servicesYouChose ? (
                                                <span className="text-red-500">{errors.servicesYouChose}</span>
                                            ) : (
                                                'Services You Chose:'
                                            )}
                                        </label>
                                        <Field
                                            type="text"
                                            name="servicesYouChose"
                                            className={`w-full p-2 border rounded ${errors.servicesYouChose && touched.servicesYouChose ? 'border-red-500' : 'border-gray-300'}`}
                                        />
                                    </div>
                                    <div>
                                        <label className="block mb-1">
                                            {errors.whatWillYouSell && touched.whatWillYouSell ? (
                                                <span className="text-red-500">{errors.whatWillYouSell}</span>
                                            ) : (
                                                'What will you sell?:'
                                            )}
                                        </label>
                                        <Field
                                            type="text"
                                            name="whatWillYouSell"
                                            className={`w-full p-2 border rounded ${errors.whatWillYouSell && touched.whatWillYouSell ? 'border-red-500' : 'border-gray-300'}`}
                                            placeholder="E.g. food, drinks, others"
                                        />
                                    </div>
                                </div>

                                <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
                                    {[...Array(3)].map((_, index) => (
                                        <div key={index}>
                                            <label className="block mb-1">
                                                {index === 0 && !values.licenseOrCertificates[0] && error ? (
                                                    <span className="text-red-500">{error}</span>
                                                ) :
                                                    <>License or Certificate {index > 0 && <span className="text-gray-500">(Optional)</span>}</>
                                                }
                                            </label>
                                            <input
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
                                            // className={`w-full p-2 border rounded ${errors.licenseOrCertificates && errors.licenseOrCertificates[index] && touched.licenseOrCertificates && touched.licenseOrCertificates[index] ? 'border-red-500' : 'border-gray-300'}`}
                                            />
                                        </div>
                                    ))}
                                </div>

                                <div className="mt-4">
                                    <button onClick={() => {
                                        if (!selected) {
                                            setError("Please select a image")
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

export default License;
