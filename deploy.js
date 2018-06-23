const HDWalletProvider = require('truffle-hdwallet-provider');
const Web3 = require('web3');
const {interface, bytecode}= require('./compile');


const provider = new HDWalletProvider(
  'manual unveil gown grass myself bachelor save olympic response flight february admit',
  'https://rinkeby.infura.io/fLN87u39w5v9qF9Q6OJq'
);


const web3= new Web3(provider);


const deploy  = async () => {
  //get getAccounts
   const accounts = await web3.eth.getAccounts();

  //creating a console log so we know what's going on

  console.log('Attempting to deploy from Account:', accounts[0]);

  const result = await new web3.eth.Contract(JSON.parse(interface)) //interface is the ABI
  .deploy ({ data: '0x' + bytecode, arguments:['Hi there!'] })
  .send ({ gas: '1000000', from: accounts[0]});

  console.log('contract deployed to', result.options.address);
};

deploy();
