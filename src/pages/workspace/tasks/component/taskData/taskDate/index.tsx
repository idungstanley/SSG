import React from 'react';
import moment, { MomentInput } from 'moment';
import { renderDataProps } from '../DataRenderFunc';

export default function DateForTask({ taskColField }: renderDataProps) {
  return (
    <>
      <span className="text-sm font-medium text-gray-400">{moment(taskColField as MomentInput).format('MM/DD')}</span>
    </>
  );
}
