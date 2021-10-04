import React from 'react';
import './HouseList.css';
import {House} from "../models/House";
import {HouseListItem} from "./HouseListItem";


export function HouseList({ houseList }) {

    return (
        <div className="HouseList">
            <h3>Lista de casas</h3>
            <ul>
                {houseList.map((house: House) => <HouseListItem house={house}/>)}
            </ul>
        </div>
    );
}
