import { useState } from 'react';
import { useAppSelector } from '../../../../app/hooks';
import { AvatarWithInitials } from '../../../../components';

function GroupAssignee({ data }: { data: [{ id: string; initials: string; colour: string }] | undefined }) {
  const { CompactView, CompactViewWrap } = useAppSelector((state) => state.task);
  const [displayed, setDisplayed] = useState(false);

  return (
    <>
      {data && data?.length >= 5 ? (
        <div className="flex items-center justify-center ">
          {data
            ?.slice(0, 3)
            .map(
              (
                newData: { id: React.Key | null | undefined; initials: string; colour: string | undefined },
                index: number
              ) => (
                <div
                  key={newData.id}
                  className={`scaleBigger ${index === 0 ? ' z-40  ' : ''} ${index === 1 ? 'z-30 ' : ''} ${
                    index === 2 ? 'z-20' : 'z-10'
                  }  `}
                >
                  <span key={newData.id} className=" flex items-center  -ml-2.5  border-2  rounded-full  ">
                    <div onMouseEnter={() => setDisplayed(true)} onMouseLeave={() => setDisplayed(false)}>
                      <AvatarWithInitials
                        initials={newData.initials}
                        backgroundColour={newData.colour}
                        height={`${
                          CompactView || CompactViewWrap ? 'CompactWithInitialsH' : 'ComfortableWithInitialsH'
                        }`}
                        width={`${
                          CompactView || CompactViewWrap ? 'CompactWithInitialsW' : 'ComfortableWithInitialsW'
                        }`}
                      />
                      {displayed && (
                        <button
                          className="absolute top-0 right-0 border h-3 w-3 rounded-full    bg-gray-500  text-white "
                          style={{
                            fontSize: '6px'
                          }}
                        >
                          X
                        </button>
                      )}
                    </div>
                  </span>
                </div>
              )
            )}
          <span>
            {(data as [{ id: string; initials: string; colour: string }])?.length - 3 !== 0 ? (
              <span
                className="-ml-3 border-white border-2  rounded-full bg-gray-100 "
                style={{ padding: `${CompactView || CompactViewWrap ? '3px' : '7px'}` }}
              >
                +{(data as [{ id: string; initials: string; colour: string }])?.length - 3}
              </span>
            ) : null}
          </span>
        </div>
      ) : (
        data?.map((newData, index: number) => (
          <div
            key={newData.id}
            className={`scaleBigger ${index === 0 ? ' z-40  ' : ''} ${index === 1 ? 'z-30 ' : ''} ${
              index === 2 ? 'z-20' : 'z-10'
            } `}
          >
            <span key={newData.id} className="flex items-center justify-center -ml-2.5  border-2  rounded-full">
              <div onMouseEnter={() => setDisplayed(true)} onMouseLeave={() => setDisplayed(false)}>
                <AvatarWithInitials
                  initials={newData.initials}
                  backgroundColour={newData.colour}
                  height={`${CompactView || CompactViewWrap ? 'CompactWithInitialsH' : 'ComfortableWithInitialsH'}`}
                  width={`${CompactView || CompactViewWrap ? 'CompactWithInitialsW' : 'ComfortableWithInitialsW'}`}
                />
                {displayed && (
                  <button
                    className="absolute top-0 right-0  border h-3 w-3 rounded-full border   bg-gray-500  text-white "
                    style={{
                      fontSize: '6px'
                    }}
                  >
                    X
                  </button>
                )}
              </div>
            </span>
          </div>
        ))
      )}
    </>
  );
}

export default GroupAssignee;
