import React, {useState} from 'react';
import { LaruesMap } from './components/LaruesMap'
import { HouseList } from "./components/HouseList";
import { HouseDetail } from "./components/HouseDetail";
import { Legend } from "./components/Legend";
import Modal from 'react-modal';
import './App.css';
import {House} from "./models/House";

Modal.setAppElement("#root");

function App() {
    const customStyles = {
        overlay: {
            backgroundColor: 'rgba(0,0,0, 0.7)'
        },
        content: {
            border: 'black',
            backgroundColor: 'rgb(237 237 237)'
        }
    };
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

    const onEnableHouseType = (type: string, enabled: boolean) => {
        const houses = houseList.filter((house:House) => house.type === type);
        if (houses) {
            houses.forEach(h => h.setEnabled(enabled));
        }
    }

    return (
      <div>
          <div className="main-content">
              <div className="MapCanvas">
                  <LaruesMap createHouseList={createHouseList} openModal={openModal}/>
                  <div className="map-right-gradient"/>
              </div>
              <div className="HouseListCanvas">
                  <Legend onEnableHouseType={onEnableHouseType}/>
                  <HouseList houseList={houseList} openModal={openModal}/>
              </div>
          </div>

          <Modal isOpen={modalIsOpen} onRequestClose={closeModal} contentLabel="Detalle" style={customStyles}>
              <HouseDetail house={currentHouse} closeModal={closeModal} />
          </Modal>
      </div>
    );
}

export default App;
