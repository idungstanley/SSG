import React, { useState } from 'react';
import Working from '../../../assets/icons/Working.svg';
import MainLogo from '../../../assets/icons/mainIcon.svg';
import Scroll1 from '../../../assets/icons/scroll1.svg';
import Scroll3 from '../../../assets/icons/scroll3.png';
import Scroll4 from '../../../assets/icons/scroll4.png';
import Scroll2 from '../../../assets/icons/scroll2.png';
import Apps from '../../../assets/icons/any_app.svg';
import PmTools from '../../../assets/icons/pm-tool.png';
import Scroll5 from '../../../assets/icons/scroll5.png';
import Scroll6 from '../../../assets/icons/scroll6.png';
import Scroll7 from '../../../assets/icons/scroll7.png';
import { AvatarBg, InputAvatar } from '../../../components';
import { avatarBg, companySizeBtn } from './colors';

interface currentPageProps {
  name: boolean;
  color: boolean;
  size: boolean;
  email: boolean;
  apps: boolean;
  pm_tools: boolean;
  completed: boolean;
}

function NewWorkSpace() {
  const [currentPage, setCurrentPage] = useState<currentPageProps>({
    name: true,
    color: false,
    size: false,
    email: false,
    apps: false,
    pm_tools: false,
    completed: false
  });
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
        <section className="w-1/2 h-full">
          <div className="w-full flex justify-end" style={{ height: '20vh' }}>
            <div className="w-24 h-24 m-8">
              <img src={MainLogo} alt="logo" className="w-full h-full" />
            </div>
          </div>
          {currentPage.name && (
            <div className="w-full -ml-40 flex items-center" style={{ height: '80vh' }}>
              <div>
                <h1 style={{ fontSize: '40px' }}>Name your work space</h1>
                <input type="text" className="mt-8 rounded" style={{ width: '1000px', height: '100px' }} />
                <h2 className="text-xl text-fuchsia-600">Name of company or organization can be used</h2>
                <div className="flex justify-center my-8">
                  <button
                    className="bg-fuchsia-600 text-white p-2 rounded-lg"
                    style={{ fontSize: '35px' }}
                    onClick={() => setCurrentPage({ ...currentPage, name: false, color: true })}
                  >
                    NEXT
                  </button>
                </div>
                <div className="mt-32 flex justify-center">
                  <img src={Scroll1} alt="" />
                </div>
              </div>
            </div>
          )}
          {currentPage.color && (
            <div className="w-full -ml-40 flex items-center" style={{ height: '80vh' }}>
              <div>
                <h1 style={{ fontSize: '40px' }}>Customize your workspace</h1>
                <div className="flex items-center w-full justify-center gap-20 mt-8 mb-20">
                  <section className="flex items-center">
                    <InputAvatar action="Drop an image or browse" upload={null} size={null} />
                    <h1 className="mx-4">Or</h1>
                    <button
                      type="button"
                      className="rounded w-24 h-24 text-white"
                      style={{ backgroundColor: '#BF00FE' }}
                    >
                      EG
                    </button>
                  </section>
                  <div className="grid grid-cols-8 gap-12">
                    {avatarBg.map(({ colour }) => {
                      return (
                        <AvatarBg
                          key={colour}
                          size={10}
                          colour={colour}
                          // name="avatarBackgroudColor"
                          onClick={() => console.log(colour)}
                        />
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
                <div className="mt-16 flex justify-center">
                  <img src={Scroll2} alt="" />
                </div>
              </div>
            </div>
          )}
          {currentPage.size && (
            <div className="w-full -ml-40 flex items-center" style={{ height: '80vh' }}>
              <div>
                <h1 style={{ fontSize: '40px' }}>How many people will you be working with?</h1>
                <div className="flex justify-between my-8">
                  {companySizeBtn.map((size) => {
                    return (
                      <button className="text-xl border border-gray-400 p-2 rounded" key={size.label}>
                        {size.label}
                      </button>
                    );
                  })}
                </div>
                <div className="flex justify-center mb-8 mt-16">
                  <button
                    className="bg-fuchsia-600 text-white p-2 rounded-lg"
                    style={{ fontSize: '35px' }}
                    onClick={() => setCurrentPage({ ...currentPage, size: false, email: true })}
                  >
                    NEXT
                  </button>
                </div>
                <div className="mt-16 flex justify-center">
                  <img src={Scroll3} alt="" />
                </div>
              </div>
            </div>
          )}
          {currentPage.email && (
            <div className="w-full -ml-40 flex items-center" style={{ height: '80vh' }}>
              <div>
                <h1 style={{ fontSize: '40px' }}>Invite people to your workspace</h1>
                <input
                  type="text"
                  className="mt-8 rounded"
                  style={{ width: '1000px', height: '100px' }}
                  placeholder="Enter email addresses"
                />
                <h2 className="text-xl text-fuchsia-600">Multiple email addresses can be pasted</h2>
                <div className="flex justify-center my-8">
                  <button
                    className="bg-fuchsia-600 text-white p-2 rounded-lg"
                    style={{ fontSize: '35px' }}
                    onClick={() => setCurrentPage({ ...currentPage, email: false, apps: true })}
                  >
                    Done
                  </button>
                </div>
                <div className="mt-32 flex justify-center">
                  <img src={Scroll4} alt="" />
                </div>
              </div>
            </div>
          )}
          {currentPage.apps && (
            <div className="w-full -ml-40 flex items-center" style={{ height: '80vh' }}>
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
                <div className="mt-32 flex justify-center">
                  <img src={Scroll5} alt="" />
                </div>
              </div>
            </div>
          )}
          {currentPage.pm_tools && (
            <div className="w-full -ml-40 flex items-center" style={{ height: '80vh' }}>
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
                <div className="mt-32 flex justify-center">
                  <img src={Scroll6} alt="Project management tools" />
                </div>
              </div>
            </div>
          )}
          {currentPage.completed && (
            <div className="w-full -ml-40 flex items-center" style={{ height: '80vh' }}>
              <div>
                <h1 style={{ fontSize: '40px' }}>
                  Your workspace is ready. Have a wonderful experience working with your team members and colleagues.
                </h1>
                <div className="flex justify-center my-8">
                  <button className="bg-fuchsia-600 text-white p-2 rounded-lg" style={{ fontSize: '35px' }}>
                    Get started
                  </button>
                </div>
                <div className="mt-32 flex justify-center">
                  <img src={Scroll7} alt="Project management tools" />
                </div>
              </div>
            </div>
          )}
        </section>
      </div>
    </div>
  );
}

export default NewWorkSpace;
