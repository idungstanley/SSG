import React, { useState } from 'react';
import CurrentUser from './components/CurrentUser';
// import SettingsGrid from './components/SettingsGrid';
import { useAppSelector } from '../../../app/hooks';
// import { selectCurrentUser } from '../../../features/auth/authSlice';
import { getSelf } from '../../../features/workspace/workspaceService';
import { Spinner } from '../../../common';
import TwoFactorAuthentication from './components/TwoFactorAuthentication';
import Region from './components/Region';
import Preferences from './components/Preferences';

export default function UserSettingsProfile() {
  const { userName } = useAppSelector((state) => state.account);
  const [name, setName] = useState<string | undefined>('');
  const [isName, setIsname] = useState<boolean>(false);
  const { data, status } = getSelf();
  if (status === 'loading') {
    return (
      <div className="w-full h-full flex items-center justify-center">
        <Spinner size={50} color="#0F70B7" />
      </div>
    );
  }
  return status === 'success' ? (
    <section className="p-14 overflow-auto" style={{ height: '90vh' }}>
      <div className="mb-8" role="heading">
        <h4 style={{ fontSize: '18px' }} role="heading" className="font-extrabold">
          My Settings
        </h4>
      </div>
      <section role="gridcell" className="grid grid-cols-10 gap-4 overflow-y-auto">
        <div className="col-span-1  h-screen/5">
          <CurrentUser />
        </div>
        <div className="col-span-9 h-screen/5">
          <form>
            <div className="flex flex-col my-3 ">
              <label>Full Name</label>
              <input
                type="text"
                value={isName ? name : data?.data.user.name}
                className="border-t-0 border-l-0 border-r-0 border-gray-400 focus:ring-0 focus:border-0"
                onFocus={(e) => {
                  setName(e.target.value);
                  setIsname(true);
                }}
                onChange={(e) => {
                  setName(e.target.value);
                }}
              />
            </div>
            <div className="flex flex-col my-3 mt-4">
              <label>Email</label>
              <input
                type="email"
                value={''}
                className="border-t-0 border-l-0 border-r-0 border-gray-400 focus:ring-0 focus:border-0"
              />
            </div>
            <div className="flex flex-col my-3 mt-4">
              <label>Password</label>
              <input
                type="password"
                value="n.diamond@simpsgroup.co.uk"
                className="border-t-0 border-l-0 border-r-0 border-gray-400 focus:ring-0 focus:border-0"
              />
            </div>
          </form>
          <TwoFactorAuthentication />
          <div>
            <h1 className="text-xl font-bold">Language & Region settings</h1>
          </div>
          <div>
            <Region />
          </div>
          <div>
            <Preferences />
          </div>
          <button className="flex justify-end text-white font-bold py-4 px-6 rounded my-4 border-2 text-red-500 border-red-500">
            Delete Account
          </button>
        </div>
      </section>
      <div className="bg-white flex items-center h-20 fixed bottom-0 w-full">
        <button
          className={
            userName === data?.data.user.name || userName !== ''
              ? 'bg-green-200 flex justify-end hover:bg-green-600 text-white font-bold py-4 px-6 rounded'
              : 'bg-green-500 flex justify-end hover:bg-green-600 text-white font-bold py-4 px-6 rounded'
          }
        >
          Save Changes
        </button>
      </div>
    </section>
  ) : null;
}
