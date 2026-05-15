'use client';

import { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import axiosInstance from '@/utils/axiosInstance';
import Link from 'next/link';

interface Product {
  id: string;
  name: string;
  price: number;
  image: string;
  description: string;
}

export default function ProductDetails() {
  const searchParams = useSearchParams();

  const id = searchParams.get('id'); // ✅ FIX

  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setLoading(true);

        const response = await axiosInstance.get(`/products/${id}`);

        setProduct(response.data);
      } catch (err) {
        setError('Failed to fetch product details.');
      } finally {
        setLoading(false);
      }
    };

    if (id) fetchProduct();
  }, [id]);

  if (loading) {
    return (
      <div className="text-center py-20 text-xl">
        Loading product details...
      </div>
    );
  }

  if (error || !product) {
    return (
      <div className="text-center py-20">
        <div className="text-red-500 text-xl mb-4">
          {error || 'Product not found'}
        </div>

        <Link href="/" className="text-indigo-600 hover:underline">
          Return to Home
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-lg overflow-hidden">
      <div className="md:flex">
        <div className="md:w-1/2 bg-gray-200">
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-full object-cover min-h-[300px]"
          />
        </div>

        <div className="p-8 md:w-1/2 flex flex-col">
          <div className="flex justify-between items-start mb-4">
            <h1 className="text-3xl font-bold">{product.name}</h1>
            <span className="text-2xl font-bold text-indigo-600">
              ${product.price.toFixed(2)}
            </span>
          </div>

          <p className="text-gray-600 mb-8 flex-1">
            {product.description || 'No description available.'}
          </p>

          <div className="mt-auto space-x-4">
            <Link
              href={`/edit-product?id=${product.id}`} // ✅ FIXED LINK
              className="bg-orange-500 text-white px-6 py-2 rounded-md"
            >
              Edit Product
            </Link>

            <Link
              href="/"
              className="bg-gray-200 text-gray-800 px-6 py-2 rounded-md"
            >
              Back
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}