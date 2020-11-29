import React, { useState } from "react";
import Web3 from "web3";
import { ContractABI } from "./ContractABI";

import "./App.css";


const web3 = new Web3(new Web3.providers.HttpProvider("HTTP://127.0.0.1:7545"));
web3.eth.defaultAccount = web3.eth.accounts[0];

const RemixContract = new web3.eth.Contract(
  ContractABI,
  "0x5b97bE39e1660a232BECB2CB1C9378426093B46F"
);

function Abnew() {
  const [PAN,_setPAN]= useState("")
  const [name,_setname] = useState("");
  const [slots,_setslots]=useState("")
  const [price,_setprice]=useState("")
  const [distance,_setdistance]=useState("")
  var [rating,_setrating]=useState("")
  var PANError="";
  var nameError="";
  var slotsError="";
  var priceError="";
  var distanceError="";
  var ratingError=""
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
    document.getElementById('label1').innerHTML = PANError;
    document.getElementById('label2').innerHTML = nameError;
    document.getElementById('label3').innerHTML = slotsError;
    document.getElementById('label4').innerHTML = priceError;
    document.getElementById('label5').innerHTML = distanceError;
    document.getElementById('label6').innerHTML = ratingError;
    /*alert(PANError)
    alert(nameError)
    alert(slotsError)
    alert(priceError)
    alert(distanceError)*/
    if (PANError || nameError || distanceError || slotsError || priceError || ratingError) {
      //alert("in")
        return false;
    }
    //alert("out")
    return true;
  };
  const getName = async e => {
    RemixContract.methods
      .LastOwnername()
      .call()
      .then(console.log);
  };
  const setData = async e => {
    e.preventDefault();
    const isValid = await validate();
    //alert(isValid)
    if (isValid){
    const accounts=await web3.eth.getAccounts();
    const account = accounts[0];
    const gas = await RemixContract.methods.AddParkingLotOwner(PAN,name,slots,price,distance,rating).estimateGas();
    //alert(PAN+" "+name+" "+slots+" "+price+" "+distance+" "+rating)
    const result = await RemixContract.methods
      .AddParkingLotOwner(PAN,name,slots,price,distance,rating)
      .send({ from: account, gas });
      console.log(result);
    alert("Parking Lot Owner Successfully Added")
    var sel=document.getElementById('sb1')
    sel.selectedIndex="0";
    _setPAN('')
    _setname('')
    _setslots('')
    _setprice('')
    _setdistance('')
    _setrating('')
    var x=  (await RemixContract.methods.LastOwnername().call()).toString();
    alert(x)
    document.getElementById("tb1").focus();
    }

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
  return (
    <div className="App">
      <header className="App-header">
        <form  onSubmit={setData}>
        <fieldset >
        <legend>Add Parking Lot Owner:</legend>
          <label  > 
          Enter 10-Digit PAN Card Number: &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            <input
              id="tb1"
              type="text"
              name="PAN"
              value={PAN}
              placeholder= "PAN card number"
              onChange={e => _setPAN(e.target.value)}
            />
          </label>
          <br></br>
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
          <br></br>
          <font color="red"><label id='label2'> </label></font>
          <br></br>
          <label>
            Enter total number of slots:&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            <input
            id="tb3"
              type="text"
              name="slots"
              value={slots}
              placeholder= ""
              onChange={e => _setslots(e.target.value)}
            />
          </label>
          <br></br>
          <font color="red"><label id='label3'> </label></font>
          <br></br>
          <label>
            Enter initial price of slot(in rupees):&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            <input
            id="tb4"
              type="text"
              name="price"
              value={price}
              placeholder= ""
              onChange={e => _setprice(e.target.value)}
            />
          </label>
          <br></br>
          <font color="red"><label id='label4'> </label></font>
          <br></br>
          <label>
            Enter distance from complex(in metres):&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            <input
            id="tb5"
              type="text"
              name="distance"
              value={distance}
              placeholder= ""
              onChange={e => _setdistance(e.target.value)}
            />
          </label>
          <br></br>
          <font color="red"><label id='label5'> </label></font>
          <br></br>
          <label>
            Enter Security Rating:&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
          <select
                    id='sb1'
                    name="rating"
                    value={rating}
                    onChange={e => _setrating(e.target.value)}
                    style={{height:20,width:165}}
                >
                    <option selected="true" >----- select an option -----</option>
                    <option value="A" >A</option>
                    <option value="B" >B</option>
                    <option value="C">C</option>
                </select>
          </label>
          <br></br>
          <font color="red"><label id='label6'> </label></font>
          <br></br>
          <input style={{width:200}} type="submit" value="Add Owner" />
          </fieldset>
        </form>
      </header>
    </div>
  );
}

export default Abnew;