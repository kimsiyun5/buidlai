import React from 'react';
import { Search, User, Menu, LogOut } from 'lucide-react';
import { useNearWallet } from '../contexts/NearWalletContext';

// 지갑 연결 버튼 컴포넌트
const WalletConnection = () => {
  const { isConnected, accountId, connect, disconnect, isLoading } = useNearWallet();

  if (isLoading) {
    return (
      <button 
        className="bg-[#F8F6E9] px-4 py-1.5 rounded-lg text-sm font-medium border border-gray-300 whitespace-nowrap opacity-75"
        disabled
      >
        Loading...
      </button>
    );
  }
  
  if (isConnected && accountId) {
    return (
      <div className="flex items-center space-x-2">
        <span className="text-xs text-gray-600 hidden sm:inline">
          {accountId.length > 15 
            ? `${accountId.substring(0, 7)}...${accountId.substring(accountId.length - 5)}` 
            : accountId
          }
        </span>
        <button 
          onClick={disconnect}
          className="bg-[#F8F6E9] px-3 py-1.5 rounded-lg text-sm font-medium border border-gray-300 flex items-center space-x-1 hover:bg-[#f2efdd] transition-colors"
        >
          <LogOut size={14} />
          <span className="hidden sm:inline">Disconnect</span>
        </button>
      </div>
    );
  }

  return (
    <button 
      onClick={connect}
      className="bg-[#F8F6E9] px-4 py-1.5 rounded-lg text-sm font-medium border border-gray-300 whitespace-nowrap hover:bg-[#f2efdd] transition-colors"
    >
      Connect Wallet
    </button>
  );
};

const Header = ({ toggleSidebar }) => {
  return (
    <header className="flex items-center justify-between bg-[#F5F4EE] p-3 px-4 md:px-8 border-b border-gray-200 z-20">
      <div className="flex items-center">
        <button 
          className="mr-2 p-1 rounded-md border border-gray-300 md:hidden"
          onClick={toggleSidebar}
        >
          <Menu size={20} />
        </button>
        <div className="flex items-center space-x-2">
          <div className="w-6 h-6 rounded-full bg-gray-800 flex items-center justify-center text-white text-sm">N</div>
          <span className="font-bold">NillSeek</span>
        </div>
      </div>
      
      <div className="flex-1 px-4 max-w-xl mx-4">
        <div className="relative w-full">
          <input
            type="text"
            placeholder="Search Network, Keyword, and Ticker"
            className="w-full py-2 px-4 rounded-full border border-gray-300 bg-white pl-10"
          />
          <Search className="absolute left-3 top-2.5 text-gray-400 w-5 h-5" />
        </div>
      </div>
      
      <div className="flex items-center space-x-3">
        <WalletConnection />
        <div className="w-8 h-8 rounded-full bg-gray-800 flex items-center justify-center">
          <User size={16} className="text-white" />
        </div>
      </div>
    </header>
  );
};

export default Header;
