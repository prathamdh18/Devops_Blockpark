import React from 'react';
import './styles/foundation.min.css'
import './styles/custom.css'
import Header from './components/header/Header';
import Footer from './components/footer/Footer';
import MobileHeader from './components/mobile header/MobileHeader';
import Welcome from './components/welcome/Welcome';
import Routes from './Routes';

function Home() {

    

    return (
        <div class="off-canvas-wrapper">
            <div class="off-canvas-wrapper-inner" data-off-canvas-wrapper>

                <div class="off-canvas-content" data-off-canvas-content>
            
                    <MobileHeader/>
                    <Header/>
                    <Routes/>

                </div>
  
                <hr/>

                <Footer/>

          </div>
        </div>
      

        
    );

}

export default Home

/*
<div class="off-canvas-wrapper">
     <div class="off-canvas-wrapper-inner" data-off-canvas-wrapper>

        

        <div className="f-canvas-content" data-off-canvas-content>
          
        <MobileHeader/>
          
        <Header/>

          <Welcome/>

          <hr/>

         <Footer/>
        </div>
      </div>
    </div>
    */