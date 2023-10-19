import { Menu } from '@headlessui/react';
import Button from '../../../../../../../components/Buttons/Button';
import { useAppDispatch, useAppSelector } from '../../../../../../../app/hooks';
import { setShowGraphs } from '../../../../../../../features/insights/insightsSlice';

export default function ListGraphs({ graphsTitle }: { graphsTitle: string }) {
  const dispatch = useAppDispatch();

  const { isShowGraphs } = useAppSelector((state) => state.insights);

  return (
    <div className="flex items-center justify-start space-x-1 ">
      <span className="group cursor-pointer gap-2">
        <Menu>
          <div className="flex items-center justify-center viewSettingsParent">
            <Menu.Button>
              <Button active={isShowGraphs} onClick={() => dispatch(setShowGraphs(!isShowGraphs))}>
                <span className="whitespace-nowrap">{graphsTitle}</span>
              </Button>
            </Menu.Button>
          </div>
        </Menu>
      </span>
    </div>
  );
}
