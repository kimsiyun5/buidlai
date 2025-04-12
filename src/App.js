// App.js
import React from "react";
import Web3Homepage from "./Web3Homepage";
import { NearWalletProvider } from "./contexts/NearWalletContext";
import "./index.css";

function App() {
  return (
    <NearWalletProvider>
      <div className="App">
        <Web3Homepage />
      </div>
    </NearWalletProvider>
  );
}

export default App;
