import React from 'react';
import TwoFactorAuthentication from './TwoFactorAuthentication';

export default function SettingsGrid() {
  return (
    <div>
      <form>
        <div className="flex flex-col">
          <label>Full Name</label>
          <input type="text" value="Nicholas Diamond" className="border-b border-gray-300 focus:border-transparent" />
        </div>
        <div className="flex flex-col">
          <label>Email</label>
          <input
            type="email"
            value="n.diamond@simpsgroup.co.uk"
            className="border-b border-gray-300 focus:border-transparent"
          />
        </div>
        <div className="flex flex-col">
          <label>Password</label>
          <input
            type="password"
            value="n.diamond@simpsgroup.co.uk"
            className="border-b border-gray-300 focus:border-transparent"
          />
        </div>
      </form>

      <TwoFactorAuthentication />
    </div>
  );
}
