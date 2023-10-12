import { useEffect, UIEvent, Fragment } from 'react';
import Page from '../../components/Page';
import AdditionalHeader from '../../layout/components/MainLayout/Header/AdditionHeader';
import PilotSection, { pilotConfig } from '../workspace/hubs/components/PilotSection';
import { Header } from '../../components/TasksHeader';
import { VerticalScroll } from '../../components/ScrollableContainer/VerticalScroll';
import { updatePageTitle } from '../../utils/updatePageTitle';
import { mockHubList, mockLists } from './mockData';
import TimeHubItem from '../../components/TimeClock/TimeHubItem';
import { List } from '../../components/Views/ui/List/List';

export default function TimeClockPage() {
  useEffect(() => {
    updatePageTitle('Time Clock');
    return () => {
      updatePageTitle('');
    };
  }, []);

  // infinite scroll
  const onScroll = (e: UIEvent<HTMLDivElement>) => {
    handleScroll(e);
  };

  const handleScroll = (e: UIEvent<HTMLDivElement>) => {
    // if (hasNextPage && !isFetching) {
    const container = e.target as HTMLElement;
    const twoThirdsOfScroll = 0.66;
    const scrollDifference = container?.scrollHeight * twoThirdsOfScroll - container.scrollTop - container.clientHeight;
    const range = 1;
    if (scrollDifference <= range) {
      // fetchNextPage();
    }
  };

  return (
    <>
      <PilotSection />
      <Page pilotConfig={pilotConfig} additionalHeader={<AdditionalHeader isInsights={true} />}>
        <Header isInsights={true} />
        <div className="flex">
          <div style={{ minWidth: '230px', borderTop: '1px solid #B2B2B2', borderRight: '1px solid #B2B2B2' }}>
            <VerticalScroll onScroll={onScroll}>
              <section style={{ minHeight: '0', maxHeight: '90vh' }} className="w-full h-full">
                {mockHubList.map((item) => (
                  <TimeHubItem key={item.id} data={item} />
                ))}
              </section>
            </VerticalScroll>
          </div>

          <div className="w-full" style={{ borderTop: '1px solid #B2B2B2' }}>
            <VerticalScroll onScroll={onScroll}>
              <section style={{ minHeight: '0', maxHeight: '83vh' }} className="w-full h-full p-4 pb-0 space-y-10">
                {/* lists */}
                {Object.keys(mockLists).map((listId) => (
                  <Fragment key={listId}>
                    {mockLists[listId as keyof typeof mockLists] ? (
                      <List tasks={mockLists[listId as keyof typeof mockLists]} />
                    ) : null}
                  </Fragment>
                ))}
              </section>
            </VerticalScroll>
          </div>
        </div>
      </Page>
    </>
  );
}
