import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { OutputDateTime } from '../../../../../../app/helpers';
import {
  useGetInbox, useMarkOpenedInbox,
} from '../../../../../../features/inbox/inboxesService';
import Menu from './Menu';
import { Badge } from '../../../../../../components';

function Row({ inboxId }) {
  const { data: inbox } = useGetInbox(inboxId);

  const { mutate: markOpened } = useMarkOpenedInbox(inboxId);

  const handleClickInbox = () => {
    if (inbox.is_new) {
      markOpened();
    }
  };

  return inbox ? (
    <tr key={inbox.id}>
      <td className="px-6 py-3 whitespace-nowrap text-sm font-medium text-gray-900">
        <div className="flex items-center space-x-3">
          <div
            className="flex-shrink-0 w-2.5 h-2.5 rounded-full"
            style={{ backgroundColor: inbox.colour }}
            aria-hidden="true"
          />
          <Link
            to={`/inbox/${inbox.id}`}
            className="truncate hover:text-gray-600"
            onClick={handleClickInbox}
          >
            <span className="space-x-2">
              <span>{inbox.name}</span>

              {inbox.unfiled_count > 0 && (
                <Badge
                  value={
                    inbox.unfiled_count >= 99 ? '99+' : inbox.unfiled_count
                  }
                  textColour="text-red-800"
                  backgroundColour="bg-red-100"
                />
              )}
            </span>
          </Link>
        </div>
      </td>
      <td className="hidden md:table-cell px-6 py-3 whitespace-nowrap text-sm text-gray-500 text-left">
        <span className="text-gray-500 font-normal">
          {`${inbox.email_key}@inbox.alsofile.com`}
        </span>
      </td>
      <td className="hidden md:table-cell px-6 py-3 whitespace-nowrap text-sm text-gray-500 text-right">
        {OutputDateTime(inbox.updated_at)}
      </td>
      <td className="hidden md:table-cell px-6 py-3 whitespace-nowrap text-sm text-gray-500 text-right">
        <Menu inboxId={inboxId} />
      </td>
    </tr>
  ) : null;
}

Row.propTypes = {
  inboxId: PropTypes.string.isRequired,
};

export default Row;
