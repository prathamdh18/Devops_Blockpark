import React, { useState } from "react";
import firebase from './firebase'
//import Web3 from "web3";



function Temp() {

    
    const [mobile,_setmobile] = useState("");
    const [email,_setemail]= useState("");
    const [cnum,_setcnum]=useState("");
    const [age,_setage]=useState("");
    const [gen,_setgen]=useState("");
    const [priority1,_setpriority1]=useState("");
    const [priority2,_setpriority2]=useState("");
    const [priority3,_setpriority3]=useState("");
    
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
        mobileError = "mobile cannot be blank";
      }
      else if (mobile!== "") 
      {
        var regex = /([1-9]){1}([0-9]){9}$/;
        var matchArray = mobile.match(regex);
        if (matchArray == null) {
            mobileError="mobile number is not valid";
        }
      }

      
      if (!email) {
          emailError = "name cannot be blank";
      }
      else if (mobile!== "") 
      {
        var regex = /([1-9]){1}([0-9]){9}$/;
        var matchArray = mobile.match(regex);
        if (matchArray == null) {
            mobileError="email is not valid";
        }
      }
      
      if(!cnum)
      {
          cnumError="Car number cannot be blank";
      }
      else if(cnumError!== "")
      {
         cnumError="price should only be numeric";
      }
      
      if(!age)
      {
          ageError="Age cannot be blank";
      }
      else if(isNaN(age))
      {
         ageError="Age should only be numeric";
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

      if(!priority3 || priority3=="-- select an option --")
      {
        priority3Error="Choose an option"
      }

      if(priority1==priority2 && priority2==priority3)
      {
        priority1Error="Invalid selection,priorities can not be same"
        priority2Error="Invalid selection,priorities can not be same"
        priority3Error="Invalid selection,priorities can not be same"
      }
      else if(priority1==priority2)
      {
        priority1Error="Invalid selection,priorities can not be same"
        priority2Error="Invalid selection,priorities can not be same"
      }
      else if(priority1==priority3)
      {
        priority1Error="Invalid selection,priorities can not be same"
        priority3Error="Invalid selection,priorities can not be same"
      }
      else if(priority2==priority3)
      {
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
      document.getElementById('label9').innerHTML = priority3Error;
      
      /*alert(PANError)
      alert(nameError)
      alert(slotsError)
      alert(priceError)
      alert(distanceError)*/
      if (mobileError || emailError || cnumError || priority1Error || priority2Error || priority3Error) {
        //alert("in")
          return false;
      }
      //alert("out")
      return true;
    };

    const setData = async e => {
      e.preventDefault();
      const isValid = await validate();
      //alert(isValid)
      if (isValid){
      //const accounts=await web3.eth.getAccounts();
      //const account = accounts[0];
      //const gas = await RemixContract.methods.AddParkingLotOwner(PAN,name,slots,price,distance,rating).estimateGas();
      //alert(PAN+" "+name+" "+slots+" "+price+" "+distance+" "+rating)

      /*
      const result = await RemixContract.methods
        .AddParkingLotOwner(PAN,name,slots,price,distance,rating)
        .send({ from: account, gas });
      alert(result)
      console.log(result);
      */
     var recaptcha = new firebase.auth.RecaptchaVerifier('recaptcha');
     var number = '+91'+mobile;
     firebase.auth().signInWithPhoneNumber(number, recaptcha).then( function(e) {
     var code = prompt('Enter the otp', '');
   
         
     if(code === null) return;
   
         
         e.confirm(code).then(function (result) {
             console.log(result.user);
   
             
             document.getElementById('label5').innerHTML = "Number verified";
             
         }).catch(function (error) {
             console.error( error);
             
         });
   
     })
     .catch(function (error) {
         console.error( error);
   
     });

      
      document.getElementById('tb1').value = "";
      document.getElementById('tb2').value = "";
      document.getElementById('tb3').value = "";
      document.getElementById('tb4').value = "";
      
      
      var sel=document.getElementById('sb1');
      var sel=document.getElementById('sb2');
      var sel=document.getElementById('sb3');
      var sel=document.getElementById('sb3');

      sel.selectedIndex="0";
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
      <div className="App">
        <header className="App-header">
          <form onSubmit={setData}>
          <fieldset >
          <legend>BlockPark: Your Ultimate Parking Solution</legend>
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
                style={{height:40,width:350}}
              />
            </label>
            <br></br>
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
                style={{height:40,width:350}}
              />
            </label>
            <br></br>
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
                onChange={e => _setcnum(e.target.value)}
                style={{height:40,width:350}}
              />
            </label>
            <br></br>
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
                style={{height:40,width:350}}
              />
            </label>
            <br></br>
            <font color="red"><label id='label4'> </label></font>
            <br></br>
            
            
            <label>
              Set Gender:&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            <select
                      id='sb1'
                      name="gen"
                      value={gen}
                      onChange={e => _setgen(e.target.value)}
                      style={{height:40,width:350}}
                  >
                      <option selected="true" >----- select an option -----</option>
                      <option value="M" >Male</option>
                      <option value="F" >Female</option>
                  </select>
            </label>
            <br></br>
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
                      <option value="P" >Price</option>
                      <option value="D" >Distance</option>
                      <option value="S" >Security</option>
                  </select>
            </label>
            <br></br>
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
                      <option value="P" >Price</option>
                      <option value="D" >Distance</option>
                      <option value="S" >Security</option>
                  </select>
            </label>
            <br></br>
            <font color="red"><label id='label8'> </label></font>
            <br></br>

            <label>
              Set Priority3:&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            <select
                      id='sb4'
                      name="priority3"
                      value={priority3}
                      onChange={e => _setpriority3(e.target.value)}
                      style={{height:40,width:350}}
                  >
                      <option selected="true" >----- select an option -----</option>
                      <option value="P" >Price</option>
                      <option value="D" >Distance</option>
                      <option value="S" >Security</option>
                  </select>
            </label>
            <br></br>
            <font color="red"><label id='label9'> </label></font>
            <br></br>

            

            <label id='label5'></label>
            <br></br>
            <br></br>
            <div id="recaptcha"></div>
            <button>Submit</button>
            
            <br></br>
            <br></br>
            </fieldset>
          </form>
        </header>
      </div>
    );
  }
  
  export default Temp

  //<input style={{height:40,width:100}} type="submit" value="Submit" />

  /*
  <label id='label5'></label>

      <div id="recaptcha"></div>

      <button onClick={handleClick}>Click</button>
      */