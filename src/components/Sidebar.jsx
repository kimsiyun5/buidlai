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
        className={`fixed md:static w-3/4 md:w-1/4 h-screen md:h-full bg-[#1A1A1A] p-4 flex flex-col overflow-y-auto z-10 transition-transform duration-300 transform ${
          sidebarOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'
        }`}
      >
        <div className="flex justify-between items-center md:hidden mb-4">
          <h3 className="font-bold text-[#F5F9FA]">필터</h3>
          <button onClick={toggleSidebar} className="p-1 text-[#F5F9FA]">
            <X size={20} />
          </button>
        </div>
        
        <div className="mb-4">
          <h3 className="text-sm font-medium mb-3 select-none text-[#F5F9FA]">Networks following</h3>
          <ul className="space-y-1 mb-4">
            {projectsData.map((project) => (
              <li 
                key={project.id} 
                onClick={() => toggleNetwork(project.name)}
                className={`p-2 rounded-lg flex items-center space-x-2 cursor-pointer select-none transition-colors duration-200 ${
                  selectedNetworks.includes(project.name) ? 'bg-[#367AF7]' : 'hover:bg-[#2A3549]'
                }`}
              >
                <div className="w-6 h-6 rounded-full bg-gray-800 flex items-center justify-center text-white text-xs">
                  {project.name.charAt(0)}
                </div>
                <span className="text-sm text-[#F5F9FA]">{project.name}</span>
              </li>
            ))}
          </ul>
        </div>
        
        {/* 태그 부분(Chain, Project Genre, Quest Type) 삭제됨 */}
      </div>
    </>
  );
};

export default Sidebar;
