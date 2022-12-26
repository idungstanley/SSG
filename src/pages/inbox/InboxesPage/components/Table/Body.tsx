import React from 'react';
import { IInbox, inboxType } from '../../../../../features/inbox/inbox.interfaces';
import Row from './Row';

interface BodyProps {
  data: IInbox[];
  type: inboxType;
}

function Body({ data, type }: BodyProps) {
  return (
    <tbody className="bg-white divide-y divide-gray-100">
      {data.map((inbox) => (
        <Row
          key={inbox.id}
          inboxId={inbox.id}
          type={type}
          inbox={inbox}
        />
      ))}
    </tbody>
  );
}

export default Body;
