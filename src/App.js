import React, { useState, useEffect } from 'react';
import "./App.css";
import TipCalculator from './TipCalculator';

function App() {
 
  return (
    <>
      <main>
        <div id='logo'>
          <span>SPLT</span>
          <span>TTER</span>
        </div>
       <TipCalculator/>
      </main>
    </>
  );
}

export default App;
