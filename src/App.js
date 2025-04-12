// App.js
import React, { useState } from "react";
import Header from "./components/Header";
import HomePage from "./pages/HomePage";
import ExplorePage from "./pages/ExplorePage";
import MyPage from "./pages/MyPage";
import { NearWalletProvider } from "./contexts/NearWalletContext";
import "./index.css";

function App() {
  const [activeTab, setActiveTab] = useState('HOME');

  return (
    <NearWalletProvider>
      <div className="App flex flex-col h-screen overflow-auto bg-[#1A1A1A]">
        <Header 
          activeTab={activeTab} 
          handleTabChange={setActiveTab} 
          toggleSidebar={() => {}} // MyPage 컴포넌트에서 내부적으로 처리함
        />
        
        <div className="flex-1 overflow-auto">
          {activeTab === 'HOME' && <HomePage />}
          {activeTab === 'EXPLORE' && <ExplorePage />}
          {activeTab === 'MY' && <MyPage />}
        </div>
      </div>
    </NearWalletProvider>
  );
}

export default App;
