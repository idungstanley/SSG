import React, { useEffect, useState } from 'react';
import ThreeDotIcon from '../../../assets/icons/ThreeDotIcon';
import AlsoitMenuDropdown from '../../DropDowns';
import { InlineBorderLabel } from '../../Dropdown/MenuDropdown';
import { useAppSelector } from '../../../app/hooks';
import Input from '../../input/Input';
import { CiSearch } from 'react-icons/ci';
import { COLLECTION_TYPES } from '../../../features/statusManager/statusManager.interface';

interface StatusCollectionProps {
  activeCollection: string;
  setActiveCollection: React.Dispatch<React.SetStateAction<string>>;
  activeTemplateStatus?: string;
  setActiveTemplateStatus: React.Dispatch<React.SetStateAction<string | undefined>>;
}

export default function StatusCollectionBoard({
  activeCollection,
  setActiveCollection,
  activeTemplateStatus,
  setActiveTemplateStatus
}: StatusCollectionProps) {
  const [showCollectionDropdown, setShowCollectionDropdown] = useState<null | HTMLDivElement>(null);

  const [isSelected, setIsSelected] = useState<boolean>(false);
  const [searchInput, setSearchInput] = useState<string>('');
  const [filteredResults, setFilteredResults] = useState<string[]>([]);

  const { templateNames } = useAppSelector((state) => state.statusManager);

  const handleShowCollection = (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    setShowCollectionDropdown(event.currentTarget);
  };
  const handleCloseCollectionMenu = () => {
    setShowCollectionDropdown(null);
    setIsSelected(false);
  };

  useEffect(() => {
    setFilteredResults(templateNames);
  }, [templateNames, searchInput == '']);

  const searchTemplateName = (value: string) => {
    setSearchInput(value);
    if (value != '') {
      const filteredData = templateNames.filter((item) => item.toLowerCase().includes(value.toLowerCase()));
      setFilteredResults(filteredData);
    } else {
      setFilteredResults(templateNames);
    }
  };

  const collections = [
    {
      label: COLLECTION_TYPES.BESPOKE_TO_ENTITY,
      handleClick: () => {
        setActiveCollection(COLLECTION_TYPES.BESPOKE_TO_ENTITY);
      }
    },
    {
      label: COLLECTION_TYPES.PARENT_ENTITY,
      handleClick: () => {
        setActiveCollection(COLLECTION_TYPES.PARENT_ENTITY);
      }
    },
    {
      label: COLLECTION_TYPES.SHARED_ENTITY,
      handleClick: () => {
        setActiveCollection(COLLECTION_TYPES.SHARED_ENTITY);
      }
    },
    {
      label: COLLECTION_TYPES.TEMPLATE_COLLECTION,
      handleClick: () => {
        setIsSelected(true);
        setActiveCollection(COLLECTION_TYPES.TEMPLATE_COLLECTION);
      }
    }
  ];

  return (
    <div className="w-full gap-2 p-3 rounded-lg bg-alsoit-gray-50">
      <div className="mb-4 ">STATUS MANAGER</div>
      <div className="flex items-center justify-between py-1 mb-2 border-b border-alsoit-purple-300">
        <div className="text-alsoit-purple-300">
          {activeCollection && !activeTemplateStatus
            ? activeCollection
            : activeTemplateStatus
            ? activeTemplateStatus
            : 'New Collection'}
        </div>
        <div onClick={(e) => handleShowCollection(e)}>
          <ThreeDotIcon />
        </div>
      </div>
      <div
        style={{ fontSize: '8px' }}
        className="text-right underline underline-offset-4 text-primary-400 decoration-primary-400"
      >
        Save to Template
      </div>
      <AlsoitMenuDropdown
        handleClose={handleCloseCollectionMenu}
        anchorEl={showCollectionDropdown as HTMLDivElement | null}
      >
        <InlineBorderLabel
          label="SELECT ENTITY"
          topElement={<p className="flex items-center justify-center">{activeCollection}</p>}
        />

        <div className="flex flex-col w-48 p-2 space-y-2">
          {!isSelected &&
            collections.map((item, index) => (
              <div
                className="flex items-center gap-2 p-1 rounded cursor-pointer hover:bg-primary-200 hover:text-primary-600"
                key={index}
                onClick={item.handleClick}
              >
                <p>{item.label}</p>
              </div>
            ))}
          {isSelected && activeCollection === COLLECTION_TYPES.TEMPLATE_COLLECTION && (
            <>
              <Input
                placeholder="Search"
                bgColor="bg-gray-200"
                borderRadius="rounded-md py-0.5"
                type="text"
                name="search"
                value={searchInput}
                leadingIcon={<CiSearch />}
                onChange={(e) => searchTemplateName(e.target.value)}
              />
              {filteredResults.map((item, index) => (
                <div
                  className="flex items-center gap-2 p-1 rounded cursor-pointer hover:bg-primary-200 hover:text-primary-600"
                  key={index}
                  onClick={() => setActiveTemplateStatus?.(item)}
                >
                  <p>{item}</p>
                </div>
              ))}
            </>
          )}
        </div>
      </AlsoitMenuDropdown>
    </div>
  );
}
