import React, { useState } from 'react';
import Web3 from "web3";
import { ContractABI } from "../../ContractABI";
import firebase from '../../firebase'
import './DriverLogin.css'

const web3 = new Web3(new Web3.providers.HttpProvider("HTTP://127.0.0.1:7545"));
web3.eth.defaultAccount = web3.eth.accounts[0];

const RemixContract = new web3.eth.Contract(
  ContractABI,
  "0x5b97bE39e1660a232BECB2CB1C9378426093B46F"
);


function DriverLogin() {
  const [cnum,_setcnum]= useState("");
  var cnumError="";
  const validate = async e =>{
    if(!cnum)
    {
        cnumError="Car Number cannot be blank";
    }
    else if(cnum!== "")
    {
      var regex = 	/^([A-Z|a-z]{2}\s{1}\d{2}\s{1}[A-Z|a-z]{1,2}\s{1}\d{1,4})?([A-Z|a-z]{3}\s{1}\d{1,4})?$/;
      // mh 12 bj 1780|||mmx 1234
      var matchArray = cnum.match(regex);
      if (matchArray == null) {
          cnumError="Car Number is not valid";
      }
    }
    document.getElementById('label1').innerHTML = cnumError;
    if (cnumError) {
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
      //alert(cnum);
      const gas = await RemixContract.methods.getIndexFromCarNumber(cnum).estimateGas();
      const result = await RemixContract.methods
      .getIndexFromCarNumber(cnum)
      .send({ from: account, gas });
      var x=  (await RemixContract.methods.DriverLoginmessage().call()).toString();
      alert(x);
      if(x=="Does not exists.")
      {
        const gas2 = await RemixContract.methods.makeDriverLoginmessageNULL().estimateGas();
        await RemixContract.methods.makeDriverLoginmessageNULL().send({ from: account, gas2 });
      }
      else
      {
        var index=  (await RemixContract.methods.DriverLoginindex().call()).toString();
        //alert(index);
        const gas1 = await RemixContract.methods.getDriverMobileFromIndex(index).estimateGas();
        const result1 = await RemixContract.methods
        .getDriverMobileFromIndex(index)
        .send({ from: account, gas1 });
        var mobile=  (await RemixContract.methods.DriverLoginmobile().call()).toString();
        //alert(mobile);
      var recaptcha = new firebase.auth.RecaptchaVerifier('recaptcha');
      var number = '+91'+mobile;
      //alert(number)
      const gas2 = await RemixContract.methods.makeDriverLoginmessageNULL().estimateGas();
      await RemixContract.methods.makeDriverLoginmessageNULL().send({ from: account, gas2 });
      const gas4 = await RemixContract.methods.makeDriverLoginindexNULL().estimateGas();
      await RemixContract.methods.makeDriverLoginindexNULL().send({ from: account, gas4 });
      const gas5 = await RemixContract.methods.makeDriverLoginmobileNULL().estimateGas();
      await RemixContract.methods.makeDriverLoginmobileNULL().send({ from: account, gas5 });
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
           window.location.replace("/driverAcc/"+index+"/"+cnum);
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
  window.location.replace("/driverAcc/"+index+"/"+cnum);
      }
  }
}
  return (
    <div>

<div>

<div class="card" >
  <div class="card-body" id="maind">
    <br/>
    <div className="card" id="icard">
      <br/>  
      <img className="logo" src="/img/car-parking.png" alt="Card image cap"/>
      <br/>
      <div class="card-body">
        <form onSubmit={setData}>
          <div class="form-group">
            <label>CAR NUMBER
            <input type="text" class="form-control" id="mobile" name="cnum" value={cnum} placeholder= "Car Number" onChange={e => _setcnum(e.target.value)}/>
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

    </div>
  );
}

export default DriverLogin
