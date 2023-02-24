import React from 'react';
import { Link } from 'react-router-dom';

export default function NoNotificationFound() {
  return (
    <main className="flex flex-col bg-white mx-auto w-full max-w-7xl flex-grow justify-center px-4 sm:px-6 lg:px-8 text-center">
      <h1 className="mt-2 text-2xl font-bold tracking-tight text-gray-900 sm:text-2xl">
        Empty
      </h1>
      <p className="mt-2 text-base text-gray-500">
        Sorry, No notifications found
      </p>
      <div className="mt-6">
        <Link
          to="/"
          className="text-base font-medium text-indigo-600 hover:text-indigo-500"
        >
          Go back home
          <span aria-hidden="true"> &rarr;</span>
        </Link>
      </div>
    </main>
  );
}
