import React from 'react';
import moment, { MomentInput } from 'moment';
import { useAppSelector } from '../../app/hooks';
import CalenderIcon from '../../assets/icons/CalenderIcon';

interface dateFormatProps {
  date: string | undefined;
  font?: string;
}

export default function DateFormat({ date, font = 'text-sm' }: dateFormatProps) {
  const { date_format } = useAppSelector((state) => state.userSetting);
  return (
    <>
      <span className={`text-sm font-medium text-gray-400 ${font}`} style={{ fontSize: font }}>
        {date ? moment(date as MomentInput).format(date_format?.toUpperCase()) : <CalenderIcon />}
      </span>
    </>
  );
}
