import { useQuery } from "@tanstack/react-query";
import requestNew from "../../../app/requestNew";

export const UseCreateTagService = ({ name }: { name: string }) => {
  const url = "tags";
  const response = requestNew(
    {
      url,
      method: "POST",
      data: {
        name: name,
      },
    },
    true
  );
  return response;
};

export const UseGetAllTagsService = () => {
  return useQuery(["tags"], async () => {
    const data = await requestNew(
      {
        url: "tags",
        method: "GET",
      },
      true
    );
    return data;
  });
};

export const UseUpdateTagService = ({
  color,
  tag_id,
  name,
}: {
  color?: string;
  tag_id: string | null;
  name?: string;
}) => {
  const url = `tags/${tag_id}`;
  const response = requestNew(
    {
      url,
      method: "PUT",
      data: {
        name: name,
        color: color,
      },
    },
    true
  );
  return response;
};

export const UseDeleteTagsService = ({
  trigger,
  tag_id,
}: {
  trigger: number;
  tag_id: string | null;
}) => {
  const url = `tags/${tag_id}`;
  const response = requestNew(
    {
      url,
      method: "DELETE",
      params: {
        confirm: trigger,
      },
    },
    true
  );
  return response;
};

//assign tags
export const UseAssignTagService = ({
  tagId,
  currentTaskIdForTag,
}: {
  tagId: string | null;
  currentTaskIdForTag: string | null;
}) => {
  const url = `tags/${tagId}/assign`;
  const response = requestNew(
    {
      url,
      method: "POST",
      params: {
        type: "task",
        id: currentTaskIdForTag,
      },
    },
    true
  );
  return response;
};

//un-assign tags
export const UseUnAssignTagService = ({
  tagId,
  currentTaskIdForTag,
}: {
  tagId: string | null;
  currentTaskIdForTag: string | null;
}) => {
  const url = `tags/${tagId}/unassign`;
  const response = requestNew(
    {
      url,
      method: "POST",
      params: {
        type: "task",
        id: currentTaskIdForTag,
      },
    },
    true
  );
  return response;
};

//unassign tags
export const UseUnAssignTagFromTask = ({
  tagId,
  currentTaskIdForTag,
}: {
  tagId: string;
  currentTaskIdForTag: string;
}) => {
  // const queryClient = useQueryClient();
  return useQuery(
    ["task", { tagId: tagId, currentTaskIdForTag: currentTaskIdForTag }],
    async () => {
      const data = await requestNew(
        {
          url: `tags/${tagId}/unassign`,
          method: "POST",
          params: {
            type: "task",
            id: currentTaskIdForTag,
          },
        },
        true
      );
      return data;
    },
    {
      enabled: !!tagId,
    }
  );
};
