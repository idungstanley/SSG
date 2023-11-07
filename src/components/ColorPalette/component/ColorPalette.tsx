import { ListColourProps } from '../../tasks/ListItem';
import { cl } from '../../../utils';
import DefaultColour from '../../../assets/icons/DefaultColour';
import { useAppSelector } from '../../../app/hooks';
import { VerticalScroll } from '../../ScrollableContainer/VerticalScroll';
import ThreeDotIcon from '../../../assets/icons/ThreeDotIcon';
import { BsPinAngle } from 'react-icons/bs';
import ToolTip from '../../Tooltip/Tooltip';

interface PaletteProps {
  handleClick: (value: string | null | ListColourProps) => void;
  activeColor?: string;
}

export default function ColorPalette({ handleClick, activeColor }: PaletteProps) {
  const { colourPaletteData } = useAppSelector((state) => state.account);
  const colorBoxes = colourPaletteData.map((c) => (
    <div key={c.id} className="group">
      <div
        className={cl(
          activeColor === c.color ? 'border rounded-md  w-9 h-9' : '',
          'relative group-hover:border group-hover:w-9 group-hover:h-9 rounded-md flex items-center justify-center group-hover:border-alsoit-gray-75'
        )}
        style={{ borderColor: activeColor === c.color ? `${c.color}` : 'border-alsoit-gray-75' }}
        onClick={() => handleClick(c.color)}
      >
        {c.color === null ? (
          <DefaultColour />
        ) : (
          <div
            style={{
              backgroundColor: `${c.color}`
            }}
            className={cl(
              'group-hover:w-7.5 group-hover:h-7.5 rounded-md w-6 h-6',
              activeColor === c.color && 'w-7.5 h-7.5'
            )}
          ></div>
        )}
        {}
        <span className="absolute flex flex-col gap-1 opacity-0 cursor-pointer right-1 group-hover:opacity-100">
          <ToolTip placement="top" className="mb-5" title="More options">
            <span>
              <ThreeDotIcon color="white" />
            </span>
          </ToolTip>
          <ToolTip placement="right" title="Pin Colour">
            <span>
              <BsPinAngle className="text-sm text-white" />
            </span>
          </ToolTip>
        </span>
      </div>
    </div>
  ));

  return (
    <VerticalScroll>
      <div style={{ width: '300px', height: '162px' }}>
        <div className="grid content-center w-full grid-cols-8 p-2 font-semibold bg-white rounded gap-3.5 place-items-center">
          {colorBoxes}
        </div>
      </div>
    </VerticalScroll>
  );
}
