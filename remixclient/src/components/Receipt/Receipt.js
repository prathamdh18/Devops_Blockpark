import React, { useState } from 'react';
import {useParams} from 'react-router';
//import Web3 from "web3";
//import { ContractABI } from "./ContractABI";
import firebase from '../../firebase'
import './Receipt.css'



/*const web3 = new Web3(new Web3.providers.HttpProvider("HTTP://127.0.0.1:7545"));
web3.eth.defaultAccount = web3.eth.accounts[0];

const RemixContract = new web3.eth.Contract(
  ContractABI,
  "0x58bb34d4292FB4785Ca3cDE396b9a8Ec67651e45"
);
*/

function Receipt() {
const params=useParams();




  
  return (

 
    <div >
      <div class="card" >
        <div class="card-body" id="mainos"><br/>
          <div className="card" id="vcard"><br/>  
            <div class="card-body" >
            <form>
              <fieldset >
                <legend><u>Car Parking Receipt</u></legend><br/>
                <label  ><u>Date:</u> {params.CurrentDate} </label>
                <br></br>
                <h5>Vehicle Information</h5>
                <label  ><u>License Plate:</u> {params.cnum}</label><br/><br/>
                <h5>Parking Information</h5>
                <label  ><u>Start Time:</u> {params.EnterTime}</label>
                <label  ><u>End Time:</u>{params.ExitTime}</label>
                <label id="label1" > Note: Our Prices are usually low.With decreasing slots vehicles will be charged with charge/hour increased by 0.2%</label>
                <h5>Amount</h5><br/>
                <label  ><u>Parking Charge/hour:</u> {params.ParkedPrice}</label><br/>
                <label  ><u>Total Hours:(Rounded Upwards)</u> {params.Hours}</label><br/>
                <label  ><u>Base Total:</u> {params.TempTotal}</label><br/>
                <u><label  > CESS </label></u>
                <label  > PeakHour&nbsp;: {params.LateRiserCess}</label>
                <br></br>
                <u><label  > DISCOUNT </label></u>
                <label  > Gender(Female)&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;: {params.GenderDiscount}</label>
                <label  > Age(above 59)&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;: {params.AgeDiscount} </label>
                <label  > EarlyBird&nbsp;&nbsp;: {params.EarlyBirdDiscount}</label>
                <br/>
                <br/>
                <label  > <u>Total CESS</u>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;: {params.Cess}</label>
                <label  > <u>Total Discount</u>&nbsp;&nbsp;: {params.Discount}</label>
                <br/>
                <label  > <u>Total Amount to be Paid:</u> {params.BaseTotal}</label>
                <br/>
                
          
          
          
          
          <br/>
          
          </fieldset>
        </form>
            </div>
          </div><br/><br/>
        </div>
      </div>   
    </div> 

  );
}



export default Receipt
