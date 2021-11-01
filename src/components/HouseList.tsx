import React, {useEffect, useRef} from 'react';
import './HouseList.css';
import {House} from "../models/House";


export function HouseList({ houseList, openModal }) {
    return (
        <div className="HouseList">
            <h4>Lista de casas</h4>
            <ul>
                {houseList.map((house: House) => <HouseListItem house={house} key={house.id} openModal={openModal}/>)}
            </ul>
        </div>
    );
}


function HouseListItem({ house, openModal }) {
    const listItemRef = useRef();
    useEffect( () => house.listElement = listItemRef.current, [house]);

    const onHouseClick = () => {
        openModal(house);
    }

    return (
        <li ref={listItemRef}
            className="no-highlight"
            onClick={onHouseClick}
            onMouseEnter={ () => house.highlightOn() }
            onMouseLeave={ () => house.highlightOff() }>
            {house.name}
        </li>
    );
}
