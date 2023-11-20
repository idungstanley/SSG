import React from 'react';

export default function AddLineUpTask({
  setAnchorEl
}: {
  setAnchorEl: React.Dispatch<React.SetStateAction<HTMLElement | null>>;
}) {
  return (
    <div
      className="group p-1.5 rounded-md bg-alsoit-gray-50 cursor-pointer"
      onClick={(event) => setAnchorEl(event.currentTarget)}
    >
      <p className="flex rounded-sm justify-center p-2 border-2 w-full h-full border-alsoit-gray-75 border-dotted text-alsoit-gray-100 group-hover:border-alsoit-purple-300 group-hover:text-alsoit-purple-300">
        + Add your most Important tasks here.
      </p>
    </div>
  );
}
