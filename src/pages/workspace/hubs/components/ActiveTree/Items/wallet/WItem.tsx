import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { cl } from '../../../../../../../utils';
import { FaFolder, FaFolderOpen } from 'react-icons/fa';
import { VscTriangleDown, VscTriangleRight } from 'react-icons/vsc';

export default function WItem({ id, name, parentId }: { id: string; name: string; parentId: string | null }) {
  const { walletId } = useParams();

  const navigate = useNavigate();

  const onClick = (id: string) => {
    const isActive = walletId === id;

    navigate(`tasks/w/${isActive ? parentId || '' : id}`, {
      replace: true
    });
  };

  return (
    <section
      className={cl(
        'flex items-center relative justify-between pr-1.5 py-1.5 text-sm h-8 group',
        walletId === id ? 'bg-green-50 text-green-700 font-medium' : 'hover:bg-gray-100'
      )}
    >
      {walletId === id && <span className="absolute top-0 bottom-0 left-0 w-1 bg-green-500 rounded-r-lg" />}
      <div onClick={() => onClick(id)} className="flex truncate items-center gap-2 cursor-pointer">
        <div className="flex items-center">
          {walletId === id ? (
            <>
              <VscTriangleDown className="flex-shrink-0 h-2" aria-hidden="true" color="rgba(72, 67, 67, 0.64)" />
              <FaFolderOpen />
            </>
          ) : (
            <>
              <VscTriangleRight className="flex-shrink-0 h-2" aria-hidden="true" color="#BBBDC0" />
              <FaFolder />
            </>
          )}
        </div>

        <div
          className="cursor-pointer hover:underline hover:decoration-dashed"
          style={{ marginLeft: '17px' }}
        >
          <p
            className="capitalize truncate cursor-pointer"
            style={{
              fontSize: '13px',
              lineHeight: '15.56px',
              verticalAlign: 'baseline',
              letterSpacing: '0.28px'
            }}
          >
            {name}
          </p>
        </div>
      </div>
    </section>
  );
}
