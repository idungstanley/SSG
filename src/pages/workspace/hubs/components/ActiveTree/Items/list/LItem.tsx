import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { cl } from '../../../../../../../utils';
import ListIcon from '../../../../../../../assets/icons/ListIcon';

export default function LItem({ id, name, parentId }: { id: string; name: string; parentId: string | null }) {
  const { listId } = useParams();

  const navigate = useNavigate();

  const onClick = (id: string) => {
    const isActive = listId === id;

    navigate(`tasks/l/${isActive ? parentId || '' : id}`, {
      replace: true
    });
  };

  return (
    <section
      className={cl(
        'relative flex items-center justify-between h-8 space-x-1 group',
        listId === id ? 'bg-green-50 text-green-700 font-medium' : 'hover:bg-gray-100'
      )}
    >
      {listId === id && <span className="absolute top-0 bottom-0 left-0 w-1 bg-green-500 rounded-r-lg" />}
      <div onClick={() => onClick(id)} className="flex truncate items-center gap-2 cursor-pointer">
        <div className="flex items-center space-x-1 capitalize truncate cursor-pointer">
          <ListIcon />
          <div
            // onClick={() => handleListLocation(list.id, list.name)}
            style={{
              fontSize: '13px',
              lineHeight: '15.56px',
              verticalAlign: 'baseline',
              letterSpacing: '0.28px'
            }}
            className="pl-4 capitalize truncate cursor-pointer"
          >
            {name}
          </div>
        </div>
      </div>
    </section>
  );
}
