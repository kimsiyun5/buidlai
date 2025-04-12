import React from 'react';
import { ArrowRight, RefreshCw } from 'lucide-react';

const MainContent = ({ 
  projectsData, 
  selectedProject, 
  contentFading, 
  sidebarOpen 
}) => {
  return (
    <div className="w-full md:w-3/4 overflow-y-auto h-full px-4 md:px-6 py-4 bg-[#212121]">
      {sidebarOpen && <div className="md:hidden mb-4 h-4"></div>}
      
      {/* Quest Section */}
      <div className="mb-16 bg-[#212121] rounded-lg p-4 shadow-sm">
        {selectedProject ? (
          <div className={`transition-all duration-300 ${contentFading ? 'opacity-0 transform translate-y-4' : 'opacity-100 transform translate-y-0'}`}>
            <h2 className="text-xl md:text-2xl font-bold mb-4 select-none text-[#F5F9FA]">
              {projectsData.find(p => p.id === selectedProject)?.name}'s Quest
            </h2>
            <div className="space-y-3">
              {projectsData.find(p => p.id === selectedProject)?.quests.map((quest) => (
                <div 
                  key={quest.id} 
                  className={`relative rounded-lg bg-[#444444] shadow-sm flex justify-between items-center ${quest.completed ? 'border-l-4 border-l-[#367AF7]' : 'border-l-4 border-l-gray-600'}`}
                >
                  <div className="flex items-center p-3 w-full">
                    <div className="flex-shrink-0 w-8 h-8 rounded-full bg-gray-700 flex items-center justify-center mr-3">
                      <RefreshCw size={16} className="text-[#F5F9FA]" />
                    </div>
                    <div className="flex-grow">
                      <h3 className="font-medium text-[#F5F9FA]">{quest.title}</h3>
                      <p className="text-sm text-gray-300">{quest.description}</p>
                    </div>
                    <div className="text-right text-sm text-gray-300 ml-3">
                      {quest.time}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ) : (
          <div className="flex justify-center items-center h-48">
            <p className="text-gray-400">팔로우한 프로젝트가 없습니다.</p>
          </div>
        )}
      </div>
      {/* Recommended Section 삭제됨 */}
    </div>
  );
};

export default MainContent;
