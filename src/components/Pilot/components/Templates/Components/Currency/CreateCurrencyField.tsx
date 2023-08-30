import React, { useState } from 'react';
import AlsoitMenuDropdown from '../../../../../DropDowns';
import SearchIcon from '../../../../../../assets/icons/SearchIcon';
import { currenciesArr, currencyType } from '../../../../../../utils/Currencies';
import ArrowDown from '../../../../../../assets/icons/ArrowDown';
import SaveCols from '../SaveCols';
import { useCreateDropdownField } from '../../../../../../features/list/listService';
import { useAppSelector } from '../../../../../../app/hooks';

function CreateCurrencyField() {
  const { newCustomPropertyDetails, entityForCustom } = useAppSelector((state) => state.task);
  const [selected, setSelected] = useState<currencyType | undefined>(undefined);
  const [searchValue, setSearchValue] = useState<string>('');
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

  const { mutate: onCreate } = useCreateDropdownField(entityForCustom.type, entityForCustom.id);

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
      const customType = newCustomPropertyDetails.type.toLowerCase();
      onCreate({
        name,
        style,
        color,
        id: entityForCustom.id,
        type: entityForCustom.type,
        options: undefined,
        customType
      });
    }
  };

  return (
    <div className="w-full relative">
      <button
        className="w-full bg-white rounded flex items-center justify-between h-8 px-2"
        onClick={(e) => handleClick(e)}
      >
        {selected ? (
          <span className="text-alsoit-text-lg font-semibold">{`${selected.currency} - ${selected.name} (${selected.symbol})`}</span>
        ) : (
          <h1 className="text-alsoit-text-lg font-semibold">Please Select Currency</h1>
        )}

        <ArrowDown />
      </button>
      {anchorEl && (
        <div className="absolute right-0 mt-2">
          <AlsoitMenuDropdown handleClose={handleClose} anchorEl={anchorEl}>
            <div style={{ width: '400px' }}>
              <div className="flex items-center justify-between max-w-full h-8 bg-white px-4">
                <SearchIcon />
                <input
                  type="text"
                  onChange={handleSearchChange}
                  placeholder="Search"
                  className="h-4 border-0 ring-0 outline-0 focus:ring-0 focus:outline-0 focus:border-0 w-11/12 text-alsoit-text-md"
                />
              </div>
              <div style={{ maxHeight: '340px' }} className="overflow-y-auto">
                {filteredCurrency.length > 0 ? (
                  filteredCurrency.map((currency) => (
                    <div
                      key={currency.name}
                      className="flex items-center justify-between h-8 px-4 cursor-pointer hover:bg-alsoit-purple-50 text-alsoit-text-lg"
                      onClick={() => setSelected(currency)}
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
      <SaveCols
        handleSubmit={handleSubmit}
        header="Email"
        body="This custom property which allows to track clients, vendors, leads and more by entering emails"
      />
    </div>
  );
}

export default CreateCurrencyField;
