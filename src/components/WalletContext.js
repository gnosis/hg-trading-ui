import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { connectWallet } from 'api/wallet';

const WalletContext = React.createContext({
  status: 'unknown',
  network: undefined,
});

export class WalletProvider extends Component {
  constructor(props) {
    super(props);

    this.handleConnectWallet = this.handleConnectWallet.bind(this);

    this.state = {
      status: 'unknown',
      error: undefined,
      network: undefined,
      connectWallet: this.handleConnectWallet,
    };
  }

  async handleConnectWallet() {
    let walletData;
    try {
      walletData = await connectWallet(4);

      this.setState({
        status: 'connected',
        error: undefined,
        account: walletData.account,
      });
    } catch (err) {
      this.setState({
        status: 'error',
        error: err.message,
        account: undefined,
      });
    }
  }

  render() {
    return (
      <WalletContext.Provider value={this.state}>
        {this.props.children}
      </WalletContext.Provider>
    );
  }
}

WalletContext.propTypes = {
  children: PropTypes.node,
};

export default WalletContext;
