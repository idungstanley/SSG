import React from 'react';
import PropTypes from 'prop-types';
import Row from './Row';
import { useGetInboxes } from '../../../../../features/inbox/inboxesService';

function Body({ data }) {
  const { data: active } = useGetInboxes();

  return (
    <tbody className="bg-white divide-y divide-gray-100">
      {data.map((inbox) => (
        <Row
          key={inbox.id}
          inboxId={inbox.id}
          isHidden={!active.data.inboxes.map((i) => i.id).includes(inbox.id)}
        />
      ))}
    </tbody>
  );
}

Body.propTypes = {
  data: PropTypes.array.isRequired,
};

export default Body;
