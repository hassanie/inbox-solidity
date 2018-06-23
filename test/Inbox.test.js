const assert = require ('assert');
const ganache = require('ganache-cli');
const Web3 =require('web3');
const provider = ganache.provider();
const web3 = new Web3(provider);
//import bytecode and interface ABI from compile.js
const {interface, bytecode} =require ('../compile');

let accounts;


let inbox;
beforeEach(async () => {
// Get a list of all accounts
//awaits basically means it waits until confirmation
// then assigns it to the accounts variable
accounts = await web3.eth.getAccounts();

// Use one of those accounts to deploy the contracts

inbox = await new web3.eth.Contract(JSON.parse(interface))
  .deploy ({data: bytecode, arguments: ['Hi there!']})
  .send ({from: accounts[0], gas:'1000000'});

  inbox.setProvider(provider);
});

describe('inbox', function() {
    it('deploys a contract', function() {
         assert.ok(inbox.options.address); //see if an address exist. if it does - i feel confident the inital message/contract was deployed sucessfully
         //ok means "is this a valid value"
    });

    it('has a default message', async function() {
      const message = await inbox.methods.message().call();
      //paranthesis for message and call is for customizing
      assert.equal(message, 'Hi there!')
    });

    it('can change the message', async function() {
       await inbox.methods.setMessage('bye').send({from: accounts[0]})
       const message= await inbox.methods.message().call();
       assert.equal (message,'bye')
    });
});
