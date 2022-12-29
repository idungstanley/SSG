import React, { useState } from 'react';
import { Combobox } from '@headlessui/react';
import { classNames } from '../../utils';

interface userDataType {
  id: string;
  user: {
    name: string;
    email: string;
  };
}

interface selectedType {
  id: string
}

interface ComboBoxType {
  setShowPopup: React.Dispatch<React.SetStateAction<boolean>>;
  onClickArrow: (value: string) => void;
  absolute: boolean;
  users: userDataType[];
}

function ComboBoxForTeamMembers({
  setShowPopup,
  onClickArrow,
  absolute,
  users,
}: ComboBoxType) {
  const [query, setQuery] = useState('');
  const [selectedUser, setSelectedUser] = useState<any>(null);
  const filteredUsers =
    query === ''
      ? users
      : users.filter((person) =>
          person.user.name.toLowerCase().includes(query.toLowerCase())
        );
  return (
    <>
      {absolute ? (
        <div
          className="fixed top-0 bottom-0 left-0 right-0 bg-black opacity-0"
          tabIndex={0}
          role="button"
          onClick={() => setShowPopup(false)}
        >
          {' '}
        </div>
      ) : null}
      <Combobox
        as="div"
        value={selectedUser}
        onChange={setSelectedUser}
        className={`${
          absolute ? 'absolute top-12 right-0 border-2 p-2' : null
        } bg-white pr-10 rounded-xl`}
      >
        <Combobox.Label className="block text-sm font-medium text-gray-700">
          Select member:
        </Combobox.Label>
        <div className="relative mt-1">
          <Combobox.Input
            className="w-full py-2 pl-3 pr-10 bg-white border border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500 sm:text-sm"
            onChange={(event) => setQuery(event.target.value)}
            displayValue={(person: userDataType) => person?.user.name}
          />
          <Combobox.Button className="absolute inset-y-0 right-0 flex items-center px-2 rounded-r-md focus:outline-none">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M8.25 15L12 18.75 15.75 15m-7.5-6L12 5.25 15.75 9"
              />
            </svg>
          </Combobox.Button>
          <svg
            onClick={() => onClickArrow(selectedUser.id)}
            role="button"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className={`w-6 h-6 absolute top-2 -right-8 cursor-pointer transition-all duration-300 ${
              selectedUser ? 'stroke-current text-indigo-600' : null
            }`}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M6 12L3.269 3.126A59.768 59.768 0 0121.485 12 59.77 59.77 0 013.27 20.876L5.999 12zm0 0h7.5"
            />
          </svg>
          {users && filteredUsers.length > 0 && (
            <Combobox.Options className="absolute z-10 w-full py-1 mt-1 overflow-auto text-base bg-white rounded-md shadow-lg max-h-60 ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
              {filteredUsers.map((person) => (
                <Combobox.Option
                  key={person.id}
                  value={person}
                  className={({ active }) =>
                    classNames(
                      'relative cursor-pointer select-none py-2 pl-3 pr-9',
                      active ? 'bg-indigo-600 text-white' : 'text-gray-900'
                    )
                  }
                >
                  {({ active, selected }) => (
                    <>
                      <span
                        className={classNames(
                          'block truncate',
                          selected ? 'font-semibold' : ''
                        )}
                      >
                        {person.user.name}
                      </span>
                      <span className="italic">{person.user.email}</span>

                      {selected && (
                        <span
                          className={classNames(
                            'absolute inset-y-0 right-0 flex items-center pr-4',
                            active ? 'text-white' : 'text-indigo-600'
                          )}
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 20 20"
                            fill="currentColor"
                            className="w-5 h-5"
                          >
                            <path
                              fillRule="evenodd"
                              d="M16.704 4.153a.75.75 0 01.143 1.052l-8 10.5a.75.75 0 01-1.127.075l-4.5-4.5a.75.75 0 011.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 011.05-.143z"
                              clipRule="evenodd"
                            />
                          </svg>
                        </span>
                      )}
                    </>
                  )}
                </Combobox.Option>
              ))}
            </Combobox.Options>
          )}
        </div>
      </Combobox>
    </>
  );
}

ComboBoxForTeamMembers.defaultProps = {
  setShowPopup: () => ({}),
};

export default ComboBoxForTeamMembers;
