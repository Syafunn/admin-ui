import React, { useState } from 'react';

const PostCard = ({ id, userId, title, body }) => {
const [isClicked, setIsClicked] = useState(false);

  return (
    <div className="flex flex-col p-4 border-2 border-transparent bg-white rounded-xl shadow-md transition-all duration-300 
                hover:scale-105 hover:border-gray-300 hover:bg-pink-50 group h-full">
  
  <h2 className="text-base font-bold mb-2 text-center text-gray-800 capitalize leading-tight">
    {title}
  </h2>

  <p className="flex-grow text-gray-600 mb-4 text-center text-xs leading-normal">
    {body}
  </p>

  <div className="mt-auto"> 
    <button
      onClick={() => setIsClicked(true)}
      className={`w-full py-2 px-3 text-sm rounded-lg font-semibold transition-all duration-300
        ${isClicked 
          ? 'bg-special-red2 text-white' 
          : 'bg-gray-500 text-white hover:bg-gray-400'
        }`}
    >
      {isClicked ? "Tombol sudah diklik" : "Silakan Klik"}
    </button>
  </div>
</div>
  );
};

export default PostCard;