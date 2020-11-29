import React, { useState }  from 'react';
import {useParams} from 'react-router'
import './OwnerAcc.css'


function OwnerAcc() {
  const params= useParams();
  const show_textarea = () =>{
    let x =document.getElementById('hidden');
    x.classList.remove('hidden');
  }
  const show_textarea1 = () =>{
    let x =document.getElementById('hidden1');
    x.classList.remove('hidden1');
  }
  const show_textarea2 = () =>{
    let x =document.getElementById('hidden2');
    x.classList.remove('hidden2');
  }
  const show_textarea3 = () =>{
    let x =document.getElementById('hidden3');
    x.classList.remove('hidden3');
  }
  return (
    <div>

    <div class="card" >
              <div class="card-body" id="mainc">
                <br/>
                <div className="card" id="ac1card">
                  <br></br>
                  
                  <div class="card-body">
                  <img src="/img/parking.png"/><br/><br/><br/>
                  <h5>HELLO,{params.name}</h5><br></br>
                  <a href="/" className="btn btn-danger btn-block">LOGOUT</a>
                  <br></br><br></br>
                  <br></br>
                  <h5>YOUR ACCOUNT DETAILS</h5><br/>
                
                <div>
                    <button 
                        name="mobile"
                        type="button"
                        onClick={show_textarea2} className="btn btn-dark btn-block"><img id="btnicon" src='/img/wallet.png'/><br/><br/><br/>CHECK WALLET BALANCE</button>
                      <div id="hidden2" className="hidden2"><p>Balance Here: {params.balance}</p></div>
                </div>
    <br/>
                <div>
                    <button 
                        name="rating"
                        type="button"
                        onClick={show_textarea3} className="btn btn-dark btn-block"><img id="btnicon" src='/img/rupee.png'/><br/><br/><br/>Check Your Current Charge Per Hour</button>
                    
                    <div id="hidden3" className="hidden3"><p>Price Here: {params.price} </p></div>
                    </div>
                    <br/>
                    <div>
                    <button 
                        name="rating"
                        type="button"
                        onClick={show_textarea} className="btn btn-dark btn-block"><img id="btnicon" src='/img/parking-area.png'/><br/><br/><br/>View Your Free Slots</button>
                    
                      <div id="hidden" className="hidden"><p>Slots Here:{params.slots}</p>
                    </div>
                </div>
                <br/>
                <div>
                    <button 
                        name="rating"
                        type="button"                        
                        onClick={show_textarea1} className="btn btn-dark btn-block"><img id="btnicon" src='/img/debit-card.png'/><br/><br/><br/>Other Details</button>
                    
                      <div id="hidden1" className="hidden1"><p>PAN Here:{params.PAN}<br></br>Mobile Here:{params.phone}<br></br>Rating Here:{params.rating}<br></br>Distance Here:{params.distance}</p>
                  
                    </div>
                </div>
                  </div>
                </div>
    
                
    
                <br/>
                <br/>
              </div>
            </div>
    
    
              
    
        </div>
  );
}

export default OwnerAcc


  /*
  const URL=new URLSearchParams(window.location.search);
  const PAN = (new URLSearchParams(window.location.search)).get("PAN");
  document.getElementById("p1").innerHTML=URL;
  */