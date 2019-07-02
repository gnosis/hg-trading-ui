export const getNetworkName = networkId =>
  // https://ethereum.stackexchange.com/a/17101
  (
    {
      0: 'Olympic',
      1: 'Mainnet',
      2: 'Morden Classic',
      3: 'Ropsten',
      4: 'Rinkeby',
      5: 'Goerli',
      6: 'Kotti Classic',
      8: 'Ubiq',
      42: 'Kovan',
      60: 'GoChain',
      77: 'Sokol',
      99: 'Core',
      100: 'xDai',
      31337: 'GoChain testnet',
      401697: 'Tobalaba',
      7762959: 'Musicoin',
      61717561: 'Aquachain',
    }[networkId] || `Network ID ${networkId}`
  );


export const getReadOnlyProviderForNetworkId = (networkId) => {
  const providerName = {
    1: 'mainnet',
    3: 'ropsten',
    4: 'rinkeby',
    5: 'goerli',
    42: 'kovan',
  }[networkId];

  return providerName == null
    ? null
    : `wss://${providerName}.infura.io/ws/v3/d743990732244555a1a0e82d5ab90c7f`;
};
