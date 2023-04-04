import React from 'react';
import { MdOutlineCall } from 'react-icons/md';

export default function TwoFactorAuthentication() {
  return (
    <div className="my-4">
      <h4 className="font-extrabold text-xl mt-8">Two-factor authentication(2FA)</h4>
      <p className="text-sm my-2">
        Keep your account secure by enabling 2FA via SMS or using a temporary one-time passcode (TOTP) from an
        authenticator app.
      </p>
      <section className="flex items-center justify-between">
        <div className="flex items-center justify-between space-x-6 p-4 border-2 border-gray-300 rounded mr-4">
          <MdOutlineCall />
          <article>
            <p>Text Message (SMS) </p>
            <p>
              Receive a one-time passcode via SMS each time you log in.
              <span>
                <button type="button" className="bg-purple-400 text-white p-1 text-xs rounded-md">
                  Business
                </button>
              </span>
            </p>
          </article>
        </div>
        <div className="flex items-center justify-between space-x-6 p-4 border-2 border-gray-300 rounded ml-4">
          <MdOutlineCall />
          <article>
            <p>Authenticator App (TOTP) </p>
            <p>
              Use an app to receive a temporary one-time passcode each time you log in.
              {/* <span>
                <button type="button" className="bg-purple-400 text-white p-1 text-xs rounded-md">
                  Business
                </button>
              </span> */}
            </p>
          </article>
        </div>
      </section>
    </div>
  );
}
