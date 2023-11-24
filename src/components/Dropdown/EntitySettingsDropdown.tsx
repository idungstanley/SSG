import { MdOutlineWaterDrop } from 'react-icons/md';
import ArrowRight from '../../assets/icons/ArrowRight';
import { IFavorites, IHub, IList, IWallet } from '../../features/hubs/hubs.interfaces';
import { useAppDispatch } from '../../app/hooks';
import { setPaletteDropDown } from '../../features/account/accountSlice';

interface IEntitySettingsDropdownProps {
  item: IList | IWallet | IHub | IFavorites;
  entityType: string;
}

export default function EntitySettingsDropdown({ item, entityType }: IEntitySettingsDropdownProps) {
  const dispatch = useAppDispatch();

  const options = [
    {
      title: 'Folder color',
      icon: <MdOutlineWaterDrop className="w-4 h-6" aria-hidden="true" />,
      rightIcon: <ArrowRight />,
      handleClick: () => {
        dispatch(setPaletteDropDown({ show: true, paletteId: item.id, paletteType: entityType }));
      },
      isVisible: true
    }
  ];

  return (
    <div className="w-56 gap-2 p-2">
      {options.map((option, index) => (
        <div key={index}>
          <div
            className="flex items-center justify-between p-1 py-2 space-x-2 text-sm text-left text-gray-600 rounded-md cursor-pointer hover:bg-alsoit-gray-50"
            onClick={option.handleClick}
          >
            <div className="flex items-center gap-2">
              <span className="flex items-center w-5 h-5">{option.icon}</span>
              <p>{option.title}</p>
            </div>
            {option.rightIcon && <span>{option.rightIcon}</span>}
          </div>
        </div>
      ))}
    </div>
  );
}
