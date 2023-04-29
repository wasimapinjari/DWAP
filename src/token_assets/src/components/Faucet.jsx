import React, { useState } from "react";
import { canisterId, createActor } from "../../../declarations/token";
import { AuthClient } from "@dfinity/auth-client";

function Faucet(props) {

  const [isDisable, setIsDisable] = useState(false);
  const [buttonText, setButtonText] = useState("Gimme gimme")

  async function handleClick() {
    const authClient = await AuthClient.create();
    const identity = await authClient.getIdentity();
    const authenticatedCanister = createActor(canisterId, {
      agentOptions : {
        identity,
      },
    });

    setIsDisable(true);
    setButtonText(await authenticatedCanister.payOut());
  }

  return (
    <div className="blue window">
      <h2>
        <span role="img" aria-label="tap emoji">
          🚰
        </span>
        Faucet
      </h2>
      <label>Get your free Decentralized Wasim A Pinjari (DWAP) tokens here!<br /> Claim 10,000 DWAP tokens to your account ({props.userPrincipal}).</label>
      <p className="trade-buttons">
        <button id="btn-payout" onClick={handleClick} disabled={isDisable}>
          {buttonText}
        </button>
      </p>
    </div>
  );
}

export default Faucet;
