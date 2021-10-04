import React, {useState} from 'react';
import { LaruesMap } from './components/LaruesMap'
import { HouseList } from "./components/HouseList";
import './App.css';
import {House} from "./models/House";

function App() {
    const [houseList, setHouseList] = useState([
        { name: 'hola'}, { name: 'adios' }
    ]);

    const createHouseList = (houseList: House[]) => {
        console.log('creating house list');
        const newHouseList = [...houseList];
        setHouseList(newHouseList);
    }

    return (
      <div className="App">
          {/*<div> Botones flotante</div>*/}
          <div className="MapCanvas">
              <LaruesMap createHouseList={createHouseList}/>
          </div>
          <div className="HouseListCanvas">
              <HouseList houseList={houseList} />
          </div>
          {/*<div>Modal?</div>*/}
      </div>
    );
}

export default App;
