import React, {useState} from 'react';
import { LaruesMap } from './components/LaruesMap'
import { HouseList } from "./components/HouseList";
import Modal from 'react-modal';
import './App.css';
import {House} from "./models/House";

Modal.setAppElement("#root");

function App() {
    const [houseList, setHouseList] = useState([]);
    const [modalIsOpen, setModalOpen] = React.useState(false);
    const [currentHouse, setCurrentHouse] = useState(null);

    function openModal(house: House) {
        console.log('openModal');
        setModalOpen(true);
        setCurrentHouse(house);
    }

    function closeModal() {
        setModalOpen(false);
    }

    const createHouseList = (houseList: House[]) => {
        console.log('creating house list');
        const newHouseList = [...houseList];
        setHouseList(newHouseList);
    }

    const customModalStyles = {
        content: {
            top: '50%',
            left: '50%',
            right: 'auto',
            bottom: 'auto',
            marginRight: '-50%',
            transform: 'translate(-50%, -50%)'
        },
    };

    return (
      <div>
          {/*<div> Botones flotante</div>*/}
          <div className="main-content">
              <div className="MapCanvas">
                  <LaruesMap createHouseList={createHouseList} openModal={openModal}/>
              </div>
              <div className="HouseListCanvas">
                  <HouseList houseList={houseList} openModal={openModal}/>
              </div>
          </div>

          <Modal
              isOpen={modalIsOpen}
              onRequestClose={closeModal}
              style={customModalStyles}
              contentLabel="Example Modal">
              <div>House details of {currentHouse?.name}</div>
          </Modal>
      </div>
    );
}

export default App;
