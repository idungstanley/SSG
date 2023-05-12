import React, { useEffect, useState } from 'react';
import { AvatarWithInitials } from '../../../components';
import notificationFrame from '../../../assets/branding/notificationFrame.png';
import { getAllWorkSpaceService } from '../../../features/workspace/workspaceService';
import { useAppDispatch } from '../../../app/hooks';
import { setFetchAllWorkspace } from '../../../features/workspace/workspaceSlice';
import { Spinner } from '../../../common';
import { cl } from '../../../utils';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { switchWorkspaceService } from '../../../features/account/accountService';
import { setCurrentWorkspace, switchWorkspace } from '../../../features/auth/authSlice';
import { setMyWorkspacesSlideOverVisibility } from '../../../features/general/slideOver/slideOverSlice';
// import { useNavigate } from 'react-router-dom';
import { getWorkspaceService } from '../../../features/workspace/workspaceService';

function WorkspaceSettings() {
  const queryClient = useQueryClient();
  // const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const [selectedWorkSpace, setSelectedWorkspace] = useState<string | undefined>('');
  const { data: workSpaceData } = getWorkspaceService();
  const { data: AllMyWorkSpace, status } = getAllWorkSpaceService();
  useEffect(() => {
    dispatch(setFetchAllWorkspace(true));
  }, []);

  const switchWorkspaceMutation = useMutation(switchWorkspaceService, {
    onSuccess: (data) => {
      // Clear react-query and redux cache
      localStorage.setItem('currentWorkspaceId', JSON.stringify(data.data.workspace.id));

      dispatch(
        setCurrentWorkspace({
          workspaceId: data.data.workspace.id
        })
      );

      dispatch(setMyWorkspacesSlideOverVisibility(false));
      // navigate('/');

      queryClient.invalidateQueries();
      dispatch(switchWorkspace());
    }
  });
  const onSwitchWorkspace = () => {
    switchWorkspaceMutation.mutate({
      workspaceId: selectedWorkSpace as string
    });
    queryClient.invalidateQueries(['workspace']);
  };
  return (
    <main className="flex-1 h-full pb-10 px-4 sm:px-6 lg:px-6 bg-white w-full overflow-y-scroll">
      <div className="border shadow-xl rounded-md mt-5 pb-8  ">
        <div
          className="  flex items-center rounded-t-md pl-5 "
          style={{ backgroundImage: `url(${notificationFrame})`, height: '122px' }}
        ></div>
        <section className="-mt-12 w-11/12 m-auto flex justify-between items-end">
          <div className="flex items-end">
            <AvatarWithInitials
              initials={'NS'}
              backgroundColour={workSpaceData?.data.workspace.color}
              height="h-24"
              width="w-24"
              textSize="51.6286px"
            />
            <h3 className="font-medium text-black" style={{ fontSize: '15px' }}>
              {workSpaceData?.data.workspace.name?.toUpperCase()}
            </h3>
          </div>
          <div>
            <button
              className="p-1 rounded text-sm border border-gray-500 mx-2 w-16 h-8"
              onClick={() => setSelectedWorkspace('')}
            >
              Cancel
            </button>
            {selectedWorkSpace?.length ? (
              <button
                className="p-1 rounded text-sm border border-gray-500 mx-2 text-white w-16 h-8"
                style={{ backgroundColor: '#BF00FF' }}
                onClick={onSwitchWorkspace}
              >
                Save
              </button>
            ) : (
              ''
            )}
          </div>
        </section>
        {status === 'loading' && (
          <div className="w-full h-full flex items-center justify-center">
            <Spinner size={50} color="#0F70B7" />
          </div>
        )}
        {AllMyWorkSpace?.data.workspaces && (
          <div className="flex justify-center">
            <table className="rlative table-auto border-collapse border border-slate-400 mt-10 w-10/12  rounded">
              <thead className="bg-gray-200 py-3 h-16 position-sticky ">
                <tr className="border border-slate-300 py-3">
                  <th className="font-medium text-black text-center py-3" style={{ fontSize: '15px' }}>
                    WORKSPACE
                  </th>
                  <th className="font-medium text-black text-center py-3" style={{ fontSize: '15px' }}>
                    AVATAR
                  </th>
                  <th className="font-medium text-black text-center py-3" style={{ fontSize: '15px' }}>
                    LAST TIME VISITED
                  </th>
                  <th className="font-medium text-black text-center py-3" style={{ fontSize: '15px' }}>
                    DATE CREATED
                  </th>
                </tr>
              </thead>

              <tbody>
                {AllMyWorkSpace?.data.workspaces.map((workspace) => {
                  if (workSpaceData?.data.workspace.id !== workspace.id) {
                    return (
                      <tr
                        key={workspace.id}
                        className={cl(
                          'border border-slate-300 hover:bg-fuchsia-200 cursor-pointer',
                          selectedWorkSpace === workspace.id ? 'bg-fuchsia-200' : ''
                        )}
                        onClick={() => setSelectedWorkspace(workspace.id)}
                      >
                        <td className="text-center py-3">{workspace.name.toUpperCase()}</td>
                        <td className="text-center py-2">
                          <AvatarWithInitials
                            initials={workspace.initials}
                            backgroundColour={
                              workspace.color === '0' || workspace.color === '1' ? '#D879F9' : workspace.color
                            }
                            height="h-10"
                            width="w-10"
                          />
                        </td>
                        <td className="text-center py-3">{workspace.last_activity_at}</td>
                        <td className="text-center py-3">{new Date(workspace.created_at).toLocaleDateString()}</td>
                      </tr>
                    );
                  }
                })}
              </tbody>
            </table>
          </div>
        )}

        <br />
      </div>
    </main>
  );
}
export default WorkspaceSettings;
