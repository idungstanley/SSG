import { ListColourProps } from '../../tasks/ListItem';
import { cl } from '../../../utils';
import DefaultColour from '../../../assets/icons/DefaultColour';
import { useAppSelector } from '../../../app/hooks';
import { VerticalScroll } from '../../ScrollableContainer/VerticalScroll';

interface PaletteProps {
  handleClick: (value: string | null | ListColourProps) => void;
  activeColor?: string;
}

export default function ColorPalette({ handleClick, activeColor }: PaletteProps) {
  const { colourPaletteData } = useAppSelector((state) => state.account);
  const colorBoxes = colourPaletteData.map((c) => (
    <div
      key={c.id}
      className={cl(activeColor === c.color ? 'border rounded-md flex items-center justify-center w-9 h-9' : '')}
      style={{ borderColor: activeColor === c.color ? `${c.color}` : '' }}
      onClick={() => handleClick(c.color)}
    >
      {c.color === null ? (
        <DefaultColour />
      ) : (
        <div
          style={{
            backgroundColor: `${c.color}`,
            height: activeColor === c.color ? '30px' : '24px',
            width: activeColor === c.color ? '30px' : '24px'
          }}
          className="rounded-md"
        ></div>
      )}
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
