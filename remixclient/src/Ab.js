import React, { Component } from 'react';
import Web3 from 'web3';
import { render } from '@testing-library/react';

class Ab extends Component
{
  componentWillMelt() {
    this.loadBlockchainData();
  }
    async loadBlockchainData(){

      const web3= new Web3(Web3.givenProvider || "http://localhost:8485");
      const network=await web3.eth.net.getNetworkType();
      const accounts= await web3.eth.getAccounts()
      console.log('account',accounts[0])
      this.setState({account: accounts[0]})
      
    }

    constructor(props){
      super(props)
      this.state={account: '' }
    }

    render() {
      return(
        <div>
          <h1>Hello</h1>
      <p>Your account: {this.state.account}</p>
        </div>
    );
    }
    
}

export default Ab