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
import { useNavigate } from 'react-router-dom';

function WorkspaceSettings() {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const [selectedWorkSpace, setSelectedWorkspace] = useState<string | undefined>('');
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
      navigate('/');

      queryClient.invalidateQueries();
      dispatch(switchWorkspace());
    }
  });
  const onSwitchWorkspace = () => {
    switchWorkspaceMutation.mutate({
      workspaceId: selectedWorkSpace as string
    });
    queryClient.invalidateQueries();
  };
  return (
    <main className="flex-1 h-full overflow-y-scroll pb-10 px-4 sm:px-6 lg:px-6 bg-white w-full">
      <div
        className="mt-5 flex items-center rounded-t-md pl-5"
        style={{ backgroundImage: `url(${notificationFrame})`, height: '122px' }}
      ></div>
      <section className="-mt-12 w-11/12 m-auto flex justify-between items-end">
        <div className="flex items-end">
          <AvatarWithInitials initials={'NS'} backgroundColour={'red'} height="h-24" width="w-24" />
          <h3 className="font-medium" style={{ fontSize: '15px' }}>
            ELASTIC WORKSPACE
          </h3>
        </div>
        <div>
          <button
            className="p-1 rounded text-sm border border-gray-500 mx-2 w-16 h-8"
            onClick={() => setSelectedWorkspace('')}
          >
            Cancel
          </button>
          <button
            className="p-1 rounded text-sm border border-gray-500 mx-2 text-white w-16 h-8"
            style={{ backgroundColor: '#BF00FF' }}
            onClick={onSwitchWorkspace}
          >
            Save
          </button>
        </div>
      </section>
      {status === 'loading' && (
        <div className="w-full h-full flex items-center justify-center">
          <Spinner size={50} color="#0F70B7" />
        </div>
      )}
      {AllMyWorkSpace?.data.workspaces && (
        <table className="table-auto border-collapse border border-slate-400 mt-10 w-10/12 m-auto rounded">
          <thead className="bg-gray-200 py-3 h-16">
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
                  <td className="text-center py-3">10/12/2023</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      )}

      <br />
    </main>
  );
}
export default WorkspaceSettings;
