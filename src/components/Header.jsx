import React from 'react';
import { Search, User, Menu, LogOut, Zap } from 'lucide-react';
import { useNearWallet } from '../contexts/NearWalletContext';

// 지갑 연결 버튼 컴포넌트
const WalletConnection = () => {
  const { isConnected, accountId, connect, disconnect, isLoading } = useNearWallet();

  if (isLoading) {
    return (
      <button 
        className="px-4 py-1.5 rounded-lg text-sm font-medium text-white opacity-75"
        disabled
      >
        Loading...
      </button>
    );
  }
  
  if (isConnected && accountId) {
    return (
      <div className="flex items-center space-x-3">
        <div className="px-4 py-1 rounded-full text-sm font-medium text-white bg-gray-800 border border-gray-700">
          {accountId.length > 10 
            ? `${accountId.substring(0, 5)}...${accountId.substring(accountId.length - 5)}` 
            : accountId
          }
        </div>
        <button 
          onClick={disconnect}
          className="px-3 py-1 rounded-lg text-sm font-medium text-white border border-gray-700 hover:bg-gray-800 transition-colors flex items-center"
        >
          <LogOut size={14} className="mr-1" />
          Disconnect
        </button>
      </div>
    );
  }

  return (
    <button 
      onClick={connect}
      className="px-4 py-1.5 rounded-lg text-sm font-medium text-white whitespace-nowrap bg-[#367AF7] hover:bg-[#2864d9] transition-colors"
    >
      Connect Wallet
    </button>
  );
};

const NavItem = ({ text, active, onClick }) => (
  <div 
    className={`px-14 py-2 ${active ? 'text-[#F5F9FA]' : 'text-[#454545]'} font-medium mx-6 cursor-pointer`}
    onClick={onClick}
  >
    {text}
  </div>
);

const Header = ({ toggleSidebar, activeTab = 'HOME', handleTabChange }) => {
  return (
    <header className="flex items-center justify-between bg-[#1A1A1A] p-3 px-4 md:px-8 border-b border-gray-800 z-20 text-white">
      <div className="flex items-center">
        <button 
          className="mr-2 p-1 rounded-md border border-gray-700 md:hidden text-white"
          onClick={toggleSidebar}
        >
          <Menu size={20} />
        </button>
        <div className="flex items-center space-x-2">
          <Zap className="text-white" />
          <span className="font-bold">ZAPTASK.AI</span>
        </div>
      </div>
      
      <div className="flex items-center">
        <NavItem 
          text="HOME" 
          active={activeTab === 'HOME'} 
          onClick={() => handleTabChange('HOME')} 
        />
        <NavItem 
          text="EXPLORE" 
          active={activeTab === 'EXPLORE'} 
          onClick={() => handleTabChange('EXPLORE')} 
        />
        <NavItem 
          text="MY" 
          active={activeTab === 'MY'} 
          onClick={() => handleTabChange('MY')} 
        />
      </div>
      
      <div className="flex items-center space-x-3">
        <WalletConnection />
        <div className="w-8 h-8 rounded-full bg-white flex items-center justify-center">
          <User size={16} className="text-black" />
        </div>
      </div>
    </header>
  );
};

export default Header;
