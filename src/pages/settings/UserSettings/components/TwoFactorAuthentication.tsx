import React from 'react';
import { MdOutlineCall } from 'react-icons/md';
import { useAppSelector } from '../../../../app/hooks';

export default function TwoFactorAuthentication() {
  const { theme_color } = useAppSelector((state) => state.userSetting);
  return (
    <div className="my-1">
      <h4 className="font-extrabold" style={{ fontSize: '15px' }}>
        Two-factor authentication(2FA)
      </h4>
      <p className="my-2 font-medium" style={{ fontSize: '15px' }}>
        keep your account secure by enabling 2FA via SMS or using a temporary one-time passcode (totp) from an
        authenticator app
      </p>
      <section className="flex items-center justify-between">
        <div className="flex items-center justify-between space-x-6 p-2 border-2 border-gray-300 rounded mr-4">
          <MdOutlineCall />
          <article>
            <p style={{ fontSize: '15px' }}>Text Message (SMS) </p>
            <p style={{ fontSize: '15px' }}>
              Receive a one-time passcode via SMS each time you log in.
              <span>
                <button
                  type="button"
                  className="text-white text-xs p-0.5 rounded-md"
                  style={{ backgroundColor: `${theme_color}`, fontSize: '15px' }}
                >
                  Business
                </button>
              </span>
            </p>
          </article>
        </div>
        <div
          className="flex items-center justify-between space-x-6 p-2 border-2 border-gray-300 rounded ml-4"
          style={{ fontSize: '15px' }}
        >
          <MdOutlineCall />
          <article>
            <p style={{ fontSize: '15px' }}>Authenticator App (TOTP) </p>
            <p style={{ fontSize: '15px' }}>
              Use an app to receive a temporary one-time passcode each time you log in.
            </p>
          </article>
        </div>
      </section>
    </div>
  );
}
