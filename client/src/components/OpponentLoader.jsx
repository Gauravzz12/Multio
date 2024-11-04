import React from "react";

const OpponentLoader = () => {
  return(
  <div className="flex items-center justify-center h-[450px] gap-5">
    <h1 className="text-4xl mt-4 font-bold text-amber-500">Looking for an Opponent</h1>
    <div className="flex mt-6 gap-2 items-center">
      <div className="w-4 h-4 rounded-full bg-red-500 animate-bounce"></div>
      <div className="w-4 h-4 rounded-full bg-red-500 animate-bounce [animation-delay:-.3s]"></div>
      <div className="w-4 h-4 rounded-full bg-red-500 animate-bounce [animation-delay:-.5s]"></div>
    </div>
  </div>
  )
};

export default OpponentLoader;
