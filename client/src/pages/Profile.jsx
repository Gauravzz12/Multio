import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { selectCurrentUser, selectCurrentAvatar } from '../features/auth/authSlice';
import defaultAvatar from '../assets/images/default-avatar.png';
import { FiTarget } from "react-icons/fi";
import { 
  FaTrophy, 
  FaFire, 
  FaMedal, 
  FaCrown, 
  FaBolt, 
  FaUsers, 
  FaRocket,
  FaUser,
  FaGamepad,
  FaHistory,
  FaStar,
  FaChartLine,
  FaCalendarAlt,
  FaClock,
  FaGem,
  FaAward
} from 'react-icons/fa';

function Profile() {
  const user = useSelector(selectCurrentUser);
  const avatar = useSelector(selectCurrentAvatar) === 'Guest' ? defaultAvatar : useSelector(selectCurrentAvatar);
  const [activeTab, setActiveTab] = useState('overview');

  const stats = {
    wins: 47,
    losses: 12,
    draws: 8,
    total_games: 67,
    win_ratio: 0.70,
    streak: 5,
    rank: 'Diamond',
    experience: 2840,
    level: 12,
    hoursPlayed: 24,
    favoriteGame: 'Rock Paper Scissors'
  };

  const achievements = [
    { 
      id: 1, 
      name: 'First Victory', 
      description: 'Win your first game', 
      icon: FaTrophy, 
      unlocked: true,
      rarity: 'common',
      unlockedDate: '2 days ago'
    },
    { 
      id: 2, 
      name: 'Streak Master', 
      description: 'Win 5 games in a row', 
      icon: FaFire, 
      unlocked: true,
      rarity: 'rare',
      unlockedDate: '1 day ago'
    },
    { 
      id: 3, 
      name: 'Century Club', 
      description: 'Play 100 games', 
      icon: FaMedal, 
      unlocked: false,
      rarity: 'epic',
      progress: 67
    },
    { 
      id: 4, 
      name: 'Perfect Player', 
      description: 'Win 10 games without a loss', 
      icon: FaCrown, 
      unlocked: true,
      rarity: 'legendary',
      unlockedDate: '3 days ago'
    },
    { 
      id: 5, 
      name: 'Speed Demon', 
      description: 'Win a game in under 30 seconds', 
      icon: FaBolt, 
      unlocked: false,
      rarity: 'rare',
      progress: 0
    },
    { 
      id: 6, 
      name: 'Strategist', 
      description: 'Win 25 Tic Tac Toe games', 
      icon: FiTarget, 
      unlocked: true,
      rarity: 'uncommon',
      unlockedDate: '5 days ago'
    },
    {
      id: 7,
      name: 'Social Butterfly',
      description: 'Play with 10 different opponents',
      icon: FaUsers,
      unlocked: true,
      rarity: 'common',
      unlockedDate: '1 week ago'
    },
    {
      id: 8,
      name: 'Comeback King',
      description: 'Win after being 2 points behind',
      icon: FaRocket,
      unlocked: false,
      rarity: 'epic',
      progress: 0
    }
  ];

  const recentMatches = [
    { 
      id: 1, 
      game: 'Rock Paper Scissors', 
      opponent: 'DragonSlayer99', 
      result: 'win', 
      score: '3-1', 
      date: '2 hours ago',
      duration: '2m 34s',
      xpGained: 25
    },
    { 
      id: 2, 
      game: 'Tic Tac Toe', 
      opponent: 'MindBender', 
      result: 'win', 
      score: '2-0', 
      date: '5 hours ago',
      duration: '1m 42s',
      xpGained: 20
    },
    { 
      id: 3, 
      game: 'Connect Four', 
      opponent: 'StrategyKing', 
      result: 'loss', 
      score: '1-2', 
      date: '1 day ago',
      duration: '4m 12s',
      xpGained: 5
    },
    { 
      id: 4, 
      game: 'Word Battle', 
      opponent: 'Wordsmith42', 
      result: 'win', 
      score: '3-2', 
      date: '1 day ago',
      duration: '3m 56s',
      xpGained: 30
    },
    { 
      id: 5, 
      game: 'Memory Match', 
      opponent: 'BrainPower', 
      result: 'draw', 
      score: '1-1', 
      date: '2 days ago',
      duration: '2m 18s',
      xpGained: 10
    }
  ];

  const gameStats = [
    { game: 'Rock Paper Scissors', played: 28, won: 20, winRate: 71, favorite: true },
    { game: 'Tic Tac Toe', played: 22, won: 16, winRate: 73, favorite: false },
    { game: 'Connect Four', played: 12, won: 8, winRate: 67, favorite: false },
    { game: 'Word Battle', played: 5, won: 3, winRate: 60, favorite: false }
  ];

  const getRarityColor = (rarity) => {
    switch (rarity) {
      case 'common': return 'from-gray-400 to-gray-600';
      case 'uncommon': return 'from-green-400 to-green-600';
      case 'rare': return 'from-blue-400 to-blue-600';
      case 'epic': return 'from-purple-400 to-purple-600';
      case 'legendary': return 'from-yellow-400 to-orange-500';
      default: return 'from-gray-400 to-gray-600';
    }
  };

  const getResultColor = (result) => {
    switch (result) {
      case 'win': return 'text-green-400 bg-green-500/10 border-green-500/30';
      case 'loss': return 'text-red-400 bg-red-500/10 border-red-500/30';
      case 'draw': return 'text-yellow-400 bg-yellow-500/10 border-yellow-500/30';
      default: return 'text-gray-400 bg-gray-500/10 border-gray-500/30';
    }
  };

  const TabButton = ({ id, label, icon: Icon, isActive, onClick }) => (
    <button
      onClick={() => onClick(id)}
      className={`flex items-center gap-3 px-6 py-3 rounded-xl font-medium transition-all duration-300 ${
        isActive
          ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-lg transform scale-105'
          : 'text-slate-400 hover:text-white hover:bg-slate-700/50 hover:scale-105'
      }`}
    >
      <Icon className="w-5 h-5" />
      <span className="hidden sm:inline">{label}</span>
    </button>
  );

  const OverviewTab = () => (
    <div className="space-y-8">
      {/* Stats Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
        <div className="glass backdrop-blur-xl border border-white/20 rounded-2xl p-6 text-center hover:scale-105 transition-all duration-300">
          <div className="text-3xl font-bold text-green-400 mb-2">{stats.wins}</div>
          <div className="text-slate-400 text-sm">Wins</div>
        </div>
        <div className="glass backdrop-blur-xl border border-white/20 rounded-2xl p-6 text-center hover:scale-105 transition-all duration-300">
          <div className="text-3xl font-bold text-red-400 mb-2">{stats.losses}</div>
          <div className="text-slate-400 text-sm">Losses</div>
        </div>
        <div className="glass backdrop-blur-xl border border-white/20 rounded-2xl p-6 text-center hover:scale-105 transition-all duration-300">
          <div className="text-3xl font-bold text-yellow-400 mb-2">{stats.draws}</div>
          <div className="text-slate-400 text-sm">Draws</div>
        </div>
        <div className="glass backdrop-blur-xl border border-white/20 rounded-2xl p-6 text-center hover:scale-105 transition-all duration-300">
          <div className="text-3xl font-bold text-purple-400 mb-2">{Math.round(stats.win_ratio * 100)}%</div>
          <div className="text-slate-400 text-sm">Win Rate</div>
        </div>
      </div>

      {/* Level Progress */}
      <div className="glass backdrop-blur-xl border border-white/20 rounded-2xl p-6">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h3 className="text-xl font-bold text-white">Level {stats.level}</h3>
            <p className="text-slate-400">Rank: {stats.rank}</p>
          </div>
          <div className="text-right">
            <div className="text-2xl font-bold text-purple-400">{stats.experience}</div>
            <div className="text-slate-400 text-sm">XP</div>
          </div>
        </div>
        <div className="w-full bg-slate-700 rounded-full h-3">
          <div 
            className="bg-gradient-to-r from-purple-500 to-pink-500 h-3 rounded-full transition-all duration-500"
            style={{ width: `${(stats.experience % 1000) / 10}%` }}
          ></div>
        </div>
        <div className="flex justify-between text-xs text-slate-400 mt-2">
          <span>{stats.experience % 1000} XP</span>
          <span>{1000 - (stats.experience % 1000)} XP to level {stats.level + 1}</span>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid md:grid-cols-2 gap-6">
        <div className="glass backdrop-blur-xl border border-white/20 rounded-2xl p-6">
          <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
            <FaFire className="text-orange-400" />
            Current Streak
          </h3>
          <div className="text-center">
            <div className="text-4xl font-bold text-orange-400 mb-2">{stats.streak}</div>
            <p className="text-slate-400">games won in a row</p>
          </div>
        </div>
        <div className="glass backdrop-blur-xl border border-white/20 rounded-2xl p-6">
          <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
            <FaClock className="text-blue-400" />
            Total Playtime
          </h3>
          <div className="text-center">
            <div className="text-4xl font-bold text-blue-400 mb-2">{stats.hoursPlayed}</div>
            <p className="text-slate-400">hours played</p>
          </div>
        </div>
      </div>
    </div>
  );

  const AchievementsTab = () => (
    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
      {achievements.map((achievement) => {
        const IconComponent = achievement.icon;
        return (
          <div key={achievement.id} className={`glass backdrop-blur-xl border rounded-2xl p-6 transition-all duration-300 hover:scale-105 ${
            achievement.unlocked ? 'border-white/20 hover:border-purple-400/50' : 'border-gray-600/20 opacity-60'
          }`}>
            <div className="flex items-start gap-4">
              <div className={`p-3 rounded-xl bg-gradient-to-r ${getRarityColor(achievement.rarity)}`}>
                <IconComponent className="w-6 h-6 text-white" />
              </div>
              <div className="flex-1">
                <h3 className={`font-semibold mb-1 ${achievement.unlocked ? 'text-white' : 'text-gray-400'}`}>
                  {achievement.name}
                </h3>
                <p className={`text-sm mb-2 ${achievement.unlocked ? 'text-slate-300' : 'text-gray-500'}`}>
                  {achievement.description}
                </p>
                <div className={`inline-block px-2 py-1 rounded-full text-xs font-medium bg-gradient-to-r ${getRarityColor(achievement.rarity)} text-white`}>
                  {achievement.rarity}
                </div>
                {achievement.unlocked ? (
                  <p className="text-xs text-green-400 mt-2">Unlocked {achievement.unlockedDate}</p>
                ) : (
                  achievement.progress !== undefined && (
                    <div className="mt-3">
                      <div className="w-full bg-gray-700 rounded-full h-2">
                        <div 
                          className="bg-gradient-to-r from-purple-500 to-pink-500 h-2 rounded-full transition-all duration-500"
                          style={{ width: `${achievement.progress}%` }}
                        ></div>
                      </div>
                      <p className="text-xs text-slate-400 mt-1">{achievement.progress}% complete</p>
                    </div>
                  )
                )}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );

  const StatsTab = () => (
    <div className="space-y-6">
      <div className="glass backdrop-blur-xl border border-white/20 rounded-2xl p-6">
        <h3 className="text-xl font-semibold text-white mb-6 flex items-center gap-2">
          <FaGamepad className="text-purple-400" />
          Game Statistics
        </h3>
        <div className="space-y-4">
          {gameStats.map((game, index) => (
            <div key={index} className="flex items-center justify-between p-4 bg-slate-800/30 rounded-xl">
              <div className="flex items-center gap-3">
                <div className={`p-2 rounded-lg ${game.favorite ? 'bg-yellow-500/20' : 'bg-purple-500/20'}`}>
                  {game.favorite && <FaStar className="w-4 h-4 text-yellow-400" />}
                  {!game.favorite && <FaGamepad className="w-4 h-4 text-purple-400" />}
                </div>
                <div>
                  <h4 className="font-medium text-white">{game.game}</h4>
                  <p className="text-sm text-slate-400">{game.played} games played</p>
                </div>
              </div>
              <div className="text-right">
                <div className="text-lg font-bold text-white">{game.won}/{game.played}</div>
                <div className={`text-sm ${game.winRate >= 70 ? 'text-green-400' : game.winRate >= 50 ? 'text-yellow-400' : 'text-red-400'}`}>
                  {game.winRate}% win rate
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  const HistoryTab = () => (
    <div className="space-y-4">
      {recentMatches.map((match) => (
        <div key={match.id} className="glass backdrop-blur-xl border border-white/20 rounded-2xl p-6 hover:scale-102 transition-all duration-300">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className={`px-3 py-1 rounded-full text-sm font-medium border ${getResultColor(match.result)}`}>
                {match.result.toUpperCase()}
              </div>
              <div>
                <h4 className="font-semibold text-white">{match.game}</h4>
                <p className="text-slate-400 text-sm">vs {match.opponent}</p>
              </div>
            </div>
            <div className="text-right">
              <div className="text-white font-semibold">{match.score}</div>
              <div className="text-slate-400 text-sm">{match.date}</div>
            </div>
          </div>
          <div className="flex items-center gap-6 mt-4 pt-4 border-t border-slate-700">
            <div className="flex items-center gap-2 text-slate-400 text-sm">
              <FaClock className="w-4 h-4" />
              {match.duration}
            </div>
            <div className="flex items-center gap-2 text-slate-400 text-sm">
              <FaGem className="w-4 h-4" />
              +{match.xpGained} XP
            </div>
          </div>
        </div>
      ))}
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 opacity-30">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-purple-500 rounded-full mix-blend-multiply filter blur-xl animate-pulse"></div>
        <div className="absolute top-3/4 right-1/4 w-96 h-96 bg-pink-500 rounded-full mix-blend-multiply filter blur-xl animate-pulse animation-delay-2000"></div>
        <div className="absolute bottom-1/4 left-1/2 w-96 h-96 bg-indigo-500 rounded-full mix-blend-multiply filter blur-xl animate-pulse animation-delay-4000"></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 py-8">
        {/* Profile Header */}
        <div className="glass backdrop-blur-xl border border-white/20 rounded-3xl p-8 mb-8">
          <div className="flex flex-col md:flex-row items-center gap-6">
            <div className="relative">
              <img 
                src={avatar} 
                alt={user} 
                className="w-24 h-24 rounded-full border-4 border-purple-500 shadow-2xl"
              />
              <div className="absolute -bottom-2 -right-2 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full p-2">
                <FaAward className="w-4 h-4 text-white" />
              </div>
            </div>
            <div className="text-center md:text-left flex-1">
              <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">{user}</h1>
              <div className="flex flex-wrap items-center gap-4 justify-center md:justify-start">
                <span className="bg-gradient-to-r from-purple-500 to-pink-500 text-white px-4 py-2 rounded-full text-sm font-medium">
                  Level {stats.level}
                </span>
                <span className="bg-gradient-to-r from-yellow-500 to-orange-500 text-white px-4 py-2 rounded-full text-sm font-medium">
                  {stats.rank}
                </span>
                <span className="text-slate-300 text-sm flex items-center gap-1">
                  <FaCalendarAlt className="w-4 h-4" />
                  Joined 2 months ago
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="flex flex-wrap gap-4 mb-8 justify-center md:justify-start">
          <TabButton
            id="overview"
            label="Overview"
            icon={FaUser}
            isActive={activeTab === 'overview'}
            onClick={setActiveTab}
          />
          <TabButton
            id="achievements"
            label="Achievements"
            icon={FaTrophy}
            isActive={activeTab === 'achievements'}
            onClick={setActiveTab}
          />
          <TabButton
            id="stats"
            label="Statistics"
            icon={FaChartLine}
            isActive={activeTab === 'stats'}
            onClick={setActiveTab}
          />
          <TabButton
            id="history"
            label="Match History"
            icon={FaHistory}
            isActive={activeTab === 'history'}
            onClick={setActiveTab}
          />
        </div>

        {/* Tab Content */}
        <div className="animate-in slide-in-from-bottom duration-500">
          {activeTab === 'overview' && <OverviewTab />}
          {activeTab === 'achievements' && <AchievementsTab />}
          {activeTab === 'stats' && <StatsTab />}
          {activeTab === 'history' && <HistoryTab />}
        </div>
      </div>
    </div>
  );
}

export default Profile;