import ReactDOM from 'react-dom'
import React from 'react'
import App from "./components/App";
import { AuthClient } from "@dfinity/auth-client";

const authClient = await AuthClient.create();

const init = async () => {

  if(await authClient.isAuthenticated()) {
    handleAuthenticated(authClient);
  } else {
    const footer = document.getElementById("year");
    footer.innerText = "Enable pop-up to authenticate using Internet Identity to proceed...";
    footer.style.textAlign="center";
    footer.style.marginTop="50vh";
    await authClient.login({
      identityProvider: "https://identity.ic0.app/#authorize",
      onSuccess: () => {
        handleAuthenticated(authClient);
      }
    });
  }
  
}
 
async function handleAuthenticated(authClient) {
  var userPrincipal = await authClient.getIdentity()._principal.toString();
  ReactDOM.render(<App userPrincipal={userPrincipal}/>, document.getElementById("root"));
  const footer = document.getElementById("year");
  const year = new Date().getFullYear();
  footer.innerText = "© " + year + " Wasim A Pinjari. All rights reserved.";
  footer.style.textAlign="center";
  footer.style.marginBottom="1rem";
  footer.style.marginTop="0";

}

init();

