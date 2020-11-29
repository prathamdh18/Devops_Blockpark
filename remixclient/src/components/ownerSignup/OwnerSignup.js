import React, { useState } from 'react';
import Web3 from "web3";
import { ContractABI } from "../../ContractABI";
import firebase from '../../firebase'
import './OwnerSignup.css'



const web3 = new Web3(new Web3.providers.HttpProvider("HTTP://127.0.0.1:7545"));
web3.eth.defaultAccount = web3.eth.accounts[0];

const RemixContract = new web3.eth.Contract(
  ContractABI,
  "0x5b97bE39e1660a232BECB2CB1C9378426093B46F"
);

function OwnerSignup() {

const [PAN,_setPAN]= useState("");
const [name,_setname] = useState("");
const [slots,_setslots]=useState("");
const [price,_setprice]=useState("");
const [distance,_setdistance]=useState("");
const [mobile,_setmobile] = useState("");
var [rating,_setrating]=useState("");
var PANError="";
var nameError="";
var slotsError="";
var priceError="";
var distanceError="";
var ratingError=""
var mobileError="";

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

  //alert(name)
  if (!name) {
      nameError = "name cannot be blank";
  }
  if(!slots)
  {
      slotsError="slots cannot be blank";
  }
  else if(isNaN(slots))
  {
      slotsError="slots should only be numeric";
  }
  else if(slots<10)
  {
      slotsError="slots cannot be less than ten";
  }
  if(!price)
  {
      priceError="price cannot be blank";
  }
  else if(isNaN(price))
  {
      priceError="price should only be numeric";
  }
  else if(price < 10)
  {
      priceError="price cannot be less than 10 rs";
  }
  if(!distance)
  {
      distanceError="distance cannot be blank";
  }
  else if(isNaN(distance))
  {
      distanceError="distance should only be numeric";
  }
  else if(distance<=0 || distance>2000)
  {
    //Sorry you cant be a part of our system! 
      distanceError="distance should be between 1m and 2000m";
  }
  //alert("RATING="+rating)
  if(!rating || rating=="-- select an option --")
  {
    ratingError="Choose rating from 'A' or 'B' OR 'C'"
  }
  if (!mobile) 
  {
    mobileError = "Mobile cannot be blank";
  }
  else if (mobile!== "") 
  {
    var regex = /([1-9]){1}([0-9]){9}$/;
    var matchArray = mobile.match(regex);
    if (matchArray == null) 
    {
        mobileError="Mobile number is not valid";
    }
  }
  document.getElementById('label1').innerHTML = PANError;
  document.getElementById('label2').innerHTML = nameError;
  document.getElementById('label3').innerHTML = slotsError;
  document.getElementById('label4').innerHTML = priceError;
  document.getElementById('label5').innerHTML = distanceError;
  document.getElementById('label6').innerHTML = ratingError;
  document.getElementById('label7').innerHTML = mobileError;
  /*alert(PANError)
  alert(nameError)
  alert(slotsError)
  alert(priceError)
  alert(distanceError)*/
  if (PANError || nameError || distanceError || slotsError || priceError || ratingError || mobileError) {
    //alert("in")
      return false;
  }
  //alert("out")
  return true;
};

const OTPCheckCaseTrue = async e => {
  const accounts=await web3.eth.getAccounts();
  const account = accounts[0];
    const gas = await RemixContract.methods.AddParkingLotOwner(PAN,name,slots,price,distance,rating,mobile).estimateGas();
    const result = await RemixContract.methods
    .AddParkingLotOwner(PAN,name,slots,price,distance,rating,mobile)
    .send({ from: account, gas });
    //alert(result)
    console.log(result);
    var x=  (await RemixContract.methods.LotOwnerAddmessage().call()).toString();
    document.getElementById('label7').innerHTML = x;
    const gas2 = await RemixContract.methods.makeLotOwnerAddmessageNULL().estimateGas();
    await RemixContract.methods.makeLotOwnerAddmessageNULL().send({ from: account, gas2 });
    var sel=document.getElementById('sb1')
    sel.selectedIndex="0";
    _setPAN('')
    _setname('')
    _setslots('')
    _setprice('')
    _setdistance('')
    _setrating('')
    _setmobile("");
    window.location.reload();
 }

