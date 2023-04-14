import React from 'react';
import CurrentUser from './CurrentUser';
import Region from './Region';
import { IUserData } from '../../../../features/workspace/workspace.interfaces';

interface dataProps {
  data: IUserData | undefined;
}

function Profile({ data }: dataProps) {
  return (
    <div className="w-2/6 bg-white m-2 h-full p-4 rounded-lg">
      <h1 className="font-bold" style={{ fontSize: '10px' }}>
        PERSONAL PROFILE
      </h1>
      <section>
        <div className="flex justify-center my-2">
          <CurrentUser />
        </div>
        <section>
          <div>
            <h1 className="font-bold" style={{ fontSize: '10px' }}>
              EDIT PROFILE
            </h1>
          </div>
          <div className="my">
            <h5 className="font-bold text-xs">Full Name</h5>
            <input type="text" className="w-full rounded h-6 text-xs" value={data?.name} />
          </div>
          <div className="my-2">
            <h5 className="font-bold text-xs">Email</h5>
            <input type="text" className="w-full rounded h-6 text-xs" value={data?.email} />
          </div>
          <div className="my-2">
            <h5 className="font-bold text-xs">Password</h5>
            <input type="password" className="w-full rounded h-6 text-xs" value="n.salifu@simpsgroup.co.uk" />
          </div>
        </section>
        <section>
          <div className="my">
            <h1 className="font-bold" style={{ fontSize: '10px' }}>
              LANGUAGE & REGION SETTINGS
            </h1>
          </div>
          <div className="flex justify-between my-2">
            <div className="" style={{ width: '48%' }}>
              <h5 className="font-bold text-xs" style={{ fontSize: '10px' }}>
                Language
              </h5>
              <select name="language" className="h-6 py-0 text-xs rounded my w-full">
                <option value="">English</option>
                <option value="">Spanish</option>
                <option value="">Français </option>
                <option value="">Español </option>
                <option value="">Português brasileiro</option>
                <option value="">Deutsch </option>
              </select>
            </div>
            <div className="" style={{ width: '48%' }}>
              <h5 className="font-bold text-xs">Region</h5>
              <Region />
            </div>
          </div>
          <div className="my-2 flex justify-between ">
            <div style={{ width: '48%' }}>
              <h5 className="font-bold" style={{ fontSize: '10px' }}>
                Start of the week
              </h5>
              <select
                name="Day"
                className="h-6 py-0 rounded my w-full"
                style={{ fontSize: '10px' }}
                value={data?.start_week}
              >
                <option value="1">Monday</option>
                <option value="0">Sunday</option>
              </select>
            </div>
            <div style={{ width: '48%' }}>
              <h5 className="font-bold" style={{ fontSize: '10px' }}>
                Time Format
              </h5>
              <select
                name="Time-format"
                className="h-6 py-0 rounded my w-full"
                style={{ fontSize: '10px' }}
                value={data?.date_format}
              >
                <option value="24 hours">24-hours</option>
                <option value="12 hours">12-hours</option>
              </select>
            </div>
          </div>
          <div className="my-2 flex justify-between ">
            <div style={{ width: '48%' }}>
              <h5 className="font-bold" style={{ fontSize: '10px' }}>
                Date Format
              </h5>
              <select
                name="Date-format"
                className="h-6 py-0 rounded my w-full"
                style={{ fontSize: '10px' }}
                value={data?.date_format}
              >
                <option value="dd/mm/yyyy">dd/mm/yyyy</option>
                <option value="mm/dd/yyyy">mm/dd/yyyy</option>
                <option value="yyyy/mm/dd">yyyy/mm/dd</option>
              </select>
            </div>
          </div>
          <div className="w-full flex justify-center">
            <button className="flex justify-end text-white font-bold py-2 px-4 rounded my-2 border-2 text-red-500 border-red-500">
              Delete Account
            </button>
          </div>
        </section>
      </section>
    </div>
  );
}

export default Profile;