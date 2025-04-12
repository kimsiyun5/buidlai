import { useState, useEffect } from 'react';

/**
 * NEAR 지갑 연결을 관리하는 커스텀 훅
 * 단순 링크 방식으로 구현하여 안정성 확보
 */
export const useNearWallet = () => {
  // 계정 상태 관리
  const [accountId, setAccountId] = useState(null);
  // 연결 상태 관리
  const [isConnected, setIsConnected] = useState(false);
  // 로딩 상태 관리
  const [isLoading, setIsLoading] = useState(false);
  
  // 로컬 스토리지에서 저장된 계정 정보 확인
  useEffect(() => {
    const checkSavedAccount = () => {
      try {
        const savedAccount = localStorage.getItem('nearAccount');
        if (savedAccount) {
          const account = JSON.parse(savedAccount);
          setAccountId(account.accountId);
          setIsConnected(true);
        }
      } catch (error) {
        console.error("Error loading saved account:", error);
        // 손상된 데이터는 삭제
        localStorage.removeItem('nearAccount');
      } finally {
        setIsLoading(false);
      }
    };
    
    checkSavedAccount();
  }, []);

  /**
   * 지갑 연결 함수
   * NEAR 월렛 웹사이트로 사용자를 리디렉션하고,
   * 데모 계정 정보를 로컬 스토리지에 저장
   */
  const connect = () => {
    try {
      // 테스트넷 월렛 웹사이트로 이동
      window.open('https://testnet.mynearwallet.com/', '_blank');
      
      // 데모용 계정 정보 설정
      const testAccount = { accountId: 'demo.testnet' };
      setAccountId(testAccount.accountId);
      setIsConnected(true);
      
      // 연결 정보 로컬 스토리지에 저장
      localStorage.setItem('nearAccount', JSON.stringify(testAccount));
      
      // 성공 로그
      console.log('Connected to NEAR Wallet (demo mode):', testAccount.accountId);
    } catch (error) {
      console.error("Failed to connect to NEAR Wallet:", error);
      alert(`연결 오류: ${error.message || '알 수 없는 오류'}`);  
    }
  };

  /**
   * 지갑 연결 해제 함수
   * 로컬 상태와 저장된 계정 정보를 초기화
   */
  const disconnect = () => {
    try {
      // 상태 초기화
      setAccountId(null);
      setIsConnected(false);
      
      // 로컬 스토리지에서 연결 정보 삭제
      localStorage.removeItem('nearAccount');
      
      console.log('Disconnected from NEAR Wallet');
    } catch (error) {
      console.error("Failed to disconnect from NEAR Wallet:", error);
      // 오류가 발생해도 UI 상태는 초기화
      setAccountId(null);
      setIsConnected(false);
    }
  };

  return {
    isConnected,
    accountId,
    isLoading,
    connect,
    disconnect
  };
};
