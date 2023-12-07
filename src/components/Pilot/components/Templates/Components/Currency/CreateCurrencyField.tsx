import React, { useState } from 'react';
import AlsoitMenuDropdown from '../../../../../DropDowns';
import SearchIcon from '../../../../../../assets/icons/SearchIcon';
import { currenciesArr, currencyType } from '../../../../../../utils/Currencies';
import ArrowDown from '../../../../../../assets/icons/ArrowDown';
import { useCreateDropdownField } from '../../../../../../features/list/listService';
import { useAppSelector } from '../../../../../../app/hooks';
import ArrowUpIcon from '../../../../../../assets/icons/ArrowUpIcon';
import PermissionIcon from '../../../../../../assets/icons/PermissionIcon';
import InformationsolidIcon from '../../../../../../assets/icons/InformationsolidIcon';
import ClosePalette from '../../../../../../assets/icons/ClosePalette';
import SavePalette from '../../../../../../assets/icons/SavePalette';
import ToolTip from '../../../../../Tooltip/Tooltip';

function CreateCurrencyField() {
  const { newCustomPropertyDetails, entityForCustom } = useAppSelector((state) => state.task);
  const [selected, setSelected] = useState<currencyType | undefined>(undefined);
  const [searchValue, setSearchValue] = useState<string>('');
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

  const { mutate: onCreate } = useCreateDropdownField();

  const filteredCurrency = currenciesArr.filter(
    (option) =>
      option.name.toLowerCase().includes(searchValue.toLowerCase()) ||
      option.currency.toLowerCase().includes(searchValue.toLowerCase()) ||
      option.country.toLowerCase().includes(searchValue.toLowerCase())
  );

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
    setSearchValue('');
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchValue(e.target.value);
  };

  const handleSubmit = () => {
    if (newCustomPropertyDetails.name && entityForCustom) {
      const name = newCustomPropertyDetails.name;
      const color = newCustomPropertyDetails.color;
      const is_bold = newCustomPropertyDetails.style?.is_bold;
      const is_italic = newCustomPropertyDetails.style?.is_italic;
      const is_underlined = newCustomPropertyDetails.style?.is_underlined;
      const style = {
        is_bold: is_bold as string,
        is_italic: is_italic as string,
        is_underlined: is_underlined as string
      };
      const properties = {
        currency: selected?.currency as string,
        symbol: selected?.symbol as string
      };
      if (selected) {
        onCreate({
          name,
          style,
          color,
          id: entityForCustom.id,
          type: entityForCustom.type,
          options: undefined,
          customType: 'money',
          properties
        });
      }
    }
  };

  return (
    <div className="relative w-full">
      <button
        className="flex items-center justify-between w-full h-8 px-2 bg-white rounded"
        onClick={(e) => handleClick(e)}
      >
        {selected ? (
          <span className="font-semibold text-alsoit-text-lg">{`${selected.currency} - ${selected.name} (${selected.symbol})`}</span>
        ) : (
          <h1 className="font-semibold text-alsoit-text-lg">Please Select Currency</h1>
        )}
        {anchorEl ? <ArrowUpIcon /> : <ArrowDown className="w-3 h-3" />}
      </button>
      {anchorEl && (
        <div className="absolute right-0 mt-2">
          <AlsoitMenuDropdown handleClose={handleClose} anchorEl={anchorEl}>
            <div style={{ width: '400px' }}>
              <div className="flex items-center justify-between h-8 max-w-full px-4 bg-white">
                <SearchIcon />
                <input
                  type="text"
                  onChange={handleSearchChange}
                  placeholder="Search"
                  className="w-11/12 h-4 border-0 ring-0 outline-0 focus:ring-0 focus:outline-0 focus:border-0 text-alsoit-text-md"
                />
              </div>
              <div style={{ maxHeight: '340px' }} className="overflow-y-auto">
                {filteredCurrency.length > 0 ? (
                  filteredCurrency.map((currency) => (
                    <div
                      key={currency.name}
                      className="flex items-center justify-between h-8 px-4 cursor-pointer hover:bg-alsoit-purple-50 text-alsoit-text-lg"
                      onClick={() => {
                        setSelected(currency);
                        setAnchorEl(null);
                      }}
                    >
                      <h1>{`${currency.currency} - ${currency.name}`}</h1>
                      <span>{currency.symbol}</span>
                    </div>
                  ))
                ) : (
                  <div className="px-4 py-2 text-alsoit-text-md">No results found</div>
                )}
              </div>
            </div>
          </AlsoitMenuDropdown>
        </div>
      )}

      <p className="flex items-center p-1 my-1 rounded text-alsoit-gray-300">Host in template center</p>
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2 p-1 rounded bg-alsoit-gray-50 w-fit">
          <PermissionIcon />
          <div className="text-black">Permissions</div>
          <InformationsolidIcon />
        </div>
        <div className="flex items-center justify-end gap-2 p-1">
          <ToolTip title="Cancel">
            <span onClick={() => ({})} className="cursor-pointer text-[#FF3738] hover:text-white">
              <ClosePalette fill="white" />
            </span>
          </ToolTip>
          <ToolTip title="Add Property">
            <span className="cursor-pointer" onClick={handleSubmit}>
              <SavePalette />
            </span>
          </ToolTip>
        </div>
      </div>
    </div>
  );
}

export default CreateCurrencyField;
