import { useEffect, useState } from 'react';
import SectionArea from '../SectionArea';
import PilotViewIcon from '../../../../assets/icons/PilotViewIcon';
import { useAppDispatch, useAppSelector } from '../../../../app/hooks';
import { useDeleteView } from '../../../../features/workspace/workspaceService';
import TrashIcon from '../../../../assets/icons/TrashIcon';
import { setActiveView } from '../../../../features/workspace/workspaceSlice';
import { BsCheck2 } from 'react-icons/bs';
import { useNavigate } from 'react-router-dom';
import { generateUrlWithViewId } from '../../../../app/helpers';
import { IView } from '../../../../features/hubs/hubs.interfaces';
import { displayPrompt, setVisibility } from '../../../../features/general/prompt/promptSlice';

export default function Views() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const { spaceViews } = useAppSelector((state) => state.hub);
  const { activeView } = useAppSelector((state) => state.workspace);

  const [removedView, setRemovedView] = useState<IView | null>(null);

  const { mutate: onDelete } = useDeleteView(removedView?.id as string);

  useEffect(() => {
    if (removedView) {
      dispatch(
        displayPrompt(`Delete "${removedView?.name}" view`, 'Would you like delete this view from the workspace?', [
          {
            label: 'Delete view',
            style: 'danger',
            callback: () => {
              onDelete(removedView.id);
              dispatch(setVisibility(false));
            }
          },
          {
            label: 'Cancel',
            style: 'plain',
            callback: () => {
              setRemovedView(null);
              dispatch(setVisibility(false));
            }
          }
        ])
      );
    }
  }, [removedView]);

  const handleChooseView = (view: IView) => {
    const newUrl = generateUrlWithViewId(view.id);
    dispatch(setActiveView(view));
    navigate(newUrl);
  };

  return (
    <>
      <SectionArea label="Views" icon={<PilotViewIcon />} />
      <section className="flex flex-col overflow-y-scroll h-fit mb-11">
        {spaceViews.map((view) => (
          <div
            key={view.id}
            className="flex justify-between p-2 bg-alsoit-gray-50 hover:bg-alsoit-purple-50 cursor-pointer"
          >
            <div className="flex items-center">
              {activeView?.id === view.id ? <BsCheck2 color="rgb(162, 28, 175)" /> : <div style={{ width: '13px' }} />}
              <div className="ml-2" onClick={() => handleChooseView(view)}>
                {view.name}
              </div>
            </div>
            {!view.is_required ? (
              <div onClick={() => setRemovedView(view)}>
                <TrashIcon />
              </div>
            ) : null}
          </div>
        ))}
      </section>
    </>
  );
}
