import React, {useRef} from 'react';
import './HouseList.css';
import {House} from "../models/House";


export function HouseList({ houseList, openModal }) {
    return (
        <div className="HouseList">
            <h3>Lista de casas</h3>
            <ul>
                {houseList.map((house: House) => <HouseListItem house={house} openModal={openModal}/>)}
            </ul>
        </div>
    );
}


function HouseListItem({ house, openModal }) {
    const listItemRef = useRef();
    house.listElement = listItemRef.current;

    const onHouseClick = () => {
        openModal(house);
    }

    return (
        <li ref={listItemRef}
            onClick={onHouseClick}
            onMouseEnter={ () => house.highlightOn() }
            onMouseLeave={ () => house.highlightOff() }>
            {house.name}
        </li>
    );
}
