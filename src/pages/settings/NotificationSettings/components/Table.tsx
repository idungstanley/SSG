import { Fragment } from 'react';
import { GetNotificationSettingsService } from '../../../../features/general/notification/notificationService';
import THeadData from './THead';

export default function NotificaitonTable() {
  const { data } = GetNotificationSettingsService();

  return (
    <table className="min-w-full border border-gray-300">
      {data &&
        Object.keys(data).map((category) => (
          <Fragment key={category}>
            <thead className="bg-gray-200">
              <THeadData notificationHead={category} />
            </thead>
            <tbody className="bg-white">
              {data[category]?.types &&
                Object.keys(data[category].types).map((cat: string) => (
                  <Fragment key={cat}>
                    {/* {console.log(data[category].types[cat]?.category)} */}
                    <tr>
                      <td scope="col" className="pl-10  py-3.5 text-left text-sm font-semibold text-gray-900">
                        {data[category].types[cat]?.name}
                      </td>
                      {/* {Object.keys(data[category].types[cat]?.types).map((values) */}
                      <td scope="col" className="pl-14 px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                        <input checked type="checkbox" />
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
                  </Fragment>
                ))}
            </tbody>
          </Fragment>
        ))}
    </table>
  );
}
