import CollapseIcon from '../Views/ui/collapseIcon/CollapseIcon';

interface ICardLabelProps {
  title: string;
  isOpen: boolean;
  setOpen: (isOpen: boolean) => void;
}

export default function CardLabel({ title, isOpen, setOpen }: ICardLabelProps) {
  return (
    <div className="flex h-8 ">
      <div className="min-w-[145px]">
        <div
          className={`flex items-center w-full gap-2 h-8 p-2 bg-alsoit-gray-75 grow text-white cursor-pointer ${
            isOpen ? 'rounded-tl-lg rounded-br-lg' : 'rounded-md rounded-tr-none'
          }`}
          onClick={() => setOpen(!isOpen)}
        >
          <span>
            <CollapseIcon color="#919191" active={!isOpen} onToggle={() => ({})} hoverBg="white" />
          </span>
          {title}
        </div>
      </div>
    </div>
  );
}
