import React, { useState } from 'react';
import moment from "moment";
import './DriverAcc.css'
import Web3 from "web3";
import { ContractABI } from "../../ContractABI";

const web3 = new Web3(new Web3.providers.HttpProvider("HTTP://127.0.0.1:7545"));
web3.eth.defaultAccount = web3.eth.accounts[0];

const RemixContract = new web3.eth.Contract(
  ContractABI,
  "0xcf19a46869637d793a37E41da85eb41300266998"
);


function DriverAcc() {
  var ExitTime;
  const setData = async e => {
    e.preventDefault();
    var temp=window.location.href;
    var res=temp.split('/');
    var index=res[4];
    var cnum=res[5];
    cnum=cnum[0]+cnum[1]+" "+cnum[5]+cnum[6]+" "+cnum[10]+cnum[11]+" "+cnum[15]+cnum[16]+cnum[17]+cnum[18];
    var now = new moment();
    ExitTime= now.format("HH:mm:ss");
    //alert(ExitTime);
    const accounts=await web3.eth.getAccounts();
    const account = accounts[0];
    var EnterTime=  (await RemixContract.methods.getDriverEnterTimeFromIndex(index).call()).toString();
    //alert(EnterTime);
    var ms = moment(ExitTime,"HH:mm:ss").diff(moment(EnterTime,"HH:mm:ss"));
    var hours   = ((ms / (1000*60*60)) % 24);
    hours=Math.ceil(hours);
    //alert(hours);
    var ParkedPrice=(await RemixContract.methods.getDriverParkedPriceFromIndex(index).call()).toString();
    //alert(ParkedPrice);
    var Gender=(await RemixContract.methods.getDriverGenderFromIndex(index).call()).toString();
    //alert(Gender);
    var age=(await RemixContract.methods.getDriverAgeFromIndex(index).call()).toString();
    //alert(age);
    //alert("hours "+hours);
    //alert("ParkedPrice"+ParkedPrice);
    var BaseTotal=hours*ParkedPrice;
    var TempTotal=BaseTotal;
    var GenderDiscount=0;
    if(Gender=="Female")
    {
      GenderDiscount=0.15;
    }
    var AgeDiscount=0;
    if(age>=60)
    {
      AgeDiscount=0.15;
    }
    var EarlyBirdDiscount=0;
    var LateRiserCess=0;
    var EnterTimeHour=parseInt(EnterTime[0]+EnterTime[1]);
    if(EnterTimeHour>=8 && EnterTimeHour<=12)
    {
      EarlyBirdDiscount=0.1;
    }
    if(EnterTimeHour>=20 && EnterTimeHour<=23)
    {
      LateRiserCess=0.2;
    }
    GenderDiscount=GenderDiscount*BaseTotal;
    AgeDiscount=AgeDiscount*BaseTotal;
    EarlyBirdDiscount=EarlyBirdDiscount*BaseTotal;
    LateRiserCess=LateRiserCess*BaseTotal;
    //alert(GenderDiscount);
    //alert(AgeDiscount);
    //alert(EarlyBirdDiscount);
    //alert(LateRiserCess);
    var Cess=LateRiserCess;
    var Discount=GenderDiscount+AgeDiscount+EarlyBirdDiscount;
    BaseTotal=BaseTotal+Cess-Discount;
    //alert(BaseTotal);
    //alert(BaseTotal);
    var invalue= Math.floor(BaseTotal);
    const gas = await RemixContract.methods.CarWithdrawlFromIndex(index,invalue).estimateGas();
    const result = await RemixContract.methods
    .CarWithdrawlFromIndex(index,invalue)
    .send({ from: account, gas });
    now = new moment();
    var CurrentDate= now.format("DD:MM:YYYY");
    //alert(CurrentDate);
    //alert(hours);
    window.location.replace("/Receipt/"+CurrentDate+"/"+cnum+"/"+EnterTime+"/"+ExitTime+"/"+ParkedPrice+"/"+LateRiserCess+"/"+GenderDiscount+"/"+AgeDiscount+"/"+EarlyBirdDiscount+"/"+Cess+"/"+Discount+"/"+BaseTotal+"/"+hours+"/"+TempTotal);
  }; 

  return (
    <div>
      <div class="card" >
        <div class="card-body" id="maind"><br/>
          <div className="card" id="dacard"><br/>  
            <img className="logo" src="/img/parking.png" alt="Card image cap"/><h1>BlockPark: Your Ultimate Parking Solution</h1><br/>
            
              <div class="card-body">
                <h2>Hey, Thank you for parking with us. </h2>
                <form onSubmit={setData}>
                  <div>
                      <br/><br/><br/>
                      <input type="submit" value="WITHDRAW CAR AND MAKE PAYMENT" class="btn btn-danger btn-block"/>
                      <br/><br/><br/>
                  </div>
                  </form>
              </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default DriverAcc
