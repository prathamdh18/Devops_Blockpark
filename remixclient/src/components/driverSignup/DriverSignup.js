import React, { useState } from 'react';
import firebase from '../../firebase';
import Web3 from "web3";
import { ContractABI } from "../../ContractABI";
import moment from "moment";
import './DriverSignup.css'


const web3 = new Web3(new Web3.providers.HttpProvider("HTTP://127.0.0.1:7545"));
web3.eth.defaultAccount = web3.eth.accounts[0];

const RemixContract = new web3.eth.Contract(
  ContractABI,
  "0x5b97bE39e1660a232BECB2CB1C9378426093B46F"
);


function DriverSignup() {

  const [mobile,_setmobile] = useState("");
  const [email,_setemail]= useState("");
  const [cnum,_setcnum]=useState("");
  const [age,_setage]=useState("");
  const [gen,_setgen]=useState("");
  const [priority1,_setpriority1]=useState("");
  const [priority2,_setpriority2]=useState("");
  var [priority3,_setpriority3]=useState("");
  
  var EnterTime="";
  var mobileError="";
  var emailError="";
  var cnumError="";
  var ageError="";
  var genError="";
  var priority1Error="";
  var priority2Error="";
  var priority3Error="";

  const validate = async e =>{

    if (!mobile) 
    {
      mobileError = "Mobile cannot be blank";
    }
    else if (mobile!== "") 
    {
      var regex = /([1-9]){1}([0-9]){9}$/;
      var matchArray = mobile.match(regex);
      if (matchArray == null) {
          mobileError="Mobile number is not valid";
      }
    }

    
    if (!email) {
        emailError = "Email cannot be blank";
    }
    else if (email!== "") 
    {
      var regex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      var matchArray = email.match(regex);
      if (matchArray == null) {
          emailError="Email is not valid";
      }
    }
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
    
    if(!age)
    {
        ageError="Age cannot be blank";
    }
    else if(isNaN(age))
    {
       ageError="Age should only be numeric";
    }
    else if(age<18)
    {
      ageError="Age should greater than equal to 18";
    }

    if(!gen || gen=="-- select an option --")
    {
      genError="Choose your gender"
    }
    
    if(!priority1 || priority1=="-- select an option --")
    {
      priority1Error="Choose an option"
    }

    if(!priority2 || priority2=="-- select an option --")
    {
      priority2Error="Choose an option"
    }

    if(priority1==priority2)
    {
      priority1Error="Invalid selection,priorities can not be same"
      priority2Error="Invalid selection,priorities can not be same"
      priority3Error="Invalid selection,priorities can not be same"
    }



    document.getElementById('label1').innerHTML = mobileError;
    document.getElementById('label2').innerHTML = emailError;
    document.getElementById('label3').innerHTML = cnumError;
    document.getElementById('label4').innerHTML = ageError;
    document.getElementById('label6').innerHTML = genError;
    document.getElementById('label7').innerHTML = priority1Error;
    document.getElementById('label8').innerHTML = priority2Error;
    
    /*alert(PANError)
    alert(nameError)
    alert(slotsError)
    alert(priceError)
    alert(distanceError)*/
    if (mobileError || emailError || cnumError || ageError || genError || priority1Error || priority2Error) {
      //alert("in")
      return false;
    }
    //alert("out")
    return true;
  };

   const OTPCheckCaseTrue = async e => {

    
    const accounts=await web3.eth.getAccounts();
    const account = accounts[0];
    var now = new moment();
    EnterTime= now.format("HH:mm:ss");
    priority3="Security";
    const gas = await RemixContract.methods.AddDriver(mobile,email,cnum,age,gen,priority1,priority2,priority3,EnterTime).estimateGas();
    //alert(mobile+" "+email+" "+cnum+" "+age+" "+priority1+" "+priority2+" "+priority3);
    const result = await RemixContract.methods
    .AddDriver(mobile,email,cnum,age,gen,priority1,priority2,priority3,EnterTime)
    .send({ from: account, gas });
    //alert(result)
    console.log(result);
    var x=  (await RemixContract.methods.DriverAddmessage().call()).toString();
    //document.getElementById('label5').innerHTML = x;
    const gas2 = await RemixContract.methods.makeDriverAddmessageNULL().estimateGas();
    await RemixContract.methods.makeDriverAddmessageNULL().send({ from: account, gas2 });
    _setmobile("");
    _setemail("");
    _setcnum("");
    _setage("")
    _setgen("");
    _setpriority1("");
    _setpriority2("");
    _setpriority3("");
    window.location.reload();
   }

   const OTPCheckCaseFalse = async e =>
   {
    alert("NOT POSSIBLE");
    window.location.reload();
   }

    const setData = async e => {
      e.preventDefault();
      const isValid = await validate();
      
      //alert(isValid)
      if (isValid){
        var recaptcha = new firebase.auth.RecaptchaVerifier('recaptcha');
     var number = '+91'+mobile;
     var check;
     await firebase.auth().signInWithPhoneNumber(number, recaptcha).then( function(e) {
     var code = prompt('Enter the otp', '');
     if(code === null) 
     {
      document.getElementById('label5').innerHTML = "error1";
      OTPCheckCaseFalse();
     }
         
         e.confirm(code).then(function (result) {
             console.log(result.user);
   
             
             document.getElementById('label5').innerHTML = "Number verified";
             OTPCheckCaseTrue();
             
         }).catch(function (error) {
          document.getElementById('label5').innerHTML = "error2";
             console.error( error);
             OTPCheckCaseFalse();
         });
   
     })
     .catch(function (error) {
      document.getElementById('label5').innerHTML = "Too many requests for firebase OTP Verification";
         console.error( error);
         OTPCheckCaseFalse();
     });
     OTPCheckCaseTrue();
    }
    };

  

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
    };*/


  return (
    <div>
  <div class="bcard" >
  <div class="card-body" id="maind">
    <br/>
    <div className="card" id="vcard">
      <div class="card-body">
      <form onSubmit={setData}>
          <fieldset >
          <legend>Park Your Car With Ease. Sign Up Here</legend>
          <br></br>
          <br></br>

            <label  > 
            Enter Mobile Number: &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
              <input
                id="tb1"
                type="text"
                name="mobile"
                value={mobile}
                placeholder= "Your Mobile Number Here"
                onChange={e => _setmobile(e.target.value)}
               
              />
            </label>
            
            <font color="red"><label id='label1'> </label></font>
            <br></br>

            <label>
              Enter Email: &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
              <input
              id="tb2"
                type="text"
                name="email"
                value={email}
                placeholder= "Your Email Here"
                onChange={e => _setemail(e.target.value.toLowerCase())}
                
              />
            </label>
            
            <font color="red"><label id='label2'> </label></font>
            <br></br>
            
            <label>
              Enter Car number:&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
              <input
              id="tb3"
                type="text"
                name="cnum"
                value={cnum}
                placeholder= "Your Car Number Here"
                onChange={e => _setcnum(e.target.value.toLowerCase())}
                
              />
            </label>
            
            <font color="red"><label id='label3'> </label></font>
            <br></br>

            <label>
              Enter Age: &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
              <input
              id="tb4"
                type="text"
                name="age"
                value={age}
                placeholder= "Your Age Here"
                onChange={e => _setage(e.target.value)}
                
              />
            </label>
            
            <font color="red"><label id='label4'> </label></font>
            <br></br>
            
            
            <label>
              Select your Gender:&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            <select
                      id='sb1'
                      name="gen"
                      value={gen}
                      onChange={e => _setgen(e.target.value)}
                      style={{height:40,width:350}}
                  >
                      <option selected="true" >----- select an option -----</option>
                      <option value="Male" >Male</option>
                      <option value="Female" >Female</option>
                  </select>
            </label>
           
            <font color="red"><label id='label6'> </label></font>
            <br></br>

            <label>
              Set Priority1:&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            <select
                      id='sb2'
                      name="priority1"
                      value={priority1}
                      onChange={e => _setpriority1(e.target.value)}
                      style={{height:40,width:350}}
                  >
                      <option selected="true" >----- select an option -----</option>
                      <option value="Price" >Price</option>
                      <option value="Distance" >Distance</option>
                  </select>
            </label>
            
            <font color="red"><label id='label7'> </label></font>
            <br></br>
            
            <label>
              Set Priority2:&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            <select
                      id='sb3'
                      name="priority2"
                      value={priority2}
                      onChange={e => _setpriority2(e.target.value)}
                      style={{height:40,width:350}}
                  >
                      <option selected="true" >----- select an option -----</option>
                      <option value="Price" >Price</option>
                      <option value="Distance" >Distance</option>
                  </select>
            </label>
           
            <font color="red"><label id='label8'> </label></font>
            <br></br>
            <br></br>
            <label id='label5'></label>
            
            <div id="recaptcha"></div>
            <button class="btn btn-dark btn-block">Submit</button>
            
            
            <br></br>
            </fieldset>
          </form>
      </div>
    </div>
    <br/>
    <br/>
  </div>
</div>

    </div>
  );
}

export default DriverSignup
