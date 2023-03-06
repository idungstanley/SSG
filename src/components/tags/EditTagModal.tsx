import React, { Fragment, useState } from 'react';
import { Transition, Dialog } from '@headlessui/react';
import { BiTrash } from 'react-icons/bi';
import { AiOutlineEllipsis } from 'react-icons/ai';
import { HiOutlinePencil } from 'react-icons/hi';
import { BsDroplet } from 'react-icons/bs';
import { useDispatch } from 'react-redux';
import { setRenameTagId, setShowTagColorDialogBox } from '../../features/task/taskSlice';
import { useAppSelector } from '../../app/hooks';

interface itemsType {
  id: number;
  title: string;
  icon: JSX.Element;
  handleClick: () => void;
  bg: string;
}

interface EditTagModalProps {
  tagId: string | null;
}

export default function EditTagModal({ tagId }: EditTagModalProps) {
  const dispatch = useDispatch();
  const { showTagColorDialogueBox } = useAppSelector((state) => state.task);
  const EditTagOptions: itemsType[] = [
    {
      id: 1,
      title: 'Delete',
      handleClick: () => ({}),
      icon: <BiTrash />,
      bg: 'red'
    },
    {
      id: 2,
      title: 'Rename',
      handleClick: () => {
        dispatch(setRenameTagId(tagId));
      },
      icon: <HiOutlinePencil />,
      bg: 'blue'
    },
    {
      id: 3,
      title: 'Change Color',
      handleClick: () => {
        dispatch(setShowTagColorDialogBox(!showTagColorDialogueBox));
      },
      icon: <BsDroplet />,
      bg: 'purple'
    }
  ];
  // return (
  //   <Menu as="div" className="relative inline-block text-left">
  //     <div>
  //       <Menu.Button className="flex text-sm text-gray-400">
  //         <AiOutlineEllipsis className="cursor-pointer" />
  //       </Menu.Button>
  //     </div>

  //     <Transition
  //       as={Fragment}
  //       enter="transition ease-out duration-100"
  //       enterFrom="transform opacity-0 scale-95"
  //       enterTo="transform opacity-100 scale-100"
  //       leave="transition ease-in duration-75"
  //       leaveFrom="transform opacity-100 scale-100"
  //       leaveTo="transform opacity-0 scale-95"
  //       // show={sidebarSettings}
  //     >
  //       <Menu.Items className="origin-top-right absolute z-40 mt-2 w-32 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 divide-y divide-gray-100 focus:outline-none">
  //         {EditTagOptions.map((item) => (
  //           <Menu.Item key={item.id}>
  //             <div key={item.id}>
  //               <div
  //                 className={`flex items-center cursor-pointer p-2 space-x-2 text-xs text-left text-gray-600 hover:bg-${item.bg}-200`}
  //                 onClick={item.handleClick}
  //               >
  //                 {item.icon}
  //                 <p>{item.title}</p>
  //               </div>
  //             </div>
  //           </Menu.Item>
  //         ))}
  //       </Menu.Items>
  //     </Transition>
  //   </Menu>
  // );

  const [isOpen, setIsOpen] = useState(false);

  function closeModal() {
    setIsOpen(false);
  }

  function openModal() {
    setIsOpen(true);
  }
  return (
    <>
      <div className="relative inline-block text-left">
        <button type="button" onClick={openModal} className="flex text-sm text-gray-400">
          <AiOutlineEllipsis className="cursor-pointer" />
        </button>
      </div>

      <Transition appear show={isOpen} as={Fragment}>
        <Dialog as="div" className="relative z-30" onClose={closeModal}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black bg-opacity-25" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4 text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="origin-top-right absolute z-40 mt-2 w-32 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 divide-y divide-gray-100 focus:outline-none">
                  {/* <Dialog.Title
                    as="h3"
                    className="text-lg font-medium leading-6 text-gray-900"
                  >
                    Payment successful
                  </Dialog.Title> */}
                  {/* <div className="mt-2">
                    <p className="text-sm text-gray-500">
                      Your payment has been successfully submitted. We’ve sent
                      you an email with all of the details of your order.
                    </p>
                  </div>

                  <div className="mt-4">
                    <button
                      type="button"
                      className="inline-flex justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                      onClick={closeModal}
                    >
                      Got it, thanks!
                    </button>
                  </div> */}

                  {EditTagOptions.map((item) => (
                    <div key={item.id}>
                      <div key={item.id}>
                        <div
                          className={`flex items-center cursor-pointer p-2 space-x-2 text-xs text-left text-gray-600 hover:bg-${item.bg}-200`}
                          onClick={item.handleClick}
                        >
                          {item.icon}
                          <p>{item.title}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  );
}
