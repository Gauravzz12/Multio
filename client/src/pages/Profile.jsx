import React, { useState } from 'react';
import { selectCurrentUser, selectCurrentAvatar } from '../features/auth/authSlice';
import { useSelector } from 'react-redux';
import { FaGamepad, FaChartLine, FaClock, FaCog, FaHistory } from "react-icons/fa";
import { Sidebar, Menu, MenuItem } from 'react-pro-sidebar';

function Profile() {
  const user = useSelector(selectCurrentUser);
  const avatar = useSelector(selectCurrentAvatar);
  const [activeTab, setActiveTab] = useState('account');
  const [collapsed, setCollapsed] = useState(false);


  const stats = {
    wins: 15,
    losses: 5,
    draws: 3,
    total_games: 23,
    win_ratio: 0.65
  };

  const renderContent = () => {
    switch (activeTab) {
      case 'account':
        return (
          <div className='space-y-6'>
            <div className='bg-gray-800 p-6 rounded-xl'>
              <h2 className='text-xl text-yellow-500 mb-4'>Account Settings</h2>
              <div className='space-y-4'>
                <div className='flex flex-col space-y-2'>
                  <label className='text-gray-400'>Username</label>
                  <input type='text' value={user} className='bg-gray-700 p-2 rounded text-white' />
                </div>
                <div className='flex flex-col space-y-2'>
                  <label className='text-gray-400'>Avatar</label>
                  <div className='flex items-center space-x-4'>
                    <img src={avatar} alt="profile" className="w-16 h-16 rounded-full" />
                    <button className='bg-yellow-600 px-4 py-2 rounded text-white'>Change Avatar</button>
                  </div>
                </div>
                <div className='flex flex-col space-y-2'>
                  <label className='text-gray-400'>Password</label>
                  <button className='bg-yellow-600 px-4 py-2 rounded text-white w-fit'>Change Password</button>
                </div>
              </div>
            </div>
          </div>
        );
      case 'stats':
        return (
          <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
            <div className='bg-gray-800 p-6 rounded-xl shadow-lg hover:shadow-yellow-600/30 transition-all'>
              <h2 className='text-yellow-500 text-lg mb-4 flex items-center'>
                <FaChartLine className="mr-2" />Statistics Overview
              </h2>
              <div className='grid grid-cols-2 gap-4'>
                <div className='text-center'>
                  <p className='text-4xl text-white font-bold'>{stats.total_games}</p>
                  <p className='text-gray-400'>Total Games</p>
                </div>
                <div className='text-center'>
                  <p className='text-4xl text-white font-bold'>{(stats.win_ratio * 100).toFixed(1)}%</p>
                  <p className='text-gray-400'>Win Rate</p>
                </div>
              </div>
            </div>
            <div className='bg-gray-800 p-6 rounded-xl shadow-lg hover:shadow-yellow-600/30 transition-all'>
              <h2 className='text-yellow-500 text-lg mb-4 flex items-center'>
                <FaGamepad className="mr-2" />Game Results
              </h2>
              <div className='space-y-4'>
                <div className='flex justify-between items-center'>
                  <span className='text-green-400'>Wins</span>
                  <span className='text-white font-bold'>{stats.wins}</span>
                </div>
                <div className='flex justify-between items-center'>
                  <span className='text-red-400'>Losses</span>
                  <span className='text-white font-bold'>{stats.losses}</span>
                </div>
                <div className='flex justify-between items-center'>
                  <span className='text-gray-400'>Draws</span>
                  <span className='text-white font-bold'>{stats.draws}</span>
                </div>
              </div>
            </div>
          </div>
        );
      case 'history':
        return (
          <div className='space-y-6'>
            <div className='bg-gray-800 p-6 rounded-xl shadow-lg hover:shadow-yellow-600/30 transition-all col-span-1 md:col-span-2 lg:col-span-2'>
              <h2 className='text-yellow-500 text-lg mb-4 flex items-center'>
                <FaClock className="mr-2" />Recent Matches
              </h2>
              <div className='space-y-3'>
                <div className='flex justify-between items-center bg-gray-700 p-3 rounded'>
                  <span className='text-green-400'>Victory</span>
                  <span className='text-gray-400'>vs Player123</span>
                  <span className='text-white'>2 days ago</span>
                </div>
                <div className='flex justify-between items-center bg-gray-700 p-3 rounded'>
                  <span className='text-red-400'>Defeat</span>
                  <span className='text-gray-400'>vs Player456</span>
                  <span className='text-white'>3 days ago</span>
                </div>
              </div>
            </div>
            <div className='bg-gray-800 p-6 rounded-xl shadow-lg hover:shadow-yellow-600/30 transition-all'>
              <h2 className='text-yellow-500 text-lg mb-4 flex items-center'>
                <FaGamepad className="mr-2" />Most Played Games
              </h2>
              <div className='space-y-3'>
                <div className='flex justify-between items-center bg-gray-700 p-3 rounded'>
                  <span className='text-white'>Tic Tac Toe</span>
                  <span className='text-gray-400'>45 matches</span>
                </div>
                <div className='flex justify-between items-center bg-gray-700 p-3 rounded'>
                  <span className='text-white'>Connect Four</span>
                  <span className='text-gray-400'>32 matches</span>
                </div>
                <div className='flex justify-between items-center bg-gray-700 p-3 rounded'>
                  <span className='text-white'>Rock Paper Scissors</span>
                  <span className='text-gray-400'>28 matches</span>
                </div>
              </div>
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <main className="flex md:flex-row min-h-screen bg-gray-900">
      <Sidebar collapsed={collapsed}>
        <Menu>
          <MenuItem
            onClick={() => setCollapsed(!collapsed)}
          >
            {!collapsed && (
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  marginLeft: "4px",
                  marginBottom: "-20px"
                }}
              >
                <div className="flex items-center p-3 mb-5">
                  <img src={avatar} alt="profile" className="w-14 h-14 rounded-full" />
                  {!collapsed && <span className="text-black text-xl font-medium truncate ml-3">{user}</span>}
                </div>
              </div>
            )}
          </MenuItem>

          <MenuItem
            icon={<FaCog />}
            onClick={() => setActiveTab('account')}
            active={activeTab === 'account'}
          >
            Account
          </MenuItem>
          <MenuItem
            icon={<FaChartLine />}
            onClick={() => setActiveTab('stats')}
            active={activeTab === 'stats'}
          >
            Statistics
          </MenuItem>
          <MenuItem
            icon={<FaHistory />}
            onClick={() => setActiveTab('history')}
            active={activeTab === 'history'}
          >
            Game History
          </MenuItem>
        </Menu>
      </Sidebar>

      <div className="flex-1 p-4 md:p-8">
        {renderContent()}
      </div>
    </main>
  );
}

export default Profile;