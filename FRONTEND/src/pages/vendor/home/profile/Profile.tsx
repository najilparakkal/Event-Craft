import React, { useEffect, useRef, useState } from 'react';
import { useAppSelector, useUpdateVendorDetails } from '../../../../costumeHooks/costum';
import { useFormik } from 'formik';
import { updateVendor, vendorDetails } from '../../../../API/services/vendor/services';
import { vendorProfileValidation } from '../../../../utils/validations/validateSchema';
import PostComponent from './PostComponent';

interface Licence {
    _id: string;
    applicantName: string;
    businessName: string;
    emailAddress: string;
    phoneNumber: string;
    location: string;
    upiIdOrPhoneNumber: string;
    services: string;
    accountNumber: string;
    description: string;
    certificateExpirationDate: string;
    profilePicture: string;
    verified: boolean;
    vendorId: string;
    requestedDate: string;
    __v: number;
}

interface Post {
    _id: string;
    title: string;
    images: string[];
    vendorId: string;
    is_blocked: boolean;
    category: string;
    createdAt: string;
    updatedAt: string;
    __v: number;
    description: string;
}

interface VendorProfile {
    blocked: boolean;
    coverPicture: string;
    email: string;
    licence: Licence[];
    phoneNum: string;
    posts: Post[];
    profilePicture: string;
    vendorName: string;
    verified: boolean;
    registered: string;
}

