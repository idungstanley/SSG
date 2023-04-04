import React from 'react';
import ColorTheme from './ColorTheme';
import DateTimeFormat from './DateTimeFormat';
import Languages from './Languages';
import Preferences from './Preferences';
import Region from './Region';
import TwoFactorAuthentication from './TwoFactorAuthentication';

export default function SettingsGrid() {
  return (
    <div className="">
      <form>
        <div className="flex flex-col my-3 ">
          <label>Full Name</label>
          <input
            type="text"
            value="Nicholas Diamond"
            className="border-t-0 border-l-0 border-r-0 border-gray-400 focus:ring-0 focus:border-0"
          />
        </div>
        <div className="flex flex-col my-3 mt-4">
          <label>Email</label>
          <input
            type="email"
            value="n.diamond@simpsgroup.co.uk"
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
