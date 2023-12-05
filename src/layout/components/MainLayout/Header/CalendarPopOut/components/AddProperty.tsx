import React, { useState } from 'react';
import CollapseItems from '../../../../../../components/CollapseItems';
import PlusCircle from '../../../../../../assets/icons/AddCircle';
import { useAppDispatch, useAppSelector } from '../../../../../../app/hooks';
import { setCreateNew } from '../../../../../../features/workspace/workspaceSlice';
import DraftIcon from '../../../../../../assets/icons/DraftIcon';
import ToolTip from '../../../../../../components/Tooltip/Tooltip';
import ArrowDown from '../../../../../../assets/icons/ArrowDown';
import StatusIconComp from '../../../../../../assets/icons/StatusIconComp';
import { PriorityIcon } from '../../../../../../assets/icons/PriorityIcon';
import CalendarIcon from '../../../../../../assets/icons/propertyIcons/CalendarIcon';
import CommenLinetIcon from '../../../../../../assets/icons/CommenLinetIcon';
import AttachmentIcon from '../../../../../../assets/icons/propertyIcons/AttachmentIcon';
import SubtaskIcon from '../../../../../../assets/icons/SubtaskIcon';
import AddTagIcon from '../../../../../../assets/icons/AddTagIcon';
import NoAssigneeIcon from '../../../../../../assets/icons/NoAssigneeIcon';
import SaveBtnIcon from '../../../../../../assets/icons/SaveBtnIcon';
import DairyTypesDropdown from './DairyTypesDropdown';
import SelectEntity from './SelectEntity';

function AddProperty() {
  const dispatch = useAppDispatch();
  const { popoutItems } = useAppSelector((state) => state.workspace);
  const [openType, setOpenTypes] = useState<HTMLElement | null>(null);
  const [openEntity, setOpenEntity] = useState<HTMLElement | null>(null);

  const [isOpen] = React.useState<null | HTMLButtonElement>(null);

  return (
    <div>
      <CollapseItems
        open={popoutItems.createNew}
        handleToggle={() => dispatch(setCreateNew())}
        header="Create new"
        headerIcon={<PlusCircle color="white" />}
        headerTrailing={
          <div className="w-full flex justify-end">
            <ToolTip title="Open draft task in chosen list" placement="left">
              <button className="h-6 w-6 bg-white hover:bg-alsoit-purple-50 rounded flex justify-center items-center cursor-pointer">
                <DraftIcon />
              </button>
            </ToolTip>
          </div>
        }
      >
        <div className="mx-auto" style={{ width: '90%' }}>
          <div className="flex justify-between">
            <div style={{ width: '140px' }}>
              <label className="text-alsoit-text-md leading-3 text-alsoit-gray-300">Type</label>
              <span
                className="flex items-center justify-between bg-white h-8 rounded p-2"
                onClick={(e) => setOpenTypes(e.currentTarget)}
              >
                <h3 className="text-alsoit-text-md leading-3 font-medium text-alsoit-gray-100">Choose a dairy type</h3>
                <ArrowDown className="w-2 h-2" color={isOpen ? '#BF01FE' : '#919191'} />
              </span>
            </div>
            <div style={{ width: '140px' }}>
              <label className="text-alsoit-text-md leading-3 text-alsoit-gray-300">Workspace Location</label>
              <span
                className="flex items-center justify-between bg-white h-8 rounded p-2"
                onClick={(e) => setOpenEntity(e.currentTarget)}
              >
                <h3 className="text-alsoit-text-md leading-3 font-medium text-alsoit-gray-100">Choose location</h3>
                <ArrowDown className="w-2 h-2" color={isOpen ? '#BF01FE' : '#919191'} />
              </span>
            </div>
          </div>
          <div className="w-full">
            <div>
              <label className="text-alsoit-text-md leading-3 text-alsoit-gray-300">TITLE</label>
            </div>
            <div className="flex gap-1 justify-between items-center">
              <input
                type="text"
                style={{ width: '184px' }}
                placeholder="Input tittle"
                className="h-8 rounded text-alsoit-text-md text-alsoit-gray-100 border-0 ring-0 outline-0 focus:border-0 focus:ring-0 focus:outline-0 placeholder:text-alsoit-gray-100 placeholder:"
              />
              <div className="flex items-center gap-1">
                <button className="h-5 w-5 bg-white hover:bg-alsoit-purple-50 rounded flex justify-center items-center">
                  <StatusIconComp color="#626262" />
                </button>
                <button className="h-5 w-5 bg-white hover:bg-alsoit-purple-50 rounded flex justify-center items-center">
                  <PriorityIcon color="#626262" />
                </button>
                <button className="h-5 w-5 bg-white hover:bg-alsoit-purple-50 rounded flex justify-center items-center">
                  <CalendarIcon />
                </button>
                <button className="h-5 w-5 bg-white hover:bg-alsoit-purple-50 rounded flex justify-center items-center">
                  <CommenLinetIcon />
                </button>
              </div>
            </div>
          </div>
          <div className="w-full flex justify-between my-2">
            <div className="flex gap-1">
              <button className="h-5 w-5 hover:bg-alsoit-purple-50 rounded flex justify-center items-center">
                <CommenLinetIcon />
              </button>
              <button className="h-5 w-5 hover:bg-alsoit-purple-50 rounded flex justify-center items-center">
                <AttachmentIcon dimension={{ width: '12', height: '15' }} />
              </button>
              <button className="h-5 w-5 hover:bg-alsoit-purple-50 rounded flex justify-center items-center">
                <SubtaskIcon dimension={{ width: '12', height: '12' }} />
              </button>
              <button className="h-5 w-5 hover:bg-alsoit-purple-50 rounded flex justify-center items-center">
                <NoAssigneeIcon />
              </button>
              <button className="h-5 w-5 hover:bg-alsoit-purple-50 rounded flex justify-center items-center">
                <CalendarIcon />
              </button>
              <button className="h-5 w-5 hover:bg-alsoit-purple-50 rounded flex justify-center items-center">
                <PriorityIcon color="#626262" />
              </button>
              <button className="h-5 w-5 hover:bg-alsoit-purple-50 rounded flex justify-center items-center">
                <span className="w-3 h-3 rounded-sm bg-alsoit-gray-100"></span>
              </button>
              <button className="h-5 w-5 hover:bg-alsoit-purple-50 rounded flex justify-center items-center">
                <AddTagIcon />
              </button>
            </div>
            <div className="flex gap-1">
              <ToolTip title="Cancel" placement="left">
                <button
                  className="h-5 w-5 bg-white hover:bg-alsoit-purple-50 rounded flex justify-center items-center text-alsoit-danger"
                  style={{ fontSize: '15px' }}
                >
                  x
                </button>
              </ToolTip>
              <ToolTip title="Save task" placement="left">
                <button className="h-5 w-5 bg-alsoit-success-75  hover:bg-alsoit-success-75 rounded flex justify-center items-center cursor-pointer">
                  <SaveBtnIcon />
                </button>
              </ToolTip>
            </div>
          </div>
          <SelectEntity anchor={openEntity} setAnchor={setOpenEntity} />
          <DairyTypesDropdown anchor={openType} setAnchor={setOpenTypes} />
        </div>
      </CollapseItems>
    </div>
  );
}

export default AddProperty;
