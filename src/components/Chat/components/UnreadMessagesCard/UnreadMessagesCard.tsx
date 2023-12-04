import ChatAssignSticky from '../../../../assets/icons/ChatAssignSticky';
import { VerticalScroll } from '../../../ScrollableContainer/VerticalScroll';
import ToolTip from '../../../Tooltip/Tooltip';

// interface ITaggedCardProps {}

const mockData = [
  {
    name: 'Perriah Hillard',
    init: 'PH',
    count: 2
  },
  {
    name: 'UI/UX Design',
    init: 'UI',
    count: 200
  },
  {
    name: 'Volks Lovers',
    init: 'VL',
    count: 141
  },
  {
    name: 'Marcus John',
    init: 'MJ',
    count: 2
  }
];

const headersData = ['From', 'Unread'];

export default function UnreadMessagesCard() {
  return (
    <div className="w-[192px] pt-1 pl-[6px] pb-2">
      <VerticalScroll>
        <div className="flex flex-col w-full" style={{ height: '70px' }}>
          <div className="table-container">
            <table
              style={{
                display: 'grid',
                gridTemplateColumns: 'minmax(100px, 60%) minmax(60px, 40%)'
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
                    <td className="group-hover/table:bg-[#D9D9D9] relative flex justify-between items-center py-[2px] px-1 text-[8px] font-medium bg-white border-b border-r border-alsoit-gray-125">
                      <div className="flex">
                        <div className="flex justify-center items-center w-[10px] h-[10px] mr-1 text-[5px] bg-[#4d98f2] rounded-full font-bold text-white">
                          {tagged.init}
                        </div>
                        {tagged.name}
                      </div>
                      <div>
                        <ToolTip placement="bottom" title="">
                          <button className="flex justify-center items-center p-px bg-alsoit-gray-125 group-hover:bg-white rounded-[3px]">
                            <ChatAssignSticky color="orange" />
                          </button>
                        </ToolTip>
                      </div>
                    </td>
                    <td className="flex justify-center items-center group-hover/table:bg-[#D9D9D9] px-1 py-px bg-white text-[8px] border-b border-r border-alsoit-gray-125">
                      <div className="flex justify-center items-center w-max min-w-[22px] bg-alsoit-gray-125 px-px rounded-[3px]">
                        {tagged.count}
                      </div>
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
