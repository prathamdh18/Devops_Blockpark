import React, { useState } from 'react';
import Web3 from "web3";
import { ContractABI } from "../../ContractABI";
import firebase from '../../firebase'
import './OwnerLogin.css'

const web3 = new Web3(new Web3.providers.HttpProvider("HTTP://127.0.0.1:7545"));
web3.eth.defaultAccount = web3.eth.accounts[0];

const RemixContract = new web3.eth.Contract(
  ContractABI,
  "0x5b97bE39e1660a232BECB2CB1C9378426093B46F"
);


function OwnerLogin() {
  const [PAN,_setPAN]= useState("");
  var PANError="";
  const validate = async e =>{
    if (!PAN) 
    {
      PANError = "pan cannot be blank";
    }
    else if (PAN!== "") 
    {
      var regex = /([A-Z]){5}([0-9]){4}([A-Z]){1}$/;
      var matchArray = PAN.match(regex);
      if (matchArray == null) {
          PANError="pan number is not valid";
      }
    }
    document.getElementById('label1').innerHTML = PANError;
    if (PANError) {
      //alert("in")
        return false;
    }
    //alert("out")
    return true;
  }
  const setData = async e => {
    e.preventDefault();
    const isValid = await validate();
    if (isValid)
    {
      const accounts=await web3.eth.getAccounts();
      const account = accounts[0];
      const gas = await RemixContract.methods.getIndexFromPAN(PAN).estimateGas();
      const result = await RemixContract.methods
      .getIndexFromPAN(PAN)
      .send({ from: account, gas });
      var x=  (await RemixContract.methods.LotOwnerLoginmessage().call()).toString();
      if(x=="Does not exists.")
      {
        const gas2 = await RemixContract.methods.makeLotOwnerLoginmessageNULL().estimateGas();
        await RemixContract.methods.makeLotOwnerLoginmessageNULL().send({ from: account, gas2 });
      }
      else
      {
      var index=  (await RemixContract.methods.LotOwnerLoginindex().call()).toString();
      //alert(index)
      const gas1 = await RemixContract.methods.getOwnerMobileFromIndex(index).estimateGas();
      const result1 = await RemixContract.methods
      .getOwnerMobileFromIndex(index)
      .send({ from: account, gas1 });
      var mobile=  (await RemixContract.methods.LotOwnerLoginmobile().call()).toString();
      alert(mobile);
      var name= (await RemixContract.methods.getOwnerNameFromIndex(index).call()).toString();
      //alert(name);
      var slots= (await RemixContract.methods.getOwnerslotsFromIndex(index).call()).toString();
      //alert(slots);
      var price= (await RemixContract.methods.getOwnersPriceFromIndex(index).call()).toString();
      //alert(price);
      var distance= (await RemixContract.methods.getOwnersDistanceFromIndex(index).call()).toString();
      //alert(distance);
      var rating= (await RemixContract.methods.getOwnersSecurityFromIndex(index).call()).toString();
      //alert(rating);
      var balance= (await RemixContract.methods.getOwnersBalanceFromIndex(index).call()).toString();
      //alert(balance);
      var phone=(await RemixContract.methods.getOwnersMobileFromIndex(index).call()).toString();
      //alert(phone)
      var recaptcha = new firebase.auth.RecaptchaVerifier('recaptcha');
      var number = '+91'+mobile;
      //alert(number)
      const gas2 = await RemixContract.methods.makeLotOwnerLoginmessageNULL().estimateGas();
      await RemixContract.methods.makeLotOwnerLoginmessageNULL().send({ from: account, gas2 });
      const gas4 = await RemixContract.methods.makeLotOwnerLoginindexNULL().estimateGas();
      await RemixContract.methods.makeLotOwnerLoginindexNULL().send({ from: account, gas4 });
      const gas5 = await RemixContract.methods.makeLotOwnerLoginmobileNULL().estimateGas();
      await RemixContract.methods.makeLotOwnerLoginmobileNULL().send({ from: account, gas5 });
      //window.location.replace("/Owneracc/"+PAN+"/"+name+"/"+slots+"/"+price+"/"+distance+"/"+rating+"/"+balance+"/"+phone);
      await firebase.auth().signInWithPhoneNumber(number, recaptcha).then( function(e) {
      var code = prompt('Enter the otp', '');
      if(code === null) 
      {
        document.getElementById('label2').innerHTML = "NULL OTP";
        window.location.reload();
      }
       
       e.confirm(code).then(function (result) {
           console.log(result.user);
           document.getElementById('label2').innerHTML = "Number verified";
           window.location.replace("/Owneracc/"+PAN+"/"+name+"/"+slots+"/"+price+"/"+distance+"/"+rating+"/"+balance+"/"+phone);
       }).catch(function (error) {
        document.getElementById('label2').innerHTML = "Wrong OTP Entered";
           console.error( error);
           window.location.reload();
       });
 
        })
        .catch(function (error) {
        document.getElementById('label2').innerHTML = "Too many requests for Firebase OTP Verification";
        console.error( error);
        window.location.reload();
   });
      }
    }

  }
  return (
    <div>

        <div class="card" >
          <div class="card-body" id="mainc">
            <br/>
            <div className="card" id="icard">
              <br/>  
              <img className="logo" src="/img/car-parking.png" alt="Card image cap"/>
              <br/>
              <div class="card-body">
                <form onSubmit={setData}>
                  <div class="form-group">
                    <label>PAN
                    <input type="text" class="form-control" id="mobile" name="PAN" value={PAN} placeholder= "PAN card number" onChange={e => _setPAN(e.target.value)}/>
                    </label>
                    <font color="red"><label id='label1'> </label></font>
                    <br></br>
                    <small id="mobileHelp" class="form-text text-muted">We'll never share your number with anyone else.</small>
                  </div>
                  <input type="submit" value="Login" class="btn btn-dark btn-block"/>
               </form>
               <div id="recaptcha"></div>
               <font color="red"><label id='label2'> </label></font>
              </div>
            </div>
            <br/>
            <br/>
          </div>
        </div>

    </div>
  );
}

export default OwnerLogin
