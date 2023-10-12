import React, { useState } from 'react';
import '../../../../../styles/usersetting.css';
import { useAppDispatch, useAppSelector } from '../../../../../app/hooks';
import { setPreferenceState } from '../../../../../features/task/taskSlice';

function Preferences() {
  const { preferenceState } = useAppSelector((state) => state.task);

  const dispatch = useAppDispatch();

  const handleCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = event.target;
    const updatePreferenceState = {
      ...preferenceState,
      [name]: checked
    };

    dispatch(setPreferenceState(updatePreferenceState));
  };

  return (
    <div className="my-4">
      <h1 className="font-bold my-2" style={{ fontSize: '15px' }}>
        Preferences
      </h1>
      <section className="flex items-center border-b-2 border-slate-400">
        <label className="switch">
          <input
            type="checkbox"
            name="flyoutToast"
            checked={preferenceState.flyoutToast}
            onChange={handleCheckboxChange}
          />
          <span className="slider round"></span>
        </label>
        <div className="mx-6">
          <h1 className="my-2 font-bold" style={{ fontSize: '15px' }}>
            Flyout Toast Message{' '}
          </h1>
          <p className="mb-5" style={{ fontSize: '15px' }}>
            When performing actions, toast messages may appear in the bottom left-hand of your screen. You can disable
            that here.
          </p>
        </div>
      </section>
      <section className="flex items-center border-b-2 border-slate-400">
        <label className="switch">
          <input
            type="checkbox"
            name="dontPostWithEnter"
            checked={preferenceState.dontPostWithEnter}
            onChange={handleCheckboxChange}
          />
          <span className="slider round"></span>
        </label>
        <div className="mx-6">
          <h1 className="my-2 font-bold" style={{ fontSize: '15px' }}>
            Don&apos;t post comments with &apos;Enter&apos;{' '}
          </h1>
          <p className="mb-5" style={{ fontSize: '15px' }}>
            When performing actions, toast messages may appear in the bottom left-hand of your screen. You can disable
            that here.
          </p>
        </div>
      </section>
      <section className="flex items-center border-b-2 border-slate-400">
        <label className="switch">
          <input type="checkbox" name="markdown" checked={preferenceState.markdown} onChange={handleCheckboxChange} />
          <span className="slider round"></span>
        </label>
        <div className="mx-6">
          <h1 className="my-2 font-bold" style={{ fontSize: '15px' }}>
            Markdown
          </h1>
          <p className="mb-5" style={{ fontSize: '15px' }}>
            You can disable Markdown (shortcuts when typing) by turning it off here.
          </p>
        </div>
      </section>
      <section className="flex items-center border-b-2 border-slate-400">
        <label className="switch">
          <input type="checkbox" name="hotkeys" checked={preferenceState.hotkeys} onChange={handleCheckboxChange} />
          <span className="slider round"></span>
        </label>
        <div className="mx-6">
          <h1 className="my-2 font-bold" style={{ fontSize: '15px' }}>
            Hotkeys
          </h1>
          <p className="mb-5" style={{ fontSize: '15px' }}>
            Use hotkeys to quickly navigate through ClickUp without using your mouse.
          </p>
        </div>
      </section>
      <section className="flex items-center border-b-2 border-slate-400">
        <label className="switch">
          <input type="checkbox" name="notepad" checked={preferenceState.notepad} onChange={handleCheckboxChange} />
          <span className="slider round"></span>
        </label>
        <div className="mx-6">
          <h1 className="my-2 font-bold" style={{ fontSize: '15px' }}>
            Notepad
          </h1>
          <p className="mb-5" style={{ fontSize: '15px' }}>
            Turn this off to hide the notepad in the bottom right corner of your screen.
          </p>
        </div>
      </section>
    </div>
  );
}

export default Preferences;
