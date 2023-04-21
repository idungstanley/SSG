import { Fragment } from 'react';
import { GetNotificationSettingsService } from '../../../../features/general/notification/notificationService';
import TBodyData from './TBody';
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
                    {Object.keys(data[category].types[cat]).map((body: string) => {
                      const typeObj = data[category].types[cat][body];
                      console.log(typeObj); // Check the typeObj structure
                      return (
                        <TBodyData
                          notificationBody={{
                            name: typeObj?.name ?? 'Unknown Name',
                            default_email: typeObj?.default_email ?? false,
                            default_site: typeObj?.default_site ?? false,
                            is_email: typeObj?.is_email ?? false,
                            is_site: typeObj?.is_site ?? false
                          }}
                          key={key}
                        />
                      );
                    })}
                  </Fragment>
                ))}
            </tbody>
          </Fragment>
        ))}
    </table>
  );
}
