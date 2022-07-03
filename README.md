# test-sweeper
PoC for a sweeper bot on BSC

Deployed contract (bep20 token) for the PoC: https://github.com/selimerunkut/bep20_NNN

To run this bot forever on a blockchain;
- `npm install forever -g`
- `cd scripts/`
- `forever start sweeper.js`

## The scenerio
There is a sweeper bot runs on an account and it sweeps all the tokens that is sent to this account.  So it is not possible to use a smart contract because sweeper bot sweeps all the tokens. 
