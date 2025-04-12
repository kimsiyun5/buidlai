// 전역 객체 초기화
window.nearWallet = {
  initialized: false,
  selector: null,
  modal: null
};

// 문서가 로드되면 NEAR Wallet Selector 초기화
document.addEventListener('DOMContentLoaded', () => {
  // CDN 스크립트가 로드되는 시간을 주기 위해 약간 디레이 적용
  setTimeout(async () => {
    try {
      console.log('CDN 객체 확인:', { 
        nearApi: window.nearApi,
        walletSelector: window.nearWalletSelector
      });
      
      // NEAR API 확인
      if (!window.nearApi) {
        console.error("NEAR API not loaded");
        return;
      }
      
      // Wallet Selector 확인
      if (!window.nearWalletSelector) {
        console.error("NEAR Wallet Selector not loaded");
        return;
      }
      
      // CDN에서 로드한 객체 사용
      
      // NEAR Wallet Selector 초기화 (CDN 객체 구조 사용)
      const selector = await window.nearWalletSelector.selector({
        network: "testnet",
        modules: [
          window.nearWalletSelector.modules.myNearWallet()
        ],
      });

      // 모달 UI 설정
      const modal = window.nearWalletSelector.modal.init({
        selector: selector,
        contractId: "", // 필요한 경우 컨트랙트 ID 추가
        description: "NEAR 지갑을 연결하세요"
      });

      // 전역 변수로 노출
      window.nearWallet = {
        initialized: true,
        selector,
        modal,
        isSignedIn: () => {
          try {
            const state = selector.store.getState();
            return state.accounts.length > 0;
          } catch (e) {
            console.error("Error checking signed in status:", e);
            return false;
          }
        },
        getAccounts: () => {
          try {
            return selector.store.getState().accounts;
          } catch (e) {
            console.error("Error getting accounts:", e);
            return [];
          }
        },
        signIn: () => {
          try {
            modal.show();
          } catch (e) {
            console.error("Error showing modal:", e);
          }
        },
        signOut: async () => {
          try {
            const wallet = await selector.wallet();
            await wallet.signOut();
          } catch (e) {
            console.error("Error signing out:", e);
          }
        }
      };

      // 상태 변경 이벤트 설정
      selector.store.observable.subscribe((state) => {
        if (state && state.accounts && state.accounts.length > 0) {
          const accountId = state.accounts[0].accountId;
          console.log("Connected with:", accountId);
          
          // 연결된 상태를 알리는 이벤트 발생
          const event = new CustomEvent('walletConnected', { 
            detail: { accountId } 
          });
          window.dispatchEvent(event);
        } else {
          console.log("Wallet disconnected");
          
          // 연결 해제 이벤트 발생
          const event = new CustomEvent('walletDisconnected');
          window.dispatchEvent(event);
        }
      });

      console.log("NEAR Wallet Selector initialized");
    } catch (err) {
      console.error("Failed to initialize NEAR Wallet Selector:", err);
    }
  }, 1500); // 1.5초 지연
});
