import React from 'react';
import {BrowserRouter, Route, Switch} from 'react-router-dom';
import Welcome from './components/welcome/Welcome';
import OwnerLogin from './components/ownerLogin/OwnerLogin';
import OwnerSignup from './components/ownerSignup/OwnerSignup';
import DriverLogin from './components/driverLogin/DriverLogin';
import DriverSignup from './components/driverSignup/DriverSignup';
import OwnerAcc from './components/OwnerAcc/OwnerAcc';
import DriverAcc from './components/driverAcc/DriverAcc';
import Receipt from './components/Receipt/Receipt';

function Routes() {

    return(
        <BrowserRouter>
    <Switch>
    <Route exact path='/' component={Welcome}/>
    <Route exact path='/ownerlogin' component={OwnerLogin}/>
    <Route exact path='/Owneracc/:PAN/:name/:slots/:price/:distance/:rating/:balance/:phone' component={OwnerAcc}/>
    <Route exact path='/ownersignup' component={OwnerSignup}/>
    <Route exact path='/driverlogin' component={DriverLogin}/>
    <Route exact path='/driveracc/:Index/:cnum' component={DriverAcc}/>
    <Route exact path='/driversignup' component={DriverSignup}/>
    <Route exact path='/Receipt/:CurrentDate/:cnum/:EnterTime/:ExitTime/:ParkedPrice/:LateRiserCess/:GenderDiscount/:AgeDiscount/:EarlyBirdDiscount/:Cess/:Discount/:BaseTotal/:Hours/:TempTotal' component={Receipt}/>
    </Switch>
    </BrowserRouter>
    )

};

export default Routes;