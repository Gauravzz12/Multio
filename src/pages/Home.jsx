import React from "react";
import { TypeWriterText } from "../components/UI/TypeWriterText";
import img from "../assets/images/hero.png";
import feature from "../assets/images/features.png";

function Home() {
  const textGroups = [
    [
      { text: "Welcome To", color: "text-white" },
      { text: "Multio", color: "text-[#7f5cd2]" },
    ],
    [
      { text: "Your", color: "text-white" },
      { text: "Multiplayer", color: "text-[#7f5cd2]" },
    ],
    [
      { text: "Gaming", color: "text-[#7f5cd2]" },
      { text: "Destination", color: "text-white" },
    ],
  ];

  const features = [
    {
      title: "Real-time Multiplayer",
      description: "Play with friends or match with others online.",
    },
    {
      title: "Cross-platform Play",
      description: "Enjoy gaming across devices seamlessly.",
    },
    {
      title: "Huge Game Variety",
      description: "Choose from a wide range of games to play.",
    },
    {
      title: "Game History & Stats",
      description: "View your game history and statistics.",
    },
  ];

  return (
    <main className=" m-0  bg-black text-white font-bold flex flex-col">
      <section className="motto rounded pl-24 text-5xl flex justify-between bg-gradient-to-r from-black to-[#380760] p-12">
        <article className="flex flex-col items-center justify-center">
          {textGroups.map((group, groupIndex) => (
            <div key={groupIndex} className="flex flex-row mb-4">
              {group.map((item, itemIndex) => (
                <TypeWriterText
                  key={itemIndex}
                  text={item.text}
                  color={item.color}
                />
              ))}
            </div>
          ))}
        </article>

        <div className="relative flex items-center h-96 w-96 mr-32 drop-shadow-3xl shrink-0">
          <img src={img} alt="Hero" className="object-cover rounded-lg" />
        </div>
      </section>

      <section className="Features w-full pl-32 flex justify-between  pt-12 pr-12 bg-gradient-to-r from-black to-[#022562]">
        <div className="flex flex-col mt-8 items-center">
          <div>
            <p className="text-[#7f5cd2] text-6xl font-serif">Features</p>
            <hr className="bg-[#7f5cd2] w-16 h-1 mb-4" />
            <p className="text-1xl font-serif">
              What You Will{" "}
              <span className="text-[#7f5cd2] text-3xl font-serif">
                Experience
              </span>{" "}
            </p>
          </div>
          <div className="relative h-96 w-96 drop-shadow-3xl shrink-0 flex justify-center items-center">
          <img src={feature} alt="Hero" className="object-cover rounded-lg " />
        </div>
        </div>
        <section className="grid grid-cols-2 justify-around ">
          {features.map((feature, index) => (
            <div
              key={index}
              className={`ml-28 ${index % 2 === 0 ? "-skew-y-3" : "skew-y-3"}`}
            >
              {console.log(index+1)}
              <div className="relative group cursor-pointer overflow-hidden duration-500 w-64 h-72 p-2">
                <div className={`absolute inset-0 bg-[url('../src/assets/images/${index+1}.png')] bg-contain bg-no-repeat duration-500 group-hover:blur-sm group-hover:scale-110`}></div>
                <div className="relative z-10 flex flex-col group-hover:bg-black items-center h-fit text-xl italic font-extrabold text-[#eab35b]">
                  <p className="group-hover:opacity-100 duration-300 opacity-0">
                    {feature.title}
                  </p>
                  <div className="absolute top-36 opacity-0 group-hover:opacity-100 duration-500 min-h-24 p-2 text-center text-white bg-[#380760] rounded-lg">
                    {feature.description}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </section>
      </section>
    </main>
  );
}

export default Home;
