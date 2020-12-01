import React from 'react';
import './Welcome.css'


function Welcome() {
  return (
    <div className="wel">

      <div class="column" id="Welcome">
        <br/>
        <marquee><h1>WELCOME TO BLOCKPARK: YOUR ULTIMATE PARKING SOLUTION</h1></marquee>
        <br/>
            
      </div>
          
      <div class="card" id="card">
        <img class="card-img-top" src="/img/parking-sign.png" alt="Card image cap"/>
        <div class="card-body">
          <p>Are you a new parking lot owner?</p>
          <a href="/ownersignup" class="btn btn-dark btn-block">Signup</a>
        </div>
      </div>

      <div class="card" id="card">
        <img class="card-img-top" src="/img/car.png" alt="Card image cap"/>
        <div class="card-body">
          <p>Manage your Parking Lot</p>
          <a href="/ownerlogin" class="btn btn-dark btn-block">Login</a>
        </div>
      </div>

      <div class="card" id="card">
        <img  src="/img/driver.png" alt="Card image cap"/>
        <div class="card-body">
          <p>Looking for a parking? Signup </p>
          <a href="/driversignup" class="btn btn-dark btn-block">Signup</a>
        </div>
      </div>

      <div class="card" id="card">
        <img  src="/img/parking.png" alt="Card image cap"/>
        <div class="card-body">
          <p>Withdraw your car</p>
          <a href="/driverlogin" class="btn btn-dark btn-block">Login</a>
        </div>
      </div>
            
              
    </div>
            

    
  );
}

export default Welcome
