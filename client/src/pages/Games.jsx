import React from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setGameMode } from "../features/games/gameSlice";
import { 
  FaClock, 
  FaUsers, 
  FaStar, 
  FaFire, 
  FaBolt,
  FaTrophy,
  FaLock,
  FaPlay,
  FaBrain,
  FaThumbsUp
} from "react-icons/fa";

function Games() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleGameClick = (game) => {
    if (game.available) {
      dispatch(setGameMode(""));
      navigate(`/Games/${game.game}`);
    }
  };

  const availableGames = [
    {
      title: "Rock Paper Scissors",
      description: "Quick reflexes and mind games in this timeless classic",
      game: "RPS",
      icon: "✂️",
      color: "from-pink-500 to-rose-500",
      stats: "2 Players • Best of 5",
      difficulty: "Easy",
      playTime: "2-5 min",
      available: true,
      popularity: 95,
      featured: true,
      category: "Classic"
    },
    {
      title: "Tic Tac Toe",
      description: "Strategic thinking meets classic gameplay",
      game: "TTT",
      icon: "⭕",
      color: "from-purple-500 to-indigo-500",
      stats: "2 Players • First to Win",
      difficulty: "Medium",
      playTime: "1-3 min",
      available: true,
      popularity: 88,
      featured: true,
      category: "Strategy"
    },
  ];

  const comingSoonGames = [
    {
      title: "Connect Four",
      description: "Drop your discs strategically to connect four in a row",
      game: "C4",
      icon: "🔴",
      color: "from-red-500 to-orange-500",
      stats: "2 Players • Best of 3",
      difficulty: "Medium",
      playTime: "5-10 min",
      available: false,
      popularity: 82,
      category: "Strategy",
      comingSoon: "Dec 2024"
    },
    {
      title: "Chess",
      description: "The ultimate strategy game for grandmasters",
      game: "CHESS",
      icon: "♛",
      color: "from-gray-700 to-gray-900",
      stats: "2 Players • Tournament Rules",
      difficulty: "Hard",
      playTime: "10-60 min",
      available: false,
      popularity: 90,
      category: "Strategy",
      comingSoon: "Jan 2025"
    },
    {
      title: "Word Battle",
      description: "Test your vocabulary in this word-building showdown",
      game: "WORD",
      icon: "📝",
      color: "from-green-500 to-teal-500",
      stats: "2-4 Players • Time Limited",
      difficulty: "Medium",
      playTime: "3-8 min",
      available: false,
      popularity: 75,
      category: "Word Games",
      comingSoon: "Feb 2025"
    },
    {
      title: "Memory Match",
      description: "Challenge your memory with card matching puzzles",
      game: "MEMORY",
      icon: "🧠",
      color: "from-blue-500 to-cyan-500",
      stats: "2 Players • Memory Challenge",
      difficulty: "Easy",
      playTime: "2-5 min",
      available: false,
      popularity: 70,
      category: "Puzzle",
      comingSoon: "Mar 2025"
    },
    {
      title: "Number Crunch",
      description: "Fast-paced mathematical challenges and calculations",
      game: "MATH",
      icon: "🔢",
      color: "from-yellow-500 to-amber-500",
      stats: "2-6 Players • Quick Math",
      difficulty: "Medium",
      playTime: "3-7 min",
      available: false,
      popularity: 65,
      category: "Educational",
      comingSoon: "Apr 2025"
    },
    {
      title: "Snake Battle",
      description: "Classic snake game with multiplayer mayhem",
      game: "SNAKE",
      icon: "🐍",
      color: "from-emerald-500 to-green-600",
      stats: "2-8 Players • Survival Mode",
      difficulty: "Hard",
      playTime: "5-15 min",
      available: false,
      popularity: 85,
      category: "Action",
      comingSoon: "May 2025"
    },
    {
      title: "Puzzle Quest",
      description: "Solve intricate puzzles faster than your opponents",
      game: "PUZZLE",
      icon: "🧩",
      color: "from-teal-500 to-blue-500",
      stats: "2-4 Players • Puzzle Race",
      difficulty: "Medium",
      playTime: "4-12 min",
      available: false,
      popularity: 72,
      category: "Puzzle",
      comingSoon: "Jun 2025"
    },
    {
      title: "Trivia Championship",
      description: "Ultimate knowledge showdown across multiple categories",
      game: "TRIVIA",
      icon: "🎓",
      color: "from-indigo-500 to-purple-500",
      stats: "2-8 Players • Knowledge Test",
      difficulty: "Medium",
      playTime: "5-15 min",
      available: false,
      popularity: 78,
      category: "Educational",
      comingSoon: "Jul 2025"
    }
  ];

  const getDifficultyColor = (difficulty) => {
    switch (difficulty) {
      case "Easy": return "text-green-400";
      case "Medium": return "text-yellow-400";
      case "Hard": return "text-red-400";
      default: return "text-slate-400";
    }
  };

  const GameCard = ({ game, isComingSoon = false }) => (
    <div
      onClick={() => handleGameClick(game)}
      className={`group relative glass backdrop-blur-xl border border-white/20 rounded-3xl p-8 transition-all duration-500 hover:scale-[1.02] hover:border-white/40 ${
        game.available 
          ? "cursor-pointer hover:shadow-2xl hover:shadow-purple-500/20" 
          : "cursor-not-allowed opacity-75"
      }`}
    >
      {/* Game Icon & Category */}
      <div className="flex items-start justify-between mb-6">
        <div className="flex items-center gap-4">
          <div className={`text-5xl p-4 rounded-2xl bg-gradient-to-r ${game.color} text-white shadow-lg`}>
            {game.icon}
          </div>
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="text-xs px-3 py-1 bg-slate-700/50 text-slate-300 rounded-full">
                {game.category}
              </span>
              {game.featured && (
                <span className="text-xs px-3 py-1 bg-gradient-to-r from-yellow-500 to-orange-500 text-white rounded-full flex items-center gap-1">
                  <FaStar className="w-3 h-3" />
                  Featured
                </span>
              )}
              {isComingSoon && (
                <span className="text-xs px-3 py-1 bg-orange-500/20 text-orange-400 rounded-full">
                  {game.comingSoon}
                </span>
              )}
            </div>
          </div>
        </div>
        
        {/* Popularity indicator */}
        <div className="flex items-center gap-2">
          <FaFire className="w-4 h-4 text-orange-400" />
          <span className="text-sm text-slate-400">{game.popularity}%</span>
        </div>
      </div>

      {/* Game Title & Description */}
      <div className="mb-6">
        <h3 className="text-2xl font-bold text-white mb-3 group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:from-purple-400 group-hover:to-pink-400 group-hover:bg-clip-text transition-all duration-300">
          {game.title}
        </h3>
        <p className="text-slate-300 leading-relaxed">
          {game.description}
        </p>
      </div>

      {/* Game Stats */}
      <div className="grid grid-cols-2 gap-4 mb-8">
        <div className="flex items-center gap-3">
          <FaUsers className="w-4 h-4 text-blue-400" />
          <span className="text-sm text-slate-300">{game.stats}</span>
        </div>
        <div className="flex items-center gap-3">
          <FaClock className="w-4 h-4 text-green-400" />
          <span className="text-sm text-slate-300">{game.playTime}</span>
        </div>
        <div className="flex items-center gap-3">
          <FaBrain className="w-4 h-4 text-purple-400" />
          <span className={`text-sm font-medium ${getDifficultyColor(game.difficulty)}`}>
            {game.difficulty}
          </span>
        </div>
        <div className="flex items-center gap-3">
          <FaThumbsUp className="w-4 h-4 text-pink-400" />
          <span className="text-sm text-slate-300">
            {Math.floor(Math.random() * 500) + 100} likes
          </span>
        </div>
      </div>

      {/* Action Button */}
      <div className="flex items-center justify-between">
        {game.available ? (
          <button className={`flex items-center gap-3 px-8 py-4 bg-gradient-to-r ${game.color} text-white font-semibold rounded-2xl transform group-hover:scale-105 transition-all duration-300 hover:shadow-2xl`}>
            <FaPlay className="w-4 h-4" />
            <span>Play Now</span>
          </button>
        ) : (
          <button className="flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-gray-600 to-gray-700 text-gray-300 font-semibold rounded-2xl cursor-not-allowed">
            <FaLock className="w-4 h-4" />
            <span>Coming Soon</span>
          </button>
        )}

        <div className={`transition-colors duration-300 ${
          game.available ? "text-slate-400 group-hover:text-white" : "text-slate-600"
        }`}>
          <svg
            className={`w-6 h-6 transform transition-transform duration-300 ${
              game.available && "group-hover:translate-x-1"
            }`}
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 5l7 7-7 7"
            />
          </svg>
        </div>
      </div>

      {/* Animated border for available games */}
      {game.available && (
        <div className="absolute inset-0 rounded-3xl bg-gradient-to-r from-purple-500 via-pink-500 to-indigo-500 opacity-0 group-hover:opacity-100 transition-opacity duration-500 -z-10 blur-sm"></div>
      )}
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-20 left-10 w-96 h-96 bg-purple-500 rounded-full mix-blend-multiply filter blur-xl animate-pulse"></div>
        <div className="absolute top-40 right-10 w-96 h-96 bg-pink-500 rounded-full mix-blend-multiply filter blur-xl animate-pulse animation-delay-2000"></div>
        <div className="absolute bottom-20 left-1/2 w-96 h-96 bg-indigo-500 rounded-full mix-blend-multiply filter blur-xl animate-pulse animation-delay-4000"></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header Section */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-3 bg-gradient-to-r from-purple-500/20 to-pink-500/20 border border-purple-500/30 rounded-full px-6 py-3 mb-8">
            <FaTrophy className="text-yellow-400 w-5 h-5" />
            <span className="text-purple-200 font-medium">Choose Your Battle Arena</span>
          </div>
          
          <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold mb-6 leading-tight">
            <span className="bg-gradient-to-r from-purple-400 via-pink-400 to-indigo-400 bg-clip-text text-transparent">
              Game Collection
            </span>
          </h1>
          
          <p className="text-xl text-slate-300 max-w-3xl mx-auto leading-relaxed">
            Challenge friends in real-time multiplayer games. From quick matches to strategic battles, 
            find your perfect game and dominate the leaderboards.
          </p>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-16">
          <div className="glass backdrop-blur-xl border border-white/20 rounded-2xl p-6 text-center hover:scale-105 transition-transform duration-300">
            <div className="inline-flex items-center justify-center w-12 h-12 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-xl mb-4">
              <FaPlay className="w-6 h-6 text-white" />
            </div>
            <div className="text-2xl font-bold text-white mb-1">2</div>
            <div className="text-slate-400 text-sm">Available Games</div>
          </div>
          
          <div className="glass backdrop-blur-xl border border-white/20 rounded-2xl p-6 text-center hover:scale-105 transition-transform duration-300">
            <div className="inline-flex items-center justify-center w-12 h-12 bg-gradient-to-r from-purple-500 to-indigo-500 rounded-xl mb-4">
              <FaUsers className="w-6 h-6 text-white" />
            </div>
            <div className="text-2xl font-bold text-white mb-1">1K+</div>
            <div className="text-slate-400 text-sm">Active Players</div>
          </div>
          
          <div className="glass backdrop-blur-xl border border-white/20 rounded-2xl p-6 text-center hover:scale-105 transition-transform duration-300">
            <div className="inline-flex items-center justify-center w-12 h-12 bg-gradient-to-r from-green-500 to-emerald-500 rounded-xl mb-4">
              <FaBolt className="w-6 h-6 text-white" />
            </div>
            <div className="text-2xl font-bold text-white mb-1">5K+</div>
            <div className="text-slate-400 text-sm">Daily Matches</div>
          </div>
          
          <div className="glass backdrop-blur-xl border border-white/20 rounded-2xl p-6 text-center hover:scale-105 transition-transform duration-300">
            <div className="inline-flex items-center justify-center w-12 h-12 bg-gradient-to-r from-yellow-500 to-orange-500 rounded-xl mb-4">
              <FaTrophy className="w-6 h-6 text-white" />
            </div>
            <div className="text-2xl font-bold text-white mb-1">6</div>
            <div className="text-slate-400 text-sm">Coming Soon</div>
          </div>
        </div>

        {/* Available Games Section */}
        <section className="mb-16">
          <div className="flex items-center gap-3 mb-8">
            <div className="p-3 bg-gradient-to-r from-green-500 to-emerald-500 rounded-xl">
              <FaPlay className="w-6 h-6 text-white" />
            </div>
            <div>
              <h2 className="text-3xl font-bold text-white">Ready to Play</h2>
              <p className="text-slate-400">Jump into action with these available games</p>
            </div>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {availableGames.map((game, index) => (
              <GameCard key={index} game={game} />
            ))}
          </div>
        </section>

        {/* Coming Soon Games Section */}
        <section>
          <div className="flex items-center gap-3 mb-8">
            <div className="p-3 bg-gradient-to-r from-orange-500 to-red-500 rounded-xl">
              <FaLock className="w-6 h-6 text-white" />
            </div>
            <div>
              <h2 className="text-3xl font-bold text-white">Coming Soon</h2>
              <p className="text-slate-400">Exciting new games on the horizon</p>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {comingSoonGames.map((game, index) => (
              <GameCard key={index} game={game} isComingSoon={true} />
            ))}
          </div>
        </section>

        {/* Newsletter Signup */}
        <section className="mt-20">
          <div className="glass backdrop-blur-xl border border-white/20 rounded-3xl p-12 text-center">
            <h3 className="text-3xl font-bold text-white mb-4">Stay Updated</h3>
            <p className="text-xl text-slate-300 mb-8 max-w-2xl mx-auto">
              Be the first to know when new games launch and get exclusive access to beta features.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-6 py-3 bg-slate-800/50 border border-slate-600 rounded-xl text-white placeholder-slate-400 focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              />
              <button className="px-8 py-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white font-semibold rounded-xl hover:scale-105 transition-transform duration-300">
                Subscribe
              </button>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}

export default Games;
