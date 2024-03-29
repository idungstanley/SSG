import requestNew from '../../../app/requestNew';
import {
  setAssignChecklistItem,
  // setAssignChecklistItem,
  setDeleteChecklist,
  setDeleteChecklistItem,
  setToggleAssignChecklistItemId,
  setUnassignChecklistItem
} from './checklistSlice';
import { useMutation } from '@tanstack/react-query';
import { useAppDispatch, useAppSelector } from '../../../app/hooks';
import {
  AssigneeType,
  IChecklistItemRes,
  ICreateChecklistRes,
  ITaskFullList,
  newTaskDataRes
} from '../interface.tasks';
import { setTasks, setToggleAssignCurrentTaskId } from '../taskSlice';
import { addNewTaskManager } from '../../../managers/Task';
import { updateListTasksCountManager } from '../../../managers/List';
import { getHub } from '../../hubs/hubSlice';
import { setFilteredResults } from '../../search/searchSlice';

// Delete Checklist
const convertToTask = (data: { query: string | null }) => {
  const checklist_id = data.query;
  const request = requestNew<newTaskDataRes>({
    url: `checklists/${checklist_id}/convert`,
    method: 'POST',
    data: {
      list_id: 'a850da9f'
    }
  });
  return request;
};

export const useConvertChecklistToTask = (id: string) => {
  const dispatch = useAppDispatch();
  const { tasks } = useAppSelector((state) => state.task);
  const { hub } = useAppSelector((state) => state.hub);
  return useMutation(convertToTask, {
    onSuccess: (data) => {
      const task = data.data.task;
      dispatch(setDeleteChecklist(id));
      const updatedTasks = addNewTaskManager(
        tasks,
        data.data.task as ITaskFullList,
        task.custom_field_columns || [],
        task.task_statuses
      );
      dispatch(setTasks(updatedTasks));
      const listId = data.data.task.list_id;
      const updatedTree = updateListTasksCountManager(listId as string, hub, updatedTasks[listId].length);
      dispatch(getHub(updatedTree));
      dispatch(setFilteredResults(updatedTree));
    }
  });
};

export const UseCreateChecklistService = ({
  item_id,
  name,
  type
}: {
  item_id: string | null | undefined;
  name: string;
  type: string | null | undefined;
}) => {
  const url = '/checklists';
  const response = requestNew<ICreateChecklistRes>({
    url,
    method: 'POST',
    data: {
      name: name,
      id: item_id,
      type: type
    }
  });
  return response;
};

export const UseCreatelistItemService = ({ checklist_id, name }: { checklist_id: string; name: string }) => {
  const url = `/checklists/${checklist_id}`;
  const response = requestNew<IChecklistItemRes>({
    url,
    method: 'POST',
    data: {
      name: name
    }
  });
  return response;
};

//Edit Checklist
export const useEditChecklist = ({ checklist_id, name }: { checklist_id: string; name: string | null | undefined }) => {
  const data = requestNew<ICreateChecklistRes>({
    url: `/checklists/${checklist_id}`,
    method: 'PUT',
    data: {
      name: name
    }
  });
  return data;
};

//Edit Checklist
export const useEditChecklistItem = ({
  checklist_id,
  name,
  itemId,
  done
}: {
  itemId: string;
  done: number;
  checklist_id: string;
  name: string | null | undefined;
}) => {
  const data = requestNew<IChecklistItemRes>({
    url: `/checklists/${checklist_id}/item/${itemId}`,
    method: 'PUT',
    data: {
      name: name,
      is_done: done
    }
  });
  return data;
};

// Delete Checklist
const deleteChecklist = (data: { query: string | null }) => {
  const checklist_id = data.query;
  const request = requestNew({
    url: `checklists/${checklist_id}`,
    method: 'DELETE'
  });
  return request;
};

export const useDeleteChecklist = (id: string) => {
  const diapatch = useAppDispatch();

  return useMutation(deleteChecklist, {
    onSuccess: () => {
      diapatch(setDeleteChecklist(id));
    }
  });
};

//Delete a Checklist Item
const deleteChecklistItem = (data: { query: string | null; itemId: string | undefined }) => {
  const checklist_id = data.query;
  const itemId = data.itemId;
  const request = requestNew({
    url: `/checklists/${checklist_id}/item/${itemId}`,
    method: 'DELETE'
  });
  return request;
};

export const useDeleteChecklistItem = (checklistId: string, itemId: string) => {
  const dispatch = useAppDispatch();

  return useMutation(deleteChecklistItem, {
    onSuccess: () => {
      dispatch(
        setDeleteChecklistItem({
          checklistId,
          itemId
        })
      );
    }
  });
};

// Assign Checklist Item
const AssignChecklistItem = ({
  itemId,
  team_member_id
}: {
  itemId: string | null | undefined;
  team_member_id: string | null;
}) => {
  const request = requestNew<IChecklistItemRes>({
    url: '/assignee/assign',
    method: 'POST',
    data: {
      team_member_id: team_member_id,
      id: itemId,
      type: 'checklist_item'
    }
  });
  return request;
};

export const UseChecklistItemAssignee = (id: string, user: AssigneeType) => {
  const dispatch = useAppDispatch();
  return useMutation(AssignChecklistItem, {
    onSuccess: () => {
      dispatch(
        setAssignChecklistItem({
          itemId: id as string,
          assignee: user
        })
      );
      dispatch(setToggleAssignChecklistItemId(null));
    }
  });
};

// Unassign Checklist Item
const UnassignChecklistItem = ({
  itemId,
  team_member_id
}: {
  itemId: string | null | undefined;
  team_member_id: string | null;
}) => {
  const request = requestNew({
    url: '/assignee/unassign',
    method: 'POST',
    data: {
      team_member_id: team_member_id,
      id: itemId,
      type: 'checklist_item'
    }
  });
  return request;
};

export const UseChecklistItemUnassignee = (itemId: string, assigneeId: string) => {
  const dispatch = useAppDispatch();
  return useMutation(UnassignChecklistItem, {
    onSuccess: () => {
      dispatch(
        setUnassignChecklistItem({
          itemId,
          assigneeId
        })
      );
      dispatch(setToggleAssignChecklistItemId(null));
      dispatch(setToggleAssignCurrentTaskId(null));
    }
  });
};
