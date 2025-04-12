import React, { useState, useEffect, useMemo } from 'react';
import Header from './components/Header';
import Sidebar from './components/Sidebar';
import MainContent from './components/MainContent';

const Web3Homepage = () => {
  // 가짜 DB 데이터
  const projectsData = useMemo(() => [
    { 
      id: 1, 
      name: "Solana", 
      quests: [
        { id: 101, title: "Swap on Raydium", description: "0.5 SOL → 10 RAY", completed: true, time: "2 min ago" },
        { id: 102, title: "Stake in Marinade", description: "1.2 SOL staked", completed: true, time: "10 min ago" },
        { id: 103, title: "Mint Jupiter NFT", description: "Successfully minted #1234", completed: false, time: "1 hour ago" },
        { id: 104, title: "Vote on Proposal", description: "Governance proposal #78", completed: true, time: "5 hours ago" },
        { id: 105, title: "Bridge to Ethereum", description: "5 SOL → 5 WSOL", completed: false, time: "Yesterday" }
      ]
    },
    { 
      id: 2, 
      name: "Soneium", 
      quests: [
        { id: 201, title: "Daily Check-in", description: "Day 3 of 7", completed: true, time: "1 hour ago" },
        { id: 202, title: "Add Liquidity", description: "10 USDC + 10 SONE", completed: false, time: "3 hours ago" },
        { id: 203, title: "Refer a Friend", description: "Invited 2 friends", completed: true, time: "Yesterday" }
      ]
    },
    { 
      id: 3, 
      name: "Polygon", 
      quests: [
        { id: 301, title: "Bridge from Ethereum", description: "0.1 ETH → 0.1 WETH", completed: true, time: "30 min ago" },
        { id: 302, title: "Swap on QuickSwap", description: "0.05 WETH → 100 QUICK", completed: false, time: "2 hours ago" },
        { id: 303, title: "Stake in Aave", description: "50 USDC supplied", completed: true, time: "Yesterday" },
        { id: 304, title: "Claim Rewards", description: "10 MATIC rewards", completed: false, time: "2 days ago" }
      ]
    },
    { 
      id: 4, 
      name: "Ethereum", 
      quests: [
        { id: 401, title: "Swap on Uniswap", description: "0.5 ETH → 1000 USDC", completed: true, time: "2 min ago" },
        { id: 402, title: "Stake in Lido", description: "1 ETH → 1 stETH", completed: true, time: "4 hours ago" },
        { id: 403, title: "Mint NFT", description: "Gas fee: 0.01 ETH", completed: false, time: "Yesterday" }
      ]
    },
    { 
      id: 5, 
      name: "BNB Chain", 
      quests: [
        { id: 501, title: "Swap on PancakeSwap", description: "1 BNB → 300 CAKE", completed: true, time: "1 hour ago" },
        { id: 502, title: "Farm LP Tokens", description: "Added to CAKE-BNB farm", completed: false, time: "3 hours ago" },
        { id: 503, title: "Bridge from Ethereum", description: "100 USDT → 100 USDT.bep20", completed: true, time: "Yesterday" },
        { id: 504, title: "Participate in IFO", description: "Committed 10 BNB", completed: false, time: "3 days ago" }
      ]
    },
    { 
      id: 6, 
      name: "Gravity Alpha Mainnet", 
      quests: [
        { id: 601, title: "Network Validator Setup", description: "Staked 1000 GRAV", completed: false, time: "5 hours ago" },
        { id: 602, title: "Test Transaction", description: "First tx on alpha net", completed: true, time: "Yesterday" },
        { id: 603, title: "Report Bug", description: "Found UI issue in wallet", completed: true, time: "2 days ago" }
      ]
    }
  ], []);

  // 상태 관리
  const [selectedNetworks, setSelectedNetworks] = useState([]);
  const [selectedChains, setSelectedChains] = useState(['Ethereum', 'Base', 'Arbitrum One']);
  const [selectedGenres, setSelectedGenres] = useState(['PerpDex', 'P2E', 'Mainnet', 'DeFi']);
  const [selectedQuestTypes, setSelectedQuestTypes] = useState(['Transaction']);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [selectedProject, setSelectedProject] = useState(null);
  const [contentFading, setContentFading] = useState(false);

  // 초기 로드 시 첫 번째 프로젝트 선택
  useEffect(() => {
    if (projectsData.length > 0 && !selectedProject) {
      setTimeout(() => {
        setSelectedProject(projectsData[0].id);
        setSelectedNetworks([projectsData[0].name]);
      }, 100);
    }
  }, [projectsData, selectedProject]);

  // 사이드바 토글 함수
  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  // 네트워크 선택 함수
  const toggleNetwork = (network) => {
    const project = projectsData.find(p => p.name === network);
    if (project && project.id !== selectedProject) {
      setContentFading(true);
      setTimeout(() => {
        setSelectedProject(project.id);
        setSelectedNetworks([network]);
        setTimeout(() => {
          setContentFading(false);
        }, 50);
      }, 300);
    }
  };

  // 태그 토글 함수들
  const toggleChain = (chain) => {
    if (selectedChains.includes(chain)) {
      setSelectedChains(selectedChains.filter(c => c !== chain));
    } else {
      setSelectedChains([...selectedChains, chain]);
    }
  };
  
  const toggleGenre = (genre) => {
    if (selectedGenres.includes(genre)) {
      setSelectedGenres(selectedGenres.filter(g => g !== genre));
    } else {
      setSelectedGenres([...selectedGenres, genre]);
    }
  };
  
  const toggleQuestType = (type) => {
    if (selectedQuestTypes.includes(type)) {
      setSelectedQuestTypes(selectedQuestTypes.filter(t => t !== type));
    } else {
      setSelectedQuestTypes([...selectedQuestTypes, type]);
    }
  };

  return (
    <div className="flex flex-col h-screen overflow-hidden bg-[#FAF9F5]">
      {/* Header */}
      <Header toggleSidebar={toggleSidebar} />

      {/* Body */}
      <div className="flex flex-1 overflow-hidden bg-[#FAF9F5]">
        <Sidebar 
          projectsData={projectsData}
          sidebarOpen={sidebarOpen}
          toggleSidebar={toggleSidebar}
          selectedNetworks={selectedNetworks}
          toggleNetwork={toggleNetwork}
          selectedChains={selectedChains}
          toggleChain={toggleChain}
          selectedGenres={selectedGenres}
          toggleGenre={toggleGenre}
          selectedQuestTypes={selectedQuestTypes}
          toggleQuestType={toggleQuestType}
        />
        
        <MainContent 
          projectsData={projectsData}
          selectedProject={selectedProject}
          contentFading={contentFading}
          sidebarOpen={sidebarOpen}
        />
      </div>
    </div>
  );
};

export default Web3Homepage;