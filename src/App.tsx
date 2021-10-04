import React from 'react';
import { LaruesMap } from './components/LaruesMap'
import './App.css';

function App() {
  return (
      <div className="App">
          {/*<div> Botones flotante</div>*/}
          <div className="AppCanvas">
              <LaruesMap/>
          </div>
          {/*<div>Modal?</div>*/}
      </div>
  );
}

export default App;
