import React, { useState, useEffect } from 'react';
import { useAppSelector } from '../../../../../app/hooks';
import { AvatarWithInitials } from '../../../../../components';
import { getInitials } from '../../../../../app/helpers';
import { findCurrentHub } from '../../../../../managers/Hub';
import { Hub } from '../../../../../pages/workspace/hubs/components/ActiveTree/activetree.interfaces';

export default function ActiveSubHub() {
  const { hub } = useAppSelector((state) => state.hub);
  const { activeItemId } = useAppSelector((state) => state.workspace);

  const [subhub, setSubhub] = useState<Hub>();

  useEffect(() => {
    if (activeItemId) {
      setSubhub(findCurrentHub(activeItemId as string, hub));
    }
  }, [activeItemId]);

  return subhub ? (
    <div id="subhub">
      <div className="relative flex items-center justify-between pl-2" style={{ height: '30px' }}>
        <span className="absolute top-0 bottom-0 left-0 w-0.5 rounded-r-lg" style={{ backgroundColor: '#BF00FF' }} />
        <div role="button" className="flex items-center py-1.5 mt-0.5 justify-start overflow-y-hidden text-sm">
          <div className="flex items-center flex-1 min-w-0">
            <div className="flex items-center justify-center">
              <AvatarWithInitials
                initials={getInitials(subhub.name)}
                height="h-4"
                width="w-4"
                backgroundColour={subhub.color !== null ? subhub.color : 'blue'}
                roundedStyle="rounded"
              />
            </div>
            <span className="ml-4 overflow-hidden">
              <a
                className="capitalize truncate cursor-pointer"
                style={{
                  fontSize: '13px',
                  lineHeight: '15.56px',
                  verticalAlign: 'baseline',
                  letterSpacing: '0.28px'
                }}
              >
                {subhub.name}
              </a>
            </span>
          </div>
        </div>
      </div>
    </div>
  ) : null;
}
