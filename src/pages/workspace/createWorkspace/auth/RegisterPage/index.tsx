import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import * as Yup from 'yup';
import { useRegisterService } from '../../../../../features/auth/authService';
import { setAuthData } from '../../../../../features/auth/authSlice';
import InviteDetails from './components/InviteDetails';
import Form from '../../../../../components/Form';
import Wrapper from '..';
import Help from '../Help';
import { formikConfig } from '../../../../../components/Comments/components/componentType';
import GoogleLogin from '../../GoogleLogin';
import { useAppDispatch } from '../../../../../app/hooks';
// import { useAcceptTeamMemberInvite } from '../../../../../features/settings/teamMemberInvites/teamMemberInviteService';

function RegisterPage() {
  const dispatch = useAppDispatch();
  const { inviteCode } = useParams();
  // const [acceptInviteTrigger, setAcceptInviteTrigger] = useState<boolean>(false);

  const { mutate: onRegister, data } = useRegisterService();
  // useAcceptTeamMemberInvite(acceptInviteTrigger);

  useEffect(() => {
    if (data) {
      const { user } = data.data;
      const { default_workspace_id, name } = user;
      const userData = { name, default_workspace_id };
      const { accessToken, token } = data.data.token;
      const { user_id } = token;

      localStorage.setItem('user', JSON.stringify(userData));
      localStorage.setItem('accessToken', JSON.stringify(accessToken));
      localStorage.setItem('currentWorkspaceId', JSON.stringify(default_workspace_id));
      localStorage.setItem('currentUserId', JSON.stringify(user_id));
      dispatch(
        setAuthData({
          user,
          accessToken,
          currentWorkspaceId: default_workspace_id,
          currentUserId: user_id
        })
      );

      const workspaceInvite = JSON.parse(localStorage.getItem('teamMemberInviteCode') || '""') as string;

      if (workspaceInvite) {
        window.location.href = `/accept-invite/${workspaceInvite}`;
        // setAcceptInviteTrigger(true);
        // // localStorage.removeItem('teamMemberInviteCode');
      }
    }
  }, [data]);

  const onSubmit = (values: { name?: string; email: string; password: string }) => {
    onRegister({
      name: values.name || '',
      email: values.email,
      password: values.password,
      inviteCode
    });
  };

  const formikConfig: formikConfig = {
    initValues: {
      name: '',
      email: '',
      password: ''
    },
    validationSchema: Yup.object({
      name: Yup.string()
        .min(3, 'Must be 3 characters or more')
        .max(20, 'Must be 20 characters or less')
        .required('Required'),
      email: Yup.string().email('Invalid email address').required('Required'),
      password: Yup.string().min(8, 'Password must be 8 characters or longer!').required('Required')
    }),
    buttonTitle: 'Sign Up'
  };

  const [firstCheckbox, setFirstCheckbox] = useState(false);
  const [secondCheckbox, setSecondCheckbox] = useState(false);

  const checkboxConfig = [
    {
      id: 'First',
      label: 'By checking this box, you agree to receive emails for marketing from Also Workspace',
      value: firstCheckbox,
      onChange: () => setFirstCheckbox(!firstCheckbox)
    },
    {
      id: 'Second',
      label:
        'By checking this box, you agree to our Terms of Service and Privacy Policy, and consent to data transfer, hosting, and processing outside of the UK.',
      value: secondCheckbox,
      onChange: () => setSecondCheckbox(!secondCheckbox)
    }
  ];

  return (
    <Wrapper>
      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md relative">
        <div className="bg-white py-8 px-4 shadow-lg sm:rounded-lg sm:px-10 flex flex-col gap-7">
          <h2 className="text-center text-2xl font-bold">Let&apos;s go!</h2>

          <InviteDetails />

          <Form onSubmit={(values) => onSubmit(values)} formikConfig={formikConfig} checkboxConfig={checkboxConfig} />

          <GoogleLogin title="Or sign up with Google" />
        </div>
        <Help />
      </div>
    </Wrapper>
  );
}

export default RegisterPage;
