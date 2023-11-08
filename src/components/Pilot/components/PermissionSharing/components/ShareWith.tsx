import { Disclosure } from '@headlessui/react';
import React, { useState } from 'react';
import { AiFillCaretRight } from 'react-icons/ai';
import Toggle from './Toggle';
import People from './People';
import RoleDropdown from './RoleDropdown';
import ArrowDown from '../../../../../assets/icons/ArrowDown';

function ShareWith({ privateMode }: { privateMode: boolean }) {
  const [anchor, setAnchor] = useState<HTMLElement | null>(null);
  return (
    <div className="w-full">
      <h1>Share With</h1>
      <div className="mt-2">
        <Disclosure>
          {({ open }) => (
            <>
              <div className="flex justify-between items-center  py-2 hover:bg-alsoit-gray-75 rounded-md">
                <Disclosure.Button className="flex w-full justify-between items-center gap-2 text-left text-sm font-medium text-purple-900 focus:outline-none focus-visible:ring focus-visible:ring-purple-500/75">
                  <div className="flex gap-2 items-center">
                    <AiFillCaretRight className={`${open ? 'rotate-90 transform' : ''} h-3 w-3`} />
                    <span>New Hub</span>
                  </div>
                </Disclosure.Button>
                <div>
                  <Toggle />
                </div>
              </div>
              <Disclosure.Panel className="text-sm text-gray-500">
                {/* // To be removed */}
                <h3 className="text-alsoit-text-lg my-2">1 Person invited</h3>
                <People showToggle={false} />
              </Disclosure.Panel>
            </>
          )}
        </Disclosure>
      </div>
      <div>
        {privateMode && (
          <Disclosure>
            {({ open }) => (
              <>
                <Disclosure.Button className="flex w-full justify-between items-center gap-2 text-left text-sm font-medium text-purple-900 focus:outline-none focus-visible:ring focus-visible:ring-purple-500/75 py-2 hover:bg-alsoit-gray-75 rounded-md">
                  <div className="flex gap-2 items-center">
                    <AiFillCaretRight className={`${open ? 'rotate-90 transform' : ''} h-3 w-3`} />
                    <span>People</span>
                  </div>
                </Disclosure.Button>
                <Disclosure.Panel className="px-4 pt-4 pb-2 text-sm text-gray-500">
                  <div className="w-full flex justify-between">
                    <h3 className="text-alsoit-text-lg my-2">1 Person invited</h3>
                    <div className="flex gap-2 items-center">
                      <button
                        className="text-alsoit-text-lg rounded flex justify-center items-center gap-0.5"
                        onClick={(e) => setAnchor(e.currentTarget)}
                      >
                        Edit all <ArrowDown className="w-2 h-2" />
                      </button>
                      <button className="text-alsoit-text-lg text-alsoit-danger rounded flex justify-center items-center">
                        Remove all
                      </button>
                    </div>
                  </div>
                  <People showToggle={true} />
                </Disclosure.Panel>
              </>
            )}
          </Disclosure>
        )}

        <RoleDropdown anchor={anchor} setAnchor={setAnchor} />
      </div>
    </div>
  );
}

export default ShareWith;
