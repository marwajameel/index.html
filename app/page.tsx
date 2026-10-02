import React from 'react';

export default function CustomDashboard() {
  return (
    <div className="min-h-screen bg-black text-white p-6 flex flex-col items-center justify-center font-sans">
      {/* Main Card Container */}
      <div className="w-full max-w-md bg-gradient-to-b from-gray-900 to-black border border-gray-800 rounded-3xl p-6 shadow-2xl relative overflow-hidden">
        
        {/* Header / Brand */}
        <div className="flex justify-between items-center mb-6">
          <div className="flex items-center gap-2">
            <span className="text-xl font-bold bg-gradient-to-r from-pink-500 to-purple-500 bg-clip-text text-transparent">
              SDN News & Wallet
            </span>
          </div>
          <span className="text-xs bg-gray-800 px-3 py-1 rounded-full text-gray-400">Live</span>
        </div>

        {/* 7d Realized Profit Section */}
        <div className="mb-6">
          <p className="text-gray-400 text-sm mb-1">7d Realized Profit</p>
          <h1 className="text-4xl font-extrabold text-green-400 tracking-tight">
            +$242.07
          </h1>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 gap-4 mb-6 bg-gray-900/50 p-4 rounded-2xl border border-gray-800/50">
          <div>
            <p className="text-gray-400 text-xs">Total PnL</p>
            <p className="text-lg font-bold text-green-400">+$10.92K</p>
          </div>
          <div>
            <p className="text-gray-400 text-xs">Unrealized Profits</p>
            <p className="text-lg font-bold text-red-400">-$150.51</p>
          </div>
          <div>
            <p className="text-gray-400 text-xs">7d TXs</p>
            <p className="text-base font-semibold text-white">2/3</p>
          </div>
          <div>
            <p className="text-gray-400 text-xs">Active Wallet</p>
            <p className="text-base font-semibold text-yellow-400">MJ04</p>
          </div>
        </div>

        {/* Auto System Status */}
        <div className="mb-6 bg-green-950/30 border border-green-800/50 p-3 rounded-xl flex items-center justify-between">
          <span className="text-xs text-green-300 font-medium">Auto-Gas & Multi-Wallet System</span>
          <span className="flex h-2 w-2 relative">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
          </span>
        </div>

        {/* Invitation / Share Section */}
        <div className="bg-gray-900 p-4 rounded-2xl border border-gray-800 flex justify-between items-center">
          <div>
            <p className="text-xs text-gray-400">Invitation Code</p>
            <p className="text-sm font-mono font-bold text-white">HPvOjvSk</p>
          </div>
          <button 
            onClick={() => alert('Link Copied!')}
            className="bg-white text-black font-semibold text-xs px-4 py-2 rounded-xl hover:bg-gray-200 transition"
          >
            Share App
          </button>
        </div>

      </div>
    </div>
  );
}
