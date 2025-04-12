import React from 'react';
import { Plus, X } from 'lucide-react';

const Sidebar = ({ 
  projectsData,
  sidebarOpen,
  toggleSidebar,
  selectedNetworks,
  toggleNetwork,
  selectedChains,
  toggleChain,
  selectedGenres,
  toggleGenre,
  selectedQuestTypes,
  toggleQuestType
}) => {
  return (
    <>
      {/* Sidebar - Mobile Overlay */}
      <div 
        className={`fixed md:hidden inset-0 bg-black bg-opacity-50 z-10 transition-opacity duration-300 ${
          sidebarOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
        }`}
        onClick={toggleSidebar}
      ></div>
      
      {/* Sidebar */}
      <div 
        className={`fixed md:static w-3/4 md:w-1/4 h-screen md:h-full bg-[#F5F4EE] p-4 border-r border-gray-200 flex flex-col overflow-y-auto z-10 transition-transform duration-300 transform ${
          sidebarOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'
        }`}
      >
        <div className="flex justify-between items-center md:hidden mb-4">
          <h3 className="font-bold">필터</h3>
          <button onClick={toggleSidebar} className="p-1">
            <X size={20} />
          </button>
        </div>
        
        <div className="mb-4">
          <h3 className="text-sm font-medium mb-3 select-none">Networks you follow</h3>
          <ul className="space-y-1 mb-4">
            {projectsData.map((project) => (
              <li 
                key={project.id} 
                onClick={() => toggleNetwork(project.name)}
                className={`p-2 rounded-lg flex items-center space-x-2 cursor-pointer select-none ${
                  selectedNetworks.includes(project.name) ? 'bg-[#E9E7DA]' : 'hover:bg-[#E9E7DA]/50'
                }`}
              >
                <div className="w-6 h-6 rounded-full bg-gray-800 flex items-center justify-center text-white text-xs">
                  {project.name.charAt(0)}
                </div>
                <span className="text-sm">{project.name}</span>
              </li>
            ))}
          </ul>
        </div>
        
        <div className="mt-auto">
          <div className="mb-4">
            <h3 className="text-sm font-medium mb-2 select-none">Chain</h3>
            <div className="flex flex-wrap gap-2">
              {["Ethereum", "Base", "Arbitrum One"].map((chain) => (
                <div 
                  key={chain} 
                  onClick={() => toggleChain(chain)}
                  className={`flex items-center space-x-1 rounded-full px-3 py-1 text-xs border cursor-pointer select-none transition-colors duration-200 ${
                    selectedChains.includes(chain) 
                      ? 'bg-[#E9E7DA] border-gray-800' 
                      : 'bg-white border-gray-200'
                  }`}
                >
                  <div className="w-4 h-4 rounded-full bg-gray-800 flex items-center justify-center text-white text-xs">
                    {chain.charAt(0)}
                  </div>
                  <span>{chain}</span>
                  {selectedChains.includes(chain) && (
                    <X size={12} className="ml-1 text-gray-500" onClick={(e) => {
                      e.stopPropagation();
                      toggleChain(chain);
                    }} />
                  )}
                </div>
              ))}
              <button className="w-5 h-5 rounded-full bg-white flex items-center justify-center border border-gray-200">
                <Plus size={12} />
              </button>
            </div>
          </div>
          
          <div className="mb-4">
            <h3 className="text-sm font-medium mb-2 select-none">Project Genre</h3>
            <div className="flex flex-wrap gap-2">
              {["PerpDex", "P2E", "Mainnet", "DeFi"].map((genre) => (
                <div 
                  key={genre} 
                  onClick={() => toggleGenre(genre)}
                  className={`rounded-full px-3 py-1 text-xs border cursor-pointer select-none transition-colors duration-200 ${
                    selectedGenres.includes(genre) 
                      ? 'bg-[#E9E7DA] border-gray-800' 
                      : 'bg-white border-gray-200'
                  }`}
                >
                  {genre}
                  {selectedGenres.includes(genre) && (
                    <X size={12} className="ml-1 inline text-gray-500" onClick={(e) => {
                      e.stopPropagation();
                      toggleGenre(genre);
                    }} />
                  )}
                </div>
              ))}
              <button className="w-5 h-5 rounded-full bg-white flex items-center justify-center border border-gray-200">
                <Plus size={12} />
              </button>
            </div>
          </div>
          
          <div>
            <h3 className="text-sm font-medium mb-2 select-none">Quest Type</h3>
            <div className="flex flex-wrap gap-2">
              {["Check-In", "Social", "Transaction", "Mint"].map((type) => (
                <div 
                  key={type} 
                  onClick={() => toggleQuestType(type)}
                  className={`rounded-full px-3 py-1 text-xs border cursor-pointer select-none transition-colors duration-200 ${
                    selectedQuestTypes.includes(type) 
                      ? 'bg-[#E9E7DA] border-gray-800' 
                      : 'bg-white border-gray-200'
                  }`}
                >
                  {type}
                  {selectedQuestTypes.includes(type) && (
                    <X size={12} className="ml-1 inline text-gray-500" onClick={(e) => {
                      e.stopPropagation();
                      toggleQuestType(type);
                    }} />
                  )}
                </div>
              ))}
              <button className="w-5 h-5 rounded-full bg-white flex items-center justify-center border border-gray-200">
                <Plus size={12} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Sidebar;
