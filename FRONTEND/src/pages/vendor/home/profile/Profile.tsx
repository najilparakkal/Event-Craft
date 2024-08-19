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
    about: string;
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
        enableReinitialize: true,
        initialValues: {
            name: name || '',
            phoneNum: phoneNum || '',
            profilePicture: profilePicture || '',
            coverPicture: details?.coverPicture || '',
            about: details?.about || '',
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
            <section className="w-full p-3 bg-white">
                <div className="flex flex-col">
                    <div className="relative">
                        <img
                            onClick={() => coverInputRef.current?.click()}
                            src={coverImagePreview + "" || "https://via.placeholder.com/1500x500"}
                            alt="User Cover"
                            className="w-full h-auto object-cover max-h-[20rem] md:max-h-[18rem] sm:max-h-[16rem] xs:max-h-[14rem]"
                        />
                        <input
                            type="file"
                            ref={coverInputRef}
                            onChange={handleCoverChange}
                            className="absolute top-0 left-0 w-full h-full opacity-0 cursor-pointer"
                        />
                    </div>

                    <div className="mx-auto flex flex-col items-center mt-[-5rem] md:mt-[-4rem]">
                        <div className="relative">
                            <img
                                onClick={() => profileInputRef.current?.click()}
                                src={profileImagePreview + "" || "https://via.placeholder.com/150"}
                                alt="User Profile"
                                className="rounded-full lg:w-[12rem] lg:h-[12rem] md:w-[10rem] md:h-[10rem] sm:w-[8rem] sm:h-[8rem] xs:w-[7rem] xs:h-[7rem] border-4 border-blue-500"
                            />
                            <input
                                type="file"
                                ref={profileInputRef}
                                onChange={handleProfileChange}
                                className="absolute top-0 left-0 w-full h-full opacity-0 cursor-pointer"
                            />
                        </div>
                        <h1 className="text-gray-800 text-center my-4 text-2xl sm:text-3xl lg:text-4xl font-serif font-bold">
                            {details.vendorName}
                        </h1>
                    </div>
                    <form
                        className="mx-auto flex flex-col gap-4 p-4 w-full sm:w-full lg:w-full max-w-5xl" onSubmit={formik.handleSubmit}>
                        <div className="flex flex-col gap-4">
                            <div className="flex flex-col md:flex-row gap-4">
                                <div className="flex-1">
                                    <div className="flex flex-col mb-4">
                                        <label htmlFor="name" className="text-gray-600 text-lg">Name</label>
                                        <input id="name" type="text" {...formik.getFieldProps('name')} className="input-field p-2 border-b-2 border-gray-300 focus:outline-none focus:border-blue-500 bg-transparent text-gray-800" />
                                        {formik.touched.name && formik.errors.name ? (
                                            <div className="text-red-500 text-sm">{formik.errors.name}</div>
                                        ) : null}
                                    </div>
                                    <div className="flex flex-col mb-4">
                                        <div className="flex gap-4">
                                            <div className="flex-1">
                                                <label htmlFor="email" className="text-gray-600 text-lg">Email</label>
                                                <input name="email" value={email+""} readOnly type="email" className="input-field p-2 border-b-2 border-gray-300 focus:outline-none bg-transparent text-gray-800" />
                                            </div>
                                            <div className="flex-1">
                                                <label htmlFor="phoneNum" className="text-gray-600 text-lg">Phone Number</label>
                                                <input {...formik.getFieldProps('phoneNum')} id="phoneNum" type="text" className="input-field p-2 border-b-2 border-gray-300 focus:outline-none focus:border-blue-500 bg-transparent text-gray-800" />
                                                {formik.touched.phoneNum && formik.errors.phoneNum ? (
                                                    <div className="text-red-500 text-sm">{formik.errors.phoneNum}</div>
                                                ) : null}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="flex-1">
                                    <div className="flex flex-col mb-4">
                                        <label className="text-gray-600 text-lg">Location</label>
                                        <input value={details.licence[0]?.location} readOnly type="text" className="input-field p-2 border-b-2 border-gray-300 bg-transparent text-gray-800" />
                                    </div>
                                    <div className="flex flex-col mb-4">
                                        <label className="text-gray-600 text-lg">Account Number</label>
                                        <input value={details.licence[0]?.accountNumber} readOnly type="text" className="input-field p-2 border-b-2 border-gray-300 bg-transparent text-gray-800" />
                                    </div>
                                </div>
                            </div>
                            <div className="flex flex-col mb-4">
                                <label htmlFor="about" className="text-gray-600 text-lg">About</label>
                                <textarea id="about" {...formik.getFieldProps('about')} rows={4} className="input-field p-2 border-b-2 border-gray-300 focus:outline-none focus:border-blue-500 bg-transparent text-gray-800" />
                                {formik.touched.about && formik.errors.about ? (
                                    <div className="text-red-500 text-sm">{formik.errors.about}</div>
                                ) : null}
                            </div>
                        </div>

                        <button
                            type="submit"
                            className="bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600 transition duration-300"
                        >
                            UPDATE PROFILE
                        </button>
                    </form>
                </div>
            </section>

            <section className="p-10 w-full">
                <h2 className="text-2xl font-bold mb-4">Posts</h2>
                <div className="grid gap-8 lg:grid-cols-3 md:grid-cols-2">
                    {details.posts?.map((post:any) => (
                        <PostComponent key={post._id} post={post} />
                    ))}
                </div>
            </section>
        </div>
    );
}

export default React.memo(Profile);
