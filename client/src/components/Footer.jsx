import React from "react";

function Footer() {
  return (
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
  );
}
export default Footer;
