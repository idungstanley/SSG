import React, { useState } from 'react';
import { ICustomField } from '../../../../../../features/task/taskSlice';
import { IField } from '../../../../../../features/list/list.interfaces';
import { useUpdateEntityCustomFieldValue } from '../../../../../../features/list/listService';
import { ratingProperties } from '../../../../../../features/task/interface.tasks';

interface RatingField {
  taskCustomFields?: ICustomField;
  taskId: string;
  fieldId: string;
  entityCustomProperty?: IField;
}

function RatingField({ taskCustomFields, taskId, fieldId, entityCustomProperty }: RatingField) {
  const ratingLen = (entityCustomProperty?.properties as ratingProperties).number;
  const emoji = (entityCustomProperty?.properties as ratingProperties).emoji;
  const emojiArr = new Array(ratingLen).fill(emoji);
  const [taskrating, setTaskRating] = useState(taskCustomFields ? parseInt(taskCustomFields.values[0].value) : 0);

  const { mutate: onUpdate } = useUpdateEntityCustomFieldValue(taskId);

  const handleTaskRating = (index: number) => {
    const rating = index + 1;
    onUpdate({
      taskId,
      value: [{ value: rating.toString() }],
      fieldId
    });
    setTaskRating(index + 1);
  };

  return (
    <div>
      {emojiArr.map((emoji, idx) => {
        return (
          <span
            key={idx}
            style={{ filter: idx >= taskrating ? 'grayscale(100%)' : '' }}
            className="text-gray-300 cursor-pointer"
            onClick={() => handleTaskRating(idx)}
          >
            {emoji}
          </span>
        );
      })}
    </div>
  );
}

export default RatingField;
