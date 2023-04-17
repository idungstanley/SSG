import React from 'react';
import { MdOutlineCall } from 'react-icons/md';
import { useAppSelector } from '../../../../app/hooks';

export default function TwoFactorAuthentication() {
  const { theme_color } = useAppSelector((state) => state.userSetting);
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
            <p className="text-xs">Text Message (SMS) </p>
            <p className="text-xs">
              Receive a one-time passcode via SMS each time you log in.
              <span>
                <button
                  type="button"
                  className="text-white text-xs p-0.5 rounded-md"
                  style={{ backgroundColor: `${theme_color}` }}
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
            <p className="text-xs">Authenticator App (TOTP) </p>
            <p className="text-xs">Use an app to receive a temporary one-time passcode each time you log in.</p>
          </article>
        </div>
      </section>
    </div>
  );
}
