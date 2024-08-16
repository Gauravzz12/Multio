import React from "react";
import { TypeWriterText } from "../components/UI/TypeWriterText";

function Home() {
  const textGroups = [
    [
      { text: "Welcome To", color: "text-white" },
      { text: "Multio", color: "text-[#59c5a6]" }
    ],
    [
      { text: "Your", color: "text-white" },
      { text: "Multiplayer", color: "text-[#59c5a6]" }
    ],
    [
      { text: "Gaming", color: "text-[#59c5a6]" },
      { text: "Destination", color: "text-white" }
    ]
  ];

  return (
    <div className="container w-full h-screen pt-24 pl-24 bg-black text-white font-bold">
      <div className="motto rounded w-full text-5xl flex flex-col bg-gradient-to-r from-black to-[#59c5a6]">
        {textGroups.map((group, groupIndex) => (
          <div key={groupIndex} className="flex flex-row">
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
      <div className="mt-8 text-green-800">
        <button aria-label="Play as Guest" className="px-4 py-2 bg-green-600 rounded hover:bg-green-700">
          Play as Guest
        </button>
      </div>
    </div>
  );
}

export default Home;
