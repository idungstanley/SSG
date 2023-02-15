import React from 'react';
import { Link } from 'react-router-dom';

export default function NotFoundPage() {
  return (
    <main className="flex min-h-full flex-col bg-white mx-auto w-full max-w-7xl flex-grow justify-center px-4 sm:px-6 lg:px-8 text-center">
      <p className="text-base font-semibold text-indigo-600">404</p>
      <h1 className="mt-2 text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl">
        Page not found.
      </h1>
      <p className="mt-2 text-base text-gray-500">
        Sorry, we couldn’t find the page you’re looking for.
      </p>
      <div className="mt-6">
        <Link
          to="/workspace"
          className="text-base font-medium text-indigo-600 hover:text-indigo-500"
        >
          Go back home
          <span aria-hidden="true"> &rarr;</span>
        </Link>
      </div>
    </main>
  );
}
