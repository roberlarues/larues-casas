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
            backgroundColor: 'rgb(237 237 237)',
            padding: '0px 20px 20px 20px',
        }
    };
    const [houseList, setHouseList] = useState([]);
    const [enabledHouseList, setEnabledHouseList] = useState([]);
    const [modalIsOpen, setModalOpen] = React.useState(false);
    const [currentHouse, setCurrentHouse] = useState(null);
    const [displayOffCanvas, setDisplayOffCanvas] = useState(false);

    function openModal(house: House) {
        closeOffCanvas();
        setCurrentHouse(house);
        setModalOpen(true);
    }

    function closeModal() {
        setModalOpen(false);
    }

    const createHouseList = (houseList: House[]) => {
        const newHouseList = [...houseList];
        setHouseList(newHouseList);
        const enabledHouses = newHouseList.filter((house:House) => house.enabled);
        setEnabledHouseList(enabledHouses);
    }

    const onEnableHouseType = (type: string, enabled: boolean) => {
        const houses = houseList.filter((house:House) => house.type === type);
        if (houses) {
            houses.forEach(h => h.setEnabled(enabled));
        }
        const enabledHouses = houseList.filter((house:House) => house.enabled);
        setEnabledHouseList(enabledHouses);
    }

    const openOffCanvas = () => {
        setDisplayOffCanvas(true);
    }

    const closeOffCanvas = () => {
        setDisplayOffCanvas(false);
    }

    return (
      <div>
          <div className="main-content">
              <div className="MapCanvas">
                  <LaruesMap createHouseList={createHouseList} openModal={openModal}/>
                  <div className="map-right-gradient"/>
              </div>
              { displayOffCanvas ? <div className="offCanvasOverlay" onClick={closeOffCanvas}/> : '' }
              <div className={displayOffCanvas ? 'HouseListCanvas offCanvasOpen' : 'HouseListCanvas'}>
                  <button className="offCanvasCloseButton" onClick={closeOffCanvas}>
                      <i className="fas fa-times"/>
                  </button>
                  <Legend onEnableHouseType={onEnableHouseType}/>
                  <HouseList houseList={enabledHouseList} openModal={openModal}/>
              </div>
          </div>
          <button className="offCanvasButton" onClick={openOffCanvas}>
              <i className="fas fa-bars"/>
          </button>
          <Modal isOpen={modalIsOpen} onRequestClose={closeModal} contentLabel="Detalle" style={customStyles}>
              <HouseDetail house={currentHouse} closeModal={closeModal} />
          </Modal>
      </div>
    );
}

export default App;
