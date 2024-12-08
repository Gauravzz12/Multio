import React from "react";
import img from "../assets/images/hero.png";
import feature from "../assets/images/Features/features.png";
import Popular from "../assets/images/Popular.png";
import featureImage1 from '../assets/images/Features/1.png';
import featureImage2 from '../assets/images/Features/2.png';
import featureImage3 from '../assets/images/Features/3.png';
import featureImage4 from '../assets/images/Features/4.png';
import rpsImage from '../assets/images/GameLogo/RPS.jpg';
import tttImage from '../assets/images/GameLogo/TTT.jpg';
import cardImage from '../assets/images/GameLogo/Card.jpg';
import { useNavigate } from "react-router-dom";
const featureImages = [featureImage1, featureImage2, featureImage3, featureImage4];
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
  const navigate=useNavigate();
  return (
    <main className="m-0 bg-black text-white font-bold flex flex-col scroll-smooth">
      <section className="motto rounded px-4 md:px-12 lg:px-24 text-3xl md:text-5xl flex flex-col md:flex-row justify-between items-center bg-gradient-to-r from-[#020530] to-[#13063e] py-8 md:py-12 gap-8">
        <article className="flex flex-col items-center md:items-start justify-center">
          {textGroups.map((group, index) => (
            <div key={index} className="flex flex-row mb-4 flex-wrap justify-center md:justify-start">
              {group.map((item, itemIndex) => (
                <h1 className={`${item.color} tracking-wider font-reggae-one italic mx-2`} key={itemIndex}>
                  {item.text}
                </h1>
              ))}
            </div>
          ))}
        </article>

        <picture className="relative flex items-center size-auto max-w-80 max-h-80 md:h-64 lg:h-96  md:w-64 lg:w-96 md:mr-32 drop-shadow-3xl shrink-0">
          <img src={img} alt="Hero" className="object-cover rounded-lg hover:scale-105 transition-transform duration-300 max-w-full h-auto" loading="lazy" />
        </picture>
      </section>

      <section className="Features w-full px-4 md:px-12 lg:px-24 py-12 bg-[#09012a]">
        <div className="flex flex-col-reverse lg:flex-row gap-12 ">
          <section className="grid grid-cols-1 xs:grid-cols-2 gap-8 w-full lg:w-2/3 place-items-center">
            {features.map((feature, index) => (
              <div key={index} className="transform hover:scale-105 transition-all duration-300 ">
                <div className="relative group cursor-pointer overflow-hidden rounded-xl size-auto md:h-72 xs:max-w-80 max-w-48 ">
                  <div
                    className="absolute inset-0 bg-cover bg-no-repeat bg-center duration-500 group-hover:scale-110 size-auto"
                    style={{ backgroundImage: `url(${featureImages[index]})` }}
                  />
                  <div className="absolute inset-0 bg-black/40 group-hover:bg-black/60 transition-all duration-300" />
                  <div className="relative z-10 h-full flex flex-col justify-center items-center p-6 text-center">
                    <h3 className="text-xl md:text-2xl font-bold mb-4">{feature.title}</h3>
                    <p className="opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      {feature.description}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </section>

          <div className="flex flex-col items-center lg:w-1/3 justify-center">
            <div>
              <p className="text-[#a908ff] text-4xl md:text-6xl font-serif">Features</p>
              <hr className="bg-[#f508ff] w-16 h-1 mb-4" />
              <p className="text-xl md:text-2xl font-serif">
                What You Will{" "}
                <span className="text-[#a908ff] text-3xl md:text-4xl font-serif ">
                  Experience
                </span>{" "}
              </p>
            </div>
            <picture className="relative size-auto max-w-80 max-h-80 md:h-64 lg:h-96 md:w-64 lg:w-96 drop-shadow-3xl shrink-0 flex justify-center items-center">
              <img
                src={feature}
                alt="Features"
                className="object-cover rounded-lg max-w-full h-auto"
                loading="lazy"
              />
            </picture>
          </div>
        </div>
      </section>

      <section className="Popular w-full px-4 md:px-12 lg:px-24 py-12 bg-gradient-to-r from-[#020530] to-[#13063e]">
        <div className="flex flex-col md:flex-row items-center gap-12 justify-center">
          <div className="flex flex-col items-center lg:w-1/3">
            <div>
              <p className="text-[#a908ff] text-3xl md:text-5xl font-serif mb-2 ">Popular</p>
              <hr className="bg-[#f508ff] w-16 h-1 mb-4" />
              <p className="text-[#a908ff] text-3xl md:text-5xl font-serif mb-2 ml-7 ">
                Games
              </p>
              <hr className="bg-[#f508ff] w-16 h-1 mb-4 ml-7" />
            </div>
            <picture className="relative size-auto max-w-80 max-h-80 md:h-64 lg:h-96 md:w-64 lg:w-96 drop-shadow-3xl shrink-0 flex justify-center items-center">
              <img
                src={Popular}
                alt="Popular Games"
                className="object-cover rounded-lg max-w-full h-auto"
                loading="lazy"
              />
            </picture>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-3 gap-6 size-auto lg:w-2/3 min-h-72 min-w-72 ">
            {[rpsImage, tttImage, cardImage].map((image, index) => (
              <div
                key={index}
                className="aspect-square rounded-xl  overflow-hidden transform hover:scale-105 transition-all duration-300 shadow-lg"
                style={{
                  backgroundImage: `url(${image})`,
                  backgroundSize: 'cover',
                  backgroundPosition: 'center'
                }}
                onClick={()=>{navigate(`/Games/${index===0?"RPS":index===1?"TTT":""}`)}}
              />
            ))}
          </div>
        </div>
      </section>

      <section className="footer w-full bg-[#09012a] px-4 md:px-12 py-12">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-3xl md:text-4xl text-yellow-600 font-serif mb-12 text-center">
            Get In Touch With Us
          </h1>

          <div className="flex flex-col lg:flex-row gap-12">
            <div className="text-xl md:text-2xl space-y-6 lg:w-1/3">
              {["Suggest Games You'd Love to Play", "Report Issues or Bugs", "Share Feedback on Gameplay Experience"].map((text, index) => (
                <div key={index} className="border-2 rounded-xl p-4 bg-[#3c256e] hover:bg-[#4c357e] transition-colors duration-300 text-center">
                  {text}
                </div>
              ))}
            </div>

            <form className="bg-gradient-to-r from-[#7b7fc7] to-[#3d258b] rounded-lg shadow-xl p-6 lg:w-2/3">
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
          </div>
        </div>
      </section>
    </main>
  );
}

export default Home;