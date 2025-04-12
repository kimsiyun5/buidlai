import React from 'react';

// 뉴스 카드용 데이터
const getStartedItems = [
  {
    id: 1,
    title: 'Get Started',
    participants: '1.1만',
    image: '/background1.webp',
    logo: '/images/zaptask-logo.png',
    badges: ['/images/badge1.png', '/images/badge2.png']
  },
  {
    id: 2,
    title: 'The Fastest Onchain Experience',
    participants: '6.4천',
    image: '/background2.webp',
    logo: '/images/zaptask-logo.png',
    badges: ['/images/badge1.png', '/images/badge2.png']
  },
  {
    id: 3,
    title: 'Earning on Layer3',
    participants: '9.7천',
    image: '/background3.webp',
    logo: '/images/zaptask-logo.png',
    badges: ['/images/badge1.png', '/images/badge2.png']
  }
];

const recommendedItems = [
  {
    id: 1,
    title: 'Trade over $10 & Earn a Share of $4000!',
    participants: '314 participants',
    points: '10 Points',
    tokens: '30',
    logo: '/images/universeX.png',
    company: 'UniverseX',
    tokenImage: '/images/usdt.png',
    tokenAmount: '4,000 USDT'
  },
  {
    id: 2,
    title: '$MBG REWARDS PROGRAM',
    participants: '114.77k participants',
    points: 'Points',
    tokens: '250',
    logo: '/images/multibank.png',
    company: 'MultiBank Group',
    promo: 'Early Access to $MBG'
  },
  {
    id: 3,
    title: '🚀 Neva Debut Campaign: Follow X & Win from 1000 USDT rewards!',
    participants: '155.46k participants',
    tokens: '30',
    logo: '/images/neva.png',
    company: 'Neva',
    tokenImage: '/images/usdt.png',
    tokenAmount: '1,000 USDT'
  },
  {
    id: 4,
    title: 'The Defi App Infiltration: Unlock the SuperApp',
    participants: '13.85k participants',
    points: 'Points',
    tokens: '150',
    logo: '/images/defi.png',
    company: 'Defi App',
  },
  {
    id: 5,
    title: 'Register on Travala & WIN $500 USDT ✈️',
    participants: '33.38k participants',
    points: '80 Points',
    tokens: '30',
    logo: '/images/travala.png',
    company: 'Travala.com',
    tokenImage: '/images/usdt.png',
    tokenAmount: '500 USDT'
  },
  {
    id: 6,
    title: 'Win 100 USDC Prize - Compete "Building on MANTRA Chain" Course on Metaschool',
    participants: '18.39k participants',
    tokens: '30',
    logo: '/images/metaschool.png',
    company: 'Metaschool',
    tokenImage: '/images/usdc.png',
    tokenAmount: '100 USDC'
  }
];

// 뉴스 카드 컴포넌트
const NewsCard = ({ item, type }) => {
  if (type === 'getStarted') {
    return (
      <div className="bg-[#232323] rounded-2xl overflow-hidden mb-6 shadow-lg">

        <div className="relative">
          <img src={item.image} alt={item.title} className="w-full h-48 object-cover" />
          <div className="absolute bottom-3 left-3 bg-blue-500 text-white px-2 py-1 rounded-md text-xs">
            <span className="inline-block w-4 h-4 mr-1 bg-blue-600 rounded-full"></span>
            ZAPTASK.AI
          </div>
        </div>
        <div className="p-4">
          <h3 className="text-xl font-semibold mb-2">{item.title}</h3>
          <div className="flex justify-between items-center">
            <div className="flex items-center mr-2 mb-1">
              <div className="w-5 h-5 rounded-full mr-1 bg-gray-600"></div>
              <span className="text-sm text-gray-400">{item.participants} Participants</span>
            </div>
            <div className="flex space-x-1">
              {item.badges.map((badge, index) => (
                <div key={index} className="w-5 h-5 rounded-full bg-green-500 shadow-md"></div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  } else {
    return (
      <div className="bg-[#232323] rounded-2xl overflow-hidden mb-6 p-5 shadow-lg h-auto min-h-[200px]">
        <div className="flex flex-wrap gap-2 mb-3">
          {item.tokenImage && (
            <div className="flex items-center mr-2 mb-1">
              <div className="w-5 h-5 mr-1 bg-yellow-500 rounded-full"></div>
              <span className="text-sm">{item.tokenAmount}</span>
            </div>
          )}
          {item.points && (
            <div className="text-sm px-2 py-1 bg-[#333333] rounded-md">{item.points}</div>
          )}
          {item.tokens && (
            <div className="flex items-center text-sm px-2 py-1 bg-[#333333] rounded-md">
              <span className="text-orange-400 mr-1">🔥</span>
              <span>{item.tokens}</span>
            </div>
          )}
        </div>
        
        <h3 className="text-md font-semibold mb-3 break-words line-clamp-2">{item.title}</h3>
        
        {item.promo && (
          <div className="mb-3 p-3 bg-[#192C48] rounded-md flex items-center justify-between">
            <span className="text-sm text-[#6A8DFF] break-words mr-2">{item.promo}</span>
            <div className="w-6 h-6 bg-blue-500 rounded-full flex-shrink-0"></div>
          </div>
        )}
        
        <div className="flex justify-between items-center mt-4 text-sm">
          <div className="flex items-center">
            <div className="w-5 h-5 rounded-full mr-2 bg-gray-600"></div>
            <span className="text-gray-400">{item.company}</span>
          </div>
          <span className="text-gray-400 text-xs">{item.participants}</span>
        </div>
      </div>
    );
  }
};

const ExplorePage = () => {
  return (
    <div className="bg-[#1A1A1A] text-white pb-12 min-h-screen overflow-y-auto">
      <div className="mx-auto px-20 md:px-40 lg:px-60 xl:px-80">
        {/* Get Started Section */}
        <div className="pt-8 mb-10">
          <h2 className="text-2xl font-bold mb-6">Get Started</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {getStartedItems.map(item => (
              <NewsCard key={item.id} item={item} type="getStarted" />
            ))}
          </div>
        </div>
        
        {/* Recommended Section */}
        <div className="mb-10">
          <h2 className="text-2xl font-bold mb-6">Recommended</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {recommendedItems.map(item => (
              <NewsCard key={item.id} item={item} type="recommended" />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ExplorePage;
