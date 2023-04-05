import React from 'react';
import '../../../../styles/usersetting.css';

function Preferences() {
  return (
    <div className="my-4">
      <h1 className="text-xl font-bold my-4">Preferences</h1>
      <section className="flex items-center border-b-2 border-slate-400">
        <label className="switch">
          <input type="checkbox" />
          <span className="slider round"></span>
        </label>
        <div className="mx-6">
          <h1 className="my-2 text-base font-bold">Flyout Toast Message </h1>
          <p className="mb-5">
            When performing actions, toast messages may appear in the bottom left-hand of your screen. You can disable
            that here.
          </p>
        </div>
      </section>
      <section className="flex items-center border-b-2 border-slate-400">
        <label className="switch">
          <input type="checkbox" />
          <span className="slider round"></span>
        </label>
        <div className="mx-6">
          <h1 className="my-2 text-base font-bold">Don&apos;t post comments with &apos;Enter&apos; </h1>
          <p className="mb-5">
            When performing actions, toast messages may appear in the bottom left-hand of your screen. You can disable
            that here.
          </p>
        </div>
      </section>
      <section className="flex items-center border-b-2 border-slate-400">
        <label className="switch">
          <input type="checkbox" />
          <span className="slider round"></span>
        </label>
        <div className="mx-6">
          <h1 className="my-2 text-base font-bold">Markdown </h1>
          <p className="mb-5">You can disable Markdown (shortcuts when typing) by turning it off here.</p>
        </div>
      </section>
      <section className="flex items-center border-b-2 border-slate-400">
        <label className="switch">
          <input type="checkbox" />
          <span className="slider round"></span>
        </label>
        <div className="mx-6">
          <h1 className="my-2 text-base font-bold">Hotkeys </h1>
          <p className="mb-5">Use hotkeys to quickly navigate through ClickUp without using your mouse.</p>
        </div>
      </section>
      <section className="flex items-center border-b-2 border-slate-400">
        <label className="switch">
          <input type="checkbox" />
          <span className="slider round"></span>
        </label>
        <div className="mx-6">
          <h1 className="my-2 text-base font-bold">Notepad </h1>
          <p className="mb-5">Turn this off to hide the notepad in the bottom right corner of your screen.</p>
        </div>
      </section>
    </div>
  );
}

export default Preferences;
