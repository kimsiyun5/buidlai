import React from 'react';
import { ArrowRight, RefreshCw } from 'lucide-react';

const MainContent = ({ 
  projectsData, 
  selectedProject, 
  contentFading, 
  sidebarOpen 
}) => {
  return (
    <div className="w-full md:w-3/4 overflow-y-auto h-full px-4 md:px-6 py-4">
      {sidebarOpen && <div className="md:hidden mb-4 h-4"></div>}
      
      {/* Quest Section */}
      <div className="mb-16 bg-white rounded-lg p-4 shadow-sm">
        {selectedProject ? (
          <div className={`transition-all duration-300 ${contentFading ? 'opacity-0 transform translate-y-4' : 'opacity-100 transform translate-y-0'}`}>
            <h2 className="text-xl md:text-2xl font-bold mb-4 select-none">
              {projectsData.find(p => p.id === selectedProject)?.name}'s Quest
            </h2>
            <div className="space-y-3">
              {projectsData.find(p => p.id === selectedProject)?.quests.map((quest) => (
                <div 
                  key={quest.id} 
                  className={`relative rounded-lg bg-white shadow-sm flex justify-between items-center border ${quest.completed ? 'border-l-4 border-l-green-500' : 'border-l-4 border-l-gray-300'}`}
                >
                  <div className="flex items-center p-3 w-full">
                    <div className="flex-shrink-0 w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center mr-3">
                      <RefreshCw size={16} className="text-gray-600" />
                    </div>
                    <div className="flex-grow">
                      <h3 className="font-medium">{quest.title}</h3>
                      <p className="text-sm text-gray-600">{quest.description}</p>
                    </div>
                    <div className="text-right text-sm text-gray-500 ml-3">
                      {quest.time}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ) : (
          <div className="flex justify-center items-center h-48">
            <p className="text-gray-500">팔로우한 프로젝트가 없습니다.</p>
          </div>
        )}
      </div>
      
      {/* Recommended Section */}
      <div className="h-auto md:h-2/5 mt-4">
        <div className={`flex justify-between items-center mb-3 transition-all duration-300 ${contentFading ? 'opacity-0' : 'opacity-100'}`}>
          <h2 className="text-lg md:text-xl font-bold select-none">Recommended</h2>
          <button className="text-xs md:text-sm flex items-center text-gray-600">
            See more <ArrowRight size={16} className="ml-1" />
          </button>
        </div>
        
        <div className={`grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-2 md:gap-3 transition-all duration-300 ${contentFading ? 'opacity-0 transform translate-y-4' : 'opacity-100 transform translate-y-0'}`}>
          {[1, 2, 3, 4, 5].map((item) => (
            <div key={item} className="bg-gray-200 rounded-lg h-28 md:h-32 shadow-sm"></div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MainContent;
