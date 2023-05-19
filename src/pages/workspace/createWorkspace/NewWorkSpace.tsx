import React, { useState } from 'react';
import Working from '../../../assets/icons/Working.svg';
import MainLogo from '../../../assets/icons/mainIcon.svg';
import Apps from '../../../assets/icons/any_app.svg';
import PmTools from '../../../assets/icons/pm-tool.png';
import { InputAvatar } from '../../../components';
import { avatarBg, companySizeBtn } from './colors';
import { GoPrimitiveDot } from 'react-icons/go';
import { cl } from '../../../utils';
import { useSelector } from 'react-redux';
import { useMutation } from '@tanstack/react-query';
import { selectCurrentUser, setCurrentUser, setCurrentWorkspace } from '../../../features/auth/authSlice';
import { createWorkspaceService } from '../../../features/workspace/workspaceService';
import { useAppDispatch } from '../../../app/hooks';
import { IoIosWarning } from 'react-icons/io';

interface currentPageProps {
  name: boolean;
  color: boolean;
  size: boolean;
  email: boolean;
  apps: boolean;
  pm_tools: boolean;
  completed: boolean;
}

function CreateNewWorkspace() {
  const [errorMsg, setErrorMsg] = useState({
    name: false,
    size: false
  });
  const user = useSelector(selectCurrentUser);
  const dispatch = useAppDispatch();
  const createWSMutation = useMutation(createWorkspaceService, {
    onSuccess: (successData) => {
      setCurrentPage({ ...currentPage, email: false, apps: true });
      localStorage.setItem(
        'user',
        JSON.stringify({
          ...user,
          default_workspace_id: successData.data.workspace.id
        })
      );
      localStorage.setItem('currentWorkspaceId', JSON.stringify(successData.data.workspace.id));
      dispatch(setCurrentWorkspace(successData.data.workspace.id));
      // window.location.href = '/';
      if (user) {
        dispatch(
          setCurrentUser({
            ...user,
            default_workspace_id: successData.data.workspace.id
          })
        );
      }
    }
  });

  const [initPage] = useState<currentPageProps>({
    name: false,
    color: false,
    size: false,
    email: false,
    apps: false,
    pm_tools: false,
    completed: false
  });

  const [currentPage, setCurrentPage] = useState<currentPageProps>({
    ...initPage,
    name: true
  });

  const [formState, setFormState] = useState({
    name: '',
    color: '#D765FD',
    companySize: '',
    emails: ''
  });

  const handleSubmit = () => {
    const emails = formState.emails.length ? formState.emails.split(' ') : null;
    createWSMutation.mutate({
      name: formState.name,
      emails,
      companySize: formState.companySize,
      color: formState.color
    });
  };

  const handleGetStarted = () => {
    window.location.href = '/';
  };

  return (
    <div className="w-screen h-screen create-workspace">
      <div className="w-full h-full flex">
        <section className="w-1/2 h-full flex items-center ml-8">
          <div className="w-2/4 text-center">
            <img src={Working} alt="Working" className="w-full" />
            <article>
              <h1 className="text-white text-2xl my-4 font-semibold">
                “Great things in business are never done by one person; they’re done by a team of people.” – Steve Jobs
              </h1>
            </article>
          </div>
        </section>
        <section className="w-1/2 h-full relative">
          <div className="w-full flex justify-end" style={{ height: '20vh' }}>
            <div className="w-24 h-24 m-8">
              <img src={MainLogo} alt="logo" className="w-full h-full" />
            </div>
          </div>
          {currentPage.name && (
            <div className="w-full -ml-32 flex items-center justify-center" style={{ height: '60vh' }}>
              <div>
                <h1 style={{ fontSize: '40px' }}>Name your work space</h1>
                <input
                  type="text"
                  className={cl(
                    'mt-8 rounded text-3xl focus:outline-none',
                    errorMsg.name ? 'border-4 border-solid border-red-600 focus:border-red-600 placeholder-red-500' : ''
                  )}
                  placeholder={errorMsg.name ? 'Name cannot be empty' : ''}
                  style={{ width: '1000px', height: '100px' }}
                  value={formState.name}
                  onChange={(e) => setFormState({ ...formState, name: e.target.value })}
                />
                <h2 className="text-xl text-fuchsia-600">Name of company or organization can be used</h2>
                <div className="flex justify-center my-8">
                  <button
                    className="bg-fuchsia-600 text-white p-2 rounded-lg"
                    style={{ fontSize: '35px' }}
                    onClick={() => {
                      formState.name === ''
                        ? setErrorMsg({ ...errorMsg, name: true })
                        : setCurrentPage({ ...currentPage, name: false, color: true });
                    }}
                  >
                    NEXT
                  </button>
                </div>
              </div>
            </div>
          )}
          {currentPage.color && (
            <div className="w-full -ml-32 flex items-center justify-center" style={{ height: '60vh' }}>
              <div>
                <h1 style={{ fontSize: '40px' }}>Customize your workspace</h1>
                <div className="flex items-center w-full justify-center gap-20 mt-8 mb-20">
                  <section className="flex items-center">
                    <InputAvatar action="Drop an image or browse" upload={null} size={null} />
                    <h1 className="mx-4">Or</h1>
                    <button
                      type="button"
                      className="rounded w-24 h-24 text-white"
                      style={{ backgroundColor: formState.color }}
                    ></button>
                  </section>
                  <div className="grid grid-cols-8 gap-12">
                    {avatarBg.map(({ colour }) => {
                      return (
                        <div key={colour} className="w-12 h-12 flex items-center justify-center">
                          <button
                            type="button"
                            className="rounded w-10 h-10 hover:w-20 hover:h-20 workspace-color-button"
                            style={{ backgroundColor: colour }}
                            onClick={() => setFormState({ ...formState, color: colour })}
                          />
                        </div>
                      );
                    })}
                  </div>
                </div>
                <div className="flex justify-center my-4">
                  <button
                    className="bg-fuchsia-600 text-white p-2 rounded-lg"
                    style={{ fontSize: '35px' }}
                    onClick={() => setCurrentPage({ ...currentPage, color: false, size: true })}
                  >
                    NEXT
                  </button>
                </div>
              </div>
            </div>
          )}
          {currentPage.size && (
            <div className="w-full -ml-32 flex items-center justify-center" style={{ height: '60vh' }}>
              <div>
                <h1 style={{ fontSize: '40px' }}>How many people will you be working with?</h1>
                <div className="flex justify-between my-8">
                  {companySizeBtn.map((size) => {
                    return (
                      <button
                        className={cl(
                          formState.companySize === size.value
                            ? 'bg-fuchsia-600 border-8 text-white'
                            : 'border-gray-400 hover:text-fuchsia-600',
                          'text-xl border p-2 rounded hover:border-fuchsia-600'
                        )}
                        key={size.label}
                        onClick={() => setFormState({ ...formState, companySize: size.value })}
                      >
                        {size.label}
                      </button>
                    );
                  })}
                </div>
                {errorMsg.size && (
                  <div className="flex">
                    <IoIosWarning className="w-6 h-6 text-red-600" />
                    <h2 className="text-xl text-red-600">Please select your company size</h2>
                  </div>
                )}
                <div className="flex justify-center mb-8 mt-16">
                  <button
                    className="bg-fuchsia-600 text-white p-2 rounded-lg"
                    style={{ fontSize: '35px' }}
                    onClick={() => {
                      formState.companySize === ''
                        ? setErrorMsg({ ...errorMsg, size: true })
                        : setCurrentPage({ ...currentPage, size: false, email: true });
                    }}
                  >
                    NEXT
                  </button>
                </div>
              </div>
            </div>
          )}
          {currentPage.email && (
            <div className="w-full -ml-32 flex items-center justify-center" style={{ height: '60vh' }}>
              <div>
                <h1 style={{ fontSize: '40px' }}>Invite people to your workspace</h1>
                <input
                  type="text"
                  className="mt-8 rounded text-3xl"
                  style={{ width: '1000px', height: '100px' }}
                  placeholder="Enter email addresses"
                  onChange={(e) => setFormState({ ...formState, emails: e.target.value })}
                />
                <h2 className="text-xl text-fuchsia-600">Multiple email addresses can be pasted</h2>
                <div className="flex justify-center my-8">
                  <button
                    className="bg-fuchsia-600 text-white p-2 rounded-lg"
                    style={{ fontSize: '35px' }}
                    onClick={handleSubmit}
                  >
                    Done
                  </button>
                </div>
              </div>
            </div>
          )}
          {currentPage.apps && (
            <div className="w-full -ml-32 flex items-center justify-center" style={{ height: '60vh' }}>
              <div>
                <h1 style={{ fontSize: '40px' }}>Do you use any of these apps?</h1>
                <img src={Apps} alt="other applications" />
                <div className="flex justify-center my-8">
                  <button
                    className="bg-fuchsia-600 text-white p-2 rounded-lg"
                    style={{ fontSize: '35px' }}
                    onClick={() => setCurrentPage({ ...currentPage, apps: false, pm_tools: true })}
                  >
                    No, thanks
                  </button>
                </div>
              </div>
            </div>
          )}
          {currentPage.pm_tools && (
            <div className="w-full -ml-32 flex items-center justify-center" style={{ height: '60vh' }}>
              <div>
                <h1 style={{ fontSize: '40px' }}>Do you use any of these project management tools?</h1>
                <img src={PmTools} alt="other applications" />
                <div className="flex justify-center my-8">
                  <button
                    className="bg-fuchsia-600 text-white p-2 rounded-lg"
                    style={{ fontSize: '35px' }}
                    onClick={() => setCurrentPage({ ...currentPage, pm_tools: false, completed: true })}
                  >
                    No, thanks
                  </button>
                </div>
              </div>
            </div>
          )}
          {currentPage.completed && (
            <div className="w-full -ml-32 flex items-center justify-center" style={{ height: '60vh' }}>
              <div>
                <h1 style={{ fontSize: '40px' }}>
                  Your workspace is ready. Have a wonderful experience working with your team members and colleagues.
                </h1>
                <div className="flex justify-center my-8">
                  <button
                    className="bg-fuchsia-600 text-white p-2 rounded-lg"
                    style={{ fontSize: '35px' }}
                    onClick={handleGetStarted}
                  >
                    Get started
                  </button>
                </div>
              </div>
            </div>
          )}
          <section
            className="flex items-center fixed bottom-0 justify-center absolute w-4/5 m-auto"
            style={{ height: '20vh' }}
          >
            <GoPrimitiveDot
              className={cl(
                currentPage.name ? 'bg-fuchsia-600' : 'bg-gray-300',
                'w-8 h-8 cursor-pointer rounded-full text-transparent mx-2'
              )}
              onClick={() => setCurrentPage({ ...initPage, name: true })}
            />
            <GoPrimitiveDot
              className={cl(
                currentPage.color ? 'bg-fuchsia-600' : 'bg-gray-300',
                'w-8 h-8 cursor-pointer rounded-full text-transparent mx-2'
              )}
              onClick={() => setCurrentPage({ ...initPage, color: true })}
            />
            <GoPrimitiveDot
              className={cl(
                currentPage.size ? 'bg-fuchsia-600' : 'bg-gray-300',
                'w-8 h-8 cursor-pointer rounded-full text-transparent mx-2'
              )}
              onClick={() => setCurrentPage({ ...initPage, size: true })}
            />
            <GoPrimitiveDot
              className={cl(
                currentPage.email ? 'bg-fuchsia-600' : 'bg-gray-300',
                'w-8 h-8 cursor-pointer rounded-full text-transparent mx-2'
              )}
              onClick={() => setCurrentPage({ ...initPage, email: true })}
            />
            <GoPrimitiveDot
              className={cl(
                currentPage.apps ? 'bg-fuchsia-600' : 'bg-gray-300',
                'w-8 h-8 cursor-pointer rounded-full text-transparent mx-2'
              )}
              onClick={() => setCurrentPage({ ...initPage, apps: true })}
            />
            <GoPrimitiveDot
              className={cl(
                currentPage.pm_tools ? 'bg-fuchsia-600' : 'bg-gray-300',
                'w-8 h-8 cursor-pointer rounded-full text-transparent mx-2'
              )}
              onClick={() => setCurrentPage({ ...initPage, pm_tools: true })}
            />
            <GoPrimitiveDot
              className={cl(
                currentPage.completed ? 'bg-fuchsia-600' : 'bg-gray-300',
                'w-8 h-8 cursor-pointer rounded-full text-transparent mx-2'
              )}
              onClick={() => setCurrentPage({ ...initPage, completed: true })}
            />
          </section>
        </section>
      </div>
    </div>
  );
}

export default CreateNewWorkspace;
