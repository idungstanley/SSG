import { VerticalScroll } from '../../../ScrollableContainer/VerticalScroll';

// interface ITaggedCardProps {}

const mockData = [
  {
    name: 'Perriah Hillard',
    init: 'PH',
    message: '@Ada i think we should select a blue colour to...',
    time: '12:08 am'
  },
  {
    name: 'Thomas Jakes',
    init: 'TJ',
    message: '@Ada i think we should select a blue colour to...',
    time: '12:08 am'
  },
  {
    name: 'Kathleen Willis',
    init: 'KW',
    message: '@Ada i think we should select a blue colour to...',
    time: 'Yesterday'
  },
  {
    name: 'Rosetta Julius',
    init: 'RJ',
    message: '@Ada i think we should select a blue colour to...',
    time: 'Yesterday'
  },
  {
    name: 'Ben White',
    init: 'BW',
    message: '@Ada i think we should select a blue colour to...',
    time: 'Thursday'
  }
];

const headersData = ['From', 'Chat', 'Time'];

export default function TaggedCard() {
  return (
    <div className="w-[371px] pt-1 pl-4 pb-2">
      <VerticalScroll>
        <div className="flex flex-col w-full" style={{ height: '100px' }}>
          <div className="table-container">
            <table
              style={{
                display: 'grid',
                gridTemplateColumns: 'minmax(120px, 33%) minmax(141px, 33%) minmax(70px, 20%)'
              }}
            >
              <tbody className="contents">
                <tr className="sticky top-0 relative contents group dNFlex text-alsoit-gray-300">
                  {headersData.map((header) => (
                    <td key={header} className="pt-1 pb-[2px]">
                      <div className="w-[28px] flex justify-center items-center p-[1px] text-[7px] font-semibold bg-white rounded-tl rounded-tr">
                        {header}
                      </div>
                    </td>
                  ))}
                </tr>
                {mockData.map((tagged) => (
                  <tr key={tagged.name} className="group/table relative contents group dNFlex text-alsoit-gray-300">
                    <td className="leading-[9.6px] group-hover/table:bg-[#D9D9D9] relative flex items-center p-2 pl-1 text-[8px] font-medium bg-white border-b border-r border-alsoit-gray-125">
                      <div className="flex justify-center items-center w-[10px] h-[10px] mr-1 text-[5px] bg-[#4d98f2] rounded-full font-bold text-white">
                        {tagged.init}
                      </div>
                      {tagged.name}
                    </td>
                    <td className="leading-[9.6px] group-hover/table:bg-[#D9D9D9] px-1 py-[2px] bg-white text-[8px] border-b border-r border-alsoit-gray-125">
                      {tagged.message}
                    </td>
                    <td className="leading-[9.6px] group-hover/table:bg-[#D9D9D9] px-1 py-[2px] bg-white text-[8px] border-b border-alsoit-gray-125">
                      <div className="flex justify-center items-center h-full">{tagged.time}</div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </VerticalScroll>
    </div>
  );
}
