import type { Metadata } from 'next';
import './globals.css';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Simple E-commerce CRUD',
  description: 'A beginner-friendly e-commerce app',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="bg-gray-50 text-gray-900 min-h-screen">
        <nav className="bg-white shadow-md">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between h-16">
              <div className="flex">
                <Link
                  href="/"
                  className="flex items-center text-xl font-bold text-indigo-600"
                >
                  ShopStore
                </Link>

                <div className="hidden sm:ml-6 sm:flex sm:space-x-8">
                  <Link
                    href="/"
                    className="text-gray-500 hover:text-indigo-700 px-1 pt-1 text-sm font-medium"
                  >
                    Products
                  </Link>

                  <Link
                    href="/add-product"
                    className="text-gray-500 hover:text-indigo-700 px-1 pt-1 text-sm font-medium"
                  >
                    Add Product
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </nav>

        <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
          {children}
        </main>
      </body>
    </html>
  );
}