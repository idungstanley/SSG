import React from 'react';
import AdditionalHeader from '../../../layout/components/MainLayout/Header/AdditionHeader';
import HomeNav from './homeNav';
import LineUp from './body/LineUp';
import Trending from './body/Trending';
import MyWork from './body/MyWork';
// import { VerticalScroll } from '../../../components/ScrollableContainer/VerticalScroll';

export default function Home() {
  return (
    <React.Fragment>
      <AdditionalHeader />
      <HomeNav />

      {/* body */}
      <section className="flex px-8 h-full ">
        {/* <VerticalScroll bgColor="bg-white"> */}
        <div className="border-r w-8/12 pt-8  overflow-auto" style={{ height: '90%' }}>
          <div className="w-11/12 mx-auto">
            <div>
              <LineUp />
            </div>

            <div>
              <Trending />
            </div>

            <div>
              <MyWork />
            </div>
          </div>
        </div>
        {/* </VerticalScroll> */}

        {/* right side bar */}
        <div className="pt-8">
          <div>Calendar</div>
        </div>
      </section>
    </React.Fragment>
  );
}
