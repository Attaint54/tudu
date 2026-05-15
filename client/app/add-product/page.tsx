'use client';

import { useFormik } from 'formik';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import axiosInstance from '@/utils/axiosInstance';
import Link from 'next/link';

export default function AddProduct() {
  const router = useRouter();
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [submitting, setSubmitting] = useState(false);

  const formik = useFormik({
    initialValues: {
      name: '',
      price: '',
      image: '',
      description: '',
    },
    validate: (values) => {
      const errors: any = {};
      if (!values.name) errors.name = 'Required';
      if (!values.price) {
        errors.price = 'Required';
      } else if (isNaN(Number(values.price)) || Number(values.price) <= 0) {
        errors.price = 'Must be a valid positive number';
      }
      return errors;
    },
    onSubmit: async (values) => {
      try {
        setSubmitting(true);
        setError('');
        setSuccess('');
        await axiosInstance.post('/products', values);
        setSuccess('Product added successfully!');
        setTimeout(() => {
          router.push('/');
        }, 1500);
      } catch (err: any) {
        setError(err.response?.data?.message || err.message || 'Failed to add product');
      } finally {
        setSubmitting(false);
      }
    },
  });

  return (
    <div className="max-w-2xl mx-auto bg-white p-8 rounded-lg shadow-md">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Add New Product</h1>
        <Link href="/" className="text-gray-500 hover:text-gray-700">Back</Link>
      </div>

      {error && <div className="mb-4 p-3 bg-red-100 text-red-700 rounded">{error}</div>}
      {success && <div className="mb-4 p-3 bg-green-100 text-green-700 rounded">{success}</div>}

      <form onSubmit={formik.handleSubmit} className="space-y-6">
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-gray-700">Name *</label>
          <input
            id="name"
            name="name"
            type="text"
            className={`mt-1 block w-full border ${formik.touched.name && formik.errors.name ? 'border-red-500' : 'border-gray-300'} rounded-md shadow-sm p-2`}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.name}
          />
          {formik.touched.name && formik.errors.name ? (
            <div className="text-red-500 text-sm mt-1">{formik.errors.name as string}</div>
          ) : null}
        </div>

        <div>
          <label htmlFor="price" className="block text-sm font-medium text-gray-700">Price ($) *</label>
          <input
            id="price"
            name="price"
            type="number"
            step="0.01"
            className={`mt-1 block w-full border ${formik.touched.price && formik.errors.price ? 'border-red-500' : 'border-gray-300'} rounded-md shadow-sm p-2`}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.price}
          />
          {formik.touched.price && formik.errors.price ? (
            <div className="text-red-500 text-sm mt-1">{formik.errors.price as string}</div>
          ) : null}
        </div>

        <div>
          <label htmlFor="image" className="block text-sm font-medium text-gray-700">Image URL</label>
          <input
            id="image"
            name="image"
            type="text"
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.image}
            placeholder="https://example.com/image.jpg"
          />
        </div>

        <div>
          <label htmlFor="description" className="block text-sm font-medium text-gray-700">Description</label>
          <textarea
            id="description"
            name="description"
            rows={4}
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.description}
          />
        </div>

        <button
          type="submit"
          disabled={submitting}
          className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:bg-indigo-400"
        >
          {submitting ? 'Adding...' : 'Add Product'}
        </button>
      </form>
    </div>
  );
}
