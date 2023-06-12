import React from 'react';
import moment, { MomentInput } from 'moment';
import { renderDataProps } from '../DataRenderFunc';
import { useAppSelector } from '../../../../../../app/hooks';

export default function DateForTask({ taskColField }: renderDataProps) {
  const { date_format } = useAppSelector((state) => state.userSetting);
  return (
    <>
      <span className="text-sm font-medium text-gray-400">
        {moment(taskColField as MomentInput).format(date_format?.toUpperCase())}
      </span>
    </>
  );
}
