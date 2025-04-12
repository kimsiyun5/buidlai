import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { setupWalletSelector } from "@near-wallet-selector/core";
import { setupModal } from "@near-wallet-selector/modal-ui";
import { setupMyNearWallet } from "@near-wallet-selector/my-near-wallet";
import "@near-wallet-selector/modal-ui/styles.css";

// NEAR 설정
const NETWORK = "testnet";
const CONTRACT_ID = ""; // 필요한 경우 컨트랙트 ID 추가

// 에러 로깅 함수
const logError = (message, error) => {
  console.error(`[NEAR Wallet Error] ${message}:`, error);
};

// Context 생성
const NearWalletContext = createContext(null);

// Context Provider 컴포넌트
export const NearWalletProvider = ({ children }) => {
  const [selector, setSelector] = useState(null);
  const [modal, setModal] = useState(null);
  const [accounts, setAccounts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [initError, setInitError] = useState(null);

  // 초기화 여부 확인을 위한 참조값 (React StrictMode에서 이중 초기화 방지)
const initRef = React.useRef(false);

// 지갑 셀렉터 초기화
useEffect(() => {
  // 이미 초기화되었다면 중복 실행 방지
  if (initRef.current) return;
  
  const init = async () => {
    // 이미 초기화 진행 중이라면 중복 실행 방지 
    initRef.current = true;
      
    // 약간의 지연 후 초기화 (렌더링 안정성을 위해)
    const timeoutId = setTimeout(async () => {
      try {
        console.log("Initializing NEAR Wallet Selector...");
        
        // Wallet Selector 초기화
        const selector = await setupWalletSelector({
          network: NETWORK,
          modules: [setupMyNearWallet()],
          debug: false // 프로덕션에서는 false로 설정
        });

        console.log("NEAR Wallet Selector initialized successfully!");
        
        // 모달 UI 초기화
        const modal = setupModal(selector, {
          contractId: CONTRACT_ID,
          description: "NEAR 지갑을 연결하여 블록체인과 상호작용하세요.",
          containerClassName: "wallet-modal-wrapper",
          modalContainerId: "wallet-modal-root"
        });

          console.log("NEAR Wallet Modal initialized successfully!");
          
          // 상태 구독
          const subscription = selector.store.observable.subscribe((state) => {
            console.log("Wallet state changed:", state);
            if (state?.accounts) {
              setAccounts(state.accounts);
            }
          });

          // 초기 상태 설정
          const state = selector.store.getState();
          setAccounts(state.accounts || []);
          
          setSelector(selector);
          setModal(modal);
          setLoading(false);
          setInitError(null);

          return () => {
            subscription?.unsubscribe?.();
            clearTimeout(timeoutId);
          };
        } catch (error) {
          logError('Failed to initialize wallet selector', error);
          setInitError(error.message || "Failed to initialize wallet");
          setLoading(false);
          // 초기화 오류 처리
          handleInitError(error);
        }
      }, 1000);
      
      return () => clearTimeout(timeoutId);
    };

    init();
  }, []);

  // 초기화 오류 처리
  const handleInitError = (error) => {
    console.error("NEAR Wallet initialization error:", error);
    setInitError(error.message || "Failed to initialize wallet");
    setLoading(false);
    // 사용자에게 오류 알림 추가 가능
  };

  // 지갑 연결 함수
  const connectWallet = useCallback(async () => {
    if (initError) {
      alert("지갑 연결 초기화 오류\n" + initError);
      return;
    }
    
    if (!modal) {
      logError("Modal not initialized");
      return;
    }
    
    try {
      console.log("Opening wallet selector modal...");
      modal.show();
    } catch (error) {
      logError("Error showing modal", error);
      // 초기화 오류 처리
      handleInitError(error);
    }
  }, [modal, initError]);

  // 지갑 연결 해제 함수
  const disconnectWallet = useCallback(async () => {
    if (initError) {
      setAccounts([]);
      return;
    }
    
    if (!selector) {
      logError("Selector not initialized");
      return;
    }
    
    try {
      console.log("Signing out of wallet...");
      const wallet = await selector.wallet();
      await wallet.signOut();
      console.log("Successfully signed out");
    } catch (error) {
      logError("Error signing out", error);
      // 수동으로 상태 재설정
      setAccounts([]);
    }
  }, [selector, initError]);

  // 트랜잭션 전송 함수
  const signAndSendTransaction = useCallback(async (receiverId, actions) => {
    if (initError) {
      throw new Error("Wallet initialization error: " + initError);
    }
    
    if (!selector) {
      throw new Error("Wallet selector not initialized");
    }
    
    if (accounts.length === 0) {
      throw new Error("No account connected");
    }

    try {
      console.log("Signing and sending transaction...");
      const wallet = await selector.wallet();
      return await wallet.signAndSendTransaction({ 
        receiverId,
        actions 
      });
    } catch (error) {
      logError("Transaction error", error);
      throw error;
    }
  }, [selector, accounts, initError]);

  // 현재 연결된 계정 ID 가져오기
  const getActiveAccountId = useCallback(() => {
    if (accounts.length > 0) {
      return accounts[0].accountId;
    }
    return null;
  }, [accounts]);

  const contextValue = {
    selector,
    modal,
    accounts,
    loading,
    isConnected: accounts.length > 0,
    accountId: getActiveAccountId(),
    connect: connectWallet,
    disconnect: disconnectWallet,
    signAndSendTransaction,
    error: initError
  };

  return (
    <NearWalletContext.Provider value={contextValue}>
      {children}
    </NearWalletContext.Provider>
  );
};

// 커스텀 훅
export const useNearWallet = () => {
  const context = useContext(NearWalletContext);
  if (!context) {
    throw new Error("useNearWallet must be used within a NearWalletProvider");
  }
  return context;
};