const setData = async e => {
  e.preventDefault();
  const isValid = await validate();
  //alert(isValid)
  if (isValid){
   var recaptcha = new firebase.auth.RecaptchaVerifier('recaptcha');
   var number = '+91'+mobile;
   //alert(number);
   await firebase.auth().signInWithPhoneNumber(number, recaptcha).then( function(e) {
   var code = prompt('Enter the otp', '');
   if(code === null) 
   {
    document.getElementById('label7').innerHTML = "error1";
    OTPCheckCaseFalse();
   }
       
       e.confirm(code).then(function (result) {
           console.log(result.user);
 
           
           document.getElementById('label7').innerHTML = "Number verified";
           OTPCheckCaseTrue();
           
       }).catch(function (error) {
        document.getElementById('label7').innerHTML = "Wrong OTP Entered";
           console.error( error);
           OTPCheckCaseFalse();
       });
 
   })
   .catch(function (error) {
    document.getElementById('label7').innerHTML = "Too many requests for Firebase OTP Verification";
       console.error( error);
       OTPCheckCaseFalse();
   });
   //OTPCheckCaseTrue();
  }

};

const OTPCheckCaseFalse = async e =>
 {
  alert("NOT POSSIBLE");
  window.location.reload();
 }

/*
const getName = async e => {
  RemixContract.methods
    .LastOwnername()
    .call()
    .then(console.log);
}; 
 

const getPAN = async e => {
  RemixContract.methods
    .LastOwnerPAN()
    .call()
    .then(console.log);
};
const getslots = async e => {
  RemixContract.methods
    .LastOwnerslots()
    .call()
    .then(console.log);
};
const getprice = async e => {
  RemixContract.methods
    .LastOwnerprice()
    .call()
    .then(console.log);
};
const getdistance = async e => {
  RemixContract.methods
    .LastOwnerdistance()
    .call()
    .then(console.log);
};
const getRating = async e => {
  RemixContract.methods
    .LastOwnerRating()
    .call()
    .then(console.log);
};
*/
  
  return (

 
    <div >
      <div class="card" >
        <div class="card-body" id="mainos"><br/>
          <div className="card" id="vcard"><br/>  
            <div class="card-body" >
            <form  onSubmit={setData}>
              <fieldset >
                <legend>New to BlockPark? Sign Up Here</legend><br/>
                <label  > 
                Enter 10-Digit PAN Card Number: &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                <input
                  class="form-control"
                  id="tb1"
                  type="text"
                  name="PAN"
                  value={PAN}
                  placeholder= "PAN card number"
                  onChange={e => _setPAN(e.target.value)}
                />
                </label>
              
          
          <font color="red"><label id='label1'> </label></font>
          <br></br>
          <label>
            Enter Name: &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            <input
            id="tb2"
              type="text"
              name="name"
              value={name}
              placeholder= "Your Name Here"
              onChange={e => _setname(e.target.value.toLowerCase())}
            />
          </label>
          
          <font color="red"><label id='label2'> </label></font>
          <br></br>
          <label>
            Enter total number of slots:&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            <input
            id="tb3"
              type="text"
              name="slots"
              value={slots}
              placeholder= "Number of Slots Here"
              onChange={e => _setslots(e.target.value)}
            />
          </label>
          
          <font color="red"><label id='label3'> </label></font>
          <br></br>
          <label>
            Enter initial price of slot(in rupees):&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            <input
            id="tb4"
              type="text"
              name="price"
              value={price}
              placeholder= "Set the Base Price"
              onChange={e => _setprice(e.target.value)}
            />
          </label>
          
          <font color="red"><label id='label4'> </label></font>
          <br></br>
          <label>
            Enter distance from complex(in metres):&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            <input
            id="tb5"
              type="text"
              name="distance"
              value={distance}
              placeholder= "Enter the distance"
              onChange={e => _setdistance(e.target.value)}
            />
          </label>
          
          <font color="red"><label id='label5'> </label></font>
          <br></br>
          <label>
            Choose Security Rating:&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
          <select
                    id='sb1'
                    name="rating"
                    value={rating}
                    onChange={e => _setrating(e.target.value)}
                    style={{height:40,width:240}}
                >
                    <option selected="true" >----- select an option -----</option>
                    <option value="A" >A</option>
                    <option value="B" >B</option>
                    <option value="C">C</option>
                </select>
          </label>
          
          <font color="red"><label id='label6'> </label></font>
          <br></br>
          <label  > 
            Enter Mobile Number: &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
              <input
                id="tb1"
                type="text"
                name="mobile"
                value={mobile}
                placeholder= "Your Mobile Number Here"
                onChange={e => _setmobile(e.target.value)}
//                style={{height:40,width:350}}
              />
            </label>
            
          <font color="red"><label id='label7'> </label></font>
          <br></br>
          <br/>
          <div id="recaptcha"></div>
          <input type="submit" value="Add Owner" class="btn btn-dark btn-block"/><br/>
          </fieldset>
        </form>
            </div>
          </div><br/><br/>
        </div>
      </div>   
    </div> 

  );
}



export default OwnerSignup
