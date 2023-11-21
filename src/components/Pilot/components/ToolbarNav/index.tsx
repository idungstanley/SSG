import { useAppSelector } from '../../../../app/hooks';
import ArrowRightPilot from '../../../../assets/icons/ArrowRightPilot';
import { useNavigate } from 'react-router-dom';

interface ToolbarNavInterface {
  name: string;
  url: string | null;
}

export default function ToolbarNav() {
  const navigate = useNavigate();
  const { currentWorkspaceId } = useAppSelector((state) => state.auth);
  const { activeItemName, activeItemType } = useAppSelector((state) => state.workspace);
  const toolbarNavItems: ToolbarNavInterface[] = [];

  const activeItems = document.querySelectorAll('.nav-item-parent .nav-item');

  for (let i = 0; i < activeItems.length; i++) {
    const element = activeItems[i] as HTMLElement;
    toolbarNavItems.push({
      name: element.getAttribute('data-name'),
      url: element.getAttribute('data-url')
    } as ToolbarNavInterface);
    if (activeItemName === element.getAttribute('data-name')) {
      i = activeItems.length;
    }
  }

  if (activeItemType == 'task') {
    toolbarNavItems.push({
      name: activeItemName,
      url: null
    } as ToolbarNavInterface);
  }

  const lastItem = toolbarNavItems[toolbarNavItems.length - 1];
  const lastItem2 = toolbarNavItems[toolbarNavItems.length - 2];

  const handleLocation = (url: string | null) => {
    if (!url) {
      return false;
    }
    navigate(`/${currentWorkspaceId}/${url}`, {
      replace: true
    });
  };

  return (
    <>
      {toolbarNavItems.map((item) => (
        <div
          key={item.name}
          className={`flex text-xs font-semibold capitalize truncate items-center text-alsoit-gray-300 ${
            lastItem != item ? 'hover:text-alsoit-gray-100 transition duration-300' : ''
          }`}
        >
          <p
            className={`${lastItem != item ? 'cursor-pointer' : ''}`}
            style={{ fontSize: '13px' }}
            onClick={() => handleLocation(item.url)}
          >
            {item.name}
          </p>
          {lastItem !== item && (
            <span className={`${lastItem2 != item ? 'cursor-pointer' : ''}`} style={{ padding: '0 10px 0 5px' }}>
              <ArrowRightPilot status={lastItem2 == item ? 'last' : ''} />
            </span>
          )}
        </div>
      ))}
    </>
  );
}
