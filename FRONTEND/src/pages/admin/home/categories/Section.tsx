import React, { useEffect, useState } from 'react';
import { Formik, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { addCategory, getCategory, removeCategory } from '../../../../API/services/admin/Dashboard';

const categoryValidation = Yup.object().shape({
    category: Yup.string()
        .matches(/^[A-Z\s]*$/, 'Category must be in uppercase letters')
        .max(30, 'Category name is too long')
        .required('Required')
});

interface Category {
    image?: string;
    name?: string;
    registered?: string;
    _id?: string;
}

const Section: React.FC = () => {
    const [categories, setCategories] = useState<Category[]>([]);
    const [imagePreview, setImagePreview] = useState<string | null>(null);

    useEffect(() => {
        const listCategory = async () => {
            const list = await getCategory();
            setCategories(list.categories.data);
        }
        listCategory();
    }, []);

    const initialValue = {
        category: "",
        image: null
    };

    const submitCategory = async (values: any, { resetForm }: { resetForm: () => void }) => {
        try {
            console.log(values);
            
            await addCategory(values); // Assuming addCategory performs async operation to add a category
            const updatedList = await getCategory(); // Fetch updated list after adding
            setCategories(updatedList.categories.data); // Update state with new list
            resetForm(); // Clear form fields
        } catch (error) {
            console.error('Error adding category:', error);
        }
    };

    const remove = async (id: string) => {
        try {
            const updatedCategories = categories.filter(item => item._id !== id);
            setCategories(updatedCategories);
            await removeCategory(id);
        } catch (error) {
            console.error('Error removing category:', error);
        }
    };

    return (
        <div className="p-8 flex flex-col min-h-fit bg-white">
            <div className="w-full flex flex-col md:flex-row gap-8 mt-10">
            <div className="w-full max-w-lg border border-gray-300 bg-gray-100 rounded-lg p-4">
    <div className="rounded-lg p-4 bg-gray-200 flex flex-col justify-center items-center border-0 border-r border-gray-300">
        <Formik initialValues={initialValue} validationSchema={categoryValidation} onSubmit={submitCategory}>
            {({ handleChange, values, setFieldValue, isSubmitting, resetForm }) => (
                <Form className="w-full max-w-lg mx-auto mt-3 flex flex-col items-center space-y-4">
                    <div
                        className="w-48 h-48 flex justify-center items-center border border-dashed border-gray-400 rounded-lg bg-no-repeat bg-center bg-origin-padding bg-cover"
                        style={{ backgroundImage: imagePreview ? `url(${imagePreview})` : 'none' }}
                    >
                        {!imagePreview && (
                            <label
                                className="cursor-pointer flex flex-col items-center justify-center h-full w-full"
                                htmlFor="restaurantImage"
                            >
                                <svg className="w-10 h-10 text-gray-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4" />
                                </svg>
                                <span className="text-gray-400 mt-2">Select Image</span>
                                <input
                                    id="restaurantImage"
                                    className="hidden"
                                    type="file"
                                    onChange={(event) => {
                                        const file = event.currentTarget.files[0];
                                        setFieldValue("image", file);
                                        if (file) {
                                            const reader = new FileReader();
                                            reader.onloadend = () => {
                                                setImagePreview(reader.result as string);
                                            };
                                            reader.readAsDataURL(file);
                                        } else {
                                            setImagePreview(null);
                                        }
                                    }}
                                />
                            </label>
                        )}
                    </div>
                    
                    <div className="flex-1 w-full">
                        <input
                            aria-describedby="helper-text-explanation"
                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-md focus:ring-blue-500 focus:border-blue-500 block w-full h-10 px-4 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                            placeholder="Category Name"
                            value={values.category}
                            onChange={handleChange}
                            name="category"
                        />
                        <ErrorMessage name="category" component="div" className="text-red-500 text-sm mt-1" />
                    </div>
                    
                    <div className="flex justify-center w-full">
                        <button
                            type="submit"
                            disabled={isSubmitting}
                            className="inline-flex items-center shadow-md my-2 px-4 py-2 bg-gray-900 text-gray-50 border border-transparent rounded-md font-semibold text-xs uppercase tracking-widest hover:bg-gray-700 active:bg-gray-900 focus:outline-none focus:border-gray-900 focus:ring ring-gray-300 disabled:opacity-25 transition ease-in-out duration-150"
                        >
                            ADD CATEGORY
                        </button>
                        {imagePreview && (
                            <button
                                type="button"
                                className="inline-flex items-center ml-4 shadow-md my-2 px-4 py-2 bg-gray-900 text-gray-50 border border-transparent rounded-md font-semibold text-xs uppercase tracking-widest hover:bg-gray-700 active:bg-gray-900 focus:outline-none focus:border-gray-900 focus:ring ring-gray-300 disabled:opacity-25 transition ease-in-out duration-150"
                                onClick={() => {
                                    setFieldValue("image", null);
                                    setImagePreview(null);
                                }}
                            >
                                Remove image
                            </button>
                        )}
                    </div>
                </Form>
            )}
        </Formik>
    </div>
</div>

                <div className="relative scrollNoDiv overflow-y-auto shadow-md  scrollbar-hidden  sm:rounded-lg w-full max-h-[350px]">
                    <table className="w-full text-sm text-left rtl:text-right overflow-auto text-gray-500 dark:text-gray-400">
                        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                            <tr>
                                <th scope="col" className="px-6 py-3">image</th>
                                <th scope="col" className="px-6 py-3">Category</th>
                                <th scope="col" className="px-6 py-3">Registered</th>
                                <th scope="col" className="px-6 py-3">Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {categories.map((category, index) => (
                                <tr key={index} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                                    <td className="p-4 h-10 w-10">
                                        <img src={category.image || '/path/to/default-image.jpg'} className="w-10 h-10 object-cover rounded-full" alt={`${category.name} image`} />
                                    </td>
                                    <td className="px-6 py-4 font-semibold text-gray-900 dark:text-white">
                                        {category.name}
                                    </td>
                                    <td className="px-6 py-4">
                                        {new Date(category.registered).toLocaleDateString('en-US', {
                                            year: 'numeric',
                                            month: 'long',
                                            day: 'numeric',
                                        })}
                                    </td>
                                    <td className="px-6 py-4">
                                        <a onClick={() => remove(category._id)} className="font-medium text-red-600 dark:text-red-500 hover:underline">Remove</a>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default Section;
