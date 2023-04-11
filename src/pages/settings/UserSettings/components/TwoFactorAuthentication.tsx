import React from 'react';
import { MdOutlineCall } from 'react-icons/md';

export default function TwoFactorAuthentication() {
  return (
    <div className="my-1">
      <h4 className="font-extrabold text-xs">Two-factor authentication(2FA)</h4>
      <p className="text-xs my-2">
        Keep your account secure by enabling 2FA via SMS or using a temporary one-time passcode (TOTP) from an
        authenticator app.
      </p>
      <section className="flex items-center justify-between">
        <div className="flex items-center justify-between space-x-6 p-2 border-2 border-gray-300 rounded mr-4">
          <MdOutlineCall />
          <article>
            <p style={{ fontSize: '10px' }}>Text Message (SMS) </p>
            <p style={{ fontSize: '10px' }}>
              Receive a one-time passcode via SMS each time you log in.
              <span>
                <button
                  type="button"
                  className="bg-purple-400 text-white p-0.5 rounded-md"
                  style={{ fontSize: '10px' }}
                >
                  Business
                </button>
              </span>
            </p>
          </article>
        </div>
        <div className="flex items-center justify-between space-x-6 p-2 border-2 border-gray-300 rounded ml-4">
          <MdOutlineCall />
          <article>
            <p style={{ fontSize: '10px' }}>Authenticator App (TOTP) </p>
            <p style={{ fontSize: '10px' }}>
              Use an app to receive a temporary one-time passcode each time you log in.
            </p>
          </article>
        </div>
      </section>
    </div>
  );
}
