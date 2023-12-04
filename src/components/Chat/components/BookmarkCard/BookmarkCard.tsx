import { VerticalScroll } from '../../../ScrollableContainer/VerticalScroll';

// interface ITaggedCardProps {}

const mockData = [
  {
    name: 'Perriah Hillard',
    init: 'PH',
    message: 'Oh nice it makes sense.',
    time: '9:10am'
  },
  {
    name: 'Thomas Jakes',
    init: 'TJ',
    message: 'Oh nice it makes sense. Oh nice it makes sense.',
    time: '9:10am'
  },
  {
    name: 'Kathleen Willis',
    init: 'KW',
    message: 'Oh nice it makes sense.',
    time: '9:10am'
  }
];

export default function BookmarkCard() {
  return (
    <div className="w-[218px] pt-[6px] pl-1 pb-1">
      <VerticalScroll>
        <div className="flex flex-col w-full" style={{ height: '100px' }}>
          <div className="">
            {mockData.map((bookmark) => (
              <div key={bookmark.name} className="mb-[3px] p-[3px] bg-white">
                <div className="flex justify-center mb-px">
                  <div className="p-px bordered-[2px] text-[5px] text-alsoit-gray-100 bg-alsoit-gray-125">
                    Bookmark 1
                  </div>
                </div>
                <div className="flex relative text-alsoit-gray-300">
                  <div className="w-[14px]">
                    <div className="flex justify-center items-center w-[10px] h-[10px] mr-1 text-[5px] bg-[#4d98f2] rounded-full font-bold text-white">
                      {bookmark.init}
                    </div>
                  </div>
                  <div className="w-full px-1 py-[3px] text-[8px] rounded-[5px] bg-alsoit-gray-125">
                    <div className="text-[#CA2CFE]">{bookmark.name}</div>
                    <div className="flex justify-between items-end">
                      <div>{bookmark.message}</div>
                      <div className="ml-1">{bookmark.time}</div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </VerticalScroll>
    </div>
  );
}
