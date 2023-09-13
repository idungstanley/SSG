import { useEffect } from 'react';
import { cl } from '../../../../../utils';
import ToastClose from '../../../../../assets/icons/ToastClose';
import toast from 'react-hot-toast';
import { useAppDispatch, useAppSelector } from '../../../../../app/hooks';
import {
  setAutoSave,
  setSaveSettingLocal,
  setSaveSettingOnline,
  setTriggerSaveSettings,
  setTriggerSaveSettingsModal
} from '../../../../../features/task/taskSlice';
import { BiCommand } from 'react-icons/bi';
import { IoReturnDownBack } from 'react-icons/io5';

interface ToastProps {
  title: string;
  showClose?: boolean;
  toastId?: string;
}
function SaveSettingsModal({ title, showClose = true, toastId }: ToastProps) {
  const dispatch = useAppDispatch();
  const { triggerSaveSettingsModal, autoSave, saveSettingLocal, saveSettingOnline } = useAppSelector(
    (state) => state.task
  );

  const handleSaveViewSettings = () => {
    dispatch(setTriggerSaveSettings(true));
  };
  const handleAutoSaveViewSettings = () => {
    dispatch(setSaveSettingLocal({ ...saveSettingLocal, autoSave: true }));
    dispatch(setSaveSettingOnline({ ...saveSettingOnline, autoSave: true }));
    dispatch(setAutoSave(true));
  };

  useEffect(() => {
    if (saveSettingLocal?.autoSave == true) dispatch(setTriggerSaveSettings(true));
  }, [saveSettingLocal]);

  useEffect(() => {
    if (!triggerSaveSettingsModal) toast.remove(toastId);
  }, [triggerSaveSettingsModal]);

  return (
    <div
      aria-live="assertive"
      className="inset-0 flex items-end pointer-events-none z-50"
      style={{ width: '500px', height: '100px' }}
    >
      <div className="w-full flex flex-col items-center space-y-4">
        <div
          className={cl(
            'w-full shadow-lg pointer-events-auto ring-1 ring-black ring-opacity-5 overflow-hidden bg-white border-l-4 border-l-alsoit-purple-300 pl-5 h-40'
          )}
        >
          <div className="p-2 flex items-center justify-between w-full">
            <div className="flex flex-col justify-center" style={{ width: '100%' }}>
              <div>
                <div className="flex justify-between items-center gap-1">
                  <p className="text-base leading-4 font-black text-alsoit-gray-300 pb-1.5">{title}</p>
                  {showClose && (
                    <div
                      onClick={() => {
                        toast.remove(toastId);
                        dispatch(setTriggerSaveSettingsModal(false));
                      }}
                    >
                      <ToastClose />
                    </div>
                  )}
                </div>
              </div>

              <p className="text-alsoit-text-lg font-normal text-alsoit-gray-300 leading-5">
                To save, press <b> Cmd + Enter </b> or click the <b> Save </b> button. Saving updates the view for
                everyone.
              </p>

              <div className="mt-3">
                <section className="flex justify-between my-1">
                  <div className="flex items-center cursor-pointer gap-0.5" onClick={() => toast.remove(toastId)}>
                    Revert
                  </div>
                  <div
                    className="flex text-alsoit-purple-300 items-center cursor-pointer gap-0.5"
                    onClick={handleAutoSaveViewSettings}
                  >
                    Autosave View
                  </div>
                  <div className="flex items-center cursor-pointer gap-0.5">
                    <button
                      className="w-28 h-7 flex justify-center items-center  bg-alsoit-purple-300 rounded text-white font-semibold"
                      onClick={handleSaveViewSettings}
                    >
                      Save
                      <span className="flex justify-center items-center pl-2">
                        <BiCommand />
                        <IoReturnDownBack />
                      </span>
                    </button>
                  </div>
                </section>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SaveSettingsModal;
