import React from 'react';
import ColorTheme from './ColorTheme';
import TwoFactorAuthentication from './TwoFactorAuthentication';
import Preferences from './Preferences';

function Personalization() {
  return (
    <div className="w-4/6 m-2 bg-white m-2 p-4 rounded-lg overflow-auto" style={{ maxHeight: '90vh' }}>
      <div className="bg-white w-full">
        <section className="">
          <ColorTheme />
        </section>
        <section>
          <TwoFactorAuthentication />
        </section>
        <section>
          <Preferences />
        </section>
      </div>
    </div>
  );
}

export default Personalization;
