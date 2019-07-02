import { getNetworkName, getReadOnlyProviderForNetworkId } from 'api/utils/networks'

export async function connectWallet(networkId) {
  const { default: Web3 } = await import("web3");

  const web3InitErrors = [];
  let web3, account;
  let foundWeb3 = false;

  for (const [providerType, providerCandidate] of [
    ["injected provider", window.web3.currentProvider],
    ["local websocket", "ws://localhost:8546"],
    ["local http", "http://localhost:8545"],
    /*[
      `read-only for id ${networkId}`,
      getReadOnlyProviderForNetworkId(networkId)
    ],*/
  ]) {
    try {
      if (providerCandidate == null) throw new Error("no provider found");
      if (providerCandidate.enable != null) await providerCandidate.enable();

      web3 = new Web3(providerCandidate);
      const web3NetworkId = await web3.eth.net.getId();
      if (web3NetworkId != networkId)
        throw new Error(
          `interface expects ${networkId} but currently connected to ${web3NetworkId}`
        );

      // attempt to get the main account here
      // so that web3 will emit an error if e.g.
      // the localhost provider cannot be reached
      if (web3.defaultAccount == null) {
        const accounts = await web3.eth.getAccounts();
        console.log(accounts)
        account = accounts[0] || null;
      } else account = web3.defaultAccount;

      console.log(`connected via ${providerType}`)
      foundWeb3 = true;
      break
    } catch (e) {
      console.error(e)
      web3InitErrors.push([providerType, e]);
    }
  }
  
  if (!foundWeb3)
    throw new Error(
      `could not get valid Web3 instance; got following errors:\n${web3InitErrors
        .map(([providerCandidate, e]) => `${providerCandidate} -> ${e}`)
        .join("\n")}`
    );

  return { web3, account };
}