import { useEffect, useState } from 'react';
import SectionArea from '../SectionArea';
import PilotViewIcon from '../../../../assets/icons/PilotViewIcon';
import { useAppDispatch, useAppSelector } from '../../../../app/hooks';
import { useDeleteView } from '../../../../features/workspace/workspaceService';
import TrashIcon from '../../../../assets/icons/TrashIcon';
import { setActiveViewId } from '../../../../features/workspace/workspaceSlice';
import { BsCheck2 } from 'react-icons/bs';
import { useNavigate } from 'react-router-dom';
import { generateUrlWithViewId } from '../../../../app/helpers';

export default function Views() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const { spaceViews } = useAppSelector((state) => state.hub);
  const { activeViewId } = useAppSelector((state) => state.workspace);

  const [removedViewId, setRemovedViewId] = useState<string>('');

  const { mutate: onDelete } = useDeleteView(removedViewId);

  useEffect(() => {
    if (removedViewId) {
      onDelete(removedViewId);
    }
  }, [removedViewId]);

  const handleChooseView = (id: string) => {
    const newUrl = generateUrlWithViewId(id);
    dispatch(setActiveViewId(id));
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
              {activeViewId === view.id ? <BsCheck2 color="rgb(162, 28, 175)" /> : <div style={{ width: '13px' }} />}
              <div className="ml-2" onClick={() => handleChooseView(view.id)}>
                {view.name}
              </div>
            </div>
            {!view.is_required ? (
              <div onClick={() => setRemovedViewId(view.id)}>
                <TrashIcon />
              </div>
            ) : null}
          </div>
        ))}
      </section>
    </>
  );
}
