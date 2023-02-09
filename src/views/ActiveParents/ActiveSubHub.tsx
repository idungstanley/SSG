import React from 'react';
import { useGetSubHub } from '../../features/hubs/hubService';
import { useAppSelector } from '../../app/hooks';
import { useDispatch } from 'react-redux';
import {
  setHubParentId,
} from '../../features/hubs/hubSlice';

export default function ActiveSubHub() {
  const dispatch = useDispatch();
  const { currentItemId } = useAppSelector((state) => state.workspace);
  const { data, status } = useGetSubHub({
    parentId: currentItemId,
  });
  if (status === 'success') {
    data?.data?.hubs.map(({ parent_id }) =>
      dispatch(setHubParentId(parent_id))
    );
  }
  const { hubParentId, currSubHubId } =
    useAppSelector((state) => state.hub);

  return currentItemId === hubParentId ? (
    <div id="subhub">
      {data?.data?.hubs.length !== 0 &&
        data?.data?.hubs.map((subhub) => (
          <div key={subhub.id}>
            {currSubHubId === subhub.id && (
              <section className="flex items-center justify-between pl-3 pr-1.5 py-1.5 text-sm hover:bg-gray-100 h-8 group">
                <div
                  id="subhubleft"
                  className="flex items-center justify-center"
                >
                  <div className="flex items-center flex-1 min-w-0">
                      <h4
                        className="tracking-wider capitalize truncate"
                        style={{ fontSize: '10px' }}
                      >
                        {subhub.name}
                      </h4>
                  </div>
                </div>
              </section>
            )}
          </div>
        ))}
    </div>
  ) : null;
}
