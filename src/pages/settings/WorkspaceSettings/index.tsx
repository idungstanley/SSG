import React, { useEffect, useState } from 'react';
import { AvatarWithInitials } from '../../../components';
import notificationFrame from '../../../assets/branding/notificationFrame.png';
import { getAllWorkSpaceService } from '../../../features/workspace/workspaceService';
import { useAppDispatch, useAppSelector } from '../../../app/hooks';
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

  const { currentWorkspaceId } = useAppSelector((state) => state.auth);

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
    <main className="flex-1 w-full h-full px-4 pb-10 overflow-y-scroll bg-white sm:px-6 lg:px-6">
      <div className="pb-8 mt-5 border rounded-md shadow-xl ">
        <div
          className="flex items-center pl-5 rounded-t-md"
          style={{ backgroundImage: `url(${notificationFrame})`, height: '122px' }}
        ></div>
        <section className="flex items-end justify-between w-11/12 m-auto -mt-12">
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
              className="w-16 h-8 p-1 mx-2 text-sm border border-gray-500 rounded"
              onClick={() => setSelectedWorkspace('')}
            >
              Cancel
            </button>
            {selectedWorkSpace?.length ? (
              <button
                className="w-16 h-8 p-1 mx-2 text-sm text-white border border-gray-500 rounded"
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
          <div className="flex items-center justify-center w-full h-full">
            <Spinner size={50} color="#0F70B7" />
          </div>
        )}
        {AllMyWorkSpace?.data.workspaces && (
          <div className="flex justify-center">
            <table className="w-10/12 mt-10 border border-collapse rounded table-auto rlative border-slate-400">
              <thead className="h-16 py-3 bg-gray-200 position-sticky ">
                <tr className="py-3 border border-slate-300">
                  <th className="py-3 font-medium text-center text-black" style={{ fontSize: '15px' }}>
                    WORKSPACE
                  </th>
                  <th className="py-3 font-medium text-center text-black" style={{ fontSize: '15px' }}>
                    AVATAR
                  </th>
                  <th className="py-3 font-medium text-center text-black" style={{ fontSize: '15px' }}>
                    LAST TIME VISITED
                  </th>
                  <th className="py-3 font-medium text-center text-black" style={{ fontSize: '15px' }}>
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
                        <td className="py-3 text-center">{workspace.name.toUpperCase()}</td>
                        <td className="py-2 text-center">
                          <AvatarWithInitials
                            initials={workspace.initials}
                            backgroundColour={
                              workspace.color === '0' || workspace.color === '1' ? '#D879F9' : workspace.color
                            }
                            height="h-10"
                            width="w-10"
                          />
                        </td>
                        <td className="py-3 text-center">{workspace.last_activity_at}</td>
                        <td className="py-3 text-center">
                          {new Date(workspace.created_at as string).toLocaleDateString()}
                        </td>
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
