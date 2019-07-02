# hg-trading-ui

This is the proof-of-concept trading-ui frontend for the new prediction market 2.0 contracts.

### Usage
`nvm use` - will use correct node version using [nvm](https://github.com/nvm-sh/nvm)
`npm i` - installs dependencies
`npm start` - starts dev-server

### Boilerplate

- `material-ui`
- `react-hot-loader` (with react-:fire:-loader)
- `eslint` (airbnb config)
- `i18next`
- `web3@1.0.0-beta.55`
- `react-router-dom`
- wallet context (`src/components/WalletContext.js`) - not used right now, used in a prev project
- `precommit hook` - not used right now, uses eslint if configured with `scripts/commit-check.sh`