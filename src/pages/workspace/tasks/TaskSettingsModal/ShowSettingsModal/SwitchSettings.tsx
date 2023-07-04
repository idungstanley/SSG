import React from 'react';
import { useAppDispatch, useAppSelector } from '../../../../../app/hooks';
import {
  getCompactView,
  getSingleLineView,
  getTaskUpperCase,
  getVerticalGridlinesTask
} from '../../../../../features/task/taskSlice';

export default function SwitchSettings(viewMode: string) {
  const dispatch = useAppDispatch();
  const { singleLineView, CompactView, taskUpperCase, verticalGridlinesTask } = useAppSelector((state) => state.task);

  if (viewMode == 'Single Line mode') {
    dispatch(getSingleLineView(!singleLineView));
  } else if (viewMode == 'Compact mode') {
    dispatch(getCompactView(!CompactView));
  } else if (viewMode == 'Upper Case') {
    dispatch(getTaskUpperCase(!taskUpperCase));
  } else if (viewMode == 'Vertical GridLines Task') {
    dispatch(getVerticalGridlinesTask(!verticalGridlinesTask));
  }
}
