import React from 'react';
import { ITypes } from '../../../../features/general/notification/notification.interfaces';

export default function TBodyData({ notificationBody }: { notificationBody: ITypes }) {
  console.log(notificationBody);
  return (
    <tr>
      <td scope="col" className="pl-10  py-3.5 text-left text-sm font-semibold text-gray-900">
        {notificationBody.name}
      </td>
      <td scope="col" className="pl-14 px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
        <input type="checkbox" />
      </td>
      <td scope="col" className="pl-14 px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
        <input type="checkbox" />
      </td>
      <td scope="col" className="pl-14 px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
        <input type="checkbox" />
      </td>
      <td scope="col" className="pl-14 px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
        <input type="checkbox" />
      </td>
    </tr>
  );
}
