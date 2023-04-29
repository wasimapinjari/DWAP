import React, { useState } from "react";
import { Principal } from "@dfinity/principal";
import { token } from "../../../declarations/token";

function Balance() {

  
  const [balance, setBalance] = useState("");
  const [showBalance, setShowBalance] = useState("");
  const [isHidden, setIsHidden] = useState(true);
  const [isHidden2, setIsHidden2] = useState(true);

  async function handleClick() {
    try {
      const principal = Principal.fromText(balance);
      const balanceResult = await token.checkBalanceOf(principal);
      const symbol = await token.showSymbol();
      setShowBalance(balanceResult.toLocaleString() + " " + symbol);
      setIsHidden2(true);
      setIsHidden(false);
    } catch {
      setIsHidden(true);
      setIsHidden2(false);
    }

  }


  return (
    <div className="window white">
      <label>Check account token balance:</label>
      <p>
        <input
          id="balance-principal-id"
          type="text"
          placeholder="Enter a Principal ID"
          value={balance}
          onChange={(e) => setBalance(e.target.value)}
        />
      </p>
      <p className="trade-buttons">
        <button
          id="btn-request-balance"
          onClick={handleClick}
        >
          Check Balance
        </button>
      </p>
      <p hidden={isHidden}>This account has a balance of {showBalance}</p>
      <p hidden={isHidden2}>Invalid Account</p>
    </div>
  );
}

export default Balance;
