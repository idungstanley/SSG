import React from 'react';

interface userType {
  name: string;
  role: string;
  imageUrl: string;
}
interface statsType {
  label: string;
  value: number;
}
const user: userType = {
  name: 'Rebecca Nicholas',
  role: 'Product Designer',
  imageUrl: 'https://images.unsplash.com/photo-1550525811-e5869dd03032?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
};

const stats: statsType[] = [
  { label: 'Vacation days left', value: 12 },
  { label: 'Sick days left', value: 4 },
  { label: 'Personal days left', value: 2 },
];

export default function PageHeadingCardWithAvatarAndStats() {
  return (
    <div className="overflow-hidden bg-white rounded-lg shadow">
      <h2 className="sr-only" id="profile-overview-title">
        Profile Overview
      </h2>
      <div className="p-6 bg-white">
        <div className="sm:flex sm:items-center sm:justify-between">
          <div className="sm:flex sm:space-x-5">
            <div className="flex-shrink-0">
              <img className="w-20 h-20 mx-auto rounded-full" src={user.imageUrl} alt="" />
            </div>
            <div className="mt-4 text-center sm:mt-0 sm:pt-1 sm:text-left">
              <p className="text-sm font-medium text-gray-600">Welcome back,</p>
              <p className="text-xl font-bold text-gray-900 sm:text-2xl">{user.name}</p>
              <p className="text-sm font-medium text-gray-600">{user.role}</p>
            </div>
          </div>
          <div className="flex justify-center mt-5 sm:mt-0">
            <a
              href="tempurl"
              className="flex items-center justify-center px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm hover:bg-gray-50"
            >
              View profile
            </a>
          </div>
        </div>
      </div>
      <div className="grid grid-cols-1 border-t border-gray-200 divide-y divide-gray-200 bg-gray-50 sm:grid-cols-3 sm:divide-y-0 sm:divide-x">
        {stats.map((stat) => (
          <div key={stat.label} className="px-6 py-5 text-sm font-medium text-center">
            <span className="text-gray-900">{stat.value}</span>
            <span className="text-gray-600">{stat.label}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