const Profile: React.FC = () => {
    const { _id, name, phoneNum, email, profilePicture } = useAppSelector((state) => state.vendor.vendorDetails);
    const [details, setDetails] = useState<VendorProfile | null>(null);
    const profileInputRef = useRef<HTMLInputElement>(null);
    const coverInputRef = useRef<HTMLInputElement>(null);
    const updateVendorDetails = useUpdateVendorDetails();
    const [profileImagePreview, setProfileImagePreview] = useState<string | ArrayBuffer | null>(profilePicture || '');
    const [coverImagePreview, setCoverImagePreview] = useState<string | ArrayBuffer | null>(details?.coverPicture || '');

    useEffect(() => {
        const fetchDetails = async () => {
            try {
                const data = await vendorDetails(_id + "");
                setDetails(data);
                setCoverImagePreview(data.coverPicture || '');
                setProfileImagePreview(data.profilePicture || '');
                formik.setFieldValue('coverPicture', data.coverPicture);
                formik.setFieldValue('profilePicture', data.profilePicture);
            } catch (err) {
                console.log(err);
            }
        };

        fetchDetails();
    }, [_id]);

    const handleProfileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setProfileImagePreview(reader.result);
                formik.setFieldValue('profilePicture', file);
            };
            reader.readAsDataURL(file);
        }
    };

    const handleCoverChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setCoverImagePreview(reader.result);
                formik.setFieldValue('coverPicture', file);
            };
            reader.readAsDataURL(file);
        }
    };

    const formik = useFormik({
        initialValues: {
            name: name || '',
            phoneNum: phoneNum || '',
            profilePicture: profilePicture || '',
            coverPicture: details?.coverPicture || '',
        },
        validationSchema: vendorProfileValidation,
        onSubmit: async (values) => {
            try {
                const update = await updateVendor(_id + "", values)
                if (update) {
                    updateVendorDetails({
                        name: values.name,
                        phoneNum: values.phoneNum,
                        profilePicture: update.profile ?? profilePicture
                    });
                    const updatedDatas = await vendorDetails(_id + "");
                    setDetails(updatedDatas);

                }
            } catch (err) {
                console.log(err);
            }
        },
    });

    if (!details) return null;

    return (
        <div>
            <section className="w-full p-10 overflow-hidden bg-white">
                <div className="flex flex-col">
                    <div className="relative">
                        <img
                            onClick={() => coverInputRef.current?.click()}
                            src={coverImagePreview || "https://via.placeholder.com/1500x500"}
                            alt="User Cover"
                            className="w-full xl:h-[20rem] lg:h-[18rem] md:h-[16rem] sm:h-[14rem] xs:h-[11rem]"
                        />
                        <input
                            type="file"
                            ref={coverInputRef}
                            onChange={handleCoverChange}
                            className="absolute top-0 left-0 w-full h-full opacity-0 cursor-pointer"
                        />
                    </div>

                    <div className="sm:w-[80%] xs:w-[90%] mx-auto flex">
                        <div className="relative">
                            <img
                                onClick={() => profileInputRef.current?.click()}
                                src={profileImagePreview || "https://via.placeholder.com/150"}
                                alt="User Profile"
                                className="rounded-md lg:w-[12rem] lg:h-[12rem] md:w-[10rem] md:h-[10rem] sm:w-[8rem] sm:h-[8rem] xs:w-[7rem] xs:h-[7rem] outline outline-2 outline-offset-2 outline-blue-500 relative lg:bottom-[5rem] sm:bottom-[4rem] xs:bottom-[3rem]"
                            />
                            <input
                                type="file"
                                ref={profileInputRef}
                                onChange={handleProfileChange}
                                className="absolute top-0 left-0 w-full h-full opacity-0 cursor-pointer"
                            />
                        </div>
                        <h1 className="w-full text-left my-4 sm:mx-4 xs:pl-4 text-gray-800 lg:text-4xl md:text-3xl sm:text-3xl xs:text-xl font-serif">
                            {details.vendorName}
                        </h1>
                    </div>

                    <form
                        className="xl:w-[80%] lg:w-[90%] md:w-[90%] sm:w-[92%] xs:w-[90%] mx-auto flex flex-col gap-4 items-center relative lg:-top-8 md:-top-6 sm:-top-4 xs:-top-4"
                        onSubmit={formik.handleSubmit}>
                        <div className="w-full my-auto py-6 flex flex-col justify-center gap-2">
                            <div className="w-full flex sm:flex-row xs:flex-col gap-4 justify-center">
                                <div className="w-full sm:w-1/2">
                                    <div className="flex flex-col pb-3">
                                        <dt className="mb-1 text-gray-600 md:text-lg">Name</dt>
                                        <dd className="text-lg font-semibold">
                                            <input id="name" type="text" {...formik.getFieldProps('name')} className="input-field w-full p-2 border-b-2 border-gray-300 focus:outline-none focus:border-blue-500 bg-transparent text-gray-800" />
                                            {formik.touched.name && formik.errors.name ? (
                                                <div className="text-red-500 text-sm">{formik.errors.name}</div>
                                            ) : null}
                                        </dd>
                                    </div>
                                    <div className="flex flex-col py-3">
                                        <dt className="mb-1 text-gray-600 md:text-lg">Email</dt>
                                        <dd className="text-lg font-semibold">
                                            <input name="email" value={email} readOnly type="email" className="input-field w-full p-2 border-b-2 border-gray-300 focus:outline-none focus:border-blue-500 bg-transparent text-gray-800" />
                                        </dd>
                                    </div>
                                    <div className="flex flex-col py-3">
                                        <dt className="mb-1 text-gray-600 md:text-lg">Phone Number</dt>
                                        <dd className="text-lg font-semibold">
                                            <input {...formik.getFieldProps('phoneNum')} id="phoneNum" type="text" className="input-field w-full p-2 border-b-2 border-gray-300 focus:outline-none focus:border-blue-500 bg-transparent text-gray-800" />
                                            {formik.touched.phoneNum && formik.errors.phoneNum ? (
                                                <div className="text-red-500 text-sm">{formik.errors.phoneNum}</div>
                                            ) : null}
                                        </dd>
                                    </div>
                                </div>
                                <div className="w-full sm:w-1/2">
                                    <div className="flex flex-col py-3">
                                        <dt className="mb-1 text-gray-600 md:text-lg">Location </dt>
                                        <dd className="text-lg font-semibold">
                                            <input
                                                readOnly
                                                value={details.licence[0]?.location}
                                                name="location"
                                                type="text"
                                                className="input-field w-full p-2 border-b-2 border-gray-300 focus:outline-none focus:border-blue-500 bg-transparent text-gray-800"
                                            />
                                        </dd>
                                    </div>
                                    <div className="flex flex-col py-3">
                                        <dt className="mb-1 text-gray-600 md:text-lg">Business Name </dt>
                                        <dd className="text-lg font-semibold">
                                            <input
                                                readOnly
                                                value={details.licence[0]?.businessName}
                                                name="businessName"
                                                type="text"
                                                className="input-field w-full p-2 border-b-2 border-gray-300 focus:outline-none focus:border-blue-500 bg-transparent text-gray-800"
                                            />
                                        </dd>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <button type="submit" className="px-6 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:bg-blue-600">
                            Update Profile
                        </button>
                    </form>
                    <div className="bg-gray-100 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                        {details?.posts.map((post) => (
                            <PostComponent
                                key={post._id}
                                post={post}
                                
                            />
                        ))}
                    </div>

                </div>
            </section>
        </div>
    );
};

export default Profile;
