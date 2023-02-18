import React from "react";
import { IoPeopleOutline } from "react-icons/io5";
import { MdOutlineRadioButtonUnchecked } from "react-icons/md";
import { RiFootballFill } from "react-icons/ri";
import { TbCheck } from "react-icons/tb";
import { TfiCalendar } from "react-icons/tfi";
import { VscEllipsis } from "react-icons/vsc";
import { useDispatch } from "react-redux";
import {
  ImyTaskData,
  setCurrentTaskIdForTag,
  setCurrentTaskPriorityId,
  //   triggerUnassignTag,
} from "../../../../../features/task/taskSlice";
import PriorityDropdown from "../../../../../components/priority/PriorityDropdown";
// import { AiOutlineTags } from "react-icons/ai";
// import { tagItem } from "../../../pilot/components/details/properties/subDetailsIndex/PropertyDetails";
// import { useAppSelector } from "../../../../../app/hooks";
// import ToolTip from "../../../../../components/Tooltip";
// import EditTagModal from "../../../../../components/tags/EditTagModal";
// import ColorsModal from "../../../../../components/tags/ColorsModal";
import TagModal from "../../../../../components/tags/TagModal";

interface TaskDataProps {
  task: ImyTaskData;
}

export default function CardState({ task }: TaskDataProps) {
  const dispatch = useDispatch();
  //   const { renameTagId, showTagColorDialogueBox } = useAppSelector(
  //     (state) => state.task
  //   );
  const handleTaskPriority = (id: string) => {
    dispatch(setCurrentTaskPriorityId(id));

    //     const groupTags = (arr: tagItem[]) => {
    //       return arr.map((item: tagItem) => {
    //         return Array.isArray(item) ? (
    //           <div>{groupTags(item)}</div>
    //         ) : (
    //           <>
    //             <div
    //               className={`flex items-center space-x-1 text-white p-0.5 text-center m-0.5 rounded-r-md ${
    //                 item.name.length > 10 ? "object-contain" : "w-20"
    //               }`}
    //               style={{ backgroundColor: `${item.color}` }}
    //             >
    //               <div className="flex items-center">
    //                 <p> {item.name}</p>
    //                 {renameTagId == item.id && (
    //                   <form>
    //                     <input
    //                       type="text"
    //                       placeholder="tagedit name"
    //                       className="text-gray-400 h-7 object-contain"
    //                     />
    //                   </form>
    //                 )}
    //               </div>
    //               <ToolTip tooltip="edit tag">
    //                 <button>
    //                   <EditTagModal tagId={item.id} />
    //                 </button>
    //               </ToolTip>

    //               <ToolTip tooltip="unassign tag">
    //                 <button
    //                   onClick={() =>
    //                     dispatch(
    //                       triggerUnassignTag({
    //                         unAssignTadId: item.id,
    //                         currentTaskIdForTag: task.id,
    //                       })
    //                     )
    //                   }
    //                 >
    //                   <IoCloseSharp />
    //                 </button>
    //               </ToolTip>
    //               {showTagColorDialogueBox && <ColorsModal />}
    //             </div>
    //             {/* <span>{arr.length}</span> */}
    //           </>
    //         );
    //       });
    //     };
  };
  return (
    <div className="flex h-full border-t pt-2 items-center justify-between">
      <div className="flex items-center gap-3 text-gray-300 ">
        <span className=" text-x font-bold ">
          <TfiCalendar />
        </span>
        <span
          className=" text-xl cursor-pointer pt-1"
          onClick={() => handleTaskPriority(task.id as string)}
        >
          <PriorityDropdown TaskCurrentPriority={task?.priority} />
        </span>
        <span
          className="  text-xl"
          onClick={() => dispatch(setCurrentTaskIdForTag(task.id))}
        >
          <TagModal />
        </span>
        <span className="  text-xl">
          <IoPeopleOutline />
        </span>
        <span className="  text-xl">
          <RiFootballFill />
        </span>
      </div>
      <div className="flex items-center gap-2 text-gray-300">
        <span className="  text-xl">
          <TbCheck />
        </span>
        <span className="  ">
          <MdOutlineRadioButtonUnchecked />
        </span>
        <span className="  text-xl">
          <VscEllipsis />
        </span>
      </div>
    </div>
  );
}
