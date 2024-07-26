import React, { useEffect, useRef, useState } from 'react';
import { useFormik } from 'formik';
import { fetchUserDatas, udpdateUser } from '../../API/services/user/Services';
import { useAppSelector, useUpdateUserDetails } from '../../costumeHooks/costum';
import { profileValidation } from '../../utils/validations/validateSchema';

interface UserData {
    email: string;
    phoneNum: string;
    profilePicture: string;
    registered: string;
    userName: string;
    wallet: number;
}

const Profile = ({setModalOpen}:any) => {
    const [details, setDetails] = useState<UserData | null>(null);
    const { _id, name, phoneNum, email, profilePicture } = useAppSelector((state) => state.user.userDetails);
    const fileInputRef = useRef<HTMLInputElement>(null);
    const [imagePreview, setImagePreview] = useState<string | ArrayBuffer | null>(profilePicture || '');
    const updateUserDetails = useUpdateUserDetails();

    useEffect(() => {
        const fetch = async () => {
            const datas = await fetchUserDatas(_id + "");
            setDetails(datas);
        };
        fetch();
    }, [_id]);

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.currentTarget.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setImagePreview(reader.result);
                formik.setFieldValue("profilePicture", file); 
            };
            reader.readAsDataURL(file);
        }
    };

    const handleImageRemove = () => {
        setImagePreview(''); 
        formik.setFieldValue("profilePicture", "");
        if (fileInputRef.current) fileInputRef.current.value = ""; 
    };

    const formik = useFormik({
        initialValues: {
            name: name || '',
            phoneNum: phoneNum || '',
            profilePicture: profilePicture || ''
        },
        validationSchema: profileValidation,
        onSubmit: async (values) => {


            const update = await udpdateUser(_id + "", values)
            console.log(values,"👋");
            if (update) {      
                         
                updateUserDetails({
                    name: values.name,
                    phoneNum: values.phoneNum,
                    profilePicture: update.image ?? profilePicture
                });
                setModalOpen(false)
                const updatedDatas = await fetchUserDatas(_id + "");
                setDetails(updatedDatas);

            }

        },
    });


    return (
        <div className="fixed inset-0 flex items-center justify-center z-50">
            <div className="bg-white w-11/12 max-w-md flex flex-col gap-5 p-5 rounded-lg shadow-lg text-[#161931]">
                <button className="self-end text-gray-700 hover:text-gray-900" onClick={() => setModalOpen()}>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" className="w-6 h-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                </button>
                <main className="w-full">
                    <div className="p-4 w-full">
                        <div className="pb-8">
                            <div className="flex flex-col items-center mt-4">
                                <img
                                    className="object-cover w-24 h-24 p-1 rounded-full ring-2 ring-indigo-300 dark:ring-indigo-500 cursor-pointer"
                                    src={imagePreview as string || 'default-profile-pic-url'}
                                    alt="Profile picture"
                                    onClick={() => fileInputRef.current?.click()}
                                />
                                <input
                                    type="file"
                                    ref={fileInputRef}
                                    className="hidden"
                                    onChange={handleImageChange}
                                />
                                <div className="flex flex-col space-y-3 mt-4">
                                    <button
                                        type="button"
                                        className="py-2 px-5 text-sm font-medium text-indigo-100 focus:outline-none bg-[#202142] rounded-lg border border-indigo-200 hover:bg-indigo-900 focus:z-10 focus:ring-4 focus:ring-indigo-200"
                                        onClick={() => fileInputRef.current?.click()}
                                    >
                                        Change picture
                                    </button>
                                    <button
                                        type="button"
                                        className="py-2 px-5 text-sm font-medium text-indigo-900 focus:outline-none bg-white rounded-lg border border-indigo-200 hover:bg-indigo-100 hover:text-[#202142] focus:z-10 focus:ring-4 focus:ring-indigo-200"
                                        onClick={handleImageRemove}
                                    >
                                        Delete picture
                                    </button>
                                </div>
                            </div>
                            <form onSubmit={formik.handleSubmit} className="text-[#202142]">
                                <div className="flex space-x-4">
                                    <div className="w-full mb-4">
                                        <label htmlFor="name" className="block mb-1 text-sm font-medium text-indigo-900 dark:text-white">
                                            Your name
                                        </label>
                                        <input
                                            type="text"
                                            id="name"
                                            className={`bg-indigo-50 border ${formik.touched.name && formik.errors.name ? 'border-red-500' : 'border-indigo-300'} text-indigo-900 text-sm rounded-lg focus:ring-indigo-500 focus:border-indigo-500 block w-full p-2`}
                                            placeholder="Your name"
                                            {...formik.getFieldProps('name')}
                                        />
                                        {formik.touched.name && formik.errors.name ? (
                                            <div className="text-red-500 text-sm">{formik.errors.name}</div>
                                        ) : null}
                                    </div>
                                    <div className="w-full mb-4">
                                        <label htmlFor="email" className="block mb-1 text-sm font-medium text-indigo-900 dark:text-white">
                                            Your email
                                        </label>
                                        <input
                                            readOnly
                                            type="email"
                                            id="email"
                                            className="bg-indigo-50 border border-indigo-300 text-indigo-900 text-sm rounded-lg focus:ring-indigo-500 focus:border-indigo-500 block w-full p-2"
                                            placeholder="Your email"
                                            value={email + ""}
                                        />
                                    </div>
                                </div>
                                <div className="flex space-x-4 mb-4">
                                    <div className="w-1/4">
                                        <label htmlFor="registered" className="block mb-1 text-sm font-medium text-indigo-900 dark:text-white">
                                            Registered
                                        </label>
                                        <input
                                            type="text"
                                            id="registered"
                                            className="bg-indigo-50 border border-indigo-300 text-indigo-900 text-sm rounded-lg focus:ring-indigo-500 focus:border-indigo-500 block w-full p-2"
                                            placeholder="Registered date"
                                            value={details?.registered || ''}
                                            readOnly
                                        />
                                    </div>
                                    <div className="w-3/4">
                                        <label htmlFor="phoneNum" className="block mb-1 text-sm font-medium text-indigo-900 dark:text-white">
                                            Phone Number
                                        </label>
                                        <input
                                            type="text"
                                            id="phoneNum"
                                            className={`bg-indigo-50 border ${formik.touched.phoneNum && formik.errors.phoneNum ? 'border-red-500' : 'border-indigo-300'} text-indigo-900 text-sm rounded-lg focus:ring-indigo-500 focus:border-indigo-500 block w-full p-2`}
                                            placeholder="Phone Number"
                                            {...formik.getFieldProps('phoneNum')}
                                        />
                                        {formik.touched.phoneNum && formik.errors.phoneNum ? (
                                            <div className="text-red-500 text-sm">{formik.errors.phoneNum}</div>
                                        ) : null}
                                    </div>
                                </div>
                                <div className="flex justify-end">
                                    <button
                                        type="submit"
                                        className="text-white bg-indigo-700 hover:bg-indigo-800 focus:ring-4 focus:outline-none focus:ring-indigo-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-indigo-600 dark:hover:bg-indigo-700 dark:focus:ring-indigo-800"
                                    >
                                        Save
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </main>
            </div>
        </div>
    );
};

export default React.memo(Profile);
