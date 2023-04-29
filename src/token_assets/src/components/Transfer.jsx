import React, { useState } from "react";
import { Principal } from "@dfinity/principal";
import { AuthClient } from "@dfinity/auth-client";
import { canisterId, createActor } from "../../../declarations/token";

function Transfer() {
  const [id, setId] = useState("");
  const [amount, setAmount] = useState("");
  const [isDisabled, setIsDisabled] = useState(false);
  const [message, setmessage] = useState(false);

  async function handleClick(e) {
    const authClient = await AuthClient.create();
    const identity = await authClient.getIdentity();

    const authenticatedCanister = createActor(canisterId, {
      agentOptions: {
        identity,
      },
    });

    try {
      setIsDisabled(true);
      const principal = await Principal.fromText(id);
      const money = Number(amount)
      const message = await authenticatedCanister.transfer(principal, money);
      setmessage(message);
      setIsDisabled(false);
    } catch {
      setmessage("Invalid Account");
      setIsDisabled(false);
    } 
  }

  return (
    <div className="window white">
      <div className="transfer">
        <fieldset>
          <legend>To Account:</legend>
          <ul>
            <li>
              <input
                type="text"
                id="transfer-to-id"
                value= {id}
                onChange={(e) => setId(e.target.value)}
              />
            </li>
          </ul>
        </fieldset>
        <fieldset>
          <legend>Amount:</legend>
          <ul>
            <li>
              <input
                type="number"
                id="amount"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
              />
            </li>
          </ul>
        </fieldset>
        <p className="trade-buttons">
          <button id="btn-transfer" onClick={handleClick} disabled={isDisabled}>
            Transfer
          </button>
        </p>
        <p>{message}</p>
      </div>
    </div>
  );
}

export default Transfer;
