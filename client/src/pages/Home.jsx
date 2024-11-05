import React from "react";
import img from "../assets/images/hero.png";
import feature from "../assets/images/Features/features.png";
import Popular from "../assets/images/Popular.jpg";
function Home() {
  const textGroups = [
    [
      { text: "Welcome To ", color: "text-white" },
      { text: " Multio", color: "text-[#a908ff]" },
    ],
    [
      { text: "Your", color: "text-white" },
      { text: " Multiplayer", color: "text-[#a908ff]" },
    ],
    [
      { text: " Gaming", color: "text-[#a908ff]" },
      { text: " Destination", color: "text-white" },
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
    <main className="m-0 bg-black text-white font-bold flex flex-col scroll-smooth">
      <section className="motto rounded pl-24 text-5xl flex justify-between bg-gradient-to-r from-[#020530] to-[#13063e] p-12">
        <article className="flex flex-col items-center justify-center">
          {textGroups.map((group, index) => (
            <div key={index} className="flex flex-row mb-4">
              {group.map((item, itemIndex) => (
                <h1
                className={`${item.color} tracking-wider font-reggae-one italic`}
                key={itemIndex}
                style={{ marginRight: "1rem" }} 
              >
                {item.text}
              </h1>
              
              ))}
            </div>
          ))}
        </article>

        <picture className="relative flex items-center h-96 w-96 mr-32 drop-shadow-3xl shrink-0">
          <img src={img} alt="Hero" className="object-cover rounded-lg" />
        </picture>
      </section>

      <section className="Features w-screen pr-32 flex justify-between  pt-12 pl-12 bg-[#09012a]">
        <section className="grid grid-cols-2 justify-around ">
          {features.map((feature, index) => (
            <div
              key={index}
              className={`ml-28 ${index % 2 === 0 ? "-skew-y-3" : "skew-y-3"}`}
            >
              <div className="relative group cursor-pointer overflow-hidden duration-500 w-64 h-72 p-2">
                <div
                  className="absolute inset-0 bg-contain bg-no-repeat duration-500 group-hover:blur-sm group-hover:scale-110"
                  style={{
                    backgroundImage: `url('../src/assets/images/Features/${
                      index + 1
                    }.png')`,
                  }}
                ></div>

                <div className="relative z-10 flex flex-col group-hover:bg-[#380760] items-center max-h-screen p-2 rounded-2xl text-xl italic font-extrabold text-white">
                  <p className="group-hover:opacity-100 duration-300 opacity-0">
                    {feature.title}
                  </p>
                  <div className="absolute top-36 opacity-0 group-hover:opacity-100 duration-500 min-h-24 p-2 text-center text-white bg-[#380760] rounded-2xl">
                    {feature.description}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </section>
        <div className="flex flex-col mt-8 items-center">
          <div>
            <p className="text-[#a908ff] text-6xl font-serif">Features</p>
            <hr className="bg-[#f508ff] w-16 h-1 mb-4" />
            <p className="text-1xl font-serif">
              What You Will{" "}
              <span className="text-[#a908ff] text-3xl font-serif ">
                Experience
              </span>{" "}
            </p>
          </div>
          <picture className="relative h-96 w-96 drop-shadow-3xl shrink-0 flex justify-center items-center">
            <img
              src={feature}
              alt="Hero"
              className="object-cover rounded-lg "
            />
          </picture>
        </div>
      </section>
      <section className="Popular w-screen pl-32 flex justify-between items-center pt-12 pr-12 bg-gradient-to-r from-[#020530] to-[#13063e]">
        <div className="flex flex-col mt-8 items-center">
          <div>
            <p className="text-[#a908ff] text-5xl font-serif mb-2 ">Popular</p>
            <hr className="bg-[#f508ff] w-16 h-1 mb-4" />
            <p className="text-[#a908ff] text-5xl font-serif mb-2 ml-7 ">
              Games
            </p>
            <hr className="bg-[#f508ff] w-16 h-1 mb-4 ml-7" />
          </div>
          <picture className="relative h-96 w-96 drop-shadow-3xl shrink-0 flex justify-center items-center">
            <img
              src={Popular}
              alt="Hero"
              className="object-cover rounded-lg "
            />
          </picture>
        </div>
        <div className="flex gap-5">
          <div
            className="  size-64  border-2  rounded-xl bg-no-repeat bg-top bg-cover hover:scale-110 duration-300"
            style={{
              backgroundImage: `url('../src/assets/images/GameLogo/RPS.jpg')`,
            }}
          ></div>
          <div
            className="  size-64  border-2  rounded-xl bg-no-repeat bg-center bg-cover hover:scale-110 duration-300"
            style={{
              backgroundImage: `url('../src/assets/images/GameLogo/TTT.jpg')`,
            }}
          ></div>
          <div
            className="  size-64 border-2 rounded-xl bg-no-repeat bg-center bg-cover hover:scale-110 duration-300"
            style={{
              backgroundImage: `url('../src/assets/images/GameLogo/Card.jpg')`,
            }}
          ></div>
        </div>
      </section>
      <section className="footer w-full bg-[#09012a] flex items-center flex-col ">
      <h1 className="text-4xl text-yellow-600 font-serif m-8 font-bold">
        Get In Touch With Us
      </h1>
      <main className="flex gap-24 mb-10">
        <div className="text-white text-2xl flex items-center font-serif font-bold italic">
          <ol>
            <li className=" border-4 rounded-2xl text-center p-2 bg-[#3c256e]">
              Suggest Games You’d Love to Play
            </li>
            <br></br>
            <li className=" border-4 rounded-2xl text-center p-2 bg-[#3c256e]">
              Report Issues or Bugs
            </li>
            <br></br>
            <li className="  border-4 rounded-2xl text-center p-2 bg-[#3c256e]">
              Share Feedback on Gameplay Experience
            </li>
            <br></br>
          </ol>
        </div>
        <form className="bg-gradient-to-r from-[#7b7fc7] to-[#3d258b] w-[90vw] md:w-[50vw] p-6 rounded-lg shadow-md">
          <div className="mb-4 bg-red">
            <label
              htmlFor="title"
              className="block text-gray-700 text-sm font-bold mb-2 "
            >
              Title
            </label>
            <input
              placeholder="Enter title"
              type="text"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-white leading-tight focus:outline-none focus:shadow-outline bg-blue-950"
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="content"
              className="block text-gray-700 text-sm font-bold mb-2"
            >
              Message
            </label>
            <textarea
              rows="5"
              placeholder="Enter your content"
              id="content"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-white leading-tight focus:outline-none focus:shadow-outline bg-blue-950"
            ></textarea>
          </div>
          <div className="flex items-center justify-between">
            <button
              type="submit"
              className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-sm hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            >
              Post
            </button>
            <div className="flex items-center"></div>
          </div>
        </form>
      </main>
    </section>
    </main>
  );
}

export default Home;
