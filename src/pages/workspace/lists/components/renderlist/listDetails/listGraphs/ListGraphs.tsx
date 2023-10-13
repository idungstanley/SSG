import { useState } from 'react';
import { Menu } from '@headlessui/react';
import Button from '../../../../../../../components/Buttons/Button';

export default function ListGraphs({ graphsTitle }: { graphsTitle: string }) {
  const [showGraphs, setShowGraphs] = useState<boolean>(false);

  return (
    <div className="flex items-center justify-start space-x-1 ">
      <span className="group cursor-pointer gap-2">
        <Menu>
          <div className="flex items-center justify-center viewSettingsParent">
            <Menu.Button>
              <Button active={showGraphs} onClick={() => setShowGraphs(!showGraphs)}>
                <span className="whitespace-nowrap">{graphsTitle}</span>
              </Button>
            </Menu.Button>
          </div>
        </Menu>
      </span>
    </div>
  );
}
