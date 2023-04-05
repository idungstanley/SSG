import React, { useState } from 'react';
import ColorTheme from './ColorTheme';
import DateTimeFormat from './DateTimeFormat';
import Languages from './Languages';
import Preferences from './Preferences';
import Region from './Region';
import TwoFactorAuthentication from './TwoFactorAuthentication';
import { useAppDispatch, useAppSelector } from '../../../../app/hooks';
// import { selectCurrentUser } from '../../../../features/auth/authSlice';
import { IUserData } from '../../../../features/workspace/workspace.interfaces';
import { setUserName } from '../../../../features/account/accountSlice';

interface userData {
  user: IUserData | undefined;
}

export default function SettingsGrid({ user }: userData) {
  const { userName } = useAppSelector((state) => state.account);
  console.log(userName);
  const dispatch = useAppDispatch();
  const [name, setName] = useState<string | undefined>(user?.name);
  const [email, setEmail] = useState<string | undefined>(user?.email);
  return (
    <div className="">
      <form>
        <div className="flex flex-col my-3 ">
          <label>Full Name</label>
          <input
            type="text"
            value={name}
            className="border-t-0 border-l-0 border-r-0 border-gray-400 focus:ring-0 focus:border-0"
            onChange={(e) => {
              setName(e.target.value);
              dispatch(setUserName(e.target.value));
            }}
          />
        </div>
        <div className="flex flex-col my-3 mt-4">
          <label>Email</label>
          <input
            type="email"
            value={email}
            className="border-t-0 border-l-0 border-r-0 border-gray-400 focus:ring-0 focus:border-0"
            onChange={(e) => setEmail(e.target.value)}
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
      <ColorTheme />
      <div>
        <h1 className="text-xl font-bold">Language & Region settings</h1>
      </div>
      <div>
        <Languages />
      </div>
      <div>
        <Region />
      </div>
      <div>
        <DateTimeFormat />
      </div>
      <div>
        <Preferences />
      </div>
      <button className="flex justify-end text-white font-bold py-4 px-6 rounded my-4 border-2 text-red-500 border-red-500">
        Delete Account
      </button>
    </div>
  );
}
