import React, { useState, useRef, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { getCategories, uploadPost } from '../../../API/services/vendor/services';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { postValidation } from '../../../utils/validations/validateSchema';
import { toast } from 'react-hot-toast';
import Navbar from '../../../compounents/vendor/Navbar';

const Post: React.FC = () => {
    const navigate = useNavigate();
    const { id } = useParams<{ id: string }>();
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const [selectedImage, setSelectedImage] = useState<string | ArrayBuffer | null>(null);
    const fileInputRef = useRef<HTMLInputElement | null>(null);
    const [categories, setCategories] = useState<{ _id: string, name: string }[]>([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [_isRazorpayLoadedselectedCategory, setSelectedCategory] = useState<string>('');

    useEffect(() => {
        const fetchCategories = async () => {
            const data = await getCategories();
            setCategories(data.response);
        };
        fetchCategories();
    }, []);

    const handleSubmit = async (values: any, { setSubmitting }: any) => {
        try {
            await toast.promise(
                uploadPost(values, id + ""),
                {
                    loading: 'Creating post...',
                    success: 'Post created successfully',
                    error: 'Failed to create post',
                }
            );
            navigate("/vendor/home");
        } catch (error) {
            console.error('Error creating post:', error);
            toast.error('Failed to create post');
        } finally {
            setSubmitting(false);
        }
    };

    const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>, setFieldValue: (field: string, value: any) => void) => {
        const file = event.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = () => {
                setSelectedImage(reader.result);
                setFieldValue("image", file); // Update the image field value
            };
            reader.readAsDataURL(file);
        }
    };

    const handleClickChangePicture = () => {
        if (fileInputRef.current) {
            fileInputRef.current.click();
        }
    };

    const handleCategorySelect = (categoryName: string) => {
        setSelectedCategory(categoryName);
        setSearchTerm(categoryName);
    };

    const filteredCategories = categories.filter(category =>
        category.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="flex flex-col h-full">
            <Navbar />
            <Formik
                initialValues={{
                    title: '',
                    description: '',
                    category: '',
                    image: null,
                }}
                validationSchema={postValidation}
                onSubmit={handleSubmit}
            >
                {({ isSubmitting, setFieldValue }) => (
                    <div className='flex flex-col md:flex-row flex-1 md:h-[450px] m-1  rounded-md overflow-hidden'>
                        <div className='md:w-1/2 h-full  m-1'>
                            <Form className="m-14 mt-14">
                                <div className="grid gap-6 mb-6 w-full">
                                    <div className="mb-6 ">
                                        <label htmlFor="title" className="block mb-2 text-sm font-medium text-gray-900 ">
                                            Title
                                        </label>
                                        <Field
                                            type="text"
                                            id="title"
                                            name="title"
                                            className="bg-gray-50  shadow-lg border-gray-300 text-gray-900  text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5   dark:placeholder-gray-400  dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                            placeholder="Title"
                                        />
                                        <ErrorMessage name="title" component="div" className="text-red-500 text-xs mt-1" />
                                    </div>
                                </div>
                                <div className="grid gap-6 mb-6 w-full">
                                    <label htmlFor="category" className="sr-only">
                                        Search
                                    </label>
                                    <div className="relative w-full ">
                                        <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                                            <svg className="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 20">
                                                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5v10M3 5a2 2 0 1 0 0-4 2 2 0 0 0 0 4Zm0 10a2 2 0 1 0 0 4 2 2 0 0 0 0-4Zm12 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4Zm0 0V6a3 3 0 0 0-3-3H9m1.5-2-2 2 2 2" />
                                            </svg>
                                        </div>
                                        <Field
                                            type="text"
                                            id="category"
                                            name="category"
                                            className="bg-gray-50 shadow-lg  border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full ps-10 p-2.5  dark:border-gray-600 dark:placeholder-gray-400 dark:text-black dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                            placeholder="Search Services..."
                                            value={searchTerm}
                                            autoComplete="off"
                                            onChange={(e: any) => {
                                                setDropdownOpen(true);
                                                setSearchTerm(e.target.value);
                                            }}
                                        />
                                        <ErrorMessage name="category" component="div" className="text-red-500 text-xs mt-1" />
                                    </div>
                                    {dropdownOpen && (
                                        <div id="dropdown" className="z-10 bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700 absolute mt-[60px]">
                                            <ul className="py-2 text-sm text-gray-700 dark:text-gray-200">
                                                {filteredCategories.map(category => (
                                                    <li key={category._id}>
                                                        <button
                                                            type="button"
                                                            className="inline-flex w-full px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                                                            onClick={() => {
                                                                setFieldValue("category", category.name);
                                                                setDropdownOpen(false);
                                                                handleCategorySelect(category.name);
                                                            }}
                                                        >
                                                            {category.name}
                                                        </button>
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>
                                    )}
                                </div>
                                <div className="mt-5">
                                    <label htmlFor="description" className="block mb-2 text-sm font-medium text-gray-900 ">
                                        Your desciption
                                    </label>
                                    <Field
                                        as="textarea"
                                        id="description"
                                        name="description"
                                        rows={4}
                                        className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg shadow-lg  focus:ring-blue-500 focus:border-blue-500   dark:placeholder-gray-400  dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                        placeholder="Write your thoughts here..."
                                    />
                                    <ErrorMessage name="description" component="div" className="text-red-500 text-xs mt-1" />
                                </div>
                                <div className="flex justify-center mt-5">
                                    <button
                                        type="submit"
                                        disabled={isSubmitting}
                                        className="border-blue-600 ml-7 font-semibold text-blue-600 px-10 py-2 rounded-md shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
                                    >
                                        POST
                                    </button>
                                </div>
                            </Form>
                        </div>

                        <div className='md:w-1/2 md:h-full m-1 hidden md:block'>
                            <div className="h-full m-20">
                                <label htmlFor="dropzone-file" className="flex flex-col items-center justify-center w-full h-[285px] border-2  border-dashed rounded-lg cursor-pointer bg-gray-100  hover:bg-gray-100 shadow-lg  border-gray-100 ">
                                    {selectedImage ? (
                                        <img src={selectedImage as string} alt="Selected" className="h-full  w-full object-cover rounded-lg" />
                                    ) : (
                                        <div className="flex flex-col items-center justify-center pt-5 pb-6">
                                            <svg aria-hidden="true" className="w-10 h-10 mb-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 16V3a2 2 0 0 1 2-2h6a2 2 0 0 1 2 2v13M7 16a4 4 0 0 0 8 0M7 16H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h2M7 16v3a3 3 0 1 0 6 0v-3m-6 0h6" />
                                            </svg>
                                            <p className="mb-2 text-sm text-white ">
                                                Click to upload or drag and drop
                                            </p>
                                            <p className="text-xs text-gray-500 dark:text-gray-400">SVG, PNG, JPG or GIF (MAX. 800x400px)</p>
                                        </div>
                                    )}
                                    <input
                                        id="dropzone-file"
                                        type="file"
                                        className="hidden bg-transparent"
                                        accept="image/*"
                                        ref={fileInputRef}
                                        onChange={(event) => handleImageChange(event, setFieldValue)}
                                    />
                                </label>
                                {selectedImage && (
                                    <div className="mt-4 flex justify-center">
                                        <button
                                            type="button"
                                            className="bg-blue-600 text-white px-4 py-2 rounded-md shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
                                            onClick={handleClickChangePicture}
                                        >
                                            Change Picture
                                        </button>
                                    </div>
                                )}
                                <ErrorMessage name="image" component="div" className="text-red-500 text-xs mt-1 text-center" />
                            </div>
                        </div>
                    </div>
                )}
            </Formik>
        </div>
    );
};

export default React.memo(Post)
