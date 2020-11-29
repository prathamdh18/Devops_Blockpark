import React from 'react';
import {useParams} from "react-router-dom";
import './DriverAcc.css'


function DriverAcc() {
  const setData = async e => {
    e.preventDefault();
    var temp=window.location.href;
    alert(temp);
    var res=temp.split('/');
    var index=res[4];
    var cnum=res[5];
    alert(cnum);
    cnum=cnum[0]+cnum[1]+" "+cnum[5]+cnum[6]+" "+cnum[10]+cnum[11]+" "+cnum[15]+cnum[16]+cnum[17]+cnum[18];
    alert(cnum);
    document.getElementById("label1").innerHTML=index;
  } 
  return (
    <div>
          <div className="row small-up-2 medium-up-3 large-up-4">
            <div className="column">
            
              <h5>This is DriverAcc</h5>
              <form onSubmit={setData}>
          <div class="form-group">
            <label>CAR NUMBER
            <input/>
            </label>
            <font color="red"><label id='label1'> </label></font>
            <br></br>
            <small id="mobileHelp" class="form-text text-muted">We'll never share your number with anyone else.</small>
          </div>
          <input type="submit" value="Login" class="btn btn-dark btn-block"/>
       </form>
            </div>
          </div>

    </div>
  );
}

export default DriverAcc
