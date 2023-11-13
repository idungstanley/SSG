import React, { ReactNode } from 'react';
import alldone from '../../../../../assets/icons/alldone.png';

export default function AllDoneForTheDay({
  title,
  description,
  allDoneState
}: {
  title?: string;
  description?: ReactNode | string;
  allDoneState: boolean;
}) {
  return (
    allDoneState && (
      <div className="border-2 rounded-md p-10 text-center h-80">
        <img className="mx-auto object-cover w-52 pb-5" src={alldone} alt="all done for the day" />

        <div className="space-y-3">
          <h1 className="text-lg">{title}</h1>
          <p className="text-alsoit-gray-200">{description as ReactNode}</p>
        </div>
      </div>
    )
  );
}
