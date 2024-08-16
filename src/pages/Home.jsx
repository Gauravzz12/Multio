import React from "react";
import { TypeWriterText } from "../components/UI/TypeWriterText";
import controller from '../assets/images/controller.jpeg'
function Home() {
  const textGroups = [
    [
      { text: "Welcome To", color: "text-white" },
      { text: "Multio", color: "text-[#5cd2b9]" }
    ],
    [
      { text: "Your", color: "text-white" },
      { text: "Multiplayer", color: "text-[#5cd2b9]" }
    ],
    [
      { text: "Gaming", color: "text-[#5cd2b9]" },
      { text: "Destination", color: "text-white" }
    ]
  ];

  return (
    <div className="Container  m-0 w-full h-screen pt-16 pl-24 bg-black text-white font-bold flex flex-col ">
      <div className="motto rounded text-5xl flex justify-between bg-gradient-to-r from-black from-20% to-[#5cd2b9]">
        <div className=" flex flex-col items-center justify-center">
        {textGroups.map((group, groupIndex) => (
          <div key={groupIndex} className="flex flex-row ">
            {group.map((item, itemIndex) => (
              <TypeWriterText
                key={itemIndex}
                text={item.text}
                color={item.color}
              />
            ))}
          </div>
        ))}

        </div>
          <div className="relative object-contain flex items-center p-2 mr-24">
            <img src={controller} alt="" />
          </div>
      </div>
      <div className="mt-8 text-green-800">
        <button aria-label="Play as Guest" className="px-4 py-2 bg-green-600 rounded hover:bg-green-700">
          Play as Guest
        </button>
      </div>
    </div>
  );
}

export default Home;
