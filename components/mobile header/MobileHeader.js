import React from 'react';
import './MobileHeader.css'


function MobileHeader() {
  return (
    <div>
      <div class="title-bar hide-for-large">
              <div class="title-bar-left">
                <button class="menu-icon" type="button" data-open="my-info"></button>
                <span class="title-bar-title">Mike Mikerson</span>
              </div>
            </div>
    </div>
  );
}

export default MobileHeader
