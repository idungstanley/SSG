import { Switch } from '@headlessui/react';
import React, { useEffect, useState } from 'react';

interface toggleProps {
  handleToggle: (enabled: boolean) => void;
  isEnabled: boolean;
}

function Toggle({ handleToggle, isEnabled }: toggleProps) {
  const [enabled, setEnabled] = useState(isEnabled);

  const toggleHandler = () => {
    const newEnabledState = !enabled;
    setEnabled(newEnabledState);
    handleToggle(newEnabledState);
  };

  useEffect(() => {
    setEnabled(isEnabled);
  }, [isEnabled]);

  return (
    <Switch
      checked={enabled}
      onChange={toggleHandler}
      className={`${enabled ? 'bg-alsoit-purple-300' : 'bg-teal-700'}
          relative inline-flex h-[18px] w-[33px] shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus-visible:ring-2  focus-visible:ring-white/75`}
    >
      <span
        aria-hidden="true"
        className={`${enabled ? 'translate-x-4' : 'translate-x-0'}
            pointer-events-none inline-block h-[14px] w-[14px] transform rounded-full bg-white shadow-lg ring-0 transition duration-200 ease-in-out`}
      />
    </Switch>
  );
}

export default Toggle;
