'use client';

import { useFormik } from 'formik';
import { useRouter, useSearchParams } from 'next/navigation';
import { useState, useEffect } from 'react';
import axiosInstance from '@/utils/axiosInstance';
import Link from 'next/link';

export default function EditProduct() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const id = searchParams.get('id');

  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [loading, setLoading] = useState(true);

  const formik = useFormik({
    initialValues: {
      name: '',
      price: '',
      image: '',
      description: '',
    },
    enableReinitialize: true,

    validate: (values) => {
      const errors: any = {};

      if (!values.name) errors.name = 'Required';

      if (!values.price) {
        errors.price = 'Required';
      } else if (isNaN(Number(values.price))) {
        errors.price = 'Must be number';
      }

      return errors;
    },

    onSubmit: async (values) => {
      try {
        setSubmitting(true);

        await axiosInstance.put(`/products/${id}`, values);

        router.push('/');
      } catch (err: any) {
        setError('Update failed');
      } finally {
        setSubmitting(false);
      }
    },
  });

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await axiosInstance.get(`/products/${id}`);

        formik.setValues({
          name: res.data.name,
          price: res.data.price,
          image: res.data.image,
          description: res.data.description,
        });
      } catch {
        setError('Failed to load product');
      } finally {
        setLoading(false);
      }
    };

    if (id) fetchProduct();
  }, [id]);

  if (loading) return <p>Loading...</p>;

  return (
    <div>
      <h1>Edit Product</h1>

      {error && <p style={{ color: 'red' }}>{error}</p>}

      <form onSubmit={formik.handleSubmit}>
        <input name="name" value={formik.values.name} onChange={formik.handleChange} />
        <input name="price" value={formik.values.price} onChange={formik.handleChange} />
        <input name="image" value={formik.values.image} onChange={formik.handleChange} />
        <textarea name="description" value={formik.values.description} onChange={formik.handleChange} />

        <button type="submit" disabled={submitting}>
          Update
        </button>
      </form>

      <Link href="/">Back</Link>
    </div>
  );
}