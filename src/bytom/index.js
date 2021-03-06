import Client from '../client.js'
import Bc from '../bytom-bc'

let version = require('../../package.json').version;

let Bytom = function Bytom(provider) {
    let _this = this;

    this.version = version;

    this.Bc = new Bc(this);

    // overwrite package setProvider
    let _provider = provider || window.bytom.currentProvider || ''
    let _chain = window.bytom.chain || 'vapor'

    let client = new Client({
        url:  _provider,
        chain: _chain
    })


    this.setProvider = function (provider) {
        _provider = provider
        client = new Client({
          url:  provider,
          chain: _chain
        })

      this.Bc.setProvider(provider, _chain)

        return true;
    };


    let defaultAccount = window.bytom.defaultAccount;

    Object.defineProperty(this, 'defaultAccount', {
        get: function () {
            return defaultAccount;
        },
        set: function (val) {
            return val;
        },
    });

    this.currentProvider = _provider
    this.sendTransaction = window.bytom.sendTransaction
    this.sendAdvancedTransaction = window.bytom.sendAdvancedTransaction
    this.signMessage = window.bytom.signMessage
    this.chain = _chain
    this.setChain = function(param){
      client = new Client({
        url:  _provider,
        chain: param
      })

      this.Bc.setProvider(_provider, param)
      if(window.bytom.setChain){
        return window.bytom.setChain(param)
      }
    }

    this.getBalance = function (accountId){
        return new Client({
          url:  window.bytom.currentProvider,
          chain: window.bytom.chain || 'vapor'
        }).balances.list(accountId);
    }

    this.getTransaction = function(transactionId){
        return client.transactions.list(transactionId)
    }


};

Bytom.version = version;
Bytom.modules = {
    Bc: Bc,
};

module.exports = Bytom;

