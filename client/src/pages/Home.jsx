import React from "react";
import { useNavigate } from "react-router-dom";
import { FaPlay, FaFire, FaStar, FaTrophy, FaRocket } from "react-icons/fa";
import featureImage1 from '../assets/images/Features/1.png';
import featureImage2 from '../assets/images/Features/2.png';
import featureImage3 from '../assets/images/Features/3.png';
import featureImage4 from '../assets/images/Features/4.png';

const featureImages = [featureImage1, featureImage2, featureImage3, featureImage4];

function Home() {
  const features = [
    {
      title: "Real-time Multiplayer",
      description: "Play with friends or match with others online.",
      icon: FaPlay,
      color: "from-blue-500 to-cyan-500"
    },
    {
      title: "Cross-platform Play",
      description: "Enjoy gaming across devices seamlessly.",
      icon: FaRocket,
      color: "from-purple-500 to-indigo-500"
    },
    {
      title: "Huge Game Variety",
      description: "Choose from a wide range of games to play.",
      icon: FaStar,
      color: "from-pink-500 to-rose-500"
    },
    {
      title: "Game History & Stats",
      description: "View your game history and statistics.",
      icon: FaTrophy,
      color: "from-green-500 to-emerald-500"
    },
  ];
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-20 left-10 w-96 h-96 bg-purple-500 rounded-full mix-blend-multiply filter blur-xl animate-pulse"></div>
        <div className="absolute top-40 right-10 w-96 h-96 bg-pink-500 rounded-full mix-blend-multiply filter blur-xl animate-pulse animation-delay-2000"></div>
        <div className="absolute bottom-20 left-1/2 w-96 h-96 bg-indigo-500 rounded-full mix-blend-multiply filter blur-xl animate-pulse animation-delay-4000"></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Hero Section */}
        <section className="pt-20 pb-16 text-center">
          <div className="mb-8">
            <div className="inline-flex items-center gap-2 bg-gradient-to-r from-purple-500/20 to-pink-500/20 border border-purple-500/30 rounded-full px-6 py-3 mb-8">
              <FaFire className="text-orange-400 w-5 h-5" />
              <span className="text-purple-200 font-medium">Welcome to the Ultimate Gaming Arena</span>
            </div>
            
            <h1 className="text-6xl sm:text-7xl lg:text-8xl xl:text-9xl font-bold mb-8 leading-tight">
              <span className="bg-gradient-to-r from-purple-400 via-pink-400 to-indigo-400 bg-clip-text text-transparent animate-pulse">
                MULTIO
              </span>
            </h1>
            
            <p className="text-xl sm:text-2xl text-slate-300 max-w-3xl mx-auto leading-relaxed mb-12">
              Experience the future of multiplayer gaming. Challenge friends, meet new opponents, and climb the leaderboards in our collection of classic and modern games.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
              <button 
                onClick={() => navigate('/Games')}
                className="group bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white font-bold py-4 px-8 rounded-2xl text-lg transform hover:scale-105 transition-all duration-300 shadow-xl hover:shadow-2xl"
              >
                <div className="flex items-center gap-3">
                  <FaPlay className="w-5 h-5 group-hover:animate-bounce" />
                  <span>Start Playing</span>
                </div>
              </button>
              
              <button 
                onClick={() => navigate('/Profile')}
                className="group glass backdrop-blur-xl border border-white/20 hover:border-purple-400/50 text-white font-bold py-4 px-8 rounded-2xl text-lg transform hover:scale-105 transition-all duration-300"
              >
                <div className="flex items-center gap-3">
                  <FaTrophy className="w-5 h-5 group-hover:animate-bounce" />
                  <span>View Stats</span>
                </div>
              </button>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-20">
          <div className="text-center mb-16">
            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6 bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
              Why Choose Multio?
            </h2>
            <p className="text-xl text-slate-300 max-w-2xl mx-auto">
              Discover the features that make our platform the ultimate destination for multiplayer gaming
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => {
              const IconComponent = feature.icon;
              return (
                <div
                  key={index}
                  className="group glass backdrop-blur-xl border border-white/20 hover:border-purple-400/50 p-8 rounded-3xl transform hover:scale-105 transition-all duration-300 hover:shadow-2xl"
                  style={{ animationDelay: `${index * 200}ms` }}
                >
                  <div className={`p-4 bg-gradient-to-r ${feature.color} rounded-2xl inline-block mb-6 group-hover:scale-110 transition-transform duration-300`}>
                    <IconComponent className="w-8 h-8 text-white" />
                  </div>
                  
                  <h3 className="text-xl font-bold text-white mb-4 group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:from-purple-400 group-hover:to-pink-400 group-hover:bg-clip-text transition-all duration-300">
                    {feature.title}
                  </h3>
                  
                  <p className="text-slate-300 leading-relaxed">
                    {feature.description}
                  </p>
                </div>
              );
            })}
          </div>
        </section>

        {/* Stats Section */}
        <section className="py-20">
          <div className="glass backdrop-blur-xl border border-white/20 rounded-3xl p-12 text-center">
            <h3 className="text-3xl font-bold text-white mb-8">Join Our Growing Community</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="group">
                <div className="text-4xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent mb-2 group-hover:scale-110 transition-transform duration-300">
                  10,000+
                </div>
                <p className="text-slate-300">Active Players</p>
              </div>
              
              <div className="group">
                <div className="text-4xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent mb-2 group-hover:scale-110 transition-transform duration-300">
                  50,000+
                </div>
                <p className="text-slate-300">Games Played</p>
              </div>
              
              <div className="group">
                <div className="text-4xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent mb-2 group-hover:scale-110 transition-transform duration-300">
                  24/7
                </div>
                <p className="text-slate-300">Always Online</p>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 text-center">
          <div className="glass backdrop-blur-xl border border-white/20 rounded-3xl p-12">
            <h3 className="text-4xl font-bold text-white mb-6">Ready to Dominate?</h3>
            <p className="text-xl text-slate-300 mb-8 max-w-2xl mx-auto">
              Jump into the action and prove your skills against players from around the world.
            </p>
            
            <button 
              onClick={() => navigate('/Games')}
              className="group bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white font-bold py-4 px-12 rounded-2xl text-xl transform hover:scale-105 transition-all duration-300 shadow-xl hover:shadow-2xl"
            >
              <div className="flex items-center gap-3">
                <FaRocket className="w-6 h-6 group-hover:animate-bounce" />
                <span>Enter the Arena</span>
              </div>
            </button>
          </div>
        </section>
      </div>
    </div>
  );
}

export default Home;