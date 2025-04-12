import React, { useState, useEffect, useRef } from 'react';

const HomePage = () => {
  const [selectedChain, setSelectedChain] = useState('Chain');
  const [selectedProject, setSelectedProject] = useState('Project Genre');
  const [selectedQuest, setSelectedQuest] = useState('Quest Type');
  const [showChainToggle, setShowChainToggle] = useState(false);
  const [showProjectToggle, setShowProjectToggle] = useState(false);
  const [showQuestToggle, setShowQuestToggle] = useState(false);
  const [chainDropdownWidth, setChainDropdownWidth] = useState(0);
  const [projectDropdownWidth, setProjectDropdownWidth] = useState(0);
  const [questDropdownWidth, setQuestDropdownWidth] = useState(0);
  
  const chainToggleRef = useRef(null);
  const chainButtonRef = useRef(null);
  const chainMeasureRef = useRef(null);
  
  const projectToggleRef = useRef(null);
  const projectButtonRef = useRef(null);
  const projectMeasureRef = useRef(null);
  
  const questToggleRef = useRef(null);
  const questButtonRef = useRef(null);
  const questMeasureRef = useRef(null);
  
  const chains = ['Ethereum', 'Base', 'Arbitrum One'];
  const projects = ['PerpDex', 'P2E', 'Mainnet', 'DeFi'];
  const quests = ['Check-In', 'Social', 'Transaction', 'Mint'];
  
  // Chain을 기본값으로 설정
  
  const handleChainSelect = (chain) => {
    setSelectedChain(chain);
    setShowChainToggle(false);
  };
  
  const handleProjectSelect = (project) => {
    setSelectedProject(project);
    setShowProjectToggle(false);
  };
  
  const handleQuestSelect = (quest) => {
    setSelectedQuest(quest);
    setShowQuestToggle(false);
  };
  
  const [chainTogglePosition, setChainTogglePosition] = useState({ top: 0, left: 0 });
  const [projectTogglePosition, setProjectTogglePosition] = useState({ top: 0, left: 0 });
  const [questTogglePosition, setQuestTogglePosition] = useState({ top: 0, left: 0 });

  const toggleChainDropdown = () => {
    if (chainButtonRef.current) {
      const buttonRect = chainButtonRef.current.getBoundingClientRect();
      const parentRect = chainButtonRef.current.closest('.search-container').getBoundingClientRect();
      
      // 부모 요소 기준의 상대 위치 계산
      setChainTogglePosition({
        top: buttonRect.bottom - parentRect.top + 8, // 버튼의 하단에서 8px 아래
        left: buttonRect.left - parentRect.left, // 버튼의 왼쪽 경계에 맞춤
      });
    }
    setShowChainToggle(!showChainToggle);
    setShowProjectToggle(false);
    setShowQuestToggle(false);
  };
  
  const toggleProjectDropdown = () => {
    if (projectButtonRef.current) {
      const buttonRect = projectButtonRef.current.getBoundingClientRect();
      const parentRect = projectButtonRef.current.closest('.search-container').getBoundingClientRect();
      
      setProjectTogglePosition({
        top: buttonRect.bottom - parentRect.top + 8,
        left: buttonRect.left - parentRect.left,
      });
    }
    setShowProjectToggle(!showProjectToggle);
    setShowChainToggle(false);
    setShowQuestToggle(false);
  };
  
  const toggleQuestDropdown = () => {
    if (questButtonRef.current) {
      const buttonRect = questButtonRef.current.getBoundingClientRect();
      const parentRect = questButtonRef.current.closest('.search-container').getBoundingClientRect();
      
      setQuestTogglePosition({
        top: buttonRect.bottom - parentRect.top + 8,
        left: buttonRect.left - parentRect.left,
      });
    }
    setShowQuestToggle(!showQuestToggle);
    setShowChainToggle(false);
    setShowProjectToggle(false);
  };
  
  // 텍스트 너비 계산 함수
  const calculateMaxTextWidth = (items, measureRef) => {
    if (!measureRef.current) return 0;
    
    let maxWidth = 0;
    const tempDiv = document.createElement('div');
    tempDiv.style.position = 'absolute';
    tempDiv.style.visibility = 'hidden';
    tempDiv.style.whiteSpace = 'nowrap';
    tempDiv.style.fontFamily = getComputedStyle(measureRef.current).fontFamily;
    tempDiv.style.fontSize = getComputedStyle(measureRef.current).fontSize;
    document.body.appendChild(tempDiv);
    
    items.forEach(item => {
      tempDiv.textContent = item;
      const width = tempDiv.offsetWidth;
      if (width > maxWidth) {
        maxWidth = width;
      }
    });
    
    document.body.removeChild(tempDiv);
    // 아이콘 너비 + 패딩 + 여백 고려해서 최소 120px 추가
    return maxWidth + 120;
  };
  
  // 토글 팝업 표시될 때 너비 계산
  useEffect(() => {
    if (showChainToggle) {
      const width = calculateMaxTextWidth(chains, chainMeasureRef);
      // 최소 너비 설정
      setChainDropdownWidth(Math.max(width, 150));
    }
  }, [showChainToggle]);
  
  useEffect(() => {
    if (showProjectToggle) {
      const width = calculateMaxTextWidth(projects, projectMeasureRef);
      setProjectDropdownWidth(Math.max(width, 150));
    }
  }, [showProjectToggle]);
  
  useEffect(() => {
    if (showQuestToggle) {
      const width = calculateMaxTextWidth(quests, questMeasureRef);
      setQuestDropdownWidth(Math.max(width, 150));
    }
  }, [showQuestToggle]);

  // Add click outside listener to close dropdown
  useEffect(() => {
    const handleClickOutside = (event) => {
      // Chain 드롭다운 바깥 클릭
      if (showChainToggle && 
          chainToggleRef.current && 
          !chainToggleRef.current.contains(event.target) &&
          chainButtonRef.current &&
          !chainButtonRef.current.contains(event.target)) {
        setShowChainToggle(false);
      }
      
      // Project 드롭다운 바깥 클릭
      if (showProjectToggle && 
          projectToggleRef.current && 
          !projectToggleRef.current.contains(event.target) &&
          projectButtonRef.current &&
          !projectButtonRef.current.contains(event.target)) {
        setShowProjectToggle(false);
      }
      
      // Quest 드롭다운 바깥 클릭
      if (showQuestToggle && 
          questToggleRef.current && 
          !questToggleRef.current.contains(event.target) &&
          questButtonRef.current &&
          !questButtonRef.current.contains(event.target)) {
        setShowQuestToggle(false);
      }
    };
    
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [showChainToggle, showProjectToggle, showQuestToggle]);
  
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-[#1A1A1A] text-white">
      <div className="max-w-4xl text-center px-4 -mt-[50px]">
        <h1 className="text-4xl font-bold mb-8">Hi, Siyukim! What quest should I do for you?</h1>
        
        <div className="bg-[#1A1A1A] p-6 rounded-3xl shadow-lg max-w-[1300px] mx-auto">
          {/* 흰색 박스로 감싸기 */}
          <div className="bg-[#FFFFFF] rounded-3xl px-5 py-[10px] relative search-container">
            {/* 입력창 */}
            <textarea
              placeholder="Give an order"
              rows="2"
              className="w-full px-4 py-3 bg-transparent focus:outline-none text-black placeholder-[#999999] text-lg mb-4 resize-none overflow-hidden"
            ></textarea>
            
            {/* 버튼 그룹 */}
            <div className="flex justify-between items-center">
              <div className="flex flex-wrap gap-2">
                <button className="py-1 px-4 bg-[#FFFFFF] border border-gray-300 rounded-full text-sm text-black font-medium">Only Free</button>
                <button 
                  ref={chainButtonRef}
                  className={`py-1 px-4 border border-gray-300 rounded-full text-sm relative font-medium flex items-center ${showChainToggle || selectedChain !== 'Chain' ? 'bg-[#303030] text-white' : 'bg-[#FFFFFF] text-black'}`}
                  onClick={toggleChainDropdown}
                >
                  <span>{selectedChain}</span>
                  <span className="ml-1 text-xs">▾</span>
                </button>
                <button 
                  ref={projectButtonRef}
                  className={`py-1 px-4 border border-gray-300 rounded-full text-sm relative font-medium flex items-center ${showProjectToggle || selectedProject !== 'Project Genre' ? 'bg-[#303030] text-white' : 'bg-[#FFFFFF] text-black'}`}
                  onClick={toggleProjectDropdown}
                >
                  <span>{selectedProject}</span>
                  <span className="ml-1 text-xs">▾</span>
                </button>
                <button 
                  ref={questButtonRef}
                  className={`py-1 px-4 border border-gray-300 rounded-full text-sm relative font-medium flex items-center ${showQuestToggle || selectedQuest !== 'Quest Type' ? 'bg-[#303030] text-white' : 'bg-[#FFFFFF] text-black'}`}
                  onClick={toggleQuestDropdown}
                >
                  <span>{selectedQuest}</span>
                  <span className="ml-1 text-xs">▾</span>
                </button>
              </div>
              <button className="w-8 h-8 rounded-full bg-[#367AF7] flex items-center justify-center text-white shadow-sm">
                <span className="text-xl font-bold translate-y-[-1px]">↑</span>
              </button>
            </div>
            
            {/* Chain Toggle */}
            {showChainToggle && (
              <div 
                ref={chainToggleRef} 
                className="absolute z-10 bg-[#232323] rounded-2xl shadow-lg p-2" 
                style={{
                  position: 'absolute',
                  top: `${chainTogglePosition.top}px`,
                  left: `${chainTogglePosition.left}px`,
                  width: `${chainDropdownWidth}px`
                }}
              >
                {chains.map(chain => (
                  <div 
                    key={chain}
                    className={`flex items-center gap-2 mb-2 px-3 py-2 rounded-full cursor-pointer transition-colors duration-200 whitespace-nowrap ${selectedChain === chain ? 'bg-[#367AF7] text-white' : 'text-[#FFFFFF] hover:bg-[#444444]'}`}
                    onClick={() => handleChainSelect(chain)}
                  >
                    <div className="w-6 h-6 rounded-full bg-white flex items-center justify-center">
                      <span className="text-black text-sm">☆</span>
                    </div>
                    <span ref={chainMeasureRef} className="text-base">{chain}</span>
                  </div>
                ))}
                <div className="flex items-center justify-center mt-2 mb-1">
                  <div className="w-6 h-6 rounded-full bg-[#444444] flex items-center justify-center cursor-pointer hover:bg-[#555555]">
                    <span className="text-white text-sm">+</span>
                  </div>
                </div>
              </div>
            )}
            
            {/* Project Toggle */}
            {showProjectToggle && (
              <div 
                ref={projectToggleRef} 
                className="absolute z-10 bg-[#232323] rounded-2xl shadow-lg p-2" 
                style={{
                  position: 'absolute',
                  top: `${projectTogglePosition.top}px`,
                  left: `${projectTogglePosition.left}px`,
                  width: `${projectDropdownWidth}px`
                }}
              >
                {projects.map(project => (
                  <div 
                    key={project}
                    className={`flex items-center gap-2 mb-2 px-3 py-2 rounded-full cursor-pointer transition-colors duration-200 whitespace-nowrap ${selectedProject === project ? 'bg-[#367AF7] text-white' : 'text-[#FFFFFF] hover:bg-[#444444]'}`}
                    onClick={() => handleProjectSelect(project)}
                  >
                    <div className="w-6 h-6 rounded-full bg-white flex items-center justify-center">
                      <span className="text-black text-sm">☆</span>
                    </div>
                    <span ref={projectMeasureRef} className="text-base">{project}</span>
                  </div>
                ))}
                <div className="flex items-center justify-center mt-2 mb-1">
                  <div className="w-6 h-6 rounded-full bg-[#444444] flex items-center justify-center cursor-pointer hover:bg-[#555555]">
                    <span className="text-white text-sm">+</span>
                  </div>
                </div>
              </div>
            )}
            
            {/* Quest Toggle */}
            {showQuestToggle && (
              <div 
                ref={questToggleRef} 
                className="absolute z-10 bg-[#232323] rounded-2xl shadow-lg p-2" 
                style={{
                  position: 'absolute',
                  top: `${questTogglePosition.top}px`,
                  left: `${questTogglePosition.left}px`,
                  width: `${questDropdownWidth}px`
                }}
              >
                {quests.map(quest => (
                  <div 
                    key={quest}
                    className={`flex items-center gap-2 mb-2 px-3 py-2 rounded-full cursor-pointer transition-colors duration-200 whitespace-nowrap ${selectedQuest === quest ? 'bg-[#367AF7] text-white' : 'text-[#FFFFFF] hover:bg-[#444444]'}`}
                    onClick={() => handleQuestSelect(quest)}
                  >
                    <div className="w-6 h-6 rounded-full bg-white flex items-center justify-center">
                      <span className="text-black text-sm">☆</span>
                    </div>
                    <span ref={questMeasureRef} className="text-base">{quest}</span>
                  </div>
                ))}
                <div className="flex items-center justify-center mt-2 mb-1">
                  <div className="w-6 h-6 rounded-full bg-[#444444] flex items-center justify-center cursor-pointer hover:bg-[#555555]">
                    <span className="text-white text-sm">+</span>
                  </div>
                </div>
              </div>
            )}
          </div>

        </div>
      </div>
    </div>
  );
};

export default HomePage;
