import React from 'react';
import { AvatarWithInitials } from '../../../../components';
import { RiCheckboxBlankFill } from 'react-icons/ri';
import { AiFillFlag, AiOutlineEye } from 'react-icons/ai';
import { NotificationType } from './notificaiton.interface';
import moment from 'moment';
import { CardNotificationType } from './notificaiton.interface';
import { CardItemTypes } from './notificaiton.interface';

export default function NotificationCard({ cardItems }: CardNotificationType) {
  return (
    <>
      {Object.keys(cardItems).map((value) => (
        <div key={cardItems[value as keyof CardItemTypes]?.key}>
          <main className="mx-40 mt-10 flex flex-col -my-2 overflow-x-auto">
            <div className="inline-block min-w-full py-2 align-middle border border-gray-200 p-2 rounded-md bg-gray-100 mb-2 pb-4 md:px-6 lg:px-6">
              <p className="capitalize font-bold mb-1 text-xs">{cardItems[value as keyof CardItemTypes]?.key}</p>
              <div className="overflow-hidden shadow ring-1 ring-black ring-opacity-5 md:rounded-lg">
                <div className="min-w-full">
                  {cardItems[value as keyof CardItemTypes]?.notifications.map((data: NotificationType) => (
                    <div key={data.id} className="gap-2 p-2">
                      <section className="bg-white">
                        <div>
                          <div id="breadcrumb" className="pl-3 mt-2 text-gray-500 inline-block">
                            <p className="text-xs border border-gray-200 rounded-md px-3">
                              Community &gt; support | HR &gt; Ticket Support | HR
                            </p>
                          </div>
                          <div className="flex justify-between items-center pl-4 sm:pl-4">
                            <div className="flex space-x-2 items-center">
                              <div>
                                <RiCheckboxBlankFill
                                  className="pl-px text-purple-400 text-xs cursor-pointer"
                                  aria-hidden="true"
                                />
                              </div>
                              <div className="pb-3 pt-2 pr-3 text-left text-xs font-semibold cursor-pointer capitalize">
                                {data.model?.name}
                              </div>
                            </div>
                            <div className="flex items-center space-x-1">
                              {/* priority */}
                              <AiFillFlag className="h-5 w-7 cursor-pointer text-gray-400" aria-hidden="true" />
                              {/* assignees */}
                              <AvatarWithInitials initials={'OM'} height="h-6" width="w-6" backgroundColour={'red'} />
                              {/* watchers */}
                              <AiOutlineEye className="h-5 w-7 cursor-pointer text-gray-400 " aria-hidden="true" />
                            </div>
                          </div>
                        </div>
                      </section>
                      {/* body */}
                      <section className="bg-gray-50">
                        <div>
                          <div className="flex justify-between items-center py-6 pl-4 pr-3 text-left text-sm font-semibold sm:pl-6">
                            <div className="flex space-x-2 items-center">
                              <AvatarWithInitials
                                initials={data.created_by.initials}
                                height="h-6"
                                width="w-6"
                                backgroundColour={data.created_by.colour}
                              />
                              <p className="text-xs font-light">{data.created_by.user.name}</p>
                              <button className="text-purple-600 border border-gray-200 p-1 rounded-full text-xs bg-white cursor-pointer font-bold">
                                <p className="capitalize">{data.model_type}</p>
                              </button>
                            </div>
                            <div className="text-xs">
                              <p>{moment(data.created_at).format('MMMM Do YYYY, h:mm:ss a')}</p>
                            </div>
                          </div>
                        </div>
                      </section>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </main>
        </div>
      ))}
    </>
  );
}
