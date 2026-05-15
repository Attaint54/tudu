'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import axiosInstance from '@/utils/axiosInstance';
import Image from 'next/image';

interface Product {
  id: string;
  name: string;
  price: number;
  image: string;
  description: string;
}

export default function Home() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const fetchProducts = async () => {
    try {
      setLoading(true);
      const response = await axiosInstance.get('/products');
      setProducts(response.data);
      setError('');
    } catch (err: any) {
      setError(err.message || 'Failed to fetch products');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleDelete = async (id: string) => {
    if (!window.confirm('Are you sure you want to delete this product?')) return;
    try {
      await axiosInstance.delete(`/products/${id}`);
      setProducts(products.filter(p => p.id !== id));
    } catch (err: any) {
      alert(err.message || 'Failed to delete product');
    }
  };

  if (loading) {
    return <div className="text-center py-20 text-xl">Loading products...</div>;
  }

  if (error) {
    return <div className="text-center py-20 text-red-500 text-xl">{error}</div>;
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-gray-900">All Products</h1>
        <Link href="/add-product" className="bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700 transition">
          + Add Product
        </Link>
      </div>

      {products.length === 0 ? (
        <div className="text-center py-10 bg-white shadow rounded-lg">
          <p className="text-gray-500 text-lg mb-4">No products found.</p>
          <Link href="/add-product" className="text-indigo-600 hover:text-indigo-800 font-medium">
            Create your first product
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {products.map((product) => (
            <div key={product.id} className="bg-white rounded-lg shadow-md overflow-hidden flex flex-col hover:shadow-lg transition">
              <div className="h-48 bg-gray-200 relative">
                {/* Fallback image logic is tricky with Next/Image without configured domains, using standard img tag for simplicity and avoiding next.config.js domain errors */}
                <img 
                  src={product.image} 
                  alt={product.name} 
                  className="w-full h-full object-cover"
                  onError={(e: any) => { e.target.src = 'https://via.placeholder.com/400x300?text=No+Image'; }}
                />
              </div>
              <div className="p-4 flex-1 flex flex-col">
                <h2 className="text-xl font-semibold text-gray-800 mb-2 truncate" title={product.name}>
                  {product.name}
                </h2>
                <p className="text-gray-600 mb-4 line-clamp-2 text-sm flex-1">
                  {product.description}
                </p>
                <div className="flex justify-between items-center mt-auto pt-4 border-t border-gray-100">
                  <span className="text-xl font-bold text-indigo-600">${product.price.toFixed(2)}</span>
                  <div className="space-x-2">
                    <Link href={`/product/${product.id}`} className="text-blue-500 hover:underline text-sm">
                      View
                    </Link>
                    <Link href={`/edit-product/${product.id}`} className="text-orange-500 hover:underline text-sm">
                      Edit
                    </Link>
                    <button onClick={() => handleDelete(product.id)} className="text-red-500 hover:underline text-sm">
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
