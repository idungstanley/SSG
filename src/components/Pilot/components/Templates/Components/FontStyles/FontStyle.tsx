import React from 'react';
import RoundedCheckbox from '../../../../../Checkbox/RoundedCheckbox';
import { useAppDispatch, useAppSelector } from '../../../../../../app/hooks';
import { setNewCustomPropertyDetails } from '../../../../../../features/task/taskSlice';

function FontStyle() {
  const dispatch = useAppDispatch();
  const { newCustomPropertyDetails } = useAppSelector((state) => state.task);
  return (
    <div className="mt-4">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <RoundedCheckbox
            onChange={() =>
              dispatch(
                setNewCustomPropertyDetails({
                  ...newCustomPropertyDetails,
                  style: {
                    is_bold: '0',
                    is_italic: '0',
                    is_underlined: '0'
                  }
                })
              )
            }
            isChecked={
              newCustomPropertyDetails.style?.is_bold === '0' &&
              newCustomPropertyDetails.style?.is_italic === '0' &&
              newCustomPropertyDetails.style?.is_underlined === '0'
            }
            styles="w-4 h-4 rounded-full  cursor-pointer focus:outline-1 focus:ring-transparent  focus:border-2 focus:opacity-100 group-hover:opacity-100 text-alsoit-purple-300"
          />
          <p className="text-alsoit-text-lg font-semibold">Regular</p>
        </div>
        <span className="rounded bg-gray-200 flex justify-center" style={{ width: '70px', height: '20px' }}>
          <button className="text-alsoit-gray-100 text-alsoit-text-lg font-medium">Alsoit.io</button>
        </span>
      </div>
      <div className="flex items-center justify-between my-4">
        <div className="flex items-center gap-2">
          <RoundedCheckbox
            onChange={() =>
              dispatch(
                setNewCustomPropertyDetails({
                  ...newCustomPropertyDetails,
                  style: {
                    ...newCustomPropertyDetails.style,
                    is_bold: newCustomPropertyDetails.style?.is_bold === '0' ? '1' : '0'
                  }
                })
              )
            }
            isChecked={newCustomPropertyDetails.style?.is_bold === '1'}
            styles="w-4 h-4 rounded-full  cursor-pointer focus:outline-1 focus:ring-transparent  focus:border-2 focus:opacity-100 group-hover:opacity-100 text-alsoit-purple-300"
          />
          <p className="text-alsoit-text-lg font-semibold">Bold</p>
        </div>
        <span className="rounded bg-gray-200 flex justify-center" style={{ width: '70px', height: '20px' }}>
          <button className="text-alsoit-gray-100 text-alsoit-text-lg font-semibold">Alsoit.io</button>
        </span>
      </div>
      <div className="flex items-center justify-between my-4">
        <div className="flex items-center gap-2">
          <RoundedCheckbox
            onChange={() =>
              dispatch(
                setNewCustomPropertyDetails({
                  ...newCustomPropertyDetails,
                  style: {
                    ...newCustomPropertyDetails.style,
                    is_italic: newCustomPropertyDetails.style?.is_italic === '0' ? '1' : '0'
                  }
                })
              )
            }
            isChecked={newCustomPropertyDetails.style?.is_italic === '1'}
            styles="w-4 h-4 rounded-full  cursor-pointer focus:outline-1 focus:ring-transparent  focus:border-2 focus:opacity-100 group-hover:opacity-100 text-alsoit-purple-300"
          />
          <p className="text-alsoit-text-lg font-semibold">Italics</p>
        </div>
        <span className="rounded bg-gray-200 flex justify-center" style={{ width: '70px', height: '20px' }}>
          <button className="text-alsoit-gray-100 text-alsoit-text-lg italic">Alsoit.io</button>
        </span>
      </div>
      <div className="flex items-center justify-between my-4">
        <div className="flex items-center gap-2">
          <RoundedCheckbox
            onChange={() => null}
            isChecked={false}
            styles="w-4 h-4 rounded-full  cursor-pointer focus:outline-1 focus:ring-transparent  focus:border-2 focus:opacity-100 group-hover:opacity-100 text-alsoit-purple-300"
          />
          <p className="text-alsoit-text-lg font-semibold">Strike Through</p>
        </div>
        <span className="rounded bg-gray-200 flex justify-center" style={{ width: '70px', height: '20px' }}>
          <button className="text-alsoit-gray-100 text-alsoit-text-lg line-through">Alsoit.io</button>
        </span>
      </div>
      <div className="flex items-center justify-between my-4">
        <div className="flex items-center gap-2">
          <RoundedCheckbox
            onChange={() =>
              dispatch(
                setNewCustomPropertyDetails({
                  ...newCustomPropertyDetails,
                  style: {
                    ...newCustomPropertyDetails.style,
                    is_underlined: newCustomPropertyDetails.style?.is_underlined === '0' ? '1' : '0'
                  }
                })
              )
            }
            isChecked={newCustomPropertyDetails.style?.is_underlined === '1'}
            styles="w-4 h-4 rounded-full  cursor-pointer focus:outline-1 focus:ring-transparent  focus:border-2 focus:opacity-100 group-hover:opacity-100 text-alsoit-purple-300"
          />
          <p className="text-alsoit-text-lg font-semibold">Underline</p>
        </div>
        <span className="rounded bg-gray-200 flex justify-center" style={{ width: '70px', height: '20px' }}>
          <button className="text-alsoit-gray-100 text-alsoit-text-lg underline underline-offset-2">Alsoit.io</button>
        </span>
      </div>
    </div>
  );
}

export default FontStyle;
