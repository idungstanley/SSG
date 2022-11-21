import React from 'react';
import { Outlet } from 'react-router-dom';
// import { useDispatch } from 'react-redux';
// import { useMutation } from '@tanstack/react-query';
import Sidebar from './sidebar/Sidebar';
// import { getWorkspaceService } from '../../features/workspace/workspaceService';

function Index() {
  // const getWsMutation = useMutation(getWorkspaceService, {
  //   onSuccess: async (successData) => {
  //     const myWs = successData.data.workspace;
  //     if (myWs) {
  //       console.log(myWs);
  //     }
  //   },
  // });

  // const getWs = () => {
  //   getWsMutation.mutate();
  // };
  // const navigate = useNavigate();
  // useEffect(() => {
  //   if (localStorage.getItem('currentWorkspaceId') == null) {
  //     navigate('/onboarding');
  //   }
  //   getWs();
  // }, []);
  return (
    <main className="flex w-full overflow-y-scroll">
      <section className="w-2/12">
        <Sidebar />
      </section>
      <section className="w-10/12">
        <Outlet />
      </section>
    </main>
  );
}

export default Index;
