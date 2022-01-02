import React, { useState } from 'react';
import {House} from './models/House';
import { LaruesMap } from './components/LaruesMap'
import { HouseDetail } from './components/HouseDetail';
import { SideMenu } from './components/SideMenu';
import Modal from 'react-modal';
import './App.css';
import {Help} from "./components/Help";

Modal.setAppElement("#root");

function App() {
    const customStyles = {
        overlay: {
            backgroundColor: 'rgba(0,0,0, 0.7)',
            zIndex: 99999,
            inset: '-10pt'
        },
        content: {
            border: 'black',
            backgroundColor: 'rgb(237 237 237)',
            padding: '0px 20px 20px 20px',
        }
    };
    const [houseList, setHouseList] = useState([]);
    const [enabledHouseList, setEnabledHouseList] = useState([]);
    const [currentHouse, setCurrentHouse] = useState(null);
    const [displayOffCanvas, setDisplayOffCanvas] = useState(false);
    const [modalHouseIsOpen, setModalHouseOpen] = React.useState(false);
    const [modalHelpIsOpen, setModalHelpOpen] = React.useState(false);

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

    function openHouseModal(house: House) {
        closeOffCanvas();
        setCurrentHouse(house);
        setModalHouseOpen(true);
    }

    function closeHouseModal() {
        setModalHouseOpen(false);
    }

    function openHelpModal() {
        setModalHelpOpen(true);
    }

    function closeHelpModal() {
        setModalHelpOpen(false);
    }

    return (
      <div>
          <div className="main-content">
              <div className="MapCanvas">
                  <LaruesMap createHouseList={createHouseList} openModal={openHouseModal}/>
                  <div className="map-right-gradient"/>
              </div>
              <SideMenu displaySideMenu={displayOffCanvas} enabledHouseList={enabledHouseList}
                        onCloseSideMenu={closeOffCanvas} onEnableHouseType={onEnableHouseType}
                        onOpenHouseModal={openHouseModal} onOpenHelpModal={openHelpModal}/>
          </div>
          <div className="offCanvasButton" >
              <button onClick={openHelpModal}>
                  <i className="fas fa-question-circle"/>
              </button>
              <button onClick={openOffCanvas}>
                  <i className="fas fa-bars"/>
              </button>
          </div>
          <Modal isOpen={modalHouseIsOpen} onRequestClose={closeHouseModal} contentLabel="Detalle" style={customStyles}>
              <HouseDetail house={currentHouse} closeModal={closeHouseModal} />
          </Modal>
          <Modal isOpen={modalHelpIsOpen} onRequestClose={closeHelpModal} contentLabel="Detalle" style={customStyles}>
              <div className="modal-header">
                  <button className="modal-close-button" onClick={closeHelpModal}>
                      <i className="fas fa-times"/>
                  </button>
              </div>
              <Help/>
          </Modal>
      </div>
    );
}

export default App;
