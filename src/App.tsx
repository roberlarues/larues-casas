import React, {useState} from 'react';
import { LaruesMap } from './components/LaruesMap'
import { HouseList } from "./components/HouseList";
import Modal from 'react-modal';
import './App.css';
import {House} from "./models/House";
import {HouseDetail} from "./components/HouseDetail";

Modal.setAppElement("#root");

function App() {
    const [houseList, setHouseList] = useState([]);
    const [modalIsOpen, setModalOpen] = React.useState(false);
    const [currentHouse, setCurrentHouse] = useState(null);

    function openModal(house: House) {
        setCurrentHouse(house);
        setModalOpen(true);
    }

    function closeModal() {
        setModalOpen(false);
    }

    const createHouseList = (houseList: House[]) => {
        const newHouseList = [...houseList];
        setHouseList(newHouseList);
    }

    return (
      <div>
          <div className="main-content">
              <div className="MapCanvas">
                  <LaruesMap createHouseList={createHouseList} openModal={openModal}/>
                  <div className="map-right-gradient"/>
              </div>
              <div className="HouseListCanvas">
                  <HouseList houseList={houseList} openModal={openModal}/>
              </div>
          </div>

          <Modal isOpen={modalIsOpen} onRequestClose={closeModal} contentLabel="Detalle">
              <HouseDetail house={currentHouse} closeModal={closeModal} />
          </Modal>
      </div>
    );
}

export default App;
