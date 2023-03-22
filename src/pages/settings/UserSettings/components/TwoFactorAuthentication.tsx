import React from 'react';
import { MdOutlineCall } from 'react-icons/md';

export default function TwoFactorAuthentication() {
  return (
    <div>
      <h4 className="font-extrabold ">Two-factor authentication(2FA)</h4>
      <p className="text-sm">
        Keep your account secure by enabling 2FA via SMS or using a temporary one-time passcode (TOTP) from an
        authenticator app.
      </p>

      <section className="flex items-center justify-between">
        <div className="flex items-center justify-between space-x-6 p-2 border-2 border-gray-300">
          <MdOutlineCall />
          <article>
            <p>Text Message (SMS) </p>
            <p>
              Receive a one-time passcode via SMS each time you log in.{' '}
              <span>
                <button type="button" className="bg-purple-400 text-white p-1 text-xs rounded-md">
                  Business
                </button>
              </span>
            </p>
          </article>
        </div>
        <div>otp section</div>
      </section>
    </div>
  );
}
