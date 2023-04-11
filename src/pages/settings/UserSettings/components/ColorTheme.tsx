import React, { useState } from 'react';
import { MdDone } from 'react-icons/md';

function ColorTheme() {
  const colors = [
    {
      id: 1,
      color_code: '#7B68EE'
    },
    {
      id: 2,
      color_code: '#FFA12F'
    },
    {
      id: 3,
      color_code: '#FF5722'
    },
    {
      id: 4,
      color_code: '#F42C2C'
    },
    {
      id: 5,
      color_code: '#F8306D'
    },
    {
      id: 6,
      color_code: '#FF00FC'
    },
    {
      id: 7,
      color_code: '#4169E1'
    },
    {
      id: 8,
      color_code: '#5F81FF'
    },
    {
      id: 9,
      color_code: '#0AB4FF'
    },
    {
      id: 10,
      color_code: '#08C7E0'
    },
    {
      id: 11,
      color_code: '#07A092'
    },
    {
      id: 12,
      color_code: '#1DB954'
    },
    {
      id: 13,
      color_code: '#2EA52C'
    },
    {
      id: 14,
      color_code: '#757380'
    },
    {
      id: 15,
      color_code: '#202020'
    }
  ];
  const [selectedColor, setSelectedColor] = useState<number | null>(null);

  return (
    <div>
      <div>
        <h1 className="text-xs font-bold">SELECT YOUR THEME</h1>
      </div>
      <div className="flex flex-wrap">
        {colors.map((item) => {
          return (
            <div
              key={item.id}
              className="mx-4 my-2 w-8 h-8 flex items-center justify-center"
              onClick={() => setSelectedColor(item.id)}
            >
              {selectedColor === item.id ? (
                <div
                  className={
                    'rounded-full hover:rounded-full cursor-pointer w-8 h-8 flex justify-center items-center hover:w-8 hover-h-8'
                  }
                  style={{ backgroundColor: `${item.color_code}` }}
                >
                  <MdDone className="text-white w-4 h-4" />
                </div>
              ) : (
                <div
                  className={
                    'rounded-full hover:rounded-full cursor-pointer color_theme w-6 h-6 flex justify-center items-center'
                  }
                  style={{ backgroundColor: `${item.color_code}` }}
                ></div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default ColorTheme;
